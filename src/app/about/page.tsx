'use client';

import React from 'react';

export default function AboutPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-stone-900 selection:bg-[#ECE6DC]">
      
      {/* SECTION 1: HERO HEADER (image_8b2d06.png) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16 md:pt-28 md:pb-24 border-b border-[#ECE6DC]/60">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase font-sans tracking-widest text-[#A48463] font-bold block">
            About the Studio
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-stone-900 leading-[1.15]">
            A small house, with a long memory of this city.
          </h1>
          <p className="font-sans text-stone-600 font-light text-base md:text-lg leading-relaxed pt-4">
            Maison Aurelia has represented Dubai residences since 2014. We are
            deliberately small — eight directors and twelve associates — and we work by
            referral. Our clients are residents of the city, family offices in Europe and Asia,
            and a small number of international purchasers we have come to know
            personally.
          </p>
        </div>
      </section>

      {/* SECTION 2: PRINCIPLES & MATRIX (image_8b2d61.png) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-b border-[#ECE6DC]/60">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column heading */}
          <div className="md:col-span-5 space-y-2">
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#A48463] font-bold block">
              Principles
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-stone-900 tracking-tight">
              How we work.
            </h2>
          </div>

          {/* Right Column Core Values */}
          <div className="md:col-span-7 space-y-10 md:pt-4">
            
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-normal text-stone-900">Verify everything.</h3>
              <p className="font-sans text-stone-500 font-light text-sm md:text-base leading-relaxed">
                Every listing we represent is independently inspected. We will not market a property we would not buy.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-normal text-stone-900">Edit the choice.</h3>
              <p className="font-sans text-stone-500 font-light text-sm md:text-base leading-relaxed">
                We present three to five residences against a brief, not thirty. The shortlist is the work.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-normal text-stone-900">Hold the line.</h3>
              <p className="font-sans text-stone-500 font-light text-sm md:text-base leading-relaxed">
                We do not negotiate against our own client. Our fee is paid on completion, by one side only.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: TEAM MATRIX CARDS (image_8b2da1.png) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Aurelia Sant */}
          <div className="rounded-xl bg-[#FAF7F2] border border-[#ECE6DC] p-6 space-y-4 hover:shadow-sm transition-shadow duration-300 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-normal text-stone-900 tracking-tight">Aurelia Sant</h3>
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#A48463] font-bold block">
                Founder & Principal
              </span>
            </div>
            <p className="font-sans text-stone-500 font-light text-sm leading-relaxed pt-2">
              Twenty-two years in Dubai residential. Previously head of private clients at a London brokerage.
            </p>
          </div>

          {/* Card 2: Faisal Al Rashid */}
          <div className="rounded-xl bg-[#FAF7F2] border border-[#ECE6DC] p-6 space-y-4 hover:shadow-sm transition-shadow duration-300 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-normal text-stone-900 tracking-tight">Faisal Al Rashid</h3>
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#A48463] font-bold block">
                Director, Sales
              </span>
            </div>
            <p className="font-sans text-stone-500 font-light text-sm leading-relaxed pt-2">
              Twelve years representing Emirates Hills, Palm Jumeirah, and Bluewaters. Native Arabic speaker.
            </p>
          </div>

          {/* Card 3: Marta Vidal */}
          <div className="rounded-xl bg-[#FAF7F2] border border-[#ECE6DC] p-6 space-y-4 hover:shadow-sm transition-shadow duration-300 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-normal text-stone-900 tracking-tight">Marta Vidal</h3>
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#A48463] font-bold block">
                Director, Leasing
              </span>
            </div>
            <p className="font-sans text-stone-500 font-light text-sm leading-relaxed pt-2">
              Manages the long-term tenancy portfolio for our international owners. Previously Brussels-based.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}