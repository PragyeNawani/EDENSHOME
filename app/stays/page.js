import React from 'react';

export default function StaysPage() {
  return (
    <div className="min-h-screen bg-[#f5f0eb] mt-20">
      {/* Hero Section */}
      <div className="relative h-48 bg-gradient-to-r from-pink-300 via-pink-400 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/50 via-purple-400/30 to-orange-400/50"></div>
        <div className="absolute top-4 right-0 w-64 h-64 bg-gradient-to-br from-yellow-200 via-orange-300 to-pink-400 rounded-full blur-3xl opacity-60 transform translate-x-20 -translate-y-10"></div>
        <div className="relative z-1 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-8xl font-serif text-gray-900 tracking-wide expfont">STAYS</h1>
          <p className="text-3xl font-serif text-gray-800 mt-2">We Offer</p>
        </div>
      </div>

      {/* Property Cards Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Farm Houses Card */}
          <div className="bg-white border-4 border-gray-800 p-6 shadow-lg">
            <div className="aspect-video bg-gray-200 mb-6 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop" 
                alt="Farm House with Pool"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Farm Houses</h2>
            <p className="text-gray-700 text-center leading-relaxed">
              Private farm stays on the outskirts of Gurgaon, Delhi & Noida, ideal for peaceful getaways, family gatherings, and celebrations away from the city.
            </p>
          </div>

          {/* Single Rooms Card */}
          <div className="bg-white border-4 border-gray-800 p-6 shadow-lg">
            <div className="aspect-video bg-gray-200 mb-6 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop" 
                alt="Modern Single Room"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Single Rooms</h2>
            <p className="text-gray-700 text-center leading-relaxed">
              Comfortable, well-located rooms across Gurgaon, Delhi & Noida, perfect for short stays, business trips, and quick city visits.
            </p>
          </div>

          {/* Apartments Card */}
          <div className="bg-white border-4 border-gray-800 p-6 shadow-lg">
            <div className="aspect-video bg-gray-200 mb-6 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop" 
                alt="Furnished Apartment"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Apartments</h2>
            <p className="text-gray-700 text-center leading-relaxed">
              Fully furnished apartments in prime areas of Gurgaon, Delhi & Noida, offering space, privacy, and the comfort of a home-like stay.
            </p>
          </div>
        </div>
      </div>

      {/* Explore Portfolio Section */}
      <div className="bg-gradient-to-r from-[#c4948c] via-[#b88579] to-[#c4948c] py-12">
        <h2 className="text-5xl font-serif text-center text-gray-900 tracking-wide">
          EXPLORE OUR PROPERTY PORTFOLIO!
        </h2>
      </div>

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-xl text-gray-800 mb-2">
          Connect with a dedicated personal advisor who understands your preferences.
        </p>
        <p className="text-xl text-gray-800 mb-2">
          From selecting the right property to securing the best rates.
        </p>
        <p className="text-xl text-gray-800 mb-8">
          Enjoy personalized service, trusted recommendations, and a seamless experience
        </p>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          DESIGNED JUST FOR YOU.
        </h3>

        {/* WhatsApp Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 text-[#25D366] text-4xl font-bold">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>WhatsApp</span>
          </div>
        </div>

        {/* Footer Text */}
        <h2 className="text-5xl font-sans text-gray-900 mb-12">
          We'll be in touch soon
        </h2>

        {/* Back to Home Button */}
        <button className="bg-[#d4b5a8] hover:bg-[#c4a598] text-gray-800 px-12 py-4 rounded-full text-lg font-medium tracking-wider transition-colors">
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}