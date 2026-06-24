import React from 'react';
import { SERVICES_DATA } from '../Components/data/mockData';

// SVG Icon Component mapping to the fine luxury strokes of your design
const ServiceIcon = ({ type }: { type: string }) => {
  const baseSvgProps = {
    className: "w-6 h-6 text-[#A48463]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.2",
    viewBox: "0 0 24 24"
  };

  switch (type) {
    case 'sales':
      return (
        <svg {...baseSvgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12" />
        </svg>
      );
    case 'acquisition':
      return (
        <svg {...baseSvgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3M12 5.25a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5z" />
        </svg>
      );
    case 'leasing':
      return (
        <svg {...baseSvgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18M3 4.5h18A1.5 1.5 0 0 1 22.5 6v12a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 18V6A1.5 1.5 0 0 1 3 4.5z" />
        </svg>
      );
    case 'portfolio':
      return (
        <svg {...baseSvgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.151-.577 1.004-.577 1.154 0l1.24 4.733a1 1 0 0 0 .95.69h4.915c.605 0 .856.77.367 1.128l-3.976 2.888a1 1 0 0 0-.363 1.118l1.24 4.733c.15.576-.505 1.052-1.002.697l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.497.355-1.153-.121-1.002-.697l1.24-4.733a1 1 0 0 0-.362-1.118L2.03 10.05c-.49-.358-.238-1.128.367-1.128h4.915a1 1 0 0 0 .95-.69l1.24-4.733z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Services(): React.JSX.Element {
  return (
    <section className="w-full bg-[#FAF7F2] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Uppercase Overline */}
        <span className="font-sans text-[11px] tracking-[0.25em] text-[#A48463] uppercase block mb-4">
          Services
        </span>
        
        {/* Main Serif Header */}
        <h2 className="font-serif text-4xl md:text-5xl font-normal text-stone-900 tracking-tight mb-14">
          Four practices, one studio.
        </h2>

        {/* 4-Column Modern Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES_DATA.map((service) => (
            <div 
              key={service.id} 
              className="bg-[#FAF7F2] border border-[#ECE6DC] rounded-xl p-6 flex flex-col space-y-6 transition-all duration-300 hover:bg-white/60 hover:shadow-sm"
            >
              {/* Icon Frame Container */}
              <div className="w-10 h-10 flex items-center justify-start">
                <ServiceIcon type={service.iconType} />
              </div>

              {/* Text Layout Block */}
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-normal text-stone-900">
                  {service.title}
                </h3>
                <p className="font-sans text-[13px] text-stone-600 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}