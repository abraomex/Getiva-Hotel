import { useState, useEffect } from 'react'
import { Link, useOutletContext, useNavigate } from 'react-router-dom'
import { ArrowRight, MapPin, Calendar, Users, Coffee, Flame, Utensils, Wifi, Sparkles, Shield, ChevronRight } from 'lucide-react'
import { HOTEL_INFO, HOTEL_AMENITIES, DINING_VENUES, EVENT_SPACES } from '../data/mockData'
import { api } from '../services/api'
import RoomCard from '../components/RoomCard'

export default function Home() {
  const { openBooking } = useOutletContext()
  const navigate = useNavigate()
  const [featuredRooms, setFeaturedRooms] = useState([])
  const [loadingRooms, setLoadingRooms] = useState(true)

  // Floating filter bar state
  const [filterCategory, setFilterCategory] = useState('')
  const [filterGuests, setFilterGuests] = useState('2')

  useEffect(() => {
    async function loadRooms() {
      try {
        const rooms = await api.getRooms()
        setFeaturedRooms(rooms.slice(0, 3))
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingRooms(false)
      }
    }
    loadRooms()
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (filterCategory) params.set('category', filterCategory)
    if (filterGuests) params.set('guests', filterGuests)
    navigate(`/rooms?${params.toString()}`)
  }

  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Ambient Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
            alt="Getva Hotel mountain retreat in Debre Birhan"
            className="w-full h-full object-cover brightness-65 scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/50" />
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
          <div className="inline-block mb-3">
            <span className="text-[10px] sm:text-xs text-secondary-container tracking-[0.3em] font-semibold uppercase px-4 py-1.5 border border-secondary-container/40 bg-black/40 backdrop-blur-xs">
              DEBRE BIRHAN • ETHIOPIAN HIGHLANDS
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Highland Grandeur &amp; <br className="hidden sm:inline" />
            <span className="italic font-normal text-secondary-container">Bespoke Hospitality</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 font-normal leading-relaxed mb-10">
            Welcome to Getva Hotel. Perched 2,840 meters above sea level in the refreshing mountain climate of Debre Birhan. A sanctuary for executive retreats, romantic weekend escapes, and majestic celebrations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openBooking(null)}
              className="w-full sm:w-auto bg-primary text-on-primary text-xs tracking-widest uppercase px-8 py-4 hover:bg-secondary hover:text-white transition-soft cursor-pointer"
            >
              REQUEST RESERVATION
            </button>
            <Link
              to="/rooms"
              className="w-full sm:w-auto border border-white/60 text-white hover:bg-white hover:text-primary text-xs tracking-widest uppercase px-8 py-4 transition-colors cursor-pointer text-center"
            >
              EXPLORE ROOMS &amp; SUITES
            </Link>
          </div>
        </div>

        {/* Floating Multi-segment Search / Filter Bar (Blueprint Section 3.D) */}
        <div className="absolute bottom-6 left-0 right-0 z-20 px-4 hidden md:block">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-2.5 ambient-shadow max-w-4xl mx-auto flex items-center border border-outline-variant/30 rounded-sm"
          >
            {/* Segment 1: Category */}
            <div className="flex-1 flex items-center border-r border-outline-variant/30 px-4 py-2">
              <span className="text-secondary mr-3 text-xs">◆</span>
              <div className="w-full">
                <label className="block text-[9px] uppercase tracking-wider text-black/50 font-medium">
                  ROOM TYPE
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none text-xs text-on-surface font-medium cursor-pointer"
                >
                  <option value="">All Suites &amp; Rooms</option>
                  <option value="Suites">Executive Suites</option>
                  <option value="Presidential">Presidential</option>
                  <option value="Deluxe">Mountain Deluxe</option>
                  <option value="Standard">Classic King</option>
                  <option value="Twin">Highland Twin</option>
                </select>
              </div>
            </div>

            {/* Segment 2: Guests */}
            <div className="flex-1 flex items-center border-r border-outline-variant/30 px-4 py-2">
              <Users size={16} className="text-secondary mr-3 shrink-0" />
              <div className="w-full">
                <label className="block text-[9px] uppercase tracking-wider text-black/50 font-medium">
                  GUESTS
                </label>
                <select
                  value={filterGuests}
                  onChange={(e) => setFilterGuests(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none text-xs text-on-surface font-medium cursor-pointer"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            </div>

            {/* Segment 3: Location verification */}
            <div className="flex-1 flex items-center px-4 py-2">
              <MapPin size={16} className="text-secondary mr-3 shrink-0" />
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-black/50 font-medium">
                  DESTINATION
                </span>
                <span className="text-xs text-on-surface font-medium">Debre Birhan, Ethiopia</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="bg-primary text-on-primary text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary hover:text-white transition-soft cursor-pointer shrink-0"
            >
              FIND ROOMS
            </button>
          </form>
        </div>
      </section>

      {/* 2. HOTEL INTRODUCTION & HIGHLAND ESSENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="text-left">
              <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-2">
                WARM ETHIOPIAN HOSPITALITY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary tracking-tight leading-tight">
                Where Highland Mist Meets Refined Luxury
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-on-surface/75 leading-relaxed">
              Situated in the historic province of North Shewa, Debre Birhan is renowned for its brisk mountain air, tranquil scenery, and storied heritage dating back to Emperor Zara Yaqob.
            </p>

            <p className="text-xs sm:text-sm text-on-surface/75 leading-relaxed">
              Getva Hotel offers a contemporary haven where guests unwind beside warming stone hearths, savor authentic single-origin coffee ceremonies, and experience elevated dining crafted with fresh highland ingredients.
            </p>

            <div className="pt-2 flex items-center space-x-6">
              <div className="border-l-2 border-secondary pl-4">
                <span className="font-display text-2xl font-bold text-primary block">2,840 m</span>
                <span className="text-[10px] uppercase tracking-wider text-on-surface/60">Highland Elevation</span>
              </div>
              <div className="border-l-2 border-secondary pl-4">
                <span className="font-display text-2xl font-bold text-primary block">130 km</span>
                <span className="text-[10px] uppercase tracking-wider text-on-surface/60">From Addis Ababa</span>
              </div>
              <div className="border-l-2 border-secondary pl-4">
                <span className="font-display text-2xl font-bold text-primary block">24/7</span>
                <span className="text-[10px] uppercase tracking-wider text-on-surface/60">Guest Concierge</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="text-xs text-secondary hover:text-primary transition-colors inline-flex items-center gap-1.5 group tracking-wider uppercase font-semibold"
              >
                <span>LEARN MORE ABOUT GETVA</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-md h-64 sm:h-80 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                  alt="Highland suite comfort"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-md h-44 sm:h-56 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                  alt="Traditional coffee roasting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="relative overflow-hidden rounded-md h-44 sm:h-56 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Fine dining table setting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-md h-64 sm:h-80 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
                  alt="Grand Ballroom event lighting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ROOMS & SUITES (Blueprint Section 3.A & 3.C) */}
      <section className="bg-surface-container-low/50 py-20 border-y border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-2">
                CURATED SELECTION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary tracking-tight">
                Rooms &amp; Mountain Suites
              </h2>
            </div>
            <Link
              to="/rooms"
              className="mt-4 md:mt-0 text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1.5 group tracking-wider uppercase font-semibold"
            >
              <span>EXPLORE ALL ACCOMMODATIONS</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} onBook={openBooking} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOTEL AMENITIES & SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-2">
            EXPERIENCE &amp; CONVENIENCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary tracking-tight">
            Designed for Restful Excellence
          </h2>
          <p className="text-xs sm:text-sm text-on-surface/70 mt-3 leading-relaxed">
            Every feature at Getva Hotel is thoughtfully provided to make your stay effortless, warm, and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOTEL_AMENITIES.map((amenity, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-outline-variant/20 rounded-md card-hover-effect space-y-3"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                {idx === 0 && <Wifi size={20} />}
                {idx === 1 && <Utensils size={20} />}
                {idx === 2 && <Coffee size={20} />}
                {idx === 3 && <Flame size={20} />}
                {idx === 4 && <Users size={20} />}
                {idx === 5 && <Shield size={20} />}
                {idx === 6 && <Sparkles size={20} />}
                {idx === 7 && <Calendar size={20} />}
              </div>
              <h3 className="font-display text-base font-semibold text-primary">{amenity.name}</h3>
              <p className="text-xs text-on-surface/65 leading-relaxed">{amenity.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DINING HIGHLIGHTS PREVIEW */}
      <section className="bg-primary-container text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] text-secondary-container tracking-[0.2em] font-medium uppercase block">
                CULINARY ARTISTRY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
                Authentic Highland Flavors &amp; Global Classics
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                From morning breakfast overlooking the mist to evening conversations by the outdoor terrace fire pit, Getva Hotel's culinary offerings showcase the bounty of the Ethiopian plateau.
              </p>

              <div className="space-y-4 pt-2">
                {DINING_VENUES.map((venue, idx) => (
                  <div key={idx} className="border-b border-white/10 pb-4">
                    <h3 className="font-display text-lg font-medium text-secondary-container">{venue.name}</h3>
                    <p className="text-xs text-white/60 mt-1">{venue.cuisine} • {venue.hours.split('|')[0]}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/restaurant"
                  className="bg-secondary text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-white hover:text-primary transition-soft inline-block"
                >
                  EXPLORE DINING VENUES
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-72 rounded overflow-hidden shadow-lg">
                  <img
                    src={DINING_VENUES[0].image}
                    alt={DINING_VENUES[0].name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs font-display text-white font-medium">
                    The Highland Hearth
                  </span>
                </div>
              </div>

              <div className="space-y-4 sm:pt-8">
                <div className="relative h-72 rounded overflow-hidden shadow-lg">
                  <img
                    src={DINING_VENUES[1].image}
                    alt={DINING_VENUES[1].name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs font-display text-white font-medium">
                    Coffee Roasting Ceremony
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EVENTS & CELEBRATIONS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-2">
            MEETINGS, WEDDINGS &amp; BANQUETS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary tracking-tight">
            The Premier Venue in Debre Birhan
          </h2>
          <p className="text-xs sm:text-sm text-on-surface/70 mt-3 leading-relaxed">
            With pillarless grand ballrooms and executive meeting boardrooms, we accommodate up to 550 delegates with modern audiovisual facilities and tailored banqueting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENT_SPACES.slice(0, 2).map((space, idx) => (
            <div
              key={idx}
              className="bg-white border border-outline-variant/20 rounded-md overflow-hidden card-hover-effect flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={space.image}
                  alt={space.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-[9px] uppercase tracking-widest px-3 py-1 font-semibold">
                  {space.capacity}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-2">{space.name}</h3>
                  <p className="text-xs text-secondary font-medium uppercase tracking-wider mb-3">
                    {space.idealFor}
                  </p>
                  <p className="text-xs text-on-surface/70 leading-relaxed mb-4">{space.description}</p>
                </div>
                <div className="pt-4 border-t border-outline-variant/15 flex items-center justify-between">
                  <span className="text-xs text-on-surface/60">Area: {space.area}</span>
                  <Link
                    to="/events"
                    className="text-xs text-secondary hover:text-primary transition-colors uppercase tracking-wider font-semibold"
                  >
                    VENUE SPECS →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LOCATION & HIGHLAND CLIMATE */}
      <section className="bg-surface-container-low/40 py-20 border-t border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-outline-variant/20 rounded-md p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block">
                  STRATEGIC LOCATION
                </span>
                <h2 className="font-display text-3xl font-semibold text-primary">
                  Gateway to the Historic Northern Circuit
                </h2>
                <p className="text-xs sm:text-sm text-on-surface/75 leading-relaxed">
                  Located along the smooth modern highway just 2 hours northeast of Addis Ababa, Debre Birhan provides an ideal weekend retreat and a central base for business delegations visiting the industrial park.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-on-surface/80">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span>Zone 01, Main Boulevard, Debre Birhan, Ethiopia</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span>Direct highway link to Addis Ababa &amp; Dessie</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 text-center lg:text-right">
                <button
                  onClick={() => openBooking(null)}
                  className="bg-primary text-on-primary text-xs tracking-widest uppercase px-8 py-4 hover:bg-secondary hover:text-white transition-soft cursor-pointer w-full sm:w-auto"
                >
                  PLAN YOUR VISIT
                </button>
                <p className="text-[11px] text-on-surface/50 mt-3">
                  Transfers from Bole International Airport can be coordinated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
