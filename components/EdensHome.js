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
    '1.jpeg',
    '2.jpeg',
    '3.jpeg',
    '4.jpeg',
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
      }, 1500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative top-0 left-0 overflow-x-hidden w-full h-full" style={{ backgroundColor: '#241705' }}>
      {/* Background Blur Elements - Responsive positioning and sizing */}
      <div className='w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] bg-[#FCE8CA] absolute left-0 top-0 sm:top-10 z-3 blur-[100px] sm:blur-[150px]'></div>
      <div className='w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] bg-[#FCE8CA] absolute bottom-0 right-0 z-3 blur-[100px] sm:blur-[150px]'></div>
      
      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24 w-full h-full">
        <div className="max-w-7xl w-full mx-auto h-full">
          <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-8 items-start">
            {/* Left Side - Text Content */}
            <HeroSection />
          
            {/* Right Side - Property Images - Responsive visibility and sizing */}
            <div className="space-y-6 mt-9 sm:mt-0 lg:space-y-8 w-full md:hidden lg:block xl:w-[35%] order-1 xl:order-2 h-[500px] sm:h-screen rounded-xl hero-container2 overflow-hidden relative">
              {/* Current Image */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out h-full w-full blur-[5px] sm:blur-[0px]"
                style={{
                  backgroundImage: `url('/${images[currentImageIndex]}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: isTransitioning ? 'translateX(-100%)' : 'translateX(0)',
                }}
              ></div>

              {/* Next Image sliding in from right */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out h-full w-full blur-[5px] sm:blur-[0px]"
                style={{
                  backgroundImage: `url('/${images[nextImageIndex]}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: isTransitioning ? 'translateX(0)' : 'translateX(100%)',
                }}
              ></div>
              <div className='absolute sm:hidden w-full h-full bg-white opacity-[10%]'></div>
              <div className='relative top-0 left-0 z-4 h-full flex flex-col justify-center items-center text-[#241705] sm:hidden '>
                <span className='text-6xl [text-shadow:0_5px_20px_#241705] heromainheading mb-10'>EDENS HOME</span>
                <span className="text-4xl italic font-['Times_New_Roman',Times,serif]">Launching soon</span>
                <span className="text-4xl italic font-['Times_New_Roman',Times,serif]">Delhi NCR</span>
              </div>
              {/* Glass morphism overlay - responsive blur */}
              <div className='h-full w-full backdrop-blur-[1px] sm:backdrop-blur-[0px] rounded-xl absolute' style={{
                background: 'rgba(255, 255, 255, 0.05)'
              }}></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}