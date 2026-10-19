import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ArrowRight, Shield } from 'lucide-react'
import { HOTEL_INFO } from '../data/mockData'

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="bg-primary-container text-white/80 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          
          {/* Column 1: Brand & Heritage */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-display text-3xl font-semibold tracking-tight text-white">GETVA</span>
              <span className="text-[9px] tracking-[0.25em] font-medium text-secondary-container uppercase">
                HOTEL • DEBRE BIRHAN
              </span>
            </div>
            <p className="text-xs text-white/65 leading-relaxed">
              Curated highland sanctuary elevating Ethiopian hospitality. Designed for discerning travelers, executive summits, and unforgettable family celebrations in Debre Birhan.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 text-xs text-secondary-container hover:text-white uppercase tracking-widest font-medium transition-colors"
              >
                <span>REQUEST RESERVATION</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <span className="text-[10px] text-secondary-container tracking-[0.2em] font-medium uppercase block mb-3">
              EXPLORE
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/rooms" className="text-white/70 hover:text-white transition-colors">
                  Rooms & Mountain Suites
                </Link>
              </li>
              <li>
                <Link to="/restaurant" className="text-white/70 hover:text-white transition-colors">
                  Highland Hearth Restaurant
                </Link>
              </li>
              <li>
                <Link to="/restaurant" className="text-white/70 hover:text-white transition-colors">
                  Coffee & Pastry Lounge
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-white/70 hover:text-white transition-colors">
                  Emperor Grand Ballroom
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-white/70 hover:text-white transition-colors">
                  Conference & Boardrooms
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/70 hover:text-white transition-colors">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  About Getva Hotel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-3">
            <span className="text-[10px] text-secondary-container tracking-[0.2em] font-medium uppercase block mb-3">
              LOCATION & CONTACT
            </span>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-secondary-container shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-secondary-container shrink-0" />
                <span>{HOTEL_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-secondary-container shrink-0" />
                <span>{HOTEL_INFO.inquiriesEmail}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={14} className="text-secondary-container shrink-0" />
                <span>Reception: 24 Hours / 7 Days</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Important Inquiries Notice */}
          <div className="space-y-3 bg-white/5 p-5 border border-white/10 rounded-sm">
            <span className="text-[10px] text-secondary-container tracking-[0.2em] font-medium uppercase block">
              BOOKING NOTICE
            </span>
            <p className="text-[11px] text-white/60 leading-relaxed">
              Inquiries submitted through this website are reservation requests reviewed by our guest services team. A request does not constitute an instant confirmed booking until validated by hotel management.
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-white/50">Admin Portal</span>
              <Link
                to="/admin/login"
                className="text-secondary-container hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <Shield size={12} />
                <span>Staff Sign-In</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demonstration Disclaimer */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Getva Hotel. Proposed website demonstration for Debre Birhan, Ethiopia.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <Link to="/contact" className="hover:text-white transition-colors">
              Privacy & Inquiries
            </Link>
            <Link to="/admin/login" className="hover:text-white transition-colors">
              Management Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
