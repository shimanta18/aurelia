'use client';

import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditItemPage({ params }: PageProps): React.JSX.Element {
  const router = useRouter();
  const { id } = use(params);

  // Added imageUrl to initialization state mapping matrix
  const [form, setForm] = useState({ title: '', price: '', location: '', status: 'Available', imageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/items/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          const targetItem = data.item || data;
          setForm({
            title: targetItem.title || '',
            price: targetItem.price?.toString() || '',
            location: targetItem.location || '',
            status: targetItem.status || 'Available',
            imageUrl: targetItem.imageUrl || '', // Binds historical imageUrl field state mapping
          });
        } else {
          setMessage({ type: 'error', text: 'Unable to retrieve asset specifications.' });
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed connecting with historical data node.' });
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/items/update/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          location: form.location,
          status: form.status,
          imageUrl: form.imageUrl, // Commits modified image links to storage schema pipeline
        }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Asset parameters rewritten cleanly.' });
        setTimeout(() => router.push('/dashboard/my-items'), 1500);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.message || 'Updates rejected by ledger node.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network handshake timed out during update execution.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm font-sans text-stone-400 p-4 animate-pulse">De-serializing asset dataset...</div>;
  }

  return (
    <div className="space-y-8 w-full max-w-2xl bg-white p-6 rounded-xl border border-stone-200/60 shadow-sm">
      <div>
        <h1 className="font-serif text-3xl font-normal text-stone-900 tracking-tight">Modify Asset Parameters</h1>
        <p className="text-sm font-sans font-light text-stone-500 mt-1">Alter current system tracking factors for listing configuration node key: <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-600 text-xs font-mono">{id}</code></p>
      </div>

      {message && (
        <div className={`p-4 text-xs tracking-wide rounded-lg font-sans border ${
          message.type === 'success' ? 'bg-emerald-50 border-emerald-200/60 text-emerald-800' : 'bg-rose-50 border-rose-200/60 text-rose-800'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 font-sans text-sm text-stone-700">
        <div>
          <label className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase block mb-1">Property Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full p-2.5 bg-[#FAF7F2] border border-stone-200 rounded-lg outline-none focus:border-[#A48463]" required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase block mb-1">Valuation Price (USD)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full p-2.5 bg-[#FAF7F2] border border-stone-200 rounded-lg outline-none focus:border-[#A48463]" required />
          </div>
          <div>
            <label className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase block mb-1">Market Availability Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full p-2.5 bg-[#FAF7F2] border border-stone-200 rounded-lg outline-none focus:border-[#A48463]">
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase block mb-1">Geographic Location</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} className="w-full p-2.5 bg-[#FAF7F2] border border-stone-200 rounded-lg outline-none focus:border-[#A48463]" required />
        </div>

        {/* ATTACHED PHOTO URL INPUT BLOCK FIELD */}
        <div>
          <label className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase block mb-1">Property Photo Image Link (URL)</label>
          <input 
            type="url" 
            name="imageUrl" 
            value={form.imageUrl} 
            onChange={handleChange} 
            className="w-full p-2.5 bg-[#FAF7F2] border border-stone-200 rounded-lg outline-none focus:border-[#A48463] font-mono text-xs text-stone-800" 
            placeholder="e.g., https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
            required 
          />
          <p className="text-[10px] text-stone-400 font-light mt-1">You can override or preserve this online hosted storage address asset string.</p>
        </div>

        <div className="pt-2">
          <button type="submit" disabled={saving} className="bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium px-5 py-2.5 text-xs rounded-lg transition-colors duration-150 shadow-sm uppercase tracking-wider disabled:opacity-50">
            {saving ? 'Rewriting System parameters...' : 'Commit Variations'}
          </button>
        </div>
      </form>
    </div>
  );
}