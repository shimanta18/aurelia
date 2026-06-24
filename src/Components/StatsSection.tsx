import React from 'react';
import { STATS_DATA } from '../Components/data/mockData';

export default function StatsSection(): React.JSX.Element {
  return (
    <section className="w-full bg-[#FAF7F2] py-16 md:py-24 border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-baseline">
          {STATS_DATA.map((item, idx) => (
            <div key={idx} className="flex flex-col space-y-2.5">
              <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight">
                {item.value}
              </span>
              <span className="font-sans text-[10px] md:text-xs font-medium tracking-[0.2em] text-stone-500 uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}