// app/property-booking/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PropertyBooking() {
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const amenities = [
    'Pool',
    'Wi - Fi',
    'Air Conditioning',
    'Free Parking',
    'Kitchen',
    'Hot Tub',
    'TV',
    'Washer',
    'Dryer',
    'Heating'
  ];

  const keyFeatures = [
    'Infinity Swimming pool at rooftop',
    'Centrally Air-conditioned apartment',
    'Modern bathroom',
    'Fresh apartment with all new furniture',
    'Free high speed wifi connection',
    'Perfect for long term or a short term stay',
    '24*7 security available in the building',
    'Park for free inside the premises (secured by guards and security cameras).',
    'Super safe for solo travelling girls'
  ];

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

  return (
    <div className="property-booking-container pt-24">
      {/* Image Gallery Section */}
      <section className="image-gallery">
        <div className="gallery-grid">
          <div className="main-image">
            <Image 
              src="/property-1.jpg" 
              alt="Property main view"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="grid-images">
            <div className="grid-image">
              <Image src="/property-2.jpg" alt="Property view 2" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="grid-image">
              <Image src="/property-3.jpg" alt="Property view 3" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="grid-image">
              <Image src="/property-4.jpg" alt="Property view 4" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="grid-image">
              <Image src="/property-5.jpg" alt="Property view 5" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="content-container">
        <div className="left-column">
          {/* Property Header */}
          <div className="property-header">
            <h1>Title Of Property</h1>
            <h3>Location</h3>
            <div className="property-specs">
              <span>2 Guests</span>
              <span>1 Bedroom</span>
              <span>1 Bed</span>
              <span>1 Bathroom</span>
              <span>Pool</span>
              <span>Free Parking</span>
            </div>
          </div>

          <div className="divider"></div>

          {/* Key Features */}
          <section className="section">
            <h3 className="section-title">Key features</h3>
            <ul className="features-list">
              {keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <div className="divider"></div>

          {/* The Space */}
          <section className="section">
            <h3 className="section-title">The space</h3>
            <p className="space-description">
              Welcome to this another luxurious property by Tulip Homes situated on 12 floor. 
              It is a completely fresh apartment with all new furniture and linen. Garden patio 
              with flower plants makes it unique in class. The place is perfect for relaxing and 
              enjoying scenic view of city & Aravali range. Apartment is loaded with smart tv 
              (all applications works), a cozy double bed, big wardrobe with locker, 2 sofa chairs, 
              stylish coffee table, fridge, microvave, electric kettle, toaster, wifi & many more…
            </p>
            <button className="text-button">Read More</button>
          </section>

          <div className="divider"></div>

          {/* Amenities */}
          <section className="section">
            <h3 className="section-title">What the space offers</h3>
            <div className="amenities-list">
              {amenities.slice(0, showAllAmenities ? amenities.length : 6).map((amenity, index) => (
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
            <button 
              className="outlined-button"
              onClick={() => setShowAllAmenities(!showAllAmenities)}
            >
              {showAllAmenities ? 'Show Less' : `Show All X Amenities`}
            </button>
          </section>

          <div className="divider"></div>

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
                <span className="price">$XXX</span>
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
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                </select>
              </div>

              <button className="reserve-button">Reserve</button>

              <p className="charge-note">You won't be charged yet</p>

              <div className="price-details">
                <div className="price-row">
                  <span>$XXX x X nights</span>
                  <span>$XXX</span>
                </div>
                <div className="price-row">
                  <span>Cleaning fee</span>
                  <span>$XX</span>
                </div>
                <div className="price-row">
                  <span>Service fee</span>
                  <span>$XX</span>
                </div>
                <div className="divider-thin"></div>
                <div className="price-row total-row">
                  <span>Total</span>
                  <span>$XXX</span>
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