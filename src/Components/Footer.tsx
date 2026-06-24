'use client';

import Link from 'next/link';
import React from 'react';

export default function Footer(): React.JSX.Element {
  return (
    <footer className="w-full bg-[#FAF7F2] border-t border-[#ECE6DC] py-16 px-6 md:px-12">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
        
        {/* Brand Column Frame */}
        <div className="md:col-span-5 flex flex-col justify-start max-w-sm">
          <h2 className="font-serif text-2xl font-normal text-stone-900 tracking-wide mb-4">
             Aurelia
          </h2>
          <p className="font-sans text-[14px] font-light text-stone-500 leading-relaxed">
            A boutique real-estate house representing considered residences across Dubai's prime addresses since 2014.
          </p>
        </div>

        {/* Link Matrix Stream Group */}
        <div className="md:col-span-4 grid grid-cols-2 gap-x-4">
          
          {/* Explore Links Sub-Block */}
          <div>
            <h3 className="font-sans text-[11px] font-medium tracking-widest text-[#A48463] uppercase mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/listings" className="font-sans text-[14px] font-light text-stone-600 hover:text-stone-900 transition-colors">
                  All listings
                </Link>
              </li>
              <li>
                <Link href="/for-sale" className="font-sans text-[14px] font-light text-stone-600 hover:text-stone-900 transition-colors">
                  For sale
                </Link>
              </li>
              <li>
                <Link href="/for-rent" className="font-sans text-[14px] font-light text-stone-600 hover:text-stone-900 transition-colors">
                  For rent
                </Link>
              </li>
              <li>
                <Link href="/journal" className="font-sans text-[14px] font-light text-stone-600 hover:text-stone-900 transition-colors">
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links Sub-Block */}
          <div>
            <h3 className="font-sans text-[11px] font-medium tracking-widest text-[#A48463] uppercase mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="font-sans text-[14px] font-light text-stone-600 hover:text-stone-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-sans text-[14px] font-light text-stone-600 hover:text-stone-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="font-sans text-[14px] font-light text-stone-600 hover:text-stone-900 transition-colors">
                  Member access
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Studio Contact Metadata Column */}
        <div className="md:col-span-3 flex flex-col justify-start space-y-4">
          <h3 className="font-sans text-[11px] font-medium tracking-widest text-[#A48463] uppercase mb-1">
            Studio
          </h3>
          
          <div className="flex items-start gap-3">
            <svg className="w-4 h-4 text-[#A48463] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
            </svg>
            <p className="font-sans text-[14px] font-light text-stone-600 leading-snug">
              Boulevard Plaza Tower 1, Downtown Dubai
            </p>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-[#A48463] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.514 2.02a13.728 13.728 0 01-6.505-6.505l2.019-1.514c.361-.272.528-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <a href="tel:+97144000000" className="font-sans text-[14px] font-light text-stone-600 hover:text-stone-900 transition-colors">
              +8801586712309
            </a>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-[#A48463] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.616a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <a href="mailto:studio@maisonaurelia.ae" className="font-sans text-[14px] font-light text-stone-600 hover:text-stone-900 transition-colors">
              studio@aurelia.ae
            </a>
          </div>

          {/* Social Platform Badges Section */}
          <div className="flex items-center space-x-3 pt-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[#ECE6DC] flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-stone-400 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[#ECE6DC] flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-stone-400 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}