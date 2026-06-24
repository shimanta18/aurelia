'use client';

import React, { useEffect, useState } from 'react';

interface UserData {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function UserProfile(): React.JSX.Element {
  // Core Profile Data States
  const [profile, setProfile] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    role: ''
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Security Credentials States
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setProfile({
          name: parsed.name || 'Admin User',
          email: parsed.email || 'admin@aurelia.com',
          phone: parsed.phone || '+971 50 000 0000',
          role: parsed.role || 'admin'
        });
        if (parsed.avatarUrl) setImagePreview(parsed.avatarUrl);
      } catch (err) {
        console.error("Failed parsing profile context:", err);
      }
    }
  }, []);

  // Handle Profile Text Changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle Password Field Changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Profile Image Selection Hook
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Profile Information Changes
  const updateProfileInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      // If updating an image, use FormData; otherwise standard JSON payload
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('phone', profile.phone);
      if (imageFile) formData.append('avatar', imageFile);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL }/auth/profile/update`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const json = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile metrics updated successfully.' });
        localStorage.setItem('user', JSON.stringify({ ...json.user }));
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: json.message || 'Failed updating information.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection failed with authentication node.' });
    } finally {
      setLoading(false);
    }
  };

  // Submit Security Password Update
  const updateAccountPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match confirmation.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL }/auth/profile/password`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });

      const json = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Security credentials safely updated.' });
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({ type: 'error', text: json.message || 'Password update rejected.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'System node connection timeout.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 w-full p-2 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-normal text-stone-900 tracking-tight">Account Identity</h1>
        <p className="text-sm font-sans font-light text-stone-500 mt-1">Manage public identifiers, profile images, and access keys.</p>
      </div>

      {message && (
        <div className={`p-4 text-xs tracking-wide rounded-lg font-sans border ${
          message.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200/60 text-emerald-800' 
            : 'bg-rose-50 border-rose-200/60 text-rose-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left Side Column: Avatar Node */}
        <div className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="relative w-28 h-28 rounded-full overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center group">
            {imagePreview ? (
              <img src={imagePreview} alt="User Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-serif text-stone-400 uppercase">{profile.name.charAt(0)}</span>
            )}
            <label className="absolute inset-0 bg-stone-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-150">
              <span className="text-[10px] uppercase tracking-wider text-[#FAF7F2] font-semibold">Change</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <div>
            <h3 className="font-serif text-lg font-normal text-stone-900">{profile.name}</h3>
            <span className="text-[10px] text-[#A48463] uppercase tracking-widest font-bold block mt-0.5">{profile.role} Workspace</span>
          </div>
          {imageFile && (
            <button onClick={updateProfileInfo} disabled={loading} className="px-4 py-1.5 text-[11px] uppercase tracking-wider font-semibold border border-[#A48463] text-[#A48463] hover:bg-[#A48463] hover:text-white rounded transition-colors duration-150">
              {loading ? 'Uploading...' : 'Save Avatar'}
            </button>
          )}
        </div>

        {/* Right Side Column: Profile & Password Forms */}
        <div className="md:col-span-2 space-y-8">
          {/* Form Node 1: Identity Information */}
          <div className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-lg font-normal text-stone-900">Personal Signifiers</h3>
              <button type="button" onClick={() => setIsEditing(!isEditing)} className="text-xs text-[#A48463] hover:underline font-medium">
                {isEditing ? 'Cancel Details' : 'Modify Credentials'}
              </button>
            </div>

            <form onSubmit={updateProfileInfo} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-sans font-semibold tracking-wider text-stone-400 uppercase block mb-1">Full Legal Name</label>
                  <input type="text" name="name" value={profile.name} onChange={handleProfileChange} disabled={!isEditing} className="w-full text-sm font-sans p-2.5 rounded-lg border border-stone-200 outline-none focus:border-[#A48463] bg-stone-50/50 disabled:bg-stone-50 disabled:text-stone-400 transition-all duration-150" required />
                </div>
                <div>
                  <label className="text-[10px] font-sans font-semibold tracking-wider text-stone-400 uppercase block mb-1">Mobile Communications</label>
                  <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} disabled={!isEditing} className="w-full text-sm font-sans p-2.5 rounded-lg border border-stone-200 outline-none focus:border-[#A48463] bg-stone-50/50 disabled:bg-stone-50 disabled:text-stone-400 transition-all duration-150" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-sans font-semibold tracking-wider text-stone-400 uppercase block mb-1">Email Node Address (Immutable)</label>
                <input type="email" value={profile.email} disabled className="w-full text-sm font-sans p-2.5 rounded-lg border border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed" />
              </div>

              {isEditing && (
                <div className="pt-2">
                  <button type="submit" disabled={loading} className="bg-[#A48463] hover:bg-[#8C6F51] text-[#FAF7F2] font-medium px-5 py-2 text-xs rounded-lg transition-colors duration-150 shadow-sm uppercase tracking-wider">
                    {loading ? 'Processing...' : 'Apply Modifications'}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Form Node 2: Security Credentials Key Update */}
          <div className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-sm">
            <h3 className="font-serif text-lg font-normal text-stone-900 mb-6">Security Access Key Modification</h3>
            <form onSubmit={updateAccountPassword} className="space-y-4">
              <div>
                <label className="text-[10px] font-sans font-semibold tracking-wider text-stone-400 uppercase block mb-1">Current Active Password</label>
                <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} className="w-full text-sm font-sans p-2.5 rounded-lg border border-stone-200 outline-none focus:border-[#A48463]" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-sans font-semibold tracking-wider text-stone-400 uppercase block mb-1">New System Password</label>
                  <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="w-full text-sm font-sans p-2.5 rounded-lg border border-stone-200 outline-none focus:border-[#A48463]" required />
                </div>
                <div>
                  <label className="text-[10px] font-sans font-semibold tracking-wider text-stone-400 uppercase block mb-1">Verify New Password</label>
                  <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} className="w-full text-sm font-sans p-2.5 rounded-lg border border-stone-200 outline-none focus:border-[#A48463]" required />
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={loading} className="bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium px-5 py-2 text-xs rounded-lg transition-colors duration-150 shadow-sm uppercase tracking-wider">
                  {loading ? 'Re-keying Account...' : 'Rewrite Key Credentials'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}