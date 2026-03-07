"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  AlertCircle, CheckCircle, Plus, Edit, Trash2, X, Save, Eye,
  Home, MapPin, Users, DollarSign, Star, Wifi, ChevronDown,
  ChevronUp, Image as ImageIcon, Settings, ToggleLeft, ToggleRight,
  Link, FileText, Gauge, Globe, Bed
} from 'lucide-react';

const AMENITY_OPTIONS = [
  'Wi-Fi', 'Air Conditioning', 'Kitchen', 'TV', 'Washer', 'Dryer',
  'Heating', 'Pool', 'Parking', 'Gym', 'Balcony', 'Independent',
  'Shared', 'Hot Tub', 'BBQ', 'Pet Friendly', 'Elevator', 'Security',
];

const PROPERTY_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Studio', 'Penthouse', 'Farmhouse'];
const NETWORK_OPTIONS = ['out', 'in'];
const STATUS_OPTIONS = ['Active', 'Inactive', 'Pending'];
const AVAILABILITY_TYPES = ['request', 'instant'];

const emptyForm = {
  name: '',
  address: '',
  landmark: '',
  type: '1 BHK',
  bathrooms: '1',
  sqft: '',
  description: '',
  amenities: [],
  base_price: '',
  per_guest_charge: '',
  extra_guest_price: '',
  commission_percent: '',
  featured: false,
  premium: false,
  network: 'out',
  base_guest_count: 2,
  max_guests: 4,
  images: [],
  ical_url: '',
  manual_link: '',
  internal_notes: '',
  status: 'Active',
  availability_type: 'request',
  latitude: '',
  longitude: '',
  priority_score: 5,
  slug: '',
};

// ─── Helpers ────────────────────────────────────────────────────────────────
const parseJSONField = (val, fallback = []) => {
  if (Array.isArray(val)) return val;
  if (!val) return fallback;
  try { return JSON.parse(val); } catch { return fallback; }
};

const SectionHeader = ({ icon: Icon, title, open, toggle }) => (
  <button
    type="button"
    onClick={toggle}
    className="w-full flex items-center justify-between py-3 px-4 bg-stone-50 border border-stone-200 rounded-lg text-left hover:bg-stone-100 transition-colors"
  >
    <span className="flex items-center gap-2 font-semibold text-stone-800 text-sm">
      <Icon className="w-4 h-4 text-amber-700" />
      {title}
    </span>
    {open ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
  </button>
);

const Field = ({ label, hint, children }) => (
  <div>
    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1">{label}</label>
    {children}
    {hint && <p className="mt-1 text-xs text-stone-400">{hint}</p>}
  </div>
);

const inputCls = "w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white placeholder-stone-400";
const textareaCls = inputCls + " resize-none";

// ─── Toggle Switch ───────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <div
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-amber-600' : 'bg-stone-300'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </div>
    <span className="text-sm text-stone-700">{label}</span>
  </label>
);

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [openSections, setOpenSections] = useState({
    basic: true, pricing: true, details: false, media: false, settings: false,
  });

  useEffect(() => { checkUser(); fetchProperties(); }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push('/login'); return; }
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];

    if (adminEmails.length > 0 && !adminEmails.includes(session.user.email)) {
      alert('Unauthorized access.'); router.push('/'); return;
    }
    setUser(session.user);
    setLoading(false);
  };

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase.from('properties').select('*').is('deleted_at', null).order('created_at', { ascending: false });
      if (error) throw error;
      setProperties(data || []);
    } catch (err) {
      setError('Failed to load properties');
    }
  };

  const toggleSection = (key) => setOpenSections(s => ({ ...s, [key]: !s[key] }));

  const set = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    set(name, type === 'checkbox' ? checked : value);
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const addImageUrl = () => {
    const url = prompt('Enter image URL (Cloudinary or any public URL):');
    if (url?.trim()) set('images', [...formData.images, url.trim()]);
  };

  const removeImage = (i) => set('images', formData.images.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setSaving(true);
    try {
      const payload = {
        name: formData.name,
        address: formData.address,
        landmark: formData.landmark,
        type: formData.type,
        bathrooms: formData.bathrooms,
        sqft: formData.sqft,
        description: formData.description,
        amenities: JSON.stringify(formData.amenities),
        base_price: parseFloat(formData.base_price) || 0,
        per_guest_charge: parseFloat(formData.per_guest_charge) || 0,
        extra_guest_price: parseFloat(formData.extra_guest_price) || 0,
        commission_percent: parseFloat(formData.commission_percent) || 0,
        featured: formData.featured,
        premium: formData.premium,
        network: formData.network,
        base_guest_count: parseInt(formData.base_guest_count) || 2,
        max_guests: parseInt(formData.max_guests) || 4,
        images: JSON.stringify(formData.images),
        ical_url: formData.ical_url,
        manual_link: formData.manual_link,
        internal_notes: formData.internal_notes,
        status: formData.status,
        availability_type: formData.availability_type,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        priority_score: parseInt(formData.priority_score) || 5,
        slug: formData.slug || null,
      };

      if (editingProperty) {
        const { error } = await supabase.from('properties').update(payload).eq('id', editingProperty.id);
        if (error) throw error;
        setSuccess('Property updated successfully!');
      } else {
        const { error } = await supabase.from('properties').insert([payload]);
        if (error) throw error;
        setSuccess('Property created successfully!');
      }

      resetForm(); fetchProperties(); setShowForm(false);
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.message || 'Failed to save property');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (p) => {
    setEditingProperty(p);
    setFormData({
      name: p.name || '',
      address: p.address || '',
      landmark: p.landmark || '',
      type: p.type || '1 BHK',
      bathrooms: p.bathrooms || '1',
      sqft: p.sqft || '',
      description: p.description || '',
      amenities: parseJSONField(p.amenities, []),
      base_price: p.base_price || '',
      per_guest_charge: p.per_guest_charge || '',
      extra_guest_price: p.extra_guest_price || '',
      commission_percent: p.commission_percent || '',
      featured: p.featured || false,
      premium: p.premium || false,
      network: p.network || 'out',
      base_guest_count: p.base_guest_count || 2,
      max_guests: p.max_guests || 4,
      images: parseJSONField(p.images, []),
      ical_url: p.ical_url || '',
      manual_link: p.manual_link || '',
      internal_notes: p.internal_notes || '',
      status: p.status || 'Active',
      availability_type: p.availability_type || 'request',
      latitude: p.latitude || '',
      longitude: p.longitude || '',
      priority_score: p.priority_score || 5,
      slug: p.slug || '',
    });
    setShowForm(true);
    setTimeout(() => document.getElementById('property-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this property? This cannot be undone.')) return;
    try {
      const { error } = await supabase.from('properties').update({ deleted_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
      setSuccess('Property deleted.'); fetchProperties();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError('Failed to delete property');
    }
  };

  const resetForm = () => { setFormData(emptyForm); setEditingProperty(null); };

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-amber-700 border-t-transparent" />
        <p className="mt-3 text-stone-500 text-sm">Loading dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">Eden's Home</p>
            <h1 className="text-3xl font-bold text-stone-900">Admin Dashboard</h1>
            <p className="text-stone-500 text-sm mt-1">Manage property listings</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-400">Logged in as</p>
            <p className="text-sm font-semibold text-stone-700">{user?.email}</p>
          </div>
        </div>

        {/* ── Alerts ── */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
          </div>
        )}
        {success && (
          <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="flex-1">{success}</span>
            <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* ── Add Button ── */}
        <div className="mb-6">
          <button
            onClick={() => { resetForm(); setShowForm(v => !v); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-700 text-white text-sm font-semibold rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
          >
            {showForm && !editingProperty ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm && !editingProperty ? 'Cancel' : 'Add New Property'}
          </button>
        </div>

        {/* ── Property Form ── */}
        {showForm && (
          <div id="property-form" className="bg-white border border-stone-200 rounded-2xl shadow-sm mb-10 overflow-hidden">
            {/* Form header */}
            <div className="bg-gradient-to-r from-amber-700 to-amber-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-white font-bold text-lg">
                {editingProperty ? `Editing: ${editingProperty.name}` : 'New Property'}
              </h2>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="text-amber-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              {/* ── BASIC INFO ── */}
              <SectionHeader icon={Home} title="Basic Information" open={openSections.basic} toggle={() => toggleSection('basic')} />
              {openSections.basic && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 pb-3">
                  <Field label="Property Name *">
                    <input required name="name" value={formData.name} onChange={handleChange} className={inputCls} placeholder="Cozy 2BHK in Gurgaon" />
                  </Field>
                  <Field label="Property Type *">
                    <select name="type" value={formData.type} onChange={handleChange} className={inputCls}>
                      {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Address *" >
                    <input required name="address" value={formData.address} onChange={handleChange} className={inputCls} placeholder="Sector 42, Gurgaon" />
                  </Field>
                  <Field label="Landmark">
                    <input name="landmark" value={formData.landmark} onChange={handleChange} className={inputCls} placeholder="Near DLF Mall" />
                  </Field>
                  <Field label="Bathrooms">
                    <input type="number" name="bathrooms" min="1" value={formData.bathrooms} onChange={handleChange} className={inputCls} />
                  </Field>
                  <Field label="Area (sqft)">
                    <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} className={inputCls} placeholder="850" />
                  </Field>
                  <Field label="Slug">
                    <input name="slug" value={formData.slug} onChange={handleChange} className={inputCls} placeholder="cozy-2bhk-gurgaon" />
                  </Field>
                  <Field label="Status">
                    <select name="status" value={formData.status} onChange={handleChange} className={inputCls}>
                      {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Description *">
                      <textarea required name="description" rows={4} value={formData.description} onChange={handleChange} className={textareaCls} placeholder="Describe the property…" />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── PRICING ── */}
              <SectionHeader icon={DollarSign} title="Pricing & Guests" open={openSections.pricing} toggle={() => toggleSection('pricing')} />
              {openSections.pricing && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1 pb-3">
                  <Field label="Base Price / Night (₹) *">
                    <input required type="number" name="base_price" min="0" value={formData.base_price} onChange={handleChange} className={inputCls} placeholder="5000" />
                  </Field>
                  <Field label="Per Guest Charge (₹)">
                    <input type="number" name="per_guest_charge" min="0" value={formData.per_guest_charge} onChange={handleChange} className={inputCls} placeholder="500" />
                  </Field>
                  <Field label="Extra Guest Price (₹)">
                    <input type="number" name="extra_guest_price" min="0" value={formData.extra_guest_price} onChange={handleChange} className={inputCls} placeholder="500" />
                  </Field>
                  <Field label="Commission (%)">
                    <input type="number" name="commission_percent" min="0" max="100" value={formData.commission_percent} onChange={handleChange} className={inputCls} placeholder="20" />
                  </Field>
                  <Field label="Base Guest Count">
                    <input type="number" name="base_guest_count" min="1" value={formData.base_guest_count} onChange={handleChange} className={inputCls} />
                  </Field>
                  <Field label="Max Guests">
                    <input type="number" name="max_guests" min="1" value={formData.max_guests} onChange={handleChange} className={inputCls} />
                  </Field>
                </div>
              )}

              {/* ── DETAILS ── */}
              <SectionHeader icon={Settings} title="Details & Amenities" open={openSections.details} toggle={() => toggleSection('details')} />
              {openSections.details && (
                <div className="space-y-5 pt-1 pb-3">
                  {/* Amenities */}
                  <Field label="Amenities" hint="Click to toggle">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {AMENITY_OPTIONS.map(a => (
                        <button
                          key={a} type="button" onClick={() => toggleAmenity(a)}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors ${formData.amenities.includes(a) ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-300 hover:border-amber-400'}`}
                        >{a}</button>
                      ))}
                    </div>
                    {/* Custom amenity input */}
                    <div className="mt-2 flex gap-2">
                      <input
                        id="custom-amenity"
                        className={inputCls + " flex-1"}
                        placeholder="Add custom amenity…"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = e.target.value.trim();
                            if (val) { toggleAmenity(val); e.target.value = ''; }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('custom-amenity');
                          if (el?.value.trim()) { toggleAmenity(el.value.trim()); el.value = ''; }
                        }}
                        className="px-3 py-2 text-xs bg-stone-100 border border-stone-300 rounded-lg hover:bg-stone-200"
                      >Add</button>
                    </div>
                    {formData.amenities.length > 0 && (
                      <p className="text-xs text-stone-500 mt-1">Selected: {formData.amenities.join(', ')}</p>
                    )}
                  </Field>

                  {/* Toggles row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200">
                    <Toggle checked={formData.featured} onChange={() => set('featured', !formData.featured)} label="Featured" />
                    <Toggle checked={formData.premium} onChange={() => set('premium', !formData.premium)} label="Premium" />
                    <Field label="Network">
                      <select name="network" value={formData.network} onChange={handleChange} className={inputCls}>
                        {NETWORK_OPTIONS.map(n => <option key={n}>{n}</option>)}
                      </select>
                    </Field>
                    <Field label="Availability">
                      <select name="availability_type" value={formData.availability_type} onChange={handleChange} className={inputCls}>
                        {AVAILABILITY_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                  </div>

                  {/* Lat/Lng + Priority */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Latitude">
                      <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} className={inputCls} placeholder="28.4595" />
                    </Field>
                    <Field label="Longitude">
                      <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} className={inputCls} placeholder="77.0266" />
                    </Field>
                    <Field label="Priority Score (1–10)">
                      <input type="number" name="priority_score" min="1" max="10" value={formData.priority_score} onChange={handleChange} className={inputCls} />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── MEDIA ── */}
              <SectionHeader icon={ImageIcon} title="Images" open={openSections.media} toggle={() => toggleSection('media')} />
              {openSections.media && (
                <div className="pt-1 pb-3 space-y-3">
                  <button type="button" onClick={addImageUrl} className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-stone-400 rounded-lg text-sm text-stone-600 hover:border-amber-500 hover:text-amber-700 transition-colors">
                    <Plus className="w-4 h-4" /> Add Image URL
                  </button>
                  <p className="text-xs text-stone-400">Paste Cloudinary or any public image URL. First image = main thumbnail.</p>
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {formData.images.map((url, i) => (
                        <div key={i} className="relative group rounded-lg overflow-hidden border border-stone-200 aspect-[4/3] bg-stone-100">
                          <img src={url} alt="" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                          <button
                            type="button" onClick={() => removeImage(i)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          ><X className="w-3 h-3" /></button>
                          {i === 0 && <span className="absolute bottom-1 left-1 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">MAIN</span>}
                          <p className="absolute bottom-1 right-1 text-[10px] text-white bg-black/50 px-1 rounded">#{i + 1}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── SETTINGS ── */}
              <SectionHeader icon={Link} title="Links & Notes" open={openSections.settings} toggle={() => toggleSection('settings')} />
              {openSections.settings && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 pb-3">
                  <Field label="iCal URL">
                    <input name="ical_url" value={formData.ical_url} onChange={handleChange} className={inputCls} placeholder="https://..." />
                  </Field>
                  <Field label="Manual Link">
                    <input name="manual_link" value={formData.manual_link} onChange={handleChange} className={inputCls} placeholder="https://..." />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Internal Notes">
                      <textarea name="internal_notes" rows={3} value={formData.internal_notes} onChange={handleChange} className={textareaCls} placeholder="Notes visible only to admins…" />
                    </Field>
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="flex gap-3 pt-4 border-t border-stone-100">
                <button
                  type="submit" disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-700 text-white text-sm font-semibold rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors shadow-sm"
                >
                  {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                  {editingProperty ? 'Update Property' : 'Create Property'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="px-5 py-2.5 text-sm text-stone-600 border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Properties List ── */}
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <h2 className="font-bold text-stone-800">All Properties <span className="text-stone-400 font-normal">({properties.length})</span></h2>
          </div>

          {properties.length === 0 ? (
            <div className="py-16 text-center text-stone-400">
              <Home className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No properties yet. Add your first one above.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {properties.map(p => {
                const imgs = parseJSONField(p.images, []);
                const ams = parseJSONField(p.amenities, []);
                return (
                  <div key={p.id} className="p-5 hover:bg-stone-50 transition-colors">
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-24 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                        {imgs[0]
                          ? <img src={imgs[0]} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-stone-300"><ImageIcon className="w-6 h-6" /></div>}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-stone-900 text-base">{p.name}</h3>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${p.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-500'}`}>{p.status}</span>
                            {p.featured && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Featured</span>}
                            {p.premium && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Premium</span>}
                          </div>
                          {/* Actions */}
                          <div className="flex items-center gap-1">
                            <a href={`/property/${p.id}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </a>
                            <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-stone-500 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{p.address}{p.landmark ? ` · ${p.landmark}` : ''}</span>
                        </div>

                        <div className="flex flex-wrap gap-3 text-xs text-stone-500 mb-2">
                          <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{p.type}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />Up to {p.max_guests} guests</span>
                          <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{p.network} · {p.availability_type}</span>
                          <span className="flex items-center gap-1"><Gauge className="w-3 h-3" />Priority {p.priority_score}</span>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex flex-wrap gap-1">
                            {ams.slice(0, 4).map((a, i) => (
                              <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] rounded-full">{a}</span>
                            ))}
                            {ams.length > 4 && <span className="px-2 py-0.5 bg-stone-100 text-stone-500 text-[10px] rounded-full">+{ams.length - 4}</span>}
                          </div>
                          <p className="text-lg font-bold text-amber-700">
                            ₹{Number(p.base_price).toLocaleString('en-IN')}
                            <span className="text-xs font-normal text-stone-500"> /night</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}