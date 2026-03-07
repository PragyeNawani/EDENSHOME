import React from 'react';
import { Camera, MapPin, Calendar } from 'lucide-react';

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-white mt-12 sm:mt-16">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center" style={{
        backgroundImage: `url("/experiences.jpeg")`
      }}>
        {/* Decorative overlay to simulate the wedding/event scene */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-amber-800/40"></div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white text-center tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] expfont">
            INTRODUCING<br />
            EXPERIENCES TAB
          </h1>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 text-center mb-8 sm:mb-12 md:mb-16 px-4">
          Thoughtful extras for our wonderful guests.
        </h2>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Photography Card */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden border-2">
              <img src="./photo.jpeg" className='h-full w-full object-cover' alt="Photography services" />
              <div className="absolute top-4 left-4">
                <div className="w-3 h-3 text-gray-300">✦</div>
              </div>
            </div>
            <div className="border-2 border-gray-300 px-4 sm:px-6 md:px-8 py-2 sm:py-3">
              <h3 className="text-base sm:text-lg md:text-xl font-light text-gray-700 tracking-wide">PHOTOGRAPHY</h3>
            </div>
          </div>

          {/* Cab Services Card */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden">
              <div className="relative w-full h-full border-2 rounded-xl">
                <img src="./car.jpeg" className='h-full w-full object-cover' alt="Cab services" />
              </div>
            </div>
            <div className="border-2 border-gray-300 px-4 sm:px-6 md:px-8 py-2 sm:py-3">
              <h3 className="text-base sm:text-lg md:text-xl font-light text-gray-700 tracking-wide">CAB SERVICES</h3>
            </div>
          </div>

          {/* Events Card */}
          <div className="flex flex-col items-center sm:col-span-2 md:col-span-1">
            <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden">
              <div className="relative w-full h-full border-2 rounded-xl">
                <img src="./events.jpeg" className='h-full w-full object-cover' alt="Events" />
              </div>
            </div>
            <div className="border-2 border-gray-300 px-4 sm:px-6 md:px-8 py-2 sm:py-3">
              <h3 className="text-base sm:text-lg md:text-xl font-light text-gray-700 tracking-wide">EVENTS</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="relative bg-gradient-to-br from-rose-200 via-purple-200 to-blue-200 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 tracking-wide [text-shadow:0_2px_20px_#241705]">
            COMING SOON
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-800 font-light italic leading-relaxed mb-8 sm:mb-10 md:mb-12 px-2">
            We're thoughtfully crafting experiences that go beyond just a place to stay.
            From personalized comforts to carefully curated moments, everything is designed
            to make you feel truly at home. Soon, you'll discover experiences that add ease,
            warmth, and a little extra joy to every stay.
          </p>
          <a href="/">
            <button className="bg-rose-200/60 hover:bg-rose-300/60 text-gray-800 px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-base sm:text-lg font-light tracking-wider transition-colors cursor-pointer">
              BACK TO HOME
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}