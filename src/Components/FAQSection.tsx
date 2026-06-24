'use client';

import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Do I need to be a UAE resident to buy?',
    answer: 'No. Freehold ownership is available to all nationalities in designated zones across Dubai.'
  },
  {
    id: 2,
    question: 'What are the typical fees on a purchase?',
    answer: 'Dubai Land Department transfer is 4% of the purchase price plus AED 4,000 admin. Agency fees are 2% of the purchase price.'
  },
  {
    id: 3,
    question: 'Can you assist with mortgage introductions?',
    answer: 'Yes. We work with five lenders covering resident and non-resident facilities.'
  },
  {
    id: 4,
    question: 'How are off-plan launches handled?',
    answer: 'We attend developer previews on your behalf and only present launches we would consider for our own clients.'
  }
];

export default function FAQSection(): React.JSX.Element {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#FAF7F2] py-20 px-6 md:px-12">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Column Description Context */}
        <div className="md:col-span-4 flex flex-col justify-start">
          <span className="font-sans text-[11px] font-medium tracking-widest text-[#A48463] uppercase mb-3">
            Questions
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-stone-900 tracking-tight mb-4">
            Things buyers ask.
          </h2>
          <p className="font-sans text-[14px] font-light text-stone-500">
            If your question isn't here,{' '}
            <a href="/contact" className="underline underline-offset-4 hover:text-[#A48463] transition-colors">
              write to us
            </a>
            .
          </p>
        </div>

        {/* Right Column Interactive Accordion Elements Block */}
        <div className="md:col-span-8 divide-y divide-[#ECE6DC] border-t border-b border-[#ECE6DC]">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between text-left font-serif text-lg md:text-xl text-stone-900 font-normal focus:outline-none group"
                >
                  <span className="group-hover:text-[#A48463] transition-colors duration-200">
                    {item.question}
                  </span>
                  <svg
                    className={`w-4 h-4 text-stone-500 transform transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Collapsible Content Area */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-sans text-[14px] md:text-[15px] font-light text-stone-500 leading-relaxed max-w-3xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}