import React from 'react';
import { TESTIMONIALS_DATA } from '../Components/data/mockData';

export default function Testimonials(): React.JSX.Element {
  return (
    <section className="w-full bg-[#FAF7F2] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Category Overline Label */}
        <span className="font-sans text-[11px] tracking-[0.25em] text-[#A48463] uppercase block mb-4">
          In their words
        </span>
        
        {/* Primary Main Section Header */}
        <h2 className="font-serif text-4xl md:text-5xl font-normal text-stone-900 tracking-tight mb-14">
          Quietly recommended.
        </h2>

        {/* 3-Column Luxury Quote Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div 
              key={item.id}
              className="bg-[#FAF7F2] border border-[#ECE6DC] rounded-xl p-8 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-4">
                {/* Custom Serif Style Quote Marks */}
                <span className="font-serif text-4xl text-[#A48463] block leading-none select-none">
                  &#8222;
                </span>
                
                {/* Main Client Quote Statement */}
                <p className="font-sans text-[14px] text-stone-800 font-light leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Attribution Signature Row */}
              <div className="flex items-center space-x-2 pt-2">
                <span className="w-4 h-[1px] bg-[#D9CFC1]"></span>
                <span className="font-sans text-[10px] tracking-widest text-stone-500 font-medium uppercase">
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}