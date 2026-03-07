"use client"
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AlertCircle, Search } from 'lucide-react';
import Image from 'next/image';

const parseJSON = (val, fallback = []) => {
  if (Array.isArray(val)) return val;
  if (!val) return fallback;
  try { return JSON.parse(val); } catch { return fallback; }
};

export default function PropertiesListPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .is('deleted_at', null)
        .eq('status', 'Active')
        .order('priority_score', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const name = property.name ?? '';
    const address = property.address ?? '';
    const term = searchTerm.toLowerCase();
    return name.toLowerCase().includes(term) || address.toLowerCase().includes(term);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Properties</h1>
          <p className="text-gray-600">Discover your perfect stay with Eden's Home</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => {
              const images = parseJSON(property.images, []);
              const amenities = parseJSON(property.amenities, []);

              return (
                <a
                  key={property.id}
                  href={`/property/${property.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gray-200">
                    {images[0] ? (
                      <Image
                        src={images[0]}
                        alt={property.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image available
                      </div>
                    )}
                    {property.featured && (
                      <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    {property.premium && (
                      <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                        Premium
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{property.name}</h2>
                    <p className="text-gray-500 text-sm mb-1">{property.address}{property.landmark ? ` · ${property.landmark}` : ''}</p>

                    <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-500">
                      <span>{property.type}</span>
                      <span>•</span>
                      <span>{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</span>
                      <span>•</span>
                      <span>Up to {property.max_guests} guests</span>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{property.description}</p>

                    {/* Amenities */}
                    {amenities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                            {amenity}
                          </span>
                        ))}
                        {amenities.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                        <span className="text-2xl font-bold text-amber-700">
                          ₹{Number(property.base_price).toLocaleString('en-IN')}
                        </span>
                        <span className="text-gray-600 text-sm ml-1">/ night</span>
                      </div>
                      <button className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}