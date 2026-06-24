'use client';

import { useEffect, useState } from 'react';
//  Import Next.js Link component for client-side routing
import Link from 'next/link';

interface Property {
  _id: string;
  title: string;
  location: string;
  priceDisplay: string;
  imageUrl: string;
}

export default function FeaturedResidences() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(null);

   fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/properties?limit=4`)
      .then(async (res) => {
        const textData = await res.text();

        if (!res.ok) {
          throw new Error(`Server returned HTTP code ${res.status}`);
        }

        if (textData.trim().startsWith('<!DOCTYPE')) {
          console.error('❌ Received HTML page instead of JSON payload text:', textData);
          throw new Error('Backend route misconfiguration. Server returned an HTML page.');
        }

        return JSON.parse(textData);
      })
      .then((data) => {
        const actualArray = Array.isArray(data) ? data : (data.data || data.items || []);
        setProperties(actualArray.slice(0, 4));
      })
      .catch((err) => {
        console.error('Error fetching landing page properties:', err);
        setErrorMessage(err.message || 'Failed to connect to backend api portfolio.');
        setProperties([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-stone-200/60 rounded-xl h-80 w-full" />
        ))}
      </div>
    );
  }

  const safeProperties = Array.isArray(properties) ? properties : [];

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-6">
      {errorMessage && (
        <div className="p-3 text-xs rounded-lg border bg-amber-50 border-amber-200 text-amber-800 font-sans">
           <strong>Handshake Notice:</strong> {errorMessage} (Check backend routing definition order in index.js)
        </div>
      )}

      {safeProperties.length === 0 ? (
        <div className="text-center py-12 text-stone-400 font-light text-sm">
          No active listings found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeProperties.map((property) => (
            /* 2. Wrapped the card item in a dynamic Link targeting your [id] layout directory structure */
            <Link 
              href={`/explore/${property._id}`} 
              key={property._id}
              className="group block cursor-pointer"
            >
              <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-stone-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-200">
                <div>
                  <div className="h-48 w-full bg-stone-100 overflow-hidden relative">
                    <img 
                      src={property.imageUrl } 
                      alt={property.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" 
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif text-lg text-stone-900 line-clamp-1">{property.title}</h3>
                    <p className="text-stone-500 text-xs font-sans tracking-wide">{property.location}</p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <p className="font-serif font-medium text-base text-[#A48463]">{property.priceDisplay || 'Price Upon Request'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}