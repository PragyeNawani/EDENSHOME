'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { MapPin, Users, Calendar, Search, ChevronRight, Star, Wifi, Car, Droplets, ChevronLeft } from 'lucide-react';

const parseJSON = (val, fallback = []) => {
  if (Array.isArray(val)) return val;
  if (!val) return fallback;
  try { return JSON.parse(val); } catch { return fallback; }
};

// ── Property Card (small, for horizontal scroll rows) ──────────────────────
function PropertyCardSmall({ property }) {
  const images = parseJSON(property.images, []);
  const amenities = parseJSON(property.amenities, []);

  return (
    <Link href={`/property/${property.id}`} className="property-card-small group">
      <div className="card-img-wrap">
        {images[0] ? (
          <Image src={images[0]} alt={property.name} fill style={{ objectFit: 'cover' }} className="card-img" />
        ) : (
          <div className="card-img-placeholder" />
        )}
        <div className="card-img-overlay" />
        {/* Star row */}
        <div className="card-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="star-icon" />
          ))}
        </div>
      </div>
      <div className="card-body">
        <p className="card-name">{property.name}</p>
        <p className="card-location">
          <MapPin className="loc-icon" />
          {property.address}{property.landmark ? `, ${property.landmark}` : ''}
        </p>
        <div className="card-meta">
          <span>{property.type}</span>
          <span className="dot">·</span>
          <span>{property.max_guests} guests</span>
          {amenities[0] && <><span className="dot">·</span><span>{amenities[0]}</span></>}
        </div>
        <p className="card-price">
          ₹{Number(property.base_price).toLocaleString('en-IN')}
          <span> for 2 nights</span>
        </p>
      </div>
    </Link>
  );
}

// ── Property Card (featured, larger) ──────────────────────────────────────
function PropertyCardFeatured({ property }) {
  const images = parseJSON(property.images, []);
  const amenities = parseJSON(property.amenities, []);

  return (
    <Link href={`/property/${property.id}`} className="featured-card group">
      <div className="featured-img-wrap">
        {images[0] ? (
          <Image src={images[0]} alt={property.name} fill style={{ objectFit: 'cover' }} className="featured-img" />
        ) : (
          <div className="card-img-placeholder" />
        )}
        <div className="featured-img-overlay" />
        <div className="featured-badges">
          {property.premium && <span className="badge badge-premium">Premium</span>}
          <span className="badge badge-type">{property.type}</span>
        </div>
        <div className="card-stars featured-stars">
          {[...Array(5)].map((_, i) => <Star key={i} className="star-icon" />)}
        </div>
      </div>
      <div className="featured-body">
        <p className="featured-name">{property.name}</p>
        <p className="card-location">
          <MapPin className="loc-icon" />
          {property.address}{property.landmark ? `, ${property.landmark}` : ''}
        </p>
        <div className="featured-amenities">
          <span className="feat-chip"><Users className="chip-icon" />{property.max_guests} guests</span>
          {amenities.slice(0, 2).map((a, i) => (
            <span key={i} className="feat-chip">
              {a === 'Wi-Fi' ? <Wifi className="chip-icon" /> : a === 'Parking' ? <Car className="chip-icon" /> : <Droplets className="chip-icon" />}
              {a}
            </span>
          ))}
        </div>
        <div className="featured-price-row">
          <div>
            <span className="featured-price">₹{Number(property.base_price).toLocaleString('en-IN')}</span>
            <span className="featured-per"> /night</span>
          </div>
          <span className="view-btn">View →</span>
        </div>
      </div>
    </Link>
  );
}

// ── Horizontal Scroll Row ──────────────────────────────────────────────────
function ScrollRow({ title, properties }) {
  const rowRef = useRef(null);
  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  if (!properties.length) return null;

  return (
    <section className="scroll-section">
      <div className="section-header">
        <h2 className="section-title">
          {title} <ChevronRight className="title-arrow" />
        </h2>
        <div className="scroll-btns">
          <button className="scroll-btn" onClick={() => scroll(-1)}><ChevronLeft className="w-4 h-4" /></button>
          <button className="scroll-btn" onClick={() => scroll(1)}><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="scroll-row" ref={rowRef}>
        {properties.map(p => <PropertyCardSmall key={p.id} property={p} />)}
      </div>
    </section>
  );
}

// ── Main Homepage ──────────────────────────────────────────────────────────
export default function HomePage() {
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .is('deleted_at', null)
        .eq('status', 'Active')
        .order('priority_score', { ascending: false });
      setAllProperties(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const featured = allProperties.filter(p => p.featured);
  const handpicked1 = allProperties.filter(p => !p.featured).slice(0, 8);
  const handpicked2 = allProperties.filter(p => p.premium).slice(0, 8);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('q', destination);
    if (guests) params.set('guests', guests);
    window.location.href = `/stays?${params.toString()}`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream: #f5f0e8;
          --warm-dark: #1a1510;
          --amber: #b5722a;
          --amber-light: #d4924a;
          --indigo-footer: #3b3fa8;
          --text-muted: #888;
          --card-radius: 12px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          color: var(--warm-dark);
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          height: 60vh;
          min-height: 420px;
          max-height: 680px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Full-bleed property photo background */
        .hero-bg-img {
          position: absolute; inset: 0;
          z-index: 0;
        }
        /* Subtle dark scrim so search bar pops */
        .hero-scrim {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.18);
          z-index: 1;
        }

        /* Search bar — single pill row matching screenshot */
        .search-bar {
          position: relative; z-index: 10;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-radius: 50px;
          display: flex;
          align-items: center;
          padding: 0 4px 0 0;
          gap: 0;
          box-shadow: 0 4px 32px rgba(0,0,0,0.28);
          width: min(580px, 90vw);
          height: 52px;
        }

        .search-pill-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 18px;
          cursor: pointer;
          height: 100%;
          background: transparent;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .search-pill-item input,
        .search-pill-item select {
          border: none; outline: none;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: var(--warm-dark);
          background: transparent;
          width: 100%;
          cursor: pointer;
        }
        .search-pill-item input::placeholder { color: #555; }
        .pill-icon { color: #555; flex-shrink: 0; width: 16px; height: 16px; }

        .pill-sep {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #bbb;
          flex-shrink: 0;
        }

        .search-icon-btn {
          background: none;
          border: none;
          padding: 0 16px 0 8px;
          cursor: pointer;
          display: flex; align-items: center;
          color: #333;
          flex-shrink: 0;
        }
        .search-icon-btn svg { width: 20px; height: 20px; }

        /* Find Stays label + arrow */
        .find-stays-label {
          position: relative; z-index: 10;
          margin-top: 18px;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.03em;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5);
          cursor: pointer;
          text-decoration: none;
        }
        .find-stays-arrow {
          width: 20px; height: 20px;
          border-right: 2px solid white;
          border-bottom: 2px solid white;
          transform: rotate(45deg);
          margin-top: -4px;
          animation: bounce-down 1.4s ease-in-out infinite;
        }
        @keyframes bounce-down {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(5px); }
        }



        /* ── PAGE BODY ── */
        .page-body {
          background: var(--cream);
          padding: 0 0 60px;
        }

        /* ── SCROLL SECTIONS ── */
        .scroll-section {
          padding: 40px 0 0;
          max-width: 1300px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .section-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 500;
          color: var(--warm-dark);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .title-arrow {
          width: 18px; height: 18px;
          color: var(--amber);
        }

        .scroll-btns { display: flex; gap: 8px; }
        .scroll-btn {
          background: white;
          border: 1px solid #ddd;
          border-radius: 50%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
          color: var(--warm-dark);
        }
        .scroll-btn:hover { border-color: var(--amber); color: var(--amber); }

        .scroll-row {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 12px;
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
        }
        .scroll-row::-webkit-scrollbar { display: none; }

        /* ── SMALL CARD ── */
        .property-card-small {
          flex: 0 0 220px;
          scroll-snap-align: start;
          border-radius: var(--card-radius);
          overflow: hidden;
          background: white;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .property-card-small:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.12);
        }

        .card-img-wrap {
          position: relative;
          height: 150px;
          background: #ccc;
          overflow: hidden;
        }
        .card-img { transition: transform 0.4s; }
        .property-card-small:hover .card-img { transform: scale(1.05); }
        .card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%);
        }
        .card-img-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #ddd 0%, #eee 100%);
        }

        .card-stars {
          position: absolute;
          bottom: 8px; left: 8px;
          display: flex; gap: 2px;
        }
        .star-icon {
          width: 10px; height: 10px;
          fill: #f5c842;
          color: #f5c842;
        }

        .card-body { padding: 12px 14px; }
        .card-name {
          font-weight: 500;
          font-size: 13px;
          color: var(--warm-dark);
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-location {
          display: flex; align-items: center; gap: 3px;
          font-size: 11px; color: var(--text-muted);
          margin-bottom: 5px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .loc-icon { width: 10px; height: 10px; flex-shrink: 0; }

        .card-meta {
          font-size: 11px; color: #aaa;
          display: flex; gap: 4px; align-items: center;
          white-space: nowrap; overflow: hidden;
          margin-bottom: 6px;
        }
        .dot { color: #ccc; }

        .card-price {
          font-size: 12px;
          font-weight: 600;
          color: var(--amber);
        }
        .card-price span { font-weight: 400; color: var(--text-muted); }

        /* ── FEATURED SECTION ── */
        .featured-section {
          max-width: 1300px;
          margin: 40px auto 0;
          padding: 0 24px;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 20px;
        }

        .featured-card {
          border-radius: 16px;
          overflow: hidden;
          background: white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: transform 0.25s, box-shadow 0.25s;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .featured-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.14);
        }

        .featured-img-wrap {
          position: relative;
          height: 220px;
          background: #ccc;
          overflow: hidden;
        }
        .featured-img { transition: transform 0.4s; }
        .featured-card:hover .featured-img { transform: scale(1.04); }
        .featured-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);
        }
        .featured-badges {
          position: absolute;
          top: 12px; left: 12px;
          display: flex; gap: 6px;
        }
        .badge {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .badge-premium { background: #7c3aed; color: white; }
        .badge-type { background: rgba(255,255,255,0.9); color: var(--warm-dark); }

        .featured-stars {
          position: absolute;
          bottom: 10px; left: 12px;
        }

        .featured-body { padding: 16px 18px; }
        .featured-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: var(--warm-dark);
          margin-bottom: 5px;
        }

        .featured-amenities {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin: 10px 0 14px;
        }
        .feat-chip {
          display: flex; align-items: center; gap: 4px;
          padding: 4px 10px;
          background: #faf6f0;
          border: 1px solid #ebe3d5;
          border-radius: 20px;
          font-size: 11px;
          color: #666;
        }
        .chip-icon { width: 10px; height: 10px; color: var(--amber); }

        .featured-price-row {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #f0e8dc;
        }
        .featured-price {
          font-size: 22px;
          font-weight: 700;
          color: var(--amber);
        }
        .featured-per { font-size: 12px; color: var(--text-muted); margin-left: 2px; }

        .view-btn {
          font-size: 12px;
          font-weight: 600;
          color: var(--amber);
          letter-spacing: 0.03em;
        }

        /* ── FOOTER ── */
        .home-footer {
          background: var(--indigo-footer);
          color: white;
          padding: 48px 24px 28px;
          margin-top: 60px;
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
        }
        .footer-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 40px;
        }
        .footer-col h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
          opacity: 0.9;
        }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 10px; }
        .footer-col a {
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.15s;
        }
        .footer-col a:hover { color: white; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.15);
          padding-top: 20px;
          display: flex; justify-content: flex-end;
        }
        .footer-bottom p {
          font-size: 12px;
          opacity: 0.5;
          font-style: italic;
        }

        /* ── SKELETON ── */
        .skeleton { background: linear-gradient(90deg, #e8e0d4 25%, #f0e8dc 50%, #e8e0d4 75%); background-size: 200%; animation: shimmer 1.5s infinite; border-radius: var(--card-radius); }
        @keyframes shimmer { 0% { background-position: 200%; } 100% { background-position: -200%; } }

        /* ── RESPONSIVE ── */
        @media (max-width: 640px) {
          .search-bar { flex-wrap: wrap; border-radius: 16px; padding: 12px; gap: 8px; }
          .search-field { border-right: none; border-bottom: 1px solid #eee; padding: 6px 4px; }
          .search-field:last-of-type { border-bottom: none; }
          .hero-tagline { font-size: 2.2rem; }
          .footer-cols { grid-template-columns: 1fr; }
          .featured-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        {/* Full-bleed property photo */}
        <div className="hero-bg-img">
          {allProperties[0] && parseJSON(allProperties[0].images, [])[0] ? (
            <Image
              src={parseJSON(allProperties[0].images, [])[0]}
              alt="Hero property"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center center' }}
              priority
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #06060e 0%, #0d1a2e 50%, #1a2a1a 100%)' }} />
          )}
        </div>
        <div className="hero-scrim" />

        {/* Single-line pill search bar */}
        <div className="search-bar">
          <div className="search-pill-item">
            <MapPin className="pill-icon" />
            <input
              type="text"
              placeholder="Destinations"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <span className="pill-sep" />
          <div className="search-pill-item">
            <Calendar className="pill-icon" />
            <input type="text" placeholder="Dates" readOnly style={{ cursor: 'pointer' }} />
          </div>
          <span className="pill-sep" />
          <div className="search-pill-item" style={{ flex: '0 0 auto', minWidth: 90 }}>
            <Users className="pill-icon" />
            <select value={guests} onChange={e => setGuests(e.target.value)} style={{ minWidth: 60 }}>
              <option value="">Guests</option>
              {[1,2,3,4,5,6,7,8].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <button className="search-icon-btn" onClick={handleSearch} aria-label="Search">
            <Search />
          </button>
        </div>

        {/* Find Stays CTA */}
        <Link href="/stays" className="find-stays-label">
          Find Stays
          <span className="find-stays-arrow" />
        </Link>
      </section>

      {/* ── BODY ── */}
      <div className="page-body">

        {/* Hand picked homes – Row 1 */}
        {!loading && (
          <ScrollRow title="Hand picked homes" properties={handpicked1} />
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="scroll-section">
            <div className="section-header">
              <div className="skeleton" style={{ width: 200, height: 24 }} />
            </div>
            <div className="scroll-row">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton" style={{ flex: '0 0 220px', height: 230 }} />
              ))}
            </div>
          </div>
        )}

        {/* Hand picked homes – Row 2 (premium) */}
        {!loading && handpicked2.length > 0 && (
          <ScrollRow title="Hand picked homes" properties={handpicked2} />
        )}

        {/* Featured homes */}
        {!loading && featured.length > 0 && (
          <section className="featured-section">
            <div className="section-header">
              <h2 className="section-title">
                Featured homes <ChevronRight className="title-arrow" />
              </h2>
            </div>
            <div className="featured-grid">
              {featured.map(p => (
                <PropertyCardFeatured key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="home-footer">
        <div className="footer-inner">
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Subtitle</h4>
              <ul>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Subtitle</h4>
              <ul>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
              </ul>
            </div>
            <div className="footer-col">
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
    </>
  );
}