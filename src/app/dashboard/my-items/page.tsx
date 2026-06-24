'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Item {
  _id: string;
  title: string;
  price: number;
  priceDisplay?: string; 
  location: string;
  status: string;        
  imageUrl?: string;
}

export default function MyItemsPage(): React.JSX.Element {
  const router = useRouter();
  
  // Safety Guard: Initialize strictly as an empty array
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Inline Creation Form States
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [form, setForm] = useState({ title: '', price: '', location: '', status: 'Available', imageUrl: '' });
  const [formSaving, setFormSaving] = useState<boolean>(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Initial Fetch Data Hook
  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const token = localStorage.getItem('token');
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/items/my-items`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const textData = await res.text();

        if (res.ok && !textData.trim().startsWith('<!DOCTYPE')) {
          const data = JSON.parse(textData);
          const parsedItems = data.items || data.data || data;
          setItems(Array.isArray(parsedItems) ? parsedItems : []);
        } else {
          setError('Failed to pull listing registry.');
          setItems([]);
        }
      } catch (err) {
        setError('Communication failure with backend asset node.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    setFormMessage(null);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/items/create`, {
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

      const textData = await res.text();
      
      if (res.ok && !textData.trim().startsWith('<!DOCTYPE')) {
        const json = JSON.parse(textData);
        setFormMessage({ type: 'success', text: 'Asset registered successfully.' });
        
        // Grab the complete calculated item returned directly from your backend database container
        const savedItem = json.item || json.data || json;
        
        setItems((prevItems) => [savedItem, ...(Array.isArray(prevItems) ? prevItems : [])]);
        setForm({ title: '', price: '', location: '', status: 'Available', imageUrl: '' });

        setTimeout(() => {
          setShowCreateForm(false);
          setFormMessage(null);
        }, 1200);
      } else {
        setFormMessage({ type: 'error', text: 'Validation rejected or invalid endpoint structure encountered.' });
      }
    } catch (err) {
      setFormMessage({ type: 'error', text: 'Database synchronization timeout.' });
    } finally {
      setFormSaving(false);
    }
  };

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="space-y-8 w-full max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-normal text-stone-900 tracking-tight">My Assets</h1>
          <p className="text-sm font-sans font-light text-stone-500 mt-1">Manage, verify, and monitor your submitted properties and real estate assets.</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-[#A48463] hover:bg-[#8C6F51] text-[#FAF7F2] font-medium px-4 py-2 text-xs rounded-lg transition-colors duration-150 shadow-sm uppercase tracking-wider"
        >
          {showCreateForm ? 'Close Form' : '+ Add New Property'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#A48463]/30 shadow-sm space-y-4">
          <div className="border-b border-stone-200/60 pb-2">
            <h3 className="font-serif text-base text-stone-900 font-medium">Initialize Property Details</h3>
          </div>
          
          {formMessage && (
            <div className={`p-3 text-xs rounded-lg border ${
              formMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              {formMessage.text}
            </div>
          )}

          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-sans text-stone-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-400 uppercase mb-1">Property Title</label>
                <input type="text" name="title" value={form.title} onChange={handleFormChange} className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]" placeholder="e.g., Luxury Waterfront Villa" required />
              </div>
              <div>
                <label className="block font-semibold text-stone-400 uppercase mb-1">Valuation Price</label>
                <input type="number" name="price" value={form.price} onChange={handleFormChange} className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]" placeholder="e.g., 4500000" required />
              </div>
              <div>
                <label className="block font-semibold text-stone-400 uppercase mb-1">Location / District</label>
                <input type="text" name="location" value={form.location} onChange={handleFormChange} className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]" placeholder="e.g., Palm Jumeirah, Dubai" required />
              </div>
              <div>
                <label className="block font-semibold text-stone-400 uppercase mb-1">Availability Node</label>
                <select name="status" value={form.status} onChange={handleFormChange} className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]">
                  <option value="Available">Available (For Sale)</option>
                  <option value="Pending">Pending (Rent Node)</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-400 uppercase mb-1">Property Photo Image Link (URL)</label>
              <input 
                type="url" 
                name="imageUrl" 
                value={form.imageUrl} 
                onChange={handleFormChange} 
                className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463] font-mono placeholder-stone-300" 
                placeholder="https://images.unsplash.com/your-custom-image-path" 
                required 
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button type="submit" disabled={formSaving} className="bg-stone-900 text-stone-100 font-medium px-5 py-2 text-xs rounded-lg hover:bg-stone-800 uppercase tracking-wider transition-colors">
                {formSaving ? 'Registering Asset...' : 'Save Directly to Grid'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-sm font-sans text-stone-400 animate-pulse">Synchronizing portfolio database...</div>
      ) : error ? (
        <div className="p-4 text-xs bg-rose-50 border border-rose-200/60 text-rose-800 rounded-lg font-sans">{error}</div>
      ) : safeItems.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-stone-200/60 shadow-sm">
          <p className="text-sm font-sans text-stone-400">No active assets associated with this identity profile matrix.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safeItems.map((item) => {
            // Normalize backend statuses to handle UI styling cleanly
            const normalizedStatus = String(item.status).toUpperCase();
            const isForSale = normalizedStatus === 'FOR SALE' || normalizedStatus === 'AVAILABLE';
            const isRent = normalizedStatus === 'RENT' || normalizedStatus === 'PENDING';
            const isSold = normalizedStatus === 'SOLD';

            return (
              <div key={item._id} className="bg-white rounded-xl border border-stone-200/60 shadow-sm overflow-hidden flex flex-col justify-between">
                
                {item.imageUrl && (
                  <div className="w-full h-48 bg-stone-100 relative overflow-hidden border-b border-stone-100">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                )}

                <div className="p-5 space-y-3 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif text-lg font-normal text-stone-900 tracking-tight line-clamp-1">{item.title}</h3>
                    <span className={`shrink-0 px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider border ${
                      isForSale ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                      isRent ? 'bg-amber-50 border-amber-200 text-amber-800' :
                      'bg-stone-50 border-stone-200 text-stone-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-stone-400">{item.location}</p>
                </div>
                
                <div className="bg-stone-50 px-5 py-3.5 border-t border-stone-100 flex justify-between items-center">
                  <span className="font-serif text-base text-[#A48463] font-medium">
                    {/* Prioritizes the backend computed string (e.g. AED 28.5M) over raw inputs */}
                    {item.priceDisplay ? item.priceDisplay : `$${Number(item.price).toLocaleString()}`}
                  </span>
                  <button 
                    onClick={() => router.push(`/dashboard/edit-item/${item._id}`)} 
                    className="text-xs text-stone-600 hover:text-stone-900 font-sans font-medium transition-colors"
                  >
                    Manage Asset
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}