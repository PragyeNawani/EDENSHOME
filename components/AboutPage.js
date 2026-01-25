import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#241705] relative">
      {/* Background blur effect - responsive positioning */}
      <div className='w-[300px] h-[150px] sm:w-[400px] sm:h-[200px] bg-[#FCE8CA] absolute top-[30%] left-[50%] -translate-x-1/2 sm:top-[45%] sm:left-[35%] sm:translate-x-0 z-0 blur-[150px] sm:blur-[200px]'></div>

      {/* Hero Section */}
      <div className="relative h-auto min-h-[600px] sm:h-96 overflow-hidden">
        {/* Image - full width on mobile, half width on desktop */}
        <img
          src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&h=400&fit=crop"
          alt="Luxury living room"
          className="w-full sm:w-1/2 h-64 sm:h-full object-cover"
        />
        
        {/* Content overlay - stacked on mobile, side by side on desktop */}
        <div className="relative sm:absolute sm:h-full flex flex-col items-center sm:items-end sm:left-1/2 sm:top-0 justify-center bg-[#FCE8CA] text-[#241705] w-full sm:w-1/2 py-12 sm:py-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-6 sm:mb-8 tracking-wide w-full px-6 sm:px-10 [text-shadow:0_8px_20px_#241705] text-center">
            Discover Eden's Home
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-6 sm:mb-8 w-full text-center opacity-90">
            Our Unique Properties
          </h2>
          <p className="text-base sm:text-lg md:text-xl px-6 sm:px-10 leading-relaxed max-w-4xl italic opacity-80 text-center sm:text-left">
            At Eden's Home, we pride ourselves on offering a diverse range of holiday rentals.
            From serene farmhouses to modern 1- to 3-BHK apartments, our accommodations cater
            to every preference.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Our Unique Properties Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#FCE8CA] mb-6 sm:mb-8 [text-shadow:0_3px_20px_#FCE8CA] px-4">
            We will be posting updates everyday, stay updated!
          </h2>
        </div>

        {/* Features Grid - responsive layout */}
        <div className="flex justify-center flex-wrap gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Facebook */}
          <div className="bg-[#FCE8CA] h-[180px] w-[180px] sm:h-[200px] sm:w-[200px] p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col justify-center">
            <div className="w-full h-12 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
              <FaFacebook size={40} className="sm:w-12 sm:h-12" color="#1877F2" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-stone-800 mb-2 sm:mb-3 text-center">Facebook</h3>
          </div>
          
          {/* Instagram */}
          <div className="bg-[#FCE8CA] h-[180px] w-[180px] sm:h-[200px] sm:w-[200px] p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col justify-center">
            <div className="w-full h-12 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
              <FaInstagram size={40} className="sm:w-12 sm:h-12" color="#E4405F" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-stone-800 mb-2 sm:mb-3 text-center">Instagram</h3>
          </div>
          
          {/* LinkedIn */}
          <div className="bg-[#FCE8CA] h-[180px] w-[180px] sm:h-[200px] sm:w-[200px] p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col justify-center">
            <div className="w-full h-12 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
              <FaLinkedin size={40} className="sm:w-12 sm:h-12" color="#0A66C2" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-stone-800 mb-2 sm:mb-3 text-center">LinkedIn</h3>
          </div>
        </div>
      </div>
    </div>
  );
}