"use client"
import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-2 backdrop-blur-[10px] flex justify-center px-4 sm:px-8 lg:px-16 py-6 w-full bg-[#241705]">
      <div className='flex max-w-[1450px] z-5 w-full justify-between items-center'>
        <a href="/">
          <div className="text-base sm:text-xl lg:text-2xl font-serif tracking-wider flex items-center" style={{ color: '#FCE8CA' }}>
            <img src="./logo.png" className='h-6 w-6 sm:h-8 sm:w-8' alt="" />
            EDENS HOME
          </div>
        </a>

        {/* Navigation Menu - Always Visible */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <a href="/" className="text-xs sm:text-sm md:text-base hover:opacity-70 transition-opacity" style={{ color: '#FCE8CA' }}>
            Home
          </a>
          <a href="/stays" className="text-xs sm:text-sm md:text-base hover:opacity-70 transition-opacity" style={{ color: '#FCE8CA' }}>
            Stays
          </a>
          <a href="/experiences" className="text-xs sm:text-sm md:text-base hover:opacity-70 transition-opacity whitespace-nowrap" style={{ color: '#FCE8CA' }}>
            Experience
          </a>
          <a href="/about" className="text-xs sm:text-sm md:text-base hover:opacity-70 transition-opacity whitespace-nowrap" style={{ color: '#FCE8CA' }}>
            About Us
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar