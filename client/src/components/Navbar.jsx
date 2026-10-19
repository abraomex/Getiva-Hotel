import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, CalendarCheck, Shield } from 'lucide-react'
import { HOTEL_INFO } from '../data/mockData'
import { useAuth } from '../services/authContext'

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms & Suites', path: '/rooms' },
    { name: 'Dining', path: '/restaurant' },
    { name: 'Events & Banquets', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-outline-variant/20 py-3.5 text-on-surface'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="group flex flex-col items-start focus:outline-none">
            <span
              className={`font-display text-2xl sm:text-3xl font-semibold tracking-tight transition-colors ${
                scrolled || !isHome ? 'text-primary group-hover:text-secondary' : 'text-white group-hover:text-secondary-container'
              }`}
            >
              GETVA
            </span>
            <span
              className={`text-[8px] sm:text-[9px] tracking-[0.25em] font-medium uppercase -mt-1 ${
                scrolled || !isHome ? 'text-secondary' : 'text-secondary-container'
              }`}
            >
              HOTEL • DEBRE BIRHAN
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-widest font-medium transition-colors hover:text-secondary ${
                    isActive
                      ? 'text-secondary border-b-2 border-secondary pb-1'
                      : scrolled || !isHome
                      ? 'text-on-surface/80'
                      : 'text-white/90'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated && (
              <Link
                to="/admin"
                className="text-[10px] tracking-widest uppercase font-semibold text-secondary hover:text-primary flex items-center gap-1 px-2.5 py-1.5 border border-secondary/30 rounded"
                title="Go to Admin Dashboard"
              >
                <Shield size={12} />
                ADMIN
              </Link>
            )}

            <button
              onClick={onOpenBooking}
              className="bg-primary text-on-primary text-xs tracking-widest uppercase px-6 py-2.5 hover:bg-secondary hover:text-white transition-soft cursor-pointer flex items-center gap-2"
            >
              <CalendarCheck size={14} />
              <span>BOOK INQUIRY</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="bg-secondary text-white text-[10px] tracking-wider uppercase px-3 py-1.5 font-medium"
            >
              INQUIRE
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none transition-colors ${
                scrolled || !isHome ? 'text-primary' : 'text-white'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-outline-variant/20">
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-bold tracking-tight text-primary">GETVA</span>
                  <span className="text-[9px] tracking-[0.2em] font-medium text-secondary uppercase">
                    HOTEL • DEBRE BIRHAN
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-on-surface hover:text-secondary focus:outline-none"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-sm uppercase tracking-wider py-2 font-medium border-b border-outline-variant/10 transition-colors ${
                        isActive ? 'text-secondary font-semibold' : 'text-on-surface/80 hover:text-secondary'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                {isAuthenticated && (
                  <NavLink
                    to="/admin"
                    className="text-sm uppercase tracking-wider py-2 font-medium text-secondary flex items-center gap-2 border-b border-outline-variant/10"
                  >
                    <Shield size={16} /> Admin Dashboard
                  </NavLink>
                )}
              </nav>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/20 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenBooking()
                }}
                className="w-full bg-primary text-white text-xs tracking-widest uppercase py-3.5 hover:bg-secondary transition-soft flex items-center justify-center gap-2"
              >
                <CalendarCheck size={16} />
                <span>BOOK AN INQUIRY</span>
              </button>

              <div className="text-xs text-on-surface/60 space-y-1 pt-2">
                <p className="flex items-center gap-2">
                  <Phone size={13} className="text-secondary" />
                  <span>{HOTEL_INFO.phone.split('/')[0].trim()}</span>
                </p>
                <p className="text-[10px] text-on-surface/40 uppercase tracking-wider">
                  Debre Birhan, Amhara, Ethiopia
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
