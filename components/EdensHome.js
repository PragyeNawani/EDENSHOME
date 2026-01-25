"use client"
import { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import HeroSection from './HeroSection';

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
    <div className="min-h-screen relative top-0 left-0 overflow-x-hidden w-full h-full" style={{ backgroundColor: '#241705' }}>
      {/* Background Blur Elements - Responsive positioning and sizing */}
      <div className='w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] bg-[#FCE8CA] absolute left-0 top-0 sm:top-10 z-3 blur-[100px] sm:blur-[150px]'></div>
      <div className='w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] bg-[#FCE8CA] absolute bottom-0 right-0 z-3 blur-[100px] sm:blur-[150px]'></div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24 w-full h-full">
          <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-8 items-start">
            {/* Left Side - Text Content */}
            <div className="hero-container h-screen rounded-2xl w-[60%] order-2 hidden md:block w-full xl:w-[60%] sm:order-1 overflow-hidden">
              {/* Current Image */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{
                  backgroundImage: `url('${images[currentImageIndex]}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  transform: isTransitioning ? 'translateX(-100%)' : 'translateX(0)',
                }}
              ></div>

              {/* Next Image sliding in from right */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{
                  backgroundImage: `url('${images[nextImageIndex]}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  transform: isTransitioning ? 'translateX(0)' : 'translateX(100%)',
                }}
              ></div>

              <div className="h-screen w-full backdrop-blur-[2px] glassmorph rounded-xl absolute"></div>
              {/* Text On Div - Sized to fit exactly within overlay-left (33% width, 60% height) */}
              <h1
                className="absolute z-1 left-0 heromainheading [text-shadow:0_5px_20px_#FCE8CA]
                   text-[clamp(20px,2.8vw,42px)]
                   sm:text-[clamp(24px,3vw,45px)]
                   md:text-[clamp(28px,8.5vw,90px)]
                   lg:text-[clamp(42px,8.3vw,115px)]
                   xl:text-[clamp(80px,7.8vw,100px)]
                   leading-[1.1] whitespace-nowrap"
                style={{
                  color: '#FCE8CA',
                  width: '75%',
                }}
              >
                EDENS HOME
              </h1>
              <div className="flex flex-col justify-center items-center absolute z-1 left-0 text-[#FCE8CA] top-[20%] italic font-['Times_New_Roman',Times,serif] opacity-[75%] text-shadow-sm text-shadow-[#FCE8CA]
                   text-[clamp(16px,2.2vw,32px)]
                   sm:text-[clamp(18px,3.4vw,35px)]
                   md:text-[clamp(20px,3.6vw,38px)]
                   lg:text-[clamp(22px,3.8vw,60px)]
                   xl:text-[clamp(24px,4.2vw,53px)]
                   leading-[1.2] whitespace-nowrap">
                <span>Launching Soon!</span>
                <span>Delhi NCR</span>
              </div>
              {/* Top Left Overlay - 33% width, 60% height */}
              <div className="overlay-left"></div>

              {/* Top Center Overlay - 33% width, 40% height, centered at 49% */}
              <div className="overlay-center"></div>
            </div>

            {/* Right Side - Property Images - Responsive visibility and sizing */}
            <div className="space-y-6 lg:space-y-8 w-full md:hidden lg:block xl:w-[35%] order-1 xl:order-2 h-screen rounded-xl hero-container2 overflow-hidden relative">
              {/* Current Image */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out h-full w-full"
                style={{
                  backgroundImage: `url('${images[currentImageIndex]}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: isTransitioning ? 'translateX(-100%)' : 'translateX(0)',
                }}
              ></div>

              {/* Next Image sliding in from right */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out h-full w-full"
                style={{
                  backgroundImage: `url('${images[nextImageIndex]}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: isTransitioning ? 'translateX(0)' : 'translateX(100%)',
                }}
              ></div>

              {/* Glass morphism overlay - responsive blur */}
              <div className='h-full w-full backdrop-blur-[1px] sm:backdrop-blur-[2px] rounded-xl absolute' style={{
                background: 'rgba(255, 255, 255, 0.05)'
              }}></div>
            </div>
          </div>

        
      </div>
    </div>
  );
}