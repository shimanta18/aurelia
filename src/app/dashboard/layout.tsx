'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserRole(parsed.role);
      } catch (err) {
        console.error("Error reading sidebar context:", err);
      }
    }
  }, []);

  const linkStyle = (path: string) => `
    block px-4 py-2.5 text-[13.5px] font-sans rounded-lg transition-all duration-150 tracking-wide
    ${pathname === path 
      ? 'bg-[#A48463] text-[#FAF7F2] font-medium shadow-sm' 
      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/50'
    }
  `;

  return (
    <div className="flex w-full min-h-screen bg-stone-50">
      {/* =========================================================
          LEFT SIDEBAR PANEL
         ========================================================= */}
      <div className="w-64 bg-[#141210] text-stone-200 min-h-screen flex flex-col justify-between p-6 border-r border-stone-800/40 shrink-0">
        <div>
          <div className="mb-8 px-2">
            <h2 className="text-white font-serif text-xl tracking-tight">Aurelia Panel</h2>
            <span className="text-[10px] text-[#A48463] uppercase tracking-[0.15em] block font-bold mt-1">
              {userRole === 'admin' ? 'Admin Workspace' : 'Client Workspace'}
            </span>
          </div>

          <nav className="space-y-1.5">
            {userRole !== 'admin' ? (
              <>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block px-4 mb-2 font-semibold">
                  Client Hub
                </span>
                <Link href="/dashboard" className={linkStyle('/dashboard')}>Overview</Link>
                <Link href="/dashboard/my-items" className={linkStyle('/dashboard/my-items')}>My Items</Link>
                <Link href="/dashboard/profile" className={linkStyle('/dashboard/profile')}>Profile</Link>
                <Link href="/dashboard/settings" className={linkStyle('/dashboard/settings')}>Settings</Link>
              </>
            ) : (
              <>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block px-4 mb-2 font-semibold">
                  Management
                </span>
                <Link href="/dashboard" className={linkStyle('/dashboard')}>Overview</Link>
                <Link href="/dashboard/users" className={linkStyle('/dashboard/users')}>Manage Users</Link>
                <Link href="/dashboard/items" className={linkStyle('/dashboard/items')}>Manage Items</Link>
                <Link href="/dashboard/reports" className={linkStyle('/dashboard/reports')}>Performance Reports</Link>
                <Link href="/dashboard/matrix" className={linkStyle('/dashboard/matrix')}>Categories Matrix</Link>
                
                {/* 📋 FIXED: Added this here so it appears on your Admin Workspace sidebar! */}
                <Link href="/dashboard/profile" className={linkStyle('/dashboard/profile')}>Profile Settings</Link>
                
                <Link href="/dashboard/settings" className={linkStyle('/dashboard/settings')}>System Settings</Link>
              </>
            )}
          </nav>
        </div>

        <div className="pt-4 border-t border-stone-800/60 px-2 text-[11px] font-sans font-light text-stone-500">
          Aurelia Studio © 2026
        </div>
      </div>

      {/* =========================================================
          RIGHT MAIN WORKSPACE WINDOW
         ========================================================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}