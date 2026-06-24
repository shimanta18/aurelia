// src/app/login/page.tsx
'use client';

import dynamic from 'next/dynamic';

// Force AuthModal to load exclusively on the client side
const AuthModal = dynamic(() => import('../../Components/Auth/AuthModal'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="w-6 h-6 border-2 border-[#A48463] border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AuthModal />
      </div>
    </div>
  );
}