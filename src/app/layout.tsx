// src/app/layout.tsx

// 1. RESTORE THIS CRITICAL IMPORT LINK AT THE VERY TOP:
import './globals.css';

import Footer from '@/Components/Footer'; // Ensure this matches your footer component file path
import Navbar from '@/Components/Navbar';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className="bg-[#FAF7F2] min-h-screen flex flex-col justify-between antialiased"
        suppressHydrationWarning
      >
        {/* Persistent Global Header */}
        <Navbar />
        
        {/* Active Page Viewport Layer */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Persistent Global Footer */}
        <Footer />
      </body>
    </html>
  );
}