'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { auth } from '../../lib/firebase';

export default function AuthModal(): React.JSX.Element {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Combined Firebase & Express Backend Sync
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setErrorMessage("Authentication timed out. Check your browser network tab or console.");
    }, 5000);

    try {
      console.log(`Attempting Firebase ${activeTab} with:`, email);
      
      //  Authenticate with Firebase first
      let firebaseUser;
      if (activeTab === 'signin') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        firebaseUser = userCredential.user;
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        firebaseUser = userCredential.user;
        if (fullName.trim()) {
          await updateProfile(firebaseUser, { displayName: fullName });
        }
      }

      //  CONNECT TO YOUR NODE.JS EXPRESS BACKEND SERVER
      console.log("Firebase verified. Syncing with Express database...");
      const endpoint = activeTab === 'signin' ? 'login' : 'register';
      
      const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL }/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: fullName || firebaseUser.displayName || 'Maison Member',
          email: email,
          password: password // Passes securely to match/hash on Express side
        })
      });

      const backendData = await backendResponse.json();

      if (!backendData.success) {
        throw new Error(backendData.message || 'Failed to sync account with main database.');
      }

      
      localStorage.setItem('token', backendData.token);
      localStorage.setItem('user', JSON.stringify(backendData.user)); // Contains role: 'user'

      clearTimeout(timeoutId);
      console.log("Sync complete! True Role:", backendData.user.role);
      
      // 4. Redirect based on role
      if (backendData.user.role === 'admin') {
        router.push('/dashboard/admin'); // Go to admin section
      } else {
        router.push('/dashboard'); // Go to clean user profile area
      }
      
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("Auth Mismatch caught:", error);
      setErrorMessage(error.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Update Demo Account to set the correct Storage Values
  const handleDemoAccess = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await signInWithEmailAndPassword(auth, 'demo@maisonaurelia.ae', 'Demo!2026');
      
      
      const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL }/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'demo@maisonaurelia.ae', password: 'Demo!2026' })
      });
      
      const backendData = await backendResponse.json();
      
      if (backendData.success) {
        localStorage.setItem('token', backendData.token);
        localStorage.setItem('user', JSON.stringify(backendData.user));
        router.push('/dashboard');
      } else {
        // Fallback if demo doesn't exist in server database yet
        localStorage.setItem('user', JSON.stringify({ name: 'Demo User', role: 'user' }));
        router.push('/dashboard');
      }
    } catch (error: any) {
      setErrorMessage('Demo access synchronization failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[448px] bg-[#FAF7F2] border border-[#EBE5DA] rounded-2xl p-8 md:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.01)] mx-auto">
      
      <div className="mb-7">
        <span className="font-sans text-[11px] font-semibold tracking-[0.15em] text-[#A48463] uppercase block mb-2.5">
          Member Access
        </span>
        <h2 className="font-serif text-3xl md:text-[34px] font-normal text-stone-900 tracking-tight mb-2">
          Welcome
        </h2>
        <p className="font-sans text-[13.5px] font-normal text-stone-500/90 leading-relaxed">
          Save favourites, request viewings, and manage your account.
        </p>
      </div>

      <div className="grid grid-cols-2 bg-[#EFEAE0] p-1 rounded-xl mb-7">
        <button
          type="button"
          disabled={loading}
          onClick={() => { setActiveTab('signin'); setErrorMessage(''); }}
          className={`py-2 text-[13.5px] font-medium font-sans rounded-lg transition-all duration-200 ${
            activeTab === 'signin'
              ? 'bg-[#FAF7F2] text-stone-900 shadow-sm'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => { setActiveTab('signup'); setErrorMessage(''); }}
          className={`py-2 text-[13.5px] font-medium font-sans rounded-lg transition-all duration-200 ${
            activeTab === 'signup'
              ? 'bg-[#FAF7F2] text-stone-900 shadow-sm'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          Create account
        </button>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[13px] font-sans font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'signup' && (
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="fullName" className="font-sans text-[13px] font-medium text-stone-800">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              required
              disabled={loading}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent border border-[#DDD5C7] rounded-lg px-3.5 py-2.5 text-[14.5px] font-sans text-stone-900 focus:outline-none focus:border-[#A48463] transition-colors disabled:opacity-50"
            />
          </div>
        )}

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email" className="font-sans text-[13px] font-medium text-stone-800">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-[#DDD5C7] rounded-lg px-3.5 py-2.5 text-[14.5px] font-sans text-stone-900 focus:outline-none focus:border-[#A48463] transition-colors disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="password" className="font-sans text-[13px] font-medium text-stone-800">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-[#DDD5C7] rounded-lg px-3.5 py-2.5 text-[14.5px] font-sans text-stone-900 focus:outline-none focus:border-[#A48463] transition-colors disabled:opacity-50"
          />
          {activeTab === 'signup' && (
            <span className="text-[12px] font-sans font-light text-stone-400 mt-0.5 block">
              At least 6 characters.
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#141210] text-[#FAF7F2] hover:bg-stone-800 transition-colors font-sans font-medium text-[14px] py-3 rounded-lg mt-3.5 tracking-wide flex items-center justify-center disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-[#FAF7F2] border-t-transparent rounded-full animate-spin"></span>
          ) : activeTab === 'signin' ? (
            'Sign in'
          ) : (
            'Create account'
          )}
        </button>
      </form>

      <div className="mt-4.5 space-y-3.5">
        <button
          type="button"
          disabled={loading}
          onClick={handleDemoAccess}
          className="w-full border border-[#DDD5C7] hover:bg-[#EFEAE0]/40 transition-colors font-sans text-[13.5px] text-stone-800 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <svg className="w-3.5 h-3.5 text-[#A48463]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.2L22 11.6l-6.4 4.8 2.4 7.6-6-5.2-6 5.2 2.4-7.6L2 11.6l7.6-2.4L12 2z" />
          </svg>
          Continue with demo account
        </button>

        <div className="text-center font-sans text-[12px] text-stone-400/90 tracking-wide">
          demo@maisonaurelia.ae · Demo!2026
        </div>

        <div className="text-center pt-4 border-t border-[#EBE5DA]/70 mt-2">
          <p className="font-sans text-[12.5px] font-light text-stone-400/90 leading-relaxed">
            By continuing you agree to the blessings and{' '}
            <a href="/terms" className="underline underline-offset-2 text-stone-500 hover:text-stone-700 transition-colors">
              terms
            </a>{' '}
            of the studio.
          </p>
        </div>
      </div>

    </div>
  );
}