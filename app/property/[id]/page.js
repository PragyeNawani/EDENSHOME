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
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
          <div className="booking-card">
            <div className="price-header">
              <div>
                <span className="price">₹{property.price}</span>
                <span className="per-night"> / night</span>
              </div>
            </div>

            <div className="booking-form">
              <div className="date-selector">
                <div className="date-input-wrapper">
                  <div className="date-input">
                    <label>CHECK-IN</label>
                    <input type="text" placeholder="Add date" />
                  </div>
                  <div className="date-input">
                    <label>CHECK-OUT</label>
                    <input type="text" placeholder="Add date" />
                  </div>
                </div>
              </div>

              <div className="guest-selector">
                <label>GUESTS</label>
                <select>
                  {[...Array(property.guests)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} guest{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <button className="reserve-button">Reserve</button>

              <p className="charge-note">You won't be charged yet</p>

              <div className="price-details">
                <div className="price-row">
                  <span>₹{property.price} x X nights</span>
                  <span>₹XXX</span>
                </div>
                <div className="price-row">
                  <span>Cleaning fee</span>
                  <span>₹XX</span>
                </div>
                <div className="price-row">
                  <span>Service fee</span>
                  <span>₹XX</span>
                </div>
                <div className="divider-thin"></div>
                <div className="price-row total-row">
                  <span>Total</span>
                  <span>₹XXX</span>
                </div>
              </div>
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