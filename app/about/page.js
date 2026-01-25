import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col mt-16">
      {/* Hero Section with Gradient Background */}
      <div className="relative h-72 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-200 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-200 via-purple-300 to-purple-400 opacity-80"></div>
        <div className="relative z-1 text-center px-4">
          <h1 className="text-6xl font-serif text-gray-800 mb-2">ABOUT</h1>
          <h2 className="text-6xl font-serif text-gray-800 mb-4">EDEN'S HOME</h2>
          <p className="text-gray-700 text-lg">is it just like another short term rental company?</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 bg-gray-100 pb-16">
        <div className="max-w-12xl mx-auto ">
          {/* Introduction */}
          <div className="text-center mb-12 bg-amber-50 py-16">
            <p className="text-2xl font-semibold text-gray-800 mb-8">
              At Eden's Home, we believe in transforming every stay into a memorable experience.
            </p>
            
            <p className="text-xl text-gray-800 mb-4">
              Beyond just offering a place to stay, we focus on
            </p>
            <p className="text-xl font-bold text-gray-800 mb-8">
              COMFORT, LUXURY, AND PERSONALIZED SERVICE.
            </p>
            
            <p className="text-xl text-gray-800 mb-8">
              Our mission is to provide each guest with a seamless and delightful experience.
            </p>
            
            <p className="text-xl text-gray-800 mb-8">
              Ensuring that your needs and preferences are met with the utmost care and attention.
            </p>
            
            <p className="text-xl text-gray-800">
              We strive to create a welcoming environment where every guest
            </p>
            <p className="text-xl font-bold text-gray-800">
              FEELS VALUED AT EDEN'S HOME.
            </p>
          </div>

          {/* Three Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            {/* Our Values */}
            <div className="text-center">
              <h3 className="text-2xl font-serif text-gray-800 mb-6">OUR VALUES:</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                WE PRIORITIZE A TAILORED APPROACH, ADAPTING TO EACH GUEST'S UNIQUE REQUIREMENTS TO PROVIDE A TRULY BESPOKE EXPERIENCE.
              </p>
            </div>

            {/* Our Mission */}
            <div className="text-center">
              <h3 className="text-2xl font-serif text-gray-800 mb-6">OUR MISSION:</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                COMMITMENT TO EXCEPTIONAL CUSTOMER SERVICE. WE GO ABOVE AND BEYOND TO ENSURE THAT EVERY GUEST'S NEEDS ARE MET WITH PERSONALIZED ATTENTION AND CARE.
              </p>
            </div>

            {/* Our Goals */}
            <div className="text-center">
              <h3 className="text-2xl font-serif text-gray-800 mb-6">OUR GOALS:</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                WE AIM TO CONSISTENTLY EXCEED EXPECTATIONS, ENSURING EVERY STAY IS MARKED BY COMFORT, QUALITY, AND A TOUCH OF LUXURY THAT MAKES EDEN'S HOME TRULY SPECIAL.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-12 flex justify-center">
        <button className="bg-pink-200 hover:bg-pink-300 text-gray-700 font-semibold py-4 px-12 rounded-full text-lg transition-colors duration-300">
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}