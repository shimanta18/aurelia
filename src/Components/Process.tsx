import React from 'react';
import { PROCESS_DATA } from '../Components/data/mockData';

export default function Process(): React.JSX.Element {
  return (
    <section className="w-full bg-[#FAF7F2] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Uppercase Content Category Overline */}
        <span className="font-sans text-[11px] tracking-[0.25em] text-[#A48463] uppercase block mb-4">
          How it works
        </span>
        
        {/* Primary Large Display Header */}
        <h2 className="font-serif text-4xl md:text-5xl font-normal text-stone-900 tracking-tight mb-16">
          A measured process.
        </h2>

        {/* 4-Column Minimal Process Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {PROCESS_DATA.map((item) => (
            <div key={item.step} className="flex flex-col space-y-4">
              
              {/* Stepper Index Number with Underline Decorator */}
              <div className="inline-block">
                <span className="font-serif text-2xl text-[#A48463] relative pb-2 block w-fit">
                  {item.step}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D9CFC1]"></span>
                </span>
              </div>

              {/* Title and Body Block */}
              <div className="space-y-2 pt-2">
                <h3 className="font-serif text-xl font-normal text-stone-900">
                  {item.title}
                </h3>
                <p className="font-sans text-[13px] text-stone-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}