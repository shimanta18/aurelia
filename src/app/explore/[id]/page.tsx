'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Property {
  _id: string;
  title: string;
  location: string;
  priceDisplay: string;
  imageUrl: string;
  beds?: number;
  baths?: number;
  area?: string;
  description?: string;
  features?: string[];
  reference?: string;
  type?: string;
  listed?: string;
}

export default function PropertyDetailsPage(): React.JSX.Element {
  const params = useParams();
  const id = params?.id; // Grabs the specific ID from the URL

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/properties/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch the property details.');
        return res.json();
      })
      .then((data) => {
        setProperty(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="font-sans text-stone-400 animate-pulse">Loading residence portfolio...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center space-y-4">
        <p className="font-sans text-stone-500">Could not find this listing.</p>
        <Link href="/explore" className="text-sm text-[#A48463] underline">Return to Explore</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-stone-900 selection:bg-[#ECE6DC] pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* BACK NAVIGATION */}
        <div className="mb-6">
          <Link 
            href="/explore" 
            className="inline-flex items-center space-x-2 text-stone-500 hover:text-stone-900 font-sans text-sm font-light transition-colors"
          >
            <span>←</span>
            <span>Back to listings</span>
          </Link>
        </div>

        {/* GALLERY GRID ROW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
          {/* Real Dynamic Image */}
          <div className="md:col-span-9 rounded-xl overflow-hidden bg-stone-200 border border-[#ECE6DC] aspect-[16/8]">
            <img 
              src={property.imageUrl || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-3 rounded-xl border border-dashed border-[#D9CFC1] bg-[#FAF7F2] flex items-center justify-center p-6 text-center">
            <p className="font-sans text-sm font-light text-stone-400 max-w-[140px]">
              More photography on request
            </p>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="font-sans text-[11px] font-light text-stone-600 border border-[#ECE6DC] rounded-md px-2 py-0.5">
                  {property.type || 'Residence'}
                </span>
                <span className="font-sans text-[11px] font-light text-stone-600 border border-[#ECE6DC] rounded-md px-2 py-0.5">
                  Active
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 tracking-tight leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center space-x-1.5 text-stone-500 font-sans text-sm font-light">
                <span className="text-[#A48463]">📍</span>
                <span>{property.location}</span>
              </div>
            </div>

            {/* BEDS / BATHS / AREA MATRIX PANEL */}
            <div className="bg-[#FAF7F2] border border-[#ECE6DC] rounded-xl px-8 py-6 grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-sans tracking-widest text-stone-400 font-medium">Beds</p>
                <span className="font-serif text-2xl font-light">{property.beds || '—'}</span>
              </div>
              
              <div className="space-y-1 border-x border-[#ECE6DC]">
                <p className="text-[10px] uppercase font-sans tracking-widest text-stone-400 font-medium">Baths</p>
                <span className="font-serif text-2xl font-light">{property.baths || '—'}</span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase font-sans tracking-widest text-stone-400 font-medium">Area</p>
                <div className="flex items-center justify-center space-x-1 text-stone-800">
                  <span className="font-serif text-2xl font-light">{property.area || '—'}</span>
                  {property.area && <span className="font-sans text-xs text-stone-400 self-end mb-1">ft²</span>}
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-stone-900">About this residence</h3>
              <p className="font-sans text-stone-600 font-light text-base leading-relaxed">
                {property.description || 'No custom description provided for this exclusive architectural layout.'}
              </p>
            </div>

            {/* INLINE FEATURES */}
            {property.features && property.features.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#ECE6DC]/60">
                <h3 className="font-serif text-2xl font-normal text-stone-900">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5 text-stone-700">
                      <span className="text-[#A48463] text-sm">✓</span>
                      <span className="font-sans text-sm font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* FLOATING ACTION SIDEBAR */}
          <div className="lg:col-span-4 bg-[#FAF7F2] border border-[#ECE6DC] rounded-xl p-6 shadow-sm space-y-6 lg:sticky lg:top-28">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-sans tracking-widest text-stone-400 font-bold block">
                Asking Price
              </span>
              <p className="font-serif text-3xl font-normal text-stone-900">
                {property.priceDisplay || 'Price Upon Request'}
              </p>
            </div>

            <div className="space-y-3">
              <a 
                href="tel:+97144000000"
                className="w-full flex items-center justify-center space-x-2 bg-[#121110] text-[#FAF7F2] font-sans text-sm font-medium py-3 rounded-lg hover:bg-stone-800 transition-all text-center"
              >
                <span>📞</span>
                <span>+971 4 400 0000</span>
              </a>

              <Link 
                href="/contact"
                className="w-full flex items-center justify-center space-x-2 bg-transparent text-stone-800 border border-[#ECE6DC] hover:bg-[#ECE6DC]/30 font-sans text-sm font-medium py-3 rounded-lg transition-all text-center"
              >
                <span>✉</span>
                <span>Request a viewing</span>
              </Link>
            </div>

            {/* METADATA TABLE */}
            <div className="pt-4 border-t border-[#ECE6DC] space-y-2.5 font-sans text-xs">
              <div className="flex justify-between items-center">
                <span className="text-stone-400 font-light">Reference</span>
                <span className="text-stone-800 font-medium tracking-wide">{property.reference || property._id.slice(-6).toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400 font-light">Type</span>
                <span className="text-stone-800 font-medium">{property.type || 'Villa'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400 font-light">Listed</span>
                <span className="text-stone-800 font-medium">{property.listed || 'June 2026'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}