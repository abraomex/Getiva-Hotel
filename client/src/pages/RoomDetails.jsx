import { useState, useEffect } from 'react'
import { useParams, Link, useOutletContext } from 'react-router-dom'
import { ArrowLeft, Users, Maximize2, Check, ShieldCheck, Calendar, Info, Clock } from 'lucide-react'
import { api } from '../services/api'

export default function RoomDetails() {
  const { slug } = useParams()
  const { openBooking } = useOutletContext()
  const [room, setRoom] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadRoom() {
      setLoading(true)
      try {
        const data = await api.getRoomBySlug(slug)
        setRoom(data)
      } catch (err) {
        setError(err.message || 'Room not found')
      } finally {
        setLoading(false)
      }
    }
    loadRoom()
  }, [slug])

  if (loading) {
    return (
      <div className="pt-36 pb-24 text-center">
        <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs uppercase tracking-widest text-on-surface/50">Loading suite details...</p>
      </div>
    )
  }

  if (error || !room) {
    return (
      <div className="pt-36 pb-24 max-w-xl mx-auto px-4 text-center">
        <h2 className="font-display text-2xl font-bold text-primary mb-3">Room Not Found</h2>
        <p className="text-xs text-on-surface/70 mb-6">{error || 'The requested accommodation could not be located.'}</p>
        <Link
          to="/rooms"
          className="bg-primary text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-secondary transition-soft"
        >
          BACK TO ALL ROOMS
        </Link>
      </div>
    )
  }

  const images = room.images && room.images.length > 0 ? room.images : [{ url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', alt: room.name }]
  const currentImage = images[activeImageIndex] || images[0]

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface/60 hover:text-secondary transition-colors"
          >
            <ArrowLeft size={14} />
            <span>ALL ROOMS &amp; SUITES</span>
          </Link>
        </div>

        {/* Room Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-outline-variant/20 mb-8">
          <div>
            <span className="text-[10px] text-secondary tracking-[0.25em] font-medium uppercase block mb-1">
              {room.category || 'LUXURY SUITE'} • GETVA HOTEL
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight">
              {room.name}
            </h1>
            <p className="text-xs text-on-surface/60 mt-1 flex items-center gap-3">
              <span>Debre Birhan, Ethiopia</span>
              <span>•</span>
              <span>{room.view || 'Panoramic Highland View'}</span>
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end">
            {room.pricePerNight?.amount ? (
              <div className="text-left lg:text-right">
                <span className="text-2xl font-display font-bold text-primary">
                  {room.pricePerNight.amount.toLocaleString()} {room.pricePerNight.currency || 'ETB'}
                </span>
                <span className="text-xs text-on-surface/60 block">per night (indicative rate)</span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                Rates Provided Upon Inquiry
              </span>
            )}
            <button
              onClick={() => openBooking(room)}
              className="mt-3 bg-primary text-on-primary text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary hover:text-white transition-soft cursor-pointer"
            >
              REQUEST THIS SUITE
            </button>
          </div>
        </div>

        {/* Main Gallery Showcase */}
        <div className="space-y-4 mb-12">
          <div className="relative h-96 sm:h-[480px] w-full rounded-md overflow-hidden shadow-md">
            <img
              src={currentImage.url}
              alt={currentImage.alt || room.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {room.badge && (
              <div className="absolute top-4 left-4 bg-secondary text-white text-[9px] uppercase tracking-widest px-3 py-1 font-semibold">
                {room.badge}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 w-28 shrink-0 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-secondary scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.alt || `Room photo ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content & Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white border border-outline-variant/20 rounded-md">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-black/50 font-medium">CAPACITY</span>
                <span className="text-xs font-semibold text-primary mt-0.5 block">
                  Up to {room.capacity?.maxGuests || 2} Guests
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-black/50 font-medium">BED CONFIGURATION</span>
                <span className="text-xs font-semibold text-primary mt-0.5 block">
                  {room.bedType || 'King Bed'}
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-black/50 font-medium">ROOM DIMENSIONS</span>
                <span className="text-xs font-semibold text-primary mt-0.5 block">
                  {room.roomSize || '45 m² / 484 sq ft'}
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-black/50 font-medium">VIEW</span>
                <span className="text-xs font-semibold text-primary mt-0.5 block">
                  {room.view || 'Mountain Plateau'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-primary">About the Accommodation</h2>
              <p className="text-xs sm:text-sm text-on-surface/80 leading-relaxed whitespace-pre-line">
                {room.description}
              </p>
            </div>

            {/* Amenities List */}
            <div className="space-y-4 pt-4 border-t border-outline-variant/15">
              <h3 className="font-display text-xl font-semibold text-primary">Curated Suite Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(room.amenities || []).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 bg-surface-container-low rounded text-xs text-on-surface/80">
                    <span className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                      <Check size={12} />
                    </span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Policies Note */}
            <div className="bg-surface-container-low p-5 rounded-md border border-outline-variant/20 space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-primary flex items-center gap-2">
                <Clock size={14} className="text-secondary" />
                <span>Check-in &amp; Check-out Policies</span>
              </h4>
              <p className="text-xs text-on-surface/70 leading-relaxed">
                Check-in begins at 14:00 (2:00 PM). Check-out is scheduled by 11:00 AM. Early arrivals and late departures are accommodated subject to room availability upon advance request.
              </p>
            </div>
          </div>

          {/* Right Inquiry Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-outline-variant/20 p-6 rounded-md shadow-sm space-y-6">
              <div>
                <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
                  DIRECT RESERVATION INQUIRY
                </span>
                <h3 className="font-display text-xl font-semibold text-primary">
                  Request {room.name}
                </h3>
                <p className="text-xs text-on-surface/60 mt-1">
                  Our front desk team will contact you to confirm available dates and guest preferences.
                </p>
              </div>

              <div className="p-3 bg-secondary/10 rounded text-xs text-secondary space-y-1">
                <p className="font-semibold">Notice regarding reservations:</p>
                <p className="text-[11px] leading-relaxed">
                  Inquiries do not charge your credit card or claim an instant confirmed booking. Official availability is verified by Getva Hotel reception.
                </p>
              </div>

              <button
                onClick={() => openBooking(room)}
                className="w-full bg-primary text-on-primary text-xs tracking-widest uppercase py-4 hover:bg-secondary hover:text-white transition-soft cursor-pointer flex items-center justify-center gap-2 font-medium"
              >
                <Calendar size={14} />
                <span>OPEN INQUIRY FORM</span>
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/contact"
                  className="text-[11px] text-secondary hover:text-primary transition-colors tracking-wider uppercase font-medium"
                >
                  Need corporate group rates? Contact us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
