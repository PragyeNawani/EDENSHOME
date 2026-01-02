"use client"
import { useState, useEffect } from 'react';

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Text Content */}
            <div className="space-y-6 lg:pr-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight">
                <span style={{ color: '#241705' }}>EDENS HOME</span>
              </h1>
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-tight opacity-70"
                style={{ color: '#241705' }}
              >
                Launching Soon in Delhi NCR
              </h2>

              {/* Living Room Image */}
              <div className="mt-8 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80" 
                  alt="Luxury Living Room"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
              </div>
            </div>

            {/* Right Side - Property Images */}
            <div className="space-y-6 lg:space-y-8">
              {/* Top Image - Villa */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" 
                  alt="Luxury Villa"
                  className="w-full h-48 sm:h-64 md:h-80 object-fill h-[600px]"
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