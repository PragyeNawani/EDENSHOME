"use client"
import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LayoutDashboard, LogOut, LogIn, UserPlus, User, Settings } from 'lucide-react'

const Navbar = () => {
  const { user, signOut, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user
    ? (user.user_metadata?.full_name
        ? user.user_metadata.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : user.email?.[0]?.toUpperCase() || 'U')
    : null;

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 50;
          background: transparent;
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .nav-logo img {
          height: 32px;
          width: 32px;
        }
        .nav-logo-text {
          font-family: 'Georgia', serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: #FCE8CA;
          display: none;
        }

        /* Nav links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .nav-link {
          font-size: 14px;
          font-weight: 400;
          color: black;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: opacity 0.15s;
        }
        .nav-link:hover { opacity: 0.65; }

        /* Avatar button */
        .avatar-wrap {
          position: relative;
        }
        .avatar-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 2px solid rgba(255,255,255,0.15);
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.15s, transform 0.15s;
          letter-spacing: 0.03em;
          overflow: hidden;
        }
        .avatar-btn:hover {
          border-color: rgba(255,255,255,0.5);
          transform: scale(1.04);
        }
        .avatar-btn.open {
          border-color: rgba(255,255,255,0.7);
        }

        /* Dropdown */
        .avatar-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 220px;
          background: white;
          border-radius: 14px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.1);
          overflow: hidden;
          transform-origin: top right;
          animation: dropdown-in 0.18s ease;
        }
        @keyframes dropdown-in {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* User info header in dropdown */
        .dropdown-user-header {
          padding: 16px 18px 12px;
          border-bottom: 1px solid #f0f0f0;
        }
        .dropdown-user-name {
          font-size: 14px;
          font-weight: 600;
          color: #1a1510;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dropdown-user-email {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Dropdown items */
        .dropdown-items {
          padding: 6px 0;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          font-size: 13.5px;
          color: #333;
          text-decoration: none;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.12s;
        }
        .dropdown-item:hover { background: #f5f5f5; }
        .dropdown-item.danger { color: #d93025; }
        .dropdown-item.danger:hover { background: #fef2f1; }
        .dropdown-item svg { flex-shrink: 0; opacity: 0.75; }
        .dropdown-item.danger svg { opacity: 1; }

        .dropdown-divider {
          height: 1px;
          background: #f0f0f0;
          margin: 4px 0;
        }

        /* Guest dropdown (not logged in) */
        .dropdown-guest-title {
          padding: 14px 18px 10px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1510;
          border-bottom: 1px solid #f0f0f0;
        }

        @media (max-width: 640px) {
          .navbar { padding: 0 16px; }
          .nav-links { gap: 20px; }
          .nav-link { font-size: 13px; }
        }
      `}</style>

      <nav className="navbar">
        {/* Logo */}
        <a href="/" className="nav-logo">
          <img src="/logo.png" alt="Eden's Home" />
          <span className="nav-logo-text">EDENS HOME</span>
        </a>

        {/* Right side */}
        <div className="nav-links">
          <a href="/about" className="nav-link">About</a>
          <a href="/stays" className="nav-link">Stays</a>
          <a href="/experiences" className="nav-link">Experience</a>
          <a href="/contact" className="nav-link">Contact</a>

          {/* Avatar / Auth trigger */}
          {!loading && (
            <div className="avatar-wrap" ref={dropdownRef}>
              <button
                className={`avatar-btn${dropdownOpen ? ' open' : ''}`}
                onClick={() => setDropdownOpen(v => !v)}
                aria-label="Account menu"
                aria-expanded={dropdownOpen}
              >
                {user ? (
                  initials
                ) : (
                  <User size={17} strokeWidth={1.8} />
                )}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="avatar-dropdown">
                  {user ? (
                    <>
                      {/* User identity */}
                      <div className="dropdown-user-header">
                        <div className="dropdown-user-name">{displayName}</div>
                        <div className="dropdown-user-email">{user.email}</div>
                      </div>

                      <div className="dropdown-items">
                        <a
                          href="/dashboard"
                          className="dropdown-item"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <LayoutDashboard size={16} />
                          Dashboard
                        </a>
                        <a
                          href="/profile"
                          className="dropdown-item"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Settings size={16} />
                          Account Settings
                        </a>

                        <div className="dropdown-divider" />

                        <button
                          className="dropdown-item danger"
                          onClick={() => { signOut(); setDropdownOpen(false); }}
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="dropdown-guest-title">Welcome</div>
                      <div className="dropdown-items">
                        <a
                          href="/login"
                          className="dropdown-item"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <LogIn size={16} />
                          Sign In
                        </a>
                        <a
                          href="/register"
                          className="dropdown-item"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <UserPlus size={16} />
                          Create Account
                        </a>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar