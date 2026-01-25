import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#241705] to-stone-100 relative">
      <div className='w-[400px] h-[200px] bg-[#FCE8CA] absolute top-[45%] left-[35%] z-3 blur-[200px]'></div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&h=400&fit=crop"
          alt="Luxury living room"
          className="w-[50%] h-full object-cover"
        />
        <div className="absolute h-full flex flex-col items-end left-1/2 top-0 justify-center bg-[#FCE8CA] text-[#241705] w-[50%]">
          <h1 className="text-4xl md:text-6xl font-serif mb-8 tracking-wide w-full px-10 [text-shadow:0_8px_20px_#241705] text-center">
            Discover Eden's Home
          </h1>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 w-full text-center opacity-[90%]">
            Our Unique Properties
          </h2>
          <p className="text-lg md:text-xl px-10 leading-relaxed max-w-4xl italic opacity-[80%]">
            At Eden's Home, we pride ourselves on offering a diverse range of holiday rentals.
            From serene farmhouses to modern 1- to 3-BHK apartments, our accommodations cater
            to every preference.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Our Unique Properties Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#FCE8CA] mb-8 [text-shadow:0_3px_20px_#FCE8CA]">
            We will be posting updates everyday, stay updated!
          </h2>
        </div>

        {/* Features Grid */}
        <div className="flex justify-center flex-wrap gap-8 mb-16">
          <div className="bg-[#FCE8CA] h-[200px] w-[200px] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col  justify-center">
            <div className="w-full h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaFacebook size={48} color="#1877F2" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-3 text-center">Facebook</h3>
            {/* <p className="text-stone-600 text-center">From cozy farmhouses to contemporary apartments</p> */}
          </div>
          <div className="bg-[#FCE8CA] h-[200px] w-[200px] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col  justify-center">
            <div className="w-full h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaInstagram size={48} color="#E4405F" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-3 text-center">Instagram</h3>
            {/* <p className="text-stone-600 text-center">From cozy farmhouses to contemporary apartments</p> */}
          </div>
          <div className="bg-[#FCE8CA] h-[200px] w-[200px] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col  justify-center">
            <div className="w-full h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaLinkedin size={48} color="#1877F2" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-3 text-center">Linkedin</h3>
            {/* <p className="text-stone-600 text-center">From cozy farmhouses to contemporary apartments</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}