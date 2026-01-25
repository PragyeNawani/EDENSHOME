import React from 'react';
import { Camera, MapPin, Calendar } from 'lucide-react';

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-white mt-16">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center" style={{
        backgroundImage: `url("/experiences.jpeg")`
      }}>
        {/* Decorative overlay to simulate the wedding/event scene */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-amber-800/40"></div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl text-white text-center tracking-[0.3em] px-4 expfont">
            INTRODUCING<br />
            EXPERIENCES TAB
          </h1>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-light text-gray-800 text-center mb-16">
          Thoughtful extras for our wonderful guests.
        </h2>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Photography Card */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
              <img src="./photo.jpeg" className='h-full w-full' alt="" />
              <div className="absolute top-4 left-4">
                <div className="w-3 h-3 text-gray-300">✦</div>
              </div>
            </div>
            <div className="border-2 border-gray-300 px-8 py-3">
              <h3 className="text-xl font-light text-gray-700 tracking-wide">PHOTOGRAPHY</h3>
            </div>
          </div>

          {/* Cab Services Card */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
              <div className="relative">
                <img src="./car.jpeg" className='h-full w-full' alt="" />
              </div>
            </div>
            <div className="border-2 border-gray-300 px-8 py-3">
              <h3 className="text-xl font-light text-gray-700 tracking-wide">CAB SERVICES</h3>
            </div>
          </div>

          {/* Events Card */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
              <div className="relative">
                <img src="./events.jpeg" className='h-full w-full' alt="" />
              </div>
            </div>
            <div className="border-2 border-gray-300 px-8 py-3">
              <h3 className="text-xl font-light text-gray-700 tracking-wide">EVENTS</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="relative bg-gradient-to-br from-rose-200 via-purple-200 to-blue-200 py-24">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-wide">
            COMING SOON
          </h2>
          <p className="text-lg md:text-xl text-gray-800 font-light italic leading-relaxed mb-12">
            We're thoughtfully crafting experiences that go beyond just a place to stay.
            From personalized comforts to carefully curated moments, everything is designed
            to make you feel truly at home. Soon, you'll discover experiences that add ease,
            warmth, and a little extra joy to every stay.
          </p>
          <button className="bg-rose-200/60 hover:bg-rose-300/60 text-gray-800 px-10 py-3 text-lg font-light tracking-wider transition-colors">
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
}