import { Link } from 'react-router-dom'
import { Mountain, Flame, Coffee, HeartHandshake, ShieldCheck, MapPin, Compass } from 'lucide-react'
import { HOTEL_INFO } from '../data/mockData'

export default function About() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] text-secondary tracking-[0.25em] font-medium uppercase block mb-2">
            HERITAGE &amp; VISION
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary tracking-tight">
            The Story of Getva Hotel
          </h1>
          <p className="text-xs sm:text-sm text-on-surface/70 mt-3 leading-relaxed">
            Rooted in the invigorating high plateaus of Debre Birhan, Getva Hotel was conceived as a refined sanctuary where modern architecture honors centuries of warm Ethiopian hospitality.
          </p>
        </div>
      </div>

      {/* Main Narrative Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block">
              LOCATION &amp; ATMOSPHERE
            </span>
            <h2 className="font-display text-3xl font-semibold text-primary leading-tight">
              A City of Historic Light in the Ethiopian Highlands
            </h2>
            <p className="text-xs sm:text-sm text-on-surface/75 leading-relaxed">
              Debre Birhan, meaning "Mount of Light", was established in the 15th century by Emperor Zara Yaqob. Standing at 2,840 meters above sea level in North Shewa, the city is blessed with fresh cool mountain breezes, eucalyptus-scented hills, and a vibrant community.
            </p>
            <p className="text-xs sm:text-sm text-on-surface/75 leading-relaxed">
              Recognizing Debre Birhan's rapid emergence as a vital economic center and a gateway to Ankober and northern historical treasures, Getva Hotel is designed to meet international standards for business delegations, wedding parties, and leisurely highland travelers.
            </p>
            <div className="p-4 bg-surface-container-low rounded border-l-2 border-secondary text-xs text-on-surface/70 space-y-1">
              <p className="font-medium text-primary">Authenticity Commitment:</p>
              <p>
                We believe in genuine hospitality over generic luxury. Our interiors feature artisan Ethiopian stonework, locally crafted hardwood details, and textiles woven in the surrounding region.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-md overflow-hidden shadow-lg h-96 sm:h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
                alt="Getva Hotel scenic highland view"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[9px] uppercase tracking-widest text-secondary-container">
                  DEBRE BIRHAN, NORTH SHEWA
                </span>
                <p className="font-display text-lg font-medium mt-1">
                  Invigorating altitude and serene plateau horizons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principles Grid */}
      <section className="bg-surface-container-low/50 py-20 border-y border-outline-variant/15 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-2">
              OUR GUIDING PILLARS
            </span>
            <h2 className="font-display text-3xl font-semibold text-primary">
              Hospitality with Substance &amp; Purpose
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-md border border-outline-variant/20 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <HeartHandshake size={24} />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary">Genuine Ethiopian Warmth</h3>
              <p className="text-xs text-on-surface/70 leading-relaxed">
                Hospitality is a deeply ingrained cultural tradition in Ethiopia. Every guest is welcomed with attentive care, respectful service, and unhurried friendliness.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md border border-outline-variant/20 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <Flame size={24} />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary">Highland Coziness</h3>
              <p className="text-xs text-on-surface/70 leading-relaxed">
                Because highland evenings can be pleasantly brisk, our suites and common salons are outfitted with stone fireplaces, plush premium linens, and warm ambient lighting.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md border border-outline-variant/20 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <Coffee size={24} />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary">Community Partnerships</h3>
              <p className="text-xs text-on-surface/70 leading-relaxed">
                We take pride in sourcing dairy, honey, grains, and meats from local farmers and agricultural producers across North Shewa, supporting regional economic vitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstration Notice */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-white border border-outline-variant/20 rounded-md text-center space-y-3">
          <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block">
            DEMONSTRATION PROPOSAL
          </span>
          <h3 className="font-display text-xl font-semibold text-primary">
            A Vision for Prospective Hotel Stakeholders
          </h3>
          <p className="text-xs text-on-surface/70 leading-relaxed max-w-2xl mx-auto">
            This digital platform represents a proposed website architecture and luxury design system developed for Getva Hotel. Imagery and textual outlines represent placeholder demonstration assets that can be customized with official photography, licensing, and corporate documentation upon client onboarding.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-block bg-primary text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-secondary transition-soft"
            >
              CONTACT THE TEAM
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
