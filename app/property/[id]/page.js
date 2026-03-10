// app/property/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { AlertCircle } from 'lucide-react';

// ─── Booking Full-Page Overlay ─────────────────────────────────────────────────
function BookingPopup({ property, onClose }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(5);
  const [children, setChildren] = useState(2);
  const [cabCount, setCabCount] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('');
  const [eventAdults, setEventAdults] = useState(5);
  const [eventChildren, setEventChildren] = useState(2);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#fff',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      fontFamily: 'inherit',
    }}>
      {/* ── Main scrollable content ── */}
      <div style={{ flex: 1, maxWidth: 720, width: '100%', margin: '0 auto', padding: '40px 32px 0' }}>

        {/* Logo dot */}
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: '#7B73E4',
          marginBottom: 28,
        }} />

        {/* Back arrow */}
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, marginBottom: 36,
            display: 'flex', alignItems: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ── Dates ── */}
        <Section title="Dates">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 32, flex: 1 }}>
              <DateField label="Check-in" value={checkIn} onChange={setCheckIn} />
              <span style={{ marginTop: 6, color: '#bbb', fontSize: 18 }}>–</span>
              <DateField label="Check-in" value={checkOut} onChange={setCheckOut} />
            </div>
            <PillButton>Change dates</PillButton>
          </div>
          <Divider />
        </Section>

        {/* ── Guests ── */}
        <Section title="Guests">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 48 }}>
              <GuestCount value={adults} label="Adults" />
              <GuestCount value={children} label="Children" />
            </div>
            <PillButton>Change guests</PillButton>
          </div>
          <Divider />
        </Section>

        {/* ── Cab Service ── */}
        <Section title="Cab service">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <span style={{ fontSize: 14, color: '#555' }}>Add Cabs</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CircleButton onClick={() => setCabCount(Math.max(0, cabCount - 1))}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </CircleButton>
              <span style={{ minWidth: 22, textAlign: 'center', fontWeight: 600, fontSize: 15 }}>{cabCount}</span>
              <CircleButton onClick={() => setCabCount(cabCount + 1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </CircleButton>
            </div>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center',
            border: '1.5px solid #7B73E4',
            borderRadius: 10,
            padding: '12px 16px',
            gap: 12,
            marginBottom: 10,
          }}>
            <input
              type="text"
              placeholder="Enter your pickup location"
              value={pickupLocation}
              onChange={e => setPickupLocation(e.target.value)}
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: 14, color: '#333',
                background: 'transparent',
              }}
            />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#7B73E4', flexShrink: 0 }}>
              <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{ fontSize: 12, color: '#999', margin: 0 }}>
            Estimated prices for the service will be shown during billing but are subject to change
          </p>
          <Divider />
        </Section>

        {/* ── Event Package ── */}
        <Section title="Event Package">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 48 }}>
              <GuestCount value={eventAdults} label="Adults" />
              <GuestCount value={eventChildren} label="Children" />
            </div>
            <PillButton>Change dates</PillButton>
          </div>
          <div style={{ height: 48 }} />
        </Section>
      </div>

      {/* ── Footer ── */}
      <footer style={{
        background: '#7B73E4',
        padding: '36px 0 28px',
        marginTop: 'auto',
        width: '100%',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 24,
          }}>
            {['Subtitle', 'Subtitle', 'Subtitle'].map((s, i) => (
              <div key={i}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: '0 0 8px' }}>{s}</p>
                {['Link', 'Link', 'Link'].map((l, j) => (
                  <p key={j} style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, margin: '4px 0', cursor: 'pointer' }}>{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0 }}>Eden's Home Pvt. Ltd.</p>
          </div>
        </div>
      </footer>

      {/* ── Floating CTA ── */}
      <button
        onClick={() => alert('Proceeding to payment…')}
        style={{
          position: 'fixed',
          right: 40,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#7B73E4',
          color: '#fff',
          border: 'none',
          borderRadius: 999,
          padding: '16px 26px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 6px 28px rgba(123,115,228,0.5)',
          whiteSpace: 'nowrap',
        }}
      >
        See bill &amp; proceed to payment
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

// ─── Small helper components (used only inside modal) ─────────────────────────
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', margin: '0 0 16px' }}>{title}</h2>
      {children}
    </div>
  );
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '20px 0' }} />;
}

function DateField({ label, value, onChange }) {
  return (
    <div>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#111', margin: '0 0 2px' }}>{label}</p>
      <input
        type="text"
        placeholder="MM/DD/YY"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          border: 'none', outline: 'none',
          fontSize: 13, color: '#555',
          background: 'transparent',
          width: 80,
          padding: 0,
        }}
      />
    </div>
  );
}

function GuestCount({ value, label }) {
  return (
    <div>
      <p style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: '0 0 2px' }}>{value}</p>
      <p style={{ fontSize: 13, color: '#777', margin: 0 }}>{label}</p>
    </div>
  );
}

function PillButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#7B73E4',
        color: '#fff',
        border: 'none',
        borderRadius: 999,
        padding: '8px 18px',
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

function CircleButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 28, height: 28,
        borderRadius: '50%',
        border: '1.5px solid #ccc',
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        color: '#333',
      }}
    >
      {children}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);

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
      {/* Booking Popup — rendered at root level so it overlays everything */}
      {showBookingPopup && (
        <BookingPopup
          property={property}
          onClose={() => setShowBookingPopup(false)}
        />
      )}

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

        {/* Right Column - Booking Card — clicking opens the popup */}
        <div className="right-column">
          <div
            className="booking-card"
            onClick={() => setShowBookingPopup(true)}
            style={{ cursor: 'pointer' }}
          >
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
                    <input type="text" placeholder="Add date" readOnly />
                  </div>
                  <div className="date-input">
                    <label>CHECK-OUT</label>
                    <input type="text" placeholder="Add date" readOnly />
                  </div>
                </div>
              </div>

              <div className="guest-selector">
                <label>GUESTS</label>
                <select onClick={e => e.stopPropagation()}>
                  {[...Array(property.guests)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} guest{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="reserve-button"
                onClick={e => { e.stopPropagation(); setShowBookingPopup(true); }}
              >
                Reserve
              </button>

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