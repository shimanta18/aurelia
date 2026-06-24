'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  priceDisplay: string;
  status: string;
  imageUrl?: string;
  specs?: {
    beds?: number;
    baths?: number;
    sqft?: number;
  };
}

export default function ExploreCollection(): React.JSX.Element {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('Any listing');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('Newest first');

  // Initial Fetch Chain from Backend
  useEffect(() => {
    const fetchExploreData = async () => {
      try {
        setLoading(true);
        setError(null);

       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL }/properties`);
        const textData = await res.text();

        if (!res.ok) {
          throw new Error(`Server responded with status code ${res.status}`);
        }

        if (textData.trim().startsWith('<!DOCTYPE')) {
          throw new Error('Route structural mismatch. Received HTML instead of JSON.');
        }

        const data = JSON.parse(textData);
        const parsedArray = Array.isArray(data) ? data : (data.data || data.items || []);
        
        setAllProperties(parsedArray);
        setFilteredProperties(parsedArray);
      } catch (err: any) {
        console.error('Explore Fetch Crash Interception:', err);
        setError(err.message || 'Communication failure with asset storage pipeline.');
      } finally {
        setLoading(false);
      }
    };

    fetchExploreData();
  }, []);

  // Real-Time Filtering Logic Matrix
  useEffect(() => {
    let result = [...allProperties];

    if (search.trim() !== '') {
      const term = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(term) ||
          p.location?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'Any listing') {
      const targetStatus = statusFilter.toUpperCase() === 'FOR SALE' ? 'FOR SALE' : 'RENT';
      result = result.filter((p) => p.status?.toUpperCase() === targetStatus);
    }

    if (minPrice !== '') {
      result = result.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice !== '') {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (sortOrder === 'Newest first') {
      result.sort((a, b) => b._id.localeCompare(a._id));
    } else if (sortOrder === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProperties(result);
  }, [search, statusFilter, minPrice, maxPrice, sortOrder, allProperties]);

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('Any listing');
    setMinPrice('');
    setMaxPrice('');
    setSortOrder('Newest first');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        <div className="h-8 bg-stone-200 rounded w-1/4 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-stone-200/60 rounded-xl h-80 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      {/* Title Header Block */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-sans tracking-widest text-stone-400 font-bold">Listings</span>
        <h1 className="font-serif text-4xl font-normal text-stone-900 tracking-tight">Explore the collection</h1>
        <p className="text-sm font-sans font-light text-stone-500 max-w-2xl">
          Filter by neighbourhood, price, and bedrooms. Every listing is independently verified by the studio.
        </p>
      </div>

      {/* Filter panel Container */}
      <div className="bg-[#FAF7F2] p-5 rounded-xl border border-stone-200/60 shadow-sm space-y-4 text-xs font-sans text-stone-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search title or neighbourhood..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]"
            >
              <option value="Any listing">Any listing</option>
              <option value="For Sale">For Sale</option>
              <option value="Rent">Rent</option>
            </select>
          </div>

          <div>
            <input
              type="number"
              placeholder="Min AED"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]"
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Max AED"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]"
            />
          </div>

          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-200 rounded-lg outline-none focus:border-[#A48463]"
            >
              <option value="Newest first">Newest first</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-stone-200/40">
          <span className="text-stone-400 font-light font-sans text-xs">
            Showing {filteredProperties.length} residences
          </span>
          <button
            onClick={resetFilters}
            className="text-[#A48463] hover:text-[#8C6F51] font-medium transition-colors cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* Main Render Grid Array Block */}
      {error ? (
        <div className="p-4 text-xs bg-rose-50 border border-rose-200/60 text-rose-800 rounded-lg font-sans">
          {error}
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-16 text-stone-400 font-light text-sm bg-stone-50/50 rounded-xl border border-dashed border-stone-200">
          No active listings matching your selection matrix.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            /* 2. Wrapped each explore grid item card inside a Next.js Link dynamic path wrapper */
            <Link 
              href={`/explore/${property._id}`}
              key={property._id}
              className="group block cursor-pointer"
            >
              <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-stone-100 flex flex-col justify-between h-full hover:shadow-md transition-all duration-200">
                <div>
                  <div className="h-48 w-full bg-stone-100 overflow-hidden relative">
                    <img
                      src={property.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5 text-[9px] font-sans font-bold uppercase tracking-wider">
                      <span className="bg-white/90 text-stone-800 px-2 py-0.5 rounded shadow-sm">
                        {property.status === 'RENT' ? 'For Rent' : 'For Sale'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <h3 className="font-serif text-lg text-stone-900 line-clamp-1 group-hover:text-[#A48463] transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-stone-500 text-xs font-sans tracking-wide">{property.location}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <p className="font-serif font-medium text-base text-[#A48463]">
                    {property.priceDisplay || `AED ${property.price.toLocaleString()}`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}