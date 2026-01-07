"use client"
import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
export default function EdensHome() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

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

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: '#FFF7EB' }}>
      {/* Glassmorphism Cursor */}
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
      />

      {/* Navbar */}
      <nav className="relative z-20 flex justify-between items-center px-4 sm:px-8 lg:px-16 py-6">
        <div className="text-xl sm:text-2xl font-serif tracking-wider" style={{ color: '#241705' }}>
          EDEN'S HOME
        </div>
        <div className="flex items-center gap-6 sm:gap-8">
          <a href="#home" className="hidden md:block text-base hover:opacity-70 transition-opacity" style={{ color: '#241705' }}>
            FaceBook
          </a>
          <a href="#home" className="hidden md:block text-base hover:opacity-70 transition-opacity" style={{ color: '#241705' }}>
            Instagram
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row gap-8 items-start">
            {/* Left Side - Text Content */}
               <HeroSection/>
           

            {/* Right Side - Property Images */}
            <div className="space-y-6 lg:space-y-8 xl:w-[35%] order-1 sm:order-2">
              {/* Top Image - Villa */}
              <div className="rounded-3xl overflow-hidden shadow-2xl h-[600px]">
                <img 
                  src="https://a0.muscache.com/im/pictures/81dca5d6-5a86-49bc-8eca-4a8610a07d27.jpg" 
                  alt="Luxury Villa"
                  className="w-full h-full object-cover"
                />
              </div>

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