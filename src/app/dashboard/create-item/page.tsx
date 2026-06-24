'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function CreateItemPage(): React.JSX.Element {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', price: '', location: '', status: 'Available', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/items/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          location: form.location,
          status: form.status,
          imageUrl: form.imageUrl,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Asset registry initialized successfully.' });
        setTimeout(() => router.push('/dashboard/my-items'), 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Asset verification failed.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Communication timeout with core network node.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-stone-800 antialiased">
      {/* HEADER ROW BAR */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-sans text-3xl font-medium tracking-tight text-stone-900">My Assets</h1>
          <p className="text-sm font-sans font-light text-stone-500 mt-0.5">
            Manage, verify, and monitor your submitted properties and real estate assets.
          </p>
        </div>
        <button 
          type="button"
          onClick={() => router.back()}
          className="bg-[#B69574] hover:bg-[#A48463] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Close Form
        </button>
      </div>

      {message && (
        <div className={`p-4 mb-4 text-xs tracking-wide rounded-lg font-sans border ${
          message.type === 'success' ? 'bg-emerald-50 border-emerald-200/60 text-emerald-800' : 'bg-rose-50 border-rose-200/60 text-rose-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* STYLED CONTAINER CARD BLOCK */}
      <div className="bg-[#FCFAF7] border border-[#EFEBE4] rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="font-sans text-lg font-semibold tracking-tight text-stone-900">Initialize Property Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 font-sans text-xs">
          
          {/* ROW 1: TITLE & PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-wider text-stone-400 uppercase block">Property Title</label>
              <input 
                type="text" 
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                className="w-full p-3 bg-white border border-[#E5DFD5] rounded-xl outline-none focus:border-[#A48463] text-stone-800 placeholder-stone-300 transition-colors" 
                placeholder="e.g., Luxury Waterfront Villa" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-wider text-stone-400 uppercase block">Valuation Price (USD)</label>
              <input 
                type="number" 
                name="price" 
                value={form.price} 
                onChange={handleChange} 
                className="w-full p-3 bg-white border border-[#E5DFD5] rounded-xl outline-none focus:border-[#A48463] text-stone-800 placeholder-stone-300 transition-colors" 
                placeholder="e.g., 4500000" 
                required 
              />
            </div>
          </div>

          {/* ROW 2: LOCATION & MARKET AVAILABILITY STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-wider text-stone-400 uppercase block">Location / District</label>
              <input 
                type="text" 
                name="location" 
                value={form.location} 
                onChange={handleChange} 
                className="w-full p-3 bg-white border border-[#E5DFD5] rounded-xl outline-none focus:border-[#A48463] text-stone-800 placeholder-stone-300 transition-colors" 
                placeholder="e.g., Palm Jumeirah, Dubai" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-wider text-stone-400 uppercase block">Availability Node</label>
              <select 
                name="status" 
                value={form.status} 
                onChange={handleChange} 
                className="w-full p-3 bg-white border border-[#E5DFD5] rounded-xl outline-none focus:border-[#A48463] text-stone-800 h-[46px] transition-colors appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23444\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          {/* ROW 3: RE-FORCED PHOTO URL SECTION */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] font-bold tracking-wider text-stone-400 uppercase block">Property Photo Image Link (URL)</label>
            <input 
              type="url" 
              name="imageUrl" 
              value={form.imageUrl} 
              onChange={handleChange} 
              className="w-full p-3 bg-white border border-[#E5DFD5] rounded-xl outline-none focus:border-[#A48463] text-stone-800 placeholder-stone-300 font-mono transition-colors" 
              placeholder="e.g., https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
              required 
            />
            <p className="text-[10px] text-stone-400 font-light pl-0.5">
              Paste the web link address to your item's imagery to populate your showcase collection grids.
            </p>
          </div>

          {/* FOOTER ACTION ROW */}
          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-[#121110] hover:bg-stone-800 text-white font-sans text-xs font-semibold tracking-wider px-6 py-3.5 rounded-lg transition-all duration-150 shadow-sm uppercase disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Processing Registry...' : 'Save Directly To Grid'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}