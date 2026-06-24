'use client';

import React, { useState } from 'react';

export default function ContactPage(): React.JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your backend submit logic here
    console.log('Submitting message:', formData);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-stone-900 selection:bg-[#ECE6DC] flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: CONTACT DETAILS (image_8b34fd.png) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#A48463] font-bold block">
                Contact
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-stone-900 leading-tight">
                Write to the studio.
              </h1>
              <p className="font-sans text-stone-500 font-light text-sm md:text-base leading-relaxed">
                Tell us about the residence you are looking for, or the one you would like to represent. We reply within one working day.
              </p>
            </div>

            {/* Info Items */}
            <div className="space-y-5 pt-4 border-t border-[#ECE6DC]/60">
              {/* Address */}
              <div className="flex items-start space-x-3 text-stone-700">
                <svg className="w-5 h-5 text-[#A48463] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <div className="font-sans text-sm font-light leading-snug">
                  <p>Boulevard Plaza Tower 1, Floor 32</p>
                  <p>Downtown Dubai, UAE</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3 text-stone-700">
                <svg className="w-5 h-5 text-[#A48463] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622s.21-1.259 1.478-1.259h3.381c.57 0 1.06.36 1.233.901l.732 2.296a1.241 1.241 0 0 1-.417 1.347l-1.465 1.1c1.054 2.15 2.801 3.897 4.952 4.952l1.1-1.465a1.241 1.241 0 0 1 1.347-.417l2.296.732c.54.173.901.663.901 1.233v3.381c0 1.267-1.259 1.478-1.478 1.478-8.118 0-14.707-6.589-14.707-14.707Z" />
                </svg>
                <span className="font-sans text-sm font-light">+971 4 400 0000</span>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3 text-stone-700">
                <svg className="w-5 h-5 text-[#A48463] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className="font-sans text-sm font-light">studio@aurelia.ae</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE FORM CONTAINER (image_8b34fd.png) */}
          <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#ECE6DC] rounded-xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-sans text-sm font-medium text-stone-800">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#ECE6DC] focus:outline-none focus:border-[#A48463] focus:ring-1 focus:ring-[#A48463]/20 font-sans text-stone-800 font-light transition-all text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-sans text-sm font-medium text-stone-800">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#ECE6DC] focus:outline-none focus:border-[#A48463] focus:ring-1 focus:ring-[#A48463]/20 font-sans text-stone-800 font-light transition-all text-sm"
                  />
                </div>
              </div>

              {/* Row 2: Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block font-sans text-sm font-medium text-stone-800">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#ECE6DC] focus:outline-none focus:border-[#A48463] focus:ring-1 focus:ring-[#A48463]/20 font-sans text-stone-800 font-light transition-all text-sm"
                />
              </div>

              {/* Row 3: Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block font-sans text-sm font-medium text-stone-800">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#ECE6DC] focus:outline-none focus:border-[#A48463] focus:ring-1 focus:ring-[#A48463]/20 font-sans text-stone-800 font-light transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#121110] text-[#FAF7F2] font-sans text-sm font-medium px-6 py-3 rounded-lg hover:bg-stone-800 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Send message
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}

