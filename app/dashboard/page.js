"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AlertCircle, CheckCircle, Plus, Edit, Trash2, Upload, X, Save, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    price: '',
    description: '',
    key_features: '',
    amenities: '',
    pool: false,
    free_parking: false,
    images: [],
    nearby_places: '',
    cancellation_policy: '',
    house_rules: '',
    safety_privacy: '',
  });

  useEffect(() => {
    checkUser();
    fetchProperties();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
      return;
    }
    
    // Check if user is admin using environment variable
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
    
    if (!adminEmails.includes(session.user.email)) {
      alert('Unauthorized access. Admin only.');
      router.push('/');
      return;
    }
    
    setUser(session.user);
    setLoading(false);
  };

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    // For now, we'll store file names
    // In production, upload to Supabase Storage and store URLs
    const fileNames = files.map(f => f.name);
    
    setFormData({
      ...formData,
      images: [...formData.images, ...fileNames],
    });
    
    // TODO: Implement actual file upload to Supabase Storage
    // const uploadPromises = files.map(async (file) => {
    //   const fileName = `${Date.now()}_${file.name}`;
    //   const { data, error } = await supabase.storage
    //     .from('property-images')
    //     .upload(fileName, file);
    //   return data?.path;
    // });
    // const uploadedPaths = await Promise.all(uploadPromises);
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Parse nearby places JSON
      let nearbyPlacesArray = [];
      if (formData.nearby_places.trim()) {
        try {
          nearbyPlacesArray = JSON.parse(formData.nearby_places);
        } catch (e) {
          throw new Error('Invalid JSON format for nearby places');
        }
      }

      const propertyData = {
        title: formData.title,
        location: formData.location,
        guests: parseInt(formData.guests),
        bedrooms: parseInt(formData.bedrooms),
        beds: parseInt(formData.beds),
        bathrooms: parseInt(formData.bathrooms),
        price: parseFloat(formData.price),
        description: formData.description,
        key_features: formData.key_features.split('\n').filter(f => f.trim()),
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
        pool: formData.pool,
        free_parking: formData.free_parking,
        images: formData.images,
        nearby_places: nearbyPlacesArray,
        cancellation_policy: formData.cancellation_policy,
        house_rules: formData.house_rules,
        safety_privacy: formData.safety_privacy,
      };

      if (editingProperty) {
        // Update existing property
        const { error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', editingProperty.id);

        if (error) throw error;
        setSuccess('Property updated successfully!');
      } else {
        // Create new property
        const { error } = await supabase
          .from('properties')
          .insert([propertyData]);

        if (error) throw error;
        setSuccess('Property created successfully!');
      }

      // Reset form and fetch updated properties
      resetForm();
      fetchProperties();
      setShowForm(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      console.error('Error saving property:', error);
      setError(error.message || 'Failed to save property');
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      location: property.location,
      guests: property.guests,
      bedrooms: property.bedrooms,
      beds: property.beds,
      bathrooms: property.bathrooms,
      price: property.price,
      description: property.description,
      key_features: property.key_features?.join('\n') || '',
      amenities: property.amenities?.join(', ') || '',
      pool: property.pool || false,
      free_parking: property.free_parking || false,
      images: property.images || [],
      nearby_places: JSON.stringify(property.nearby_places || [], null, 2),
      cancellation_policy: property.cancellation_policy || '',
      house_rules: property.house_rules || '',
      safety_privacy: property.safety_privacy || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Property deleted successfully!');
      fetchProperties();
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      price: '',
      description: '',
      key_features: '',
      amenities: '',
      pool: false,
      free_parking: false,
      images: [],
      nearby_places: '',
      cancellation_policy: '',
      house_rules: '',
      safety_privacy: '',
    });
    setEditingProperty(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage Eden's Home properties</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Logged in as:</p>
            <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm flex-1">{error}</span>
            <button onClick={() => setError('')} className="ml-auto hover:opacity-70">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm flex-1">{success}</span>
            <button onClick={() => setSuccess('')} className="ml-auto hover:opacity-70">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Add Property Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add New Property
          </button>
        </div>

        {/* Property Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-amber-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., Luxury Villa in Gurgaon"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., Sector 42, Gurgaon, Haryana"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guests *
                    </label>
                    <input
                      type="number"
                      name="guests"
                      required
                      min="1"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms *
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      required
                      min="1"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beds *
                    </label>
                    <input
                      type="number"
                      name="beds"
                      required
                      min="1"
                      value={formData.beds}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      required
                      min="1"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per Night (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="5000"
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="pool"
                        checked={formData.pool}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-amber-700 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Pool</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="free_parking"
                        checked={formData.free_parking}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-amber-700 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Free Parking</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Description & Features */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description & Features</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows="4"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Describe the property in detail..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Features (one per line)
                    </label>
                    <textarea
                      name="key_features"
                      rows="8"
                      value={formData.key_features}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Infinity Swimming pool at rooftop&#10;Centrally Air-conditioned apartment&#10;Modern bathroom&#10;Fresh apartment with all new furniture"
                    ></textarea>
                    <p className="mt-1 text-xs text-gray-500">Enter each feature on a new line</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amenities (comma separated)
                    </label>
                    <input
                      type="text"
                      name="amenities"
                      value={formData.amenities}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Wi-Fi, Air Conditioning, Kitchen, TV, Washer, Dryer, Heating"
                    />
                    <p className="mt-1 text-xs text-gray-500">Separate amenities with commas</p>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
                
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <Upload className="w-5 h-5" />
                      <span>Upload Images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-sm text-gray-500">{formData.images.length} image(s) added</p>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center p-2 border-2 border-gray-300">
                            <p className="text-xs text-gray-600 text-center break-all line-clamp-3">{img}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          {index === 0 && (
                            <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                              Main
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="mt-2 text-xs text-gray-500">First image will be used as the main image</p>
                </div>
              </div>

              {/* Nearby Places */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Places (Optional)</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nearby Places (JSON format)
                  </label>
                  <textarea
                    name="nearby_places"
                    rows="10"
                    value={formData.nearby_places}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono text-sm"
                    placeholder={`[\n  {\n    "name": "Cafe Dolma",\n    "description": "Eat tasty momos in a well lit space.",\n    "image": "/cafe-placeholder.jpg"\n  }\n]`}
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">Enter valid JSON array with name, description, and image fields</p>
                </div>
              </div>

              {/* Policies */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Policies & Rules</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cancellation Policy
                    </label>
                    <textarea
                      name="cancellation_policy"
                      rows="3"
                      value={formData.cancellation_policy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Free cancellation up to 48 hours before check-in..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      House Rules
                    </label>
                    <textarea
                      name="house_rules"
                      rows="3"
                      value={formData.house_rules}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="No smoking, No pets, Quiet hours from 10 PM to 8 AM..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Safety & Privacy
                    </label>
                    <textarea
                      name="safety_privacy"
                      rows="3"
                      value={formData.safety_privacy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="24/7 security, Smoke detectors, Fire extinguisher..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {editingProperty ? 'Update Property' : 'Create Property'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Properties List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">
              All Properties ({properties.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {properties.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <p className="text-lg mb-2">No properties found</p>
                <p className="text-sm">Click "Add New Property" to create your first property</p>
              </div>
            ) : (
              properties.map((property) => (
                <div key={property.id} className="px-6 py-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Property Image */}
                    <div className="flex-shrink-0">
                      <div className="w-full lg:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                        {property.images && property.images.length > 0 ? (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm p-2">
                            {property.images[0]}
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{property.location}</p>
                      
                      <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-500">
                        <span>{property.guests} Guests</span>
                        <span>•</span>
                        <span>{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
                        <span>•</span>
                        <span>{property.beds} Bed{property.beds > 1 ? 's' : ''}</span>
                        <span>•</span>
                        <span>{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                        {property.pool && (
                          <>
                            <span>•</span>
                            <span>Pool</span>
                          </>
                        )}
                        {property.free_parking && (
                          <>
                            <span>•</span>
                            <span>Free Parking</span>
                          </>
                        )}
                      </div>

                      <p className="text-gray-700 line-clamp-2 mb-3">{property.description}</p>

                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-amber-700">
                          ₹{property.price}
                          <span className="text-sm font-normal text-gray-600"> / night</span>
                        </p>

                        <div className="flex gap-2">
                          <a
                            href={`/property/${property.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Property"
                          >
                            <Eye className="w-5 h-5" />
                          </a>
                          <button
                            onClick={() => handleEdit(property)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Property"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Property"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info Tags */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {property.amenities && property.amenities.slice(0, 5).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {property.amenities && property.amenities.length > 5 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{property.amenities.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}