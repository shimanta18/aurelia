'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// Import your Firebase auth instance
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('demo@maisonaurelia.ae');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Real-time synchronization with active Firebase state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email || 'client@aurelia.com');
      } else {
        setIsLoggedIn(false);
      }
    });

    // Cleanup active observer subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error logging out of Firebase:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#ECE6DC] bg-[#FAF7F2]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex h-20 items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="font-serif text-2xl font-normal text-stone-900 tracking-wide">
            Aurelia
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-sans text-[14px] font-light transition-colors ${pathname === '/' ? 'text-[#A48463]' : 'text-stone-600 hover:text-stone-900'}`}>
              Home
            </Link>
            <Link href="/explore" className={`font-sans text-[14px] font-light transition-colors ${pathname === '/explore' ? 'text-[#A48463]' : 'text-stone-600 hover:text-stone-900'}`}>
              Explore
            </Link>
            <Link href="/about" className={`font-sans text-[14px] font-light transition-colors ${pathname === '/about' ? 'text-[#A48463]' : 'text-stone-600 hover:text-stone-900'}`}>
              About
            </Link>

            {/* Journal Route: Only visible when logged in */}
            {isLoggedIn && (
              <Link href="/journal" className={`font-sans text-[14px] font-light transition-colors ${pathname === '/journal' ? 'text-[#A48463]' : 'text-stone-600 hover:text-stone-900'}`}>
                Journal
              </Link>
            )}

            <Link href="/contact" className={`font-sans text-[14px] font-light transition-colors ${pathname === '/contact' ? 'text-[#A48463]' : 'text-stone-600 hover:text-stone-900'}`}>
              Contact
            </Link>
          </div>

          {/* User Profile / Auth State Target Menu */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              /* Dropdown Component (Logged In Menu) */
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 font-sans text-[14px] text-stone-800 font-light focus:outline-none py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-[#ECE6DC] border border-[#D9CFC1] flex items-center justify-center font-serif text-xs text-[#A48463]">
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                  <span>Account</span>
                  <svg className={`w-3 h-3 text-stone-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#FAF7F2] border border-[#ECE6DC] shadow-lg py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="px-4 py-2 border-b border-[#ECE6DC] mb-1">
                      <p className="font-sans text-xs text-stone-400">Signed in as</p>
                      <p className="font-sans text-[13px] font-medium text-stone-800 truncate">{userEmail}</p>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 font-sans text-[13px] text-stone-700 hover:bg-[#ECE6DC]/40 transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/dashboard/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 font-sans text-[13px] text-stone-700 hover:bg-[#ECE6DC]/40 transition-colors">
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 font-sans text-[13px] text-red-600 hover:bg-red-50/50 transition-colors border-t border-[#ECE6DC] mt-1"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="bg-stone-950 text-white font-sans text-xs font-medium px-5 py-2.5 rounded-lg hover:bg-stone-800 transition-all">
                Sign in
              </Link>
            )}
          </div>

          {/* Responsive Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-800 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#ECE6DC] bg-[#FAF7F2] px-6 py-4 space-y-3">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block font-sans text-[15px] text-stone-700">Home</Link>
          <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className="block font-sans text-[15px] text-stone-700">Explore</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block font-sans text-[15px] text-stone-700">About</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block font-sans text-[15px] text-stone-700">Contact</Link>
          
          {isLoggedIn ? (
            <>
              <Link href="/journal" onClick={() => setIsMobileMenuOpen(false)} className="block font-sans text-[15px] text-stone-700 border-t border-[#ECE6DC]/60 pt-2">Journal</Link>
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block font-sans text-[15px] text-stone-700">Dashboard</Link>
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block font-sans text-[15px] text-stone-700">My Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left font-sans text-[15px] text-red-600 pt-2 border-t border-[#ECE6DC]">Logout</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-center bg-stone-950 text-white font-sans text-sm py-2 rounded-lg mt-2">Sign in</Link>
          )}
        </div>
      )}
    </nav>
  );
}