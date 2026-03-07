// app/property/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { AlertCircle } from 'lucide-react';

export default function PropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  useEffect(() => {
    fetchProperty();
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      setError('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
          <p className="mt-4 text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error Loading Property</p>
            <p className="text-sm mt-1">{error || 'Property not found'}</p>
            <a href="/stays" className="text-sm underline mt-2 inline-block">
              Back to stays
            </a>
          </div>
        </div>
      </div>
    );
  }

  const nearbyPlaces = [
    {
      name: 'Cafe Dolma',
      description: 'Eat tasty momos in a well lit space.',
      image: '/cafe-placeholder.jpg'
    },
    {
      name: 'Cafe Dolma',
      description: 'Eat tasty momos in a well lit space.',
      image: '/cafe-placeholder.jpg'
    },
    {
      name: 'Cafe Dolma',
      description: 'Eat tasty momos in a well lit space.',
      image: '/cafe-placeholder.jpg'
    }
  ];

  const thingsToKnow = [
    {
      title: 'Cancellation Policy',
      content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
    },
    {
      title: 'House rules',
      content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
    },
    {
      title: 'Safety & Privacy',
      content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
    }
  ];

  const testimonials = [
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'
    }
  ];

  // Get display images or use placeholders
  const displayImages = property.images && property.images.length > 0
    ? property.images
    : ['/property-1.jpg', '/property-2.jpg', '/property-3.jpg', '/property-4.jpg', '/property-5.jpg'];

  return (
    <div className="property-booking-container pt-24">
      {/* Image Gallery Section */}
      <section className="image-gallery">
        <div className="gallery-grid">
          <div className="main-image">
            <Image
              src={displayImages[0] || '/property-1.jpg'}
              alt={`${property.title} main view`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="grid-images">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="grid-image">
                <Image
                  src={displayImages[index] || `/property-${index + 1}.jpg`}
                  alt={`${property.title} view ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="content-container">
        <div className="left-column">
          {/* Property Header */}
          <div className="property-header">
            <h1>{property.title}</h1>
            <h3>{property.location}</h3>
            <div className="property-specs">
              <span>{property.guests} Guests</span>
              <span>{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
              <span>{property.beds} Bed{property.beds > 1 ? 's' : ''}</span>
              <span>{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
              {property.amenities && property.amenities.slice(0, 2).map((amenity, index) => (
                <span key={index}>{amenity}</span>
              ))}
            </div>
          </div>

          <div className="divider"></div>

          {/* Key Features */}
          {property.key_features && property.key_features.length > 0 && (
            <>
              <section className="section">
                <h3 className="section-title">Key features</h3>
                <ul className="features-list">
                  {property.key_features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </section>
              <div className="divider"></div>
            </>
          )}

          {/* The Space */}
          <section className="section">
            <h3 className="section-title">The space</h3>
            <p className="space-description">{property.description}</p>
          </section>

          <div className="divider"></div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <>
              <section className="section">
                <h3 className="section-title">What the space offers</h3>
                <div className="amenities-list">
                  {property.amenities.slice(0, showAllAmenities ? property.amenities.length : 6).map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <span className="amenity-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                {property.amenities.length > 6 && (
                  <button
                    className="outlined-button"
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                  >
                    {showAllAmenities ? 'Show Less' : `Show All ${property.amenities.length} Amenities`}
                  </button>
                )}
              </section>
              <div className="divider"></div>
            </>
          )}

          {/* Nearby */}
          <section className="section">
            <h3 className="section-title">What's near by</h3>
            <div className="nearby-cards">
              {nearbyPlaces.map((place, index) => (
                <div key={index} className="nearby-card">
                  <div className="card-image">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-content">
                    <h4>{place.name}</h4>
                    <p>{place.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="divider"></div>

          {/* Things to Know */}
          <section className="section">
            <h3 className="section-title">Things to know</h3>
            <div className="things-cards">
              {thingsToKnow.map((item, index) => (
                <div key={index} className="thing-item">
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                  <button className="text-button">Learn More</button>
                </div>
              ))}
            </div>
          </section>

          <div className="divider"></div>

          {/* Guest Counter */}
          <section className="section guest-section">
            <h3 className="section-title">This space has served</h3>
            <div className="guest-counter">0</div>
            <h3 className="section-title">guests</h3>
          </section>

          <div className="divider"></div>

          {/* Testimonials */}
          <section className="section">
            <div className="testimonials">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial">
                  <p>"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Booking Card */}
        <div className="right-column">
          <div className="booking-card" style={{
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            fontFamily: 'inherit',
            width: '100%',
            maxWidth: '320px',
          }}>
            {/* Cab services banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              border: '1.5px solid #d1d5db',
              borderRadius: '12px',
              margin: '16px',
              color: '#7c6af7',
              fontSize: '14px',
              fontWeight: '500',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c6af7" strokeWidth="1.8">
                <rect x="2" y="8" width="20" height="12" rx="2" />
                <path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2" />
                <circle cx="7" cy="20" r="1.5" fill="#7c6af7" />
                <circle cx="17" cy="20" r="1.5" fill="#7c6af7" />
                <path d="M2 13h20" />
              </svg>
              Cab services available
            </div>

            {/* Main booking form */}
            <div style={{ padding: '0 16px 16px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '16px',
              }}>
                Add dates for prices
              </h2>

              {/* Date inputs */}
              <div style={{
                border: '1.5px solid #d1d5db',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '12px',
              }}>
                <div style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid #e5e7eb',
                  cursor: 'pointer',
                }}>
                  <input
                    type="text"
                    placeholder="Add check-in and check-out dates"
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      fontSize: '14px',
                      color: '#6b7280',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                    readOnly
                  />
                </div>

                {/* Guests selector */}
                <div style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Add guests</span>
                  <select
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      fontSize: '14px',
                      color: '#374151',
                      cursor: 'pointer',
                      appearance: 'none',
                    }}
                  >
                    {property.guests && [...Array(property.guests)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1} guest{i > 0 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Check Availability button */}
              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  background: '#a89cf7',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  letterSpacing: '0.01em',
                  transition: 'background 0.2s',
                }}
                onMouseOver={e => e.target.style.background = '#9080f0'}
                onMouseOut={e => e.target.style.background = '#a89cf7'}
              >
                Check availability
              </button>

              {/* Footer link */}
              <p style={{
                textAlign: 'center',
                fontSize: '13px',
                color: '#6b7280',
                marginTop: '14px',
              }}>
                Any questions?{' '}
                <a
                  href="/contact"
                  style={{
                    color: '#7c6af7',
                    textDecoration: 'underline',
                    fontWeight: '500',
                  }}
                >
                  Contact us directly
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-columns">
            <div className="footer-column">
              <h4>Subtitle</h4>
              <ul>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Subtitle</h4>
              <ul>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Subtitle</h4>
              <ul>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Eden's Home Pvt. Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}