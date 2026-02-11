"use client"
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { User, LogOut, LayoutDashboard } from 'lucide-react'

const Navbar = () => {
  const { user, signOut, loading } = useAuth();

  return (
    <nav className="fixed top-0 left-0 z-50 backdrop-blur-[10px] flex justify-center px-4 sm:px-8 lg:px-16 py-6 w-full bg-[#241705]">
      <div className='flex max-w-[1450px] z-50 w-full justify-between items-center'>
        <a href="/">
          <div className="text-base sm:text-xl lg:text-2xl font-serif tracking-wider flex items-center" style={{ color: '#FCE8CA' }}>
            <img src="/logo.png" className='h-6 w-6 sm:h-8 sm:w-8' alt="" />
            EDENS HOME
          </div>
        </a>

        {/* Navigation Menu */}
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

          {/* Auth Section */}
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Dashboard Link */}
                  <a
                    href="/dashboard"
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:opacity-70 transition-opacity"
                    style={{ color: '#FCE8CA' }}
                    title="Dashboard"
                  >
                    <LayoutDashboard size={18} />
                    <span className="hidden md:inline">Dashboard</span>
                  </a>

                  {/* User Info */}
                  <div className="hidden lg:flex items-center gap-2 text-xs sm:text-sm" style={{ color: '#FCE8CA' }}>
                    <User size={16} />
                    <span>
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </div>

                  {/* Sign Out Button */}
                  <button
                    onClick={signOut}
                    className="flex items-center gap-1 text-xs sm:text-sm hover:opacity-70 transition-opacity"
                    style={{ color: '#FCE8CA' }}
                    title="Sign Out"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                  <a
                    href="/login"
                    className="text-xs sm:text-sm md:text-base hover:opacity-70 transition-opacity"
                    style={{ color: '#FCE8CA' }}
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="text-xs sm:text-sm md:text-base px-3 py-1 sm:px-4 sm:py-2 bg-amber-700 hover:bg-amber-600 rounded-lg transition-colors"
                    style={{ color: '#FCE8CA' }}
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar