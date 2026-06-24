'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface PropertyRecord {
  id: string;
  title: string;
  location: string;
  price: string;
  numericPrice: number;
  status: 'FOR SALE' | 'RENT' | 'SOLD';
}

export default function ManageItemsPage(): React.JSX.Element {
  const router = useRouter();
  const [items, setItems] = useState<PropertyRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);

  // Form States for Creating inline - Added imageUrl here
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({ title: '', price: '', location: '', status: 'FOR SALE', imageUrl: '' });
  const [formSaving, setFormSaving] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const loadPropertiesData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/items/my-items', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (res.ok) {
          const json = await res.json();
          
          // 1. SAFELY extract the array no matter how the backend wraps it
          let rawItems = [];
          if (json && Array.isArray(json.data)) {
            rawItems = json.data;
          } else if (json && Array.isArray(json.items)) {
            rawItems = json.items;
          } else if (Array.isArray(json)) {
            rawItems = json;
          }

          // 2. Map the array elements safely
          const mappedItems: PropertyRecord[] = rawItems.map((item: any) => ({
            id: item._id || item.id,
            title: item.title || 'Untitled Property',
            location: item.location || 'Unknown Location',
            price: item.priceDisplay || (item.price ? `AED ${(item.price / 1000000).toFixed(1)}M` : 'Price on Application'),
            numericPrice: Number(item.price) || 0,
            status: parseStatus(item.status)
          }));
          
          setItems(mappedItems);
        } else {
          console.warn('Backend endpoint responded with error. Utilizing fallback view matrix.');
          loadMockFallback();
        }
      } catch (err) {
        console.warn('Database network node connection timeout. Rendering fallback variables.');
        loadMockFallback();
      } finally {
        setLoading(false);
      }
    };

    const parseStatus = (status: string): 'FOR SALE' | 'RENT' | 'SOLD' => {
      if (!status) return 'FOR SALE';
      const upper = String(status).toUpperCase();
      if (upper === 'AVAILABLE' || upper === 'FOR SALE') return 'FOR SALE';
      if (upper === 'PENDING' || upper === 'RENT') return 'RENT';
      return 'SOLD';
    };

    const loadMockFallback = () => {
      setItems([
        { id: '1', title: 'Signature Villa on Palm Jumeirah', location: 'Palm Jumeirah', price: 'AED 28.5M', numericPrice: 28500000, status: 'FOR SALE' },
        { id: '2', title: 'Sky Penthouse, Burj Residences', location: 'Downtown Dubai', price: 'AED 19.25M', numericPrice: 19250000, status: 'FOR SALE' },
        { id: '3', title: 'Grand Mansion in Emirates Hills', location: 'Emirates Hills', price: 'AED 78.0M', numericPrice: 78000000, status: 'FOR SALE' },
        { id: '4', title: 'Beachfront Duplex on The Walk', location: 'JBR', price: 'AED 11.5M', numericPrice: 11500000, status: 'SOLD' },
      ]);
    };

    loadPropertiesData();
  }, []);

  // Filter & Sort handlers
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    return sortOrder === 'asc' ? a.numericPrice - b.numericPrice : b.numericPrice - a.numericPrice;
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    setFormMessage(null);

    const formattedPriceDisplay = `AED ${(Number(form.price) / 1000000).toFixed(1)}M`;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/properties/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          priceDisplay: formattedPriceDisplay,
          location: form.location,
          status: form.status === 'FOR SALE' ? 'Available' : form.status === 'RENT' ? 'Pending' : 'Sold',
          imageUrl: form.imageUrl, // Added imageUrl to payload schema
          description: 'Luxury residential asset profile registry entry.'
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setFormMessage({ type: 'success', text: 'Asset registered successfully.' });
        
        const responseData = json.data || json.item || json;
        const createdId = responseData._id || responseData.id || Date.now().toString();
        
        setItems([
          {
            id: createdId,
            title: form.title,
            location: form.location,
            price: formattedPriceDisplay,
            numericPrice: Number(form.price),
            status: form.status as 'FOR SALE' | 'RENT' | 'SOLD',
          },
          ...items
        ]);

        setForm({ title: '', price: '', location: '', status: 'FOR SALE', imageUrl: '' });
        setTimeout(() => {
          setShowCreateForm(false);
          setFormMessage(null);
        }, 1500);
      } else {
        setFormMessage({ type: 'error', text: json.message || 'Verification rejected.' });
      }
    } catch (err) {
      setFormMessage({ type: 'error', text: 'Database synchronization timeout.' });
    } finally {
      setFormSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this estate listing record?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok || res.status === 404) {
        setItems(items.filter(item => item.id !== id));
      }
    } catch (err) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#A48463] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-normal text-stone-900 tracking-tight">Manage Items</h1>
          <p className="text-sm font-sans font-light text-stone-500 mt-1">Modify, audit, or add properties directly inside your network indexes.</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-[#A48463] hover:bg-[#8C6F51] text-[#FAF7F2] font-medium px-4 py-2 text-xs rounded-lg transition-colors duration-150 shadow-sm uppercase tracking-wider"
        >
          {showCreateForm ? 'Close Form' : '+ Add New Item'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#A48463]/30 shadow-sm space-y-4">
          <div className="border-b border-stone-200/60 pb-2">
            <h3 className="font-serif text-base text-stone-900 font-medium">Initialize Property Credentials</h3>
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
                <label className="block font-semibold text-stone-400 uppercase mb-1">Title Name</label>
                <input type="text" name="title" value={form.title} onChange={handleFormChange} className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]" required />
              </div>
              <div>
                <label className="block font-semibold text-stone-400 uppercase mb-1">Valuation Price (Numeric)</label>
                <input type="number" name="price" value={form.price} onChange={handleFormChange} placeholder="e.g. 15000000" className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]" required />
              </div>
              <div>
                <label className="block font-semibold text-stone-400 uppercase mb-1">Location / Sector</label>
                <input type="text" name="location" value={form.location} onChange={handleFormChange} className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]" required />
              </div>
              <div>
                <label className="block font-semibold text-stone-400 uppercase mb-1">Listing Context Status</label>
                <select name="status" value={form.status} onChange={handleFormChange} className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]">
                  <option value="FOR SALE">FOR SALE</option>
                  <option value="RENT">RENT</option>
                  <option value="SOLD">SOLD</option>
                </select>
              </div>
            </div>

            {/* INTEGRATED PHOTO URL INPUT BLOCK */}
            <div>
              <label className="block font-semibold text-stone-400 uppercase mb-1">Property Photo Image Link (URL)</label>
              <input 
                type="url" 
                name="imageUrl" 
                value={form.imageUrl} 
                onChange={handleFormChange} 
                placeholder="e.g., https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
                className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463] font-mono" 
                required 
              />
              <p className="text-[10px] text-stone-400 font-light mt-1 pl-0.5">Paste a hosted image web link here to render this listing cover inside your grid matrix pages.</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button type="submit" disabled={formSaving} className="bg-stone-900 text-stone-100 font-medium px-5 py-2 text-xs rounded-lg hover:bg-stone-800 uppercase tracking-wider transition-colors">
                {formSaving ? 'Registering...' : 'Save Directly to Table'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-stone-200/60 shadow-sm">
        <input
          type="text"
          placeholder="Search by title or sector..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 text-sm font-sans rounded-lg border border-stone-200 focus:outline-none focus:border-[#A48463] bg-[#FAF7F2]"
        />
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="w-full sm:w-auto px-4 py-2 text-sm font-sans font-medium text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors"
        >
          Sort by Price: {sortOrder === 'asc' ? 'Low to High ↑' : 'High to Low ↓'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200/60 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/70 border-b border-stone-100">
                <th className="p-4 text-xs font-sans font-semibold tracking-wider text-stone-400 uppercase">Residence Asset Profile</th>
                <th className="p-4 text-xs font-sans font-semibold tracking-wider text-stone-400 uppercase">Sector Location</th>
                <th className="p-4 text-xs font-sans font-semibold tracking-wider text-stone-400 uppercase">Valuation</th>
                <th className="p-4 text-xs font-sans font-semibold tracking-wider text-stone-400 uppercase">Availability</th>
                <th className="p-4 text-xs font-sans font-semibold tracking-wider text-stone-400 uppercase text-right">System Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans text-[14px]">
              {sortedItems.length > 0 ? (
                sortedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/40 transition-colors">
                    <td className="p-4 font-medium text-stone-900">{item.title}</td>
                    <td className="p-4 text-stone-500">{item.location}</td>
                    <td className="p-4 text-stone-800 font-medium">{item.price}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold tracking-wide rounded-full ${
                        item.status === 'SOLD' ? 'bg-stone-100 text-stone-500' : 
                        item.status === 'RENT' ? 'bg-amber-50 text-amber-800 border border-amber-200/40' : 
                        'bg-emerald-50 text-emerald-800 border border-emerald-200/40'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button 
                        onClick={() => router.push(`/dashboard/edit-item/${item.id}`)}
                        className="text-stone-400 hover:text-[#A48463] text-xs font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="text-stone-400 hover:text-red-600 text-xs font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-light text-stone-400">No properties match your active search terms.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}