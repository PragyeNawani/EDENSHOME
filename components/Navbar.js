"use client"
import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 z-2 backdrop-blur-[10px] flex justify-center px-4 sm:px-8 lg:px-16 py-6 w-full bg-[#241705]">
      <div className='flex max-w-[1450px] z-50 relative w-full justify-between items-center'>
        <div className="text-xl sm:text-2xl font-serif tracking-wider flex items-center" style={{ color: '#FCE8CA' }}>
          <img src="./logo.png" className='h-8 w-8' alt="" />
          EDENS HOME
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="/" className="text-base hover:opacity-70 transition-opacity" style={{ color: '#FCE8CA' }}>
            Home
          </a>
          <a href="/stays" className="text-base hover:opacity-70 transition-opacity" style={{ color: '#FCE8CA' }}>
            Stays
          </a>
          <a href="/experiences" className="text-base hover:opacity-70 transition-opacity" style={{ color: '#FCE8CA' }}>
            Experience
          </a>
          <a href="/about" className="text-base hover:opacity-70 transition-opacity" style={{ color: '#FCE8CA' }}>
            About Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span 
            className={`block w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            style={{ backgroundColor: '#FCE8CA' }}
          />
          <span 
            className={`block w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
            style={{ backgroundColor: '#FCE8CA' }}
          />
          <span 
            className={`block w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            style={{ backgroundColor: '#FCE8CA' }}
          />
        </button>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-[#241705] shadow-xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ paddingTop: '5rem' }}
        >
          <div className="flex flex-col gap-6 px-8">
            <a 
              href="/" 
              className="text-base hover:opacity-70 transition-opacity py-2" 
              style={{ color: '#FCE8CA' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/stays" 
              className="text-base hover:opacity-70 transition-opacity py-2" 
              style={{ color: '#FCE8CA' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Stays
            </a>
            <a 
              href="/experiences" 
              className="text-base hover:opacity-70 transition-opacity py-2" 
              style={{ color: '#FCE8CA' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </a>
            <a 
              href="/about" 
              className="text-base hover:opacity-70 transition-opacity py-2" 
              style={{ color: '#FCE8CA' }}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </a>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  )
}

export default Navbar