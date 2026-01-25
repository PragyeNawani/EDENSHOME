"use client"
import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function EdensHome() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    'https://hostyapp.com/wp-content/uploads/2020/06/Airbnb-Property-to-Buy-1200x423.jpg',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=423&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=423&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=423&fit=crop',
  ];

  useEffect(() => {
    // Track cursor position
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setNextImageIndex((prevIndex) => (prevIndex + 1) % images.length);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 700);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: '#241705' }}>
      <div className='w-[200px] h-[200px] bg-[#FCE8CA] absolute left-0 z-3 blur-[150px]'></div>
      <div className='w-[200px] h-[200px] bg-[#FCE8CA] absolute bottom-0 right-0 z-3 blur-[150px]'></div>
      {/* Glassmorphism Cursor
      <div
        className="fixed pointer-events-none z-50 rounded-full hidden md:block"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: '60px',
          height: '60px',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.08s ease-out'
        }}
      /> */}

      {/* Main Content */}
      <div className="relative px-4 sm:px-8 lg:px-16 py-24 sm:py-20 mt-3">
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex flex-col xl:flex-row gap-8 items-start">
            {/* Left Side - Text Content - Hidden on mobile, visible from tablet (md) onwards */}
              <HeroSection />
          
            {/* Right Side - Property Images - Visible on mobile and laptop, hidden on tablet only */}
            <div className="space-y-6 lg:space-y-8 w-full md:hidden lg:block xl:w-[35%] order-1 h-[600px] rounded-xl sm:order-2 hero-container2 overflow-hidden relative">
              {/* Current Image */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out h-full w-full"
                style={{
                  backgroundImage: `url('${images[currentImageIndex]}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  transform: isTransitioning ? 'translateX(-100%)' : 'translateX(0)',
                }}
              ></div>

              {/* Next Image sliding in from right */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out h-full w-full"
                style={{
                  backgroundImage: `url('${images[nextImageIndex]}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  transform: isTransitioning ? 'translateX(0)' : 'translateX(100%)',
                }}
              ></div>

              <div className='h-full w-full backdrop-blur-[2px] glassmorph rounded-xl absolute'></div>
              {/* Top Image - Villa
              <div className="rounded-3xl overflow-hidden shadow-2xl h-[600px]">
                <img
                  src="https://a0.muscache.com/im/pictures/81dca5d6-5a86-49bc-8eca-4a8610a07d27.jpg"
                  alt="Luxury Villa"
                  className="w-full h-full object-cover"
                />
              </div> */}

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="fixed bottom-6 right-6 md:hidden p-4 rounded-full shadow-lg z-30"
        style={{ backgroundColor: '#241705' }}
      >
        <div className="space-y-1.5">
          <div className="w-6 h-0.5" style={{ backgroundColor: '#FFF7EB' }}></div>
          <div className="w-6 h-0.5" style={{ backgroundColor: '#FFF7EB' }}></div>
          <div className="w-6 h-0.5" style={{ backgroundColor: '#FFF7EB' }}></div>
        </div>
      </button>
    </div>
  );
}