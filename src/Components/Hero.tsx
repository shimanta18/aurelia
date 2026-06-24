import React from 'react';

export default function Hero(): React.JSX.Element {
  return (
    <section className="relative w-full min-h-[85vh] flex items-end bg-stone-900 overflow-hidden">
      {/* Absolute Background Layer (Using a placeholder luxury villa image backdrop) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-102"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(15,13,10,0.85)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80')` 
        }} 
      />

      {/* Foreground Brand Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 pt-32 flex flex-col items-start z-10">
        
        {/* Meta Label */}
        <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.25em] text-stone-400 uppercase mb-4">
          Established 2014 • Dubai
        </span>

        {/* Master Heading Statement */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-[#FAF7F2] leading-[1.1] max-w-4xl tracking-tight mb-6">
          The address you would have chosen, found before you ask.
        </h1>

        {/* Brand Explanatory Copy */}
        <p className="font-sans text-sm md:text-base text-stone-300/90 font-light max-w-2xl leading-relaxed mb-10">
          A boutique real-estate house representing the city's most considered villas, penthouses, and apartments — from Palm Jumeirah to Downtown.
        </p>

        {/* Call to Action Controls Frame */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <button className="px-7 py-3.5 bg-[#A48463] hover:bg-[#937353] text-white text-xs font-semibold tracking-wider uppercase rounded-sm flex items-center justify-center gap-3 transition-colors shadow-md">
            Browse residences
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
          
          <button className="px-7 py-3.5 bg-black/20 hover:bg-white/10 text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase rounded-sm border border-stone-400/40 backdrop-blur-sm transition-all text-center">
            Speak with the studio
          </button>
        </div>

      </div>
    </section>
  );
}