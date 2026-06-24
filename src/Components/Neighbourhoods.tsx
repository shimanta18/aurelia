import React from 'react';
import { NEIGHBOURHOODS_DATA } from '../Components/data/mockData';

export default function Neighbourhoods(): React.JSX.Element {
  return (
    <section className="w-full bg-[#FAF7F2] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Uppercase Label */}
        <span className="font-sans text-[11px] tracking-[0.25em] text-[#A48463] uppercase block mb-4">
          Where we work
        </span>
        
        {/* Main Header */}
        <h2 className="font-serif text-4xl md:text-5xl font-normal text-stone-900 tracking-tight mb-4">
          Neighbourhoods we know.
        </h2>
        
        {/* Subtitle description matching the template exactly */}
        <p className="font-sans text-[15px] text-stone-600 font-light max-w-2xl mb-14 leading-relaxed">
          Twelve distinct addresses, each with its own grammar. We've walked them at every hour.
        </p>

        {/* 4-Column Fluid Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {NEIGHBOURHOODS_DATA.map((item) => (
            <div 
              key={item.id}
              className="bg-[#FAF7F2] border border-[#ECE6DC] rounded-xl px-6 py-5 flex items-center justify-between transition-all duration-300 hover:bg-white hover:border-[#D9CFC1] hover:shadow-sm cursor-pointer group"
            >
              <span className="font-serif text-[17px] text-stone-900 font-normal">
                {item.name}
              </span>
              
              {/* Discrete minimal modern link arrow */}
              <svg 
                className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:text-[#A48463] transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}