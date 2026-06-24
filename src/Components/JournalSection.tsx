'use client';

import Link from 'next/link';
import React from 'react';
// Cleaned absolute path alias import
import { mockJournalData } from '@/Components/data/journalData';

export default function JournalSection(): React.JSX.Element {
  return (
    <section className="bg-[#FAF7F2] py-20 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header Frame */}
        <div className="flex items-baseline justify-between border-b border-[#ECE6DC] pb-6 mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-stone-900 tracking-tight">
            Reading the market.
          </h2>
          <Link 
            href="/journal" 
            className="group flex items-center gap-1 font-sans text-[13px] font-medium text-stone-800 hover:text-[#A48463] transition-colors"
          >
            All entries 
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 3-Column Responsive Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {mockJournalData.map((article) => (
            <article key={article.id} className="group flex flex-col">
              
              {/* Card Image Link Wrapper */}
              <Link href={`/journal/${article.slug}`} className="block overflow-hidden rounded-xl bg-[#ECE6DC] aspect-[16/10] mb-5 relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </Link>

              {/* Card Content Metadata */}
              <div className="flex flex-col flex-grow">
                <time className="font-sans text-[11px] font-medium tracking-widest text-stone-400 uppercase">
                  {article.date}
                </time>
                
                <h3 className="font-serif text-xl font-normal text-stone-900 mt-2 mb-2 group-hover:text-[#A48463] transition-colors leading-snug">
                  <Link href={`/journal/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className="font-sans text-[14px] font-light text-stone-500 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}