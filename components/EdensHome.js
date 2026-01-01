"use client"
import { useState, useEffect } from 'react';
import { Facebook, Instagram } from 'lucide-react';

export default function EdensHome() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showContent, setShowContent] = useState(false);
  const [logoScale, setLogoScale] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Start animation sequence
    setTimeout(() => setLogoScale(true), 100);
    setTimeout(() => setShowContent(true), 1500);

    // Countdown timer
    const targetDate = new Date('2026-02-15T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    // Track cursor position
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#241705' }}>
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)',
          filter: 'brightness(0.4)'
        }}
      />

      {/* Glassmorphism Cursor */}
      <div
        className="fixed pointer-events-none z-50 rounded-full"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: '60px',
          height: '60px',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(2px) invert(0.8)',
          WebkitBackdropFilter: 'blur(2px) invert(0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.08s ease-out'
        }}
      />

      {/* Navbar */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6">
        <div className="text-2xl font-bold tracking-wider" style={{ color: '#FFF7EB' }}>
          EDENS HOME
        </div>
        <div className="flex gap-4">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full transition-all hover:scale-110"
            style={{ backgroundColor: 'rgba(255, 247, 235, 0.1)' }}
          >
            <Facebook size={20} style={{ color: '#FFF7EB' }} />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full transition-all hover:scale-110"
            style={{ backgroundColor: 'rgba(255, 247, 235, 0.1)' }}
          >
            <Instagram size={20} style={{ color: '#FFF7EB' }} />
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4">
        {/* Animated Logo */}
        <div 
          className="transition-all duration-1000 ease-out mb-8"
          style={{
            transform: logoScale ? 'scale(1)' : 'scale(3)',
            opacity: logoScale ? 1 : 0
          }}
        >
          <h1 
            className="text-7xl md:text-9xl font-bold tracking-widest text-center"
            style={{ 
              color: '#FFF7EB',
              textShadow: '0 0 30px rgba(240, 148, 16, 0.5)'
            }}
          >
            EDENS HOME
          </h1>
        </div>

        {/* Launching Soon - Fades in after animation */}
        <div 
          className="transition-all duration-1000"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <h2 
            className="text-3xl md:text-4xl font-light tracking-wider text-center mb-4"
            style={{ color: '#FFF7EB' }}
          >
            LAUNCHING SOON
          </h2>
          
          <p 
            className="text-center mb-12 max-w-2xl mx-auto text-lg"
            style={{ color: 'rgba(255, 247, 235, 0.8)' }}
          >
            Our website is under construction, we are working very hard to give you the best experience with this site
          </p>

          {/* Countdown Timer */}
          <div className="flex gap-6 justify-center">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-6 rounded-lg backdrop-blur-sm"
                style={{ 
                  backgroundColor: 'rgba(36, 23, 5, 0.8)',
                  border: '2px solid rgba(240, 148, 16, 0.3)'
                }}
              >
                <div 
                  className="text-5xl font-bold mb-2"
                  style={{ color: '#F09410' }}
                >
                  {String(item.value).padStart(2, '0')}
                </div>
                <div 
                  className="text-sm tracking-widest"
                  style={{ color: '#FFF7EB' }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="relative z-10 text-center py-6"
        style={{ color: 'rgba(255, 247, 235, 0.6)' }}
      >
        <p className="text-sm">Copyright 2025 | EDENS HOME coming soon Template. All Rights Reserved.</p>
      </div>
    </div>
  );
}