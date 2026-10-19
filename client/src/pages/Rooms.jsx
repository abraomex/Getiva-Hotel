import { useState, useEffect } from 'react'
import { useSearchParams, useOutletContext } from 'react-router-dom'
import { Filter, SlidersHorizontal, Info, Search } from 'lucide-react'
import { api } from '../services/api'
import RoomCard from '../components/RoomCard'

export default function Rooms() {
  const { openBooking } = useOutletContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [guestCount, setGuestCount] = useState(searchParams.get('guests') || '')
  const [sortBy, setSortBy] = useState('recommended')

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await api.getRooms({
          category: category !== 'All' ? category : '',
          guests: guestCount,
        })
        setRooms(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [category, guestCount])

  // Client-side sort
  const sortedRooms = [...rooms].sort((a, b) => {
    if (sortBy === 'price-low') {
      return (a.pricePerNight?.amount || 0) - (b.pricePerNight?.amount || 0)
    }
    if (sortBy === 'price-high') {
      return (b.pricePerNight?.amount || 0) - (a.pricePerNight?.amount || 0)
    }
    if (sortBy === 'capacity') {
      return (b.capacity?.maxGuests || 0) - (a.capacity?.maxGuests || 0)
    }
    return (a.sortOrder || 0) - (b.sortOrder || 0)
  })

  const categories = ['All', 'Suites', 'Presidential', 'Deluxe', 'Standard', 'Twin']

  const handleCategorySelect = (cat) => {
    setCategory(cat)
    if (cat === 'All') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', cat)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="pt-28 pb-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] text-secondary tracking-[0.25em] font-medium uppercase block mb-2">
            ACCOMMODATION &amp; SANCTUARIES
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary tracking-tight">
            Highland Rooms &amp; Suites
          </h1>
          <p className="text-xs sm:text-sm text-on-surface/70 mt-3 leading-relaxed">
            Every room and suite at Getva Hotel blends contemporary minimalist comfort with authentic Ethiopian design textures, offering panoramic views across the Debre Birhan plateau.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="mt-12 bg-white border border-outline-variant/20 p-4 sm:p-5 rounded-md shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-black/50 font-medium mr-1 hidden sm:inline">
              TYPE:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 transition-colors cursor-pointer rounded-sm ${
                  category === cat
                    ? 'bg-secondary text-white shadow-xs'
                    : 'bg-surface-container-low text-on-surface/75 hover:bg-outline-variant/30 border border-outline-variant/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Guests & Sort Controls */}
          <div className="flex items-center gap-3">
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="text-xs border border-outline-variant/40 bg-surface px-3 py-2 rounded focus:outline-none text-on-surface"
            >
              <option value="">Any Guest Capacity</option>
              <option value="1">1+ Guest</option>
              <option value="2">2+ Guests</option>
              <option value="3">3+ Guests</option>
              <option value="4">4+ Guests</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-outline-variant/40 bg-surface px-3 py-2 rounded focus:outline-none text-on-surface"
            >
              <option value="recommended">Featured Order</option>
              <option value="price-low">Rate: Low to High</option>
              <option value="price-high">Rate: High to Low</option>
              <option value="capacity">Max Capacity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-widest text-on-surface/50">Loading suites...</p>
          </div>
        ) : sortedRooms.length === 0 ? (
          <div className="py-20 text-center bg-white border border-outline-variant/20 rounded-md p-8">
            <p className="text-sm font-medium text-primary mb-2">No rooms match your filter criteria.</p>
            <p className="text-xs text-on-surface/60 mb-4">
              Try selecting "All" or adjusting your guest count.
            </p>
            <button
              onClick={() => {
                setCategory('All')
                setGuestCount('')
              }}
              className="bg-primary text-white text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-secondary transition-soft"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedRooms.map((room) => (
              <RoomCard key={room.id} room={room} onBook={openBooking} />
            ))}
          </div>
        )}

        {/* Pricing Notice */}
        <div className="mt-16 bg-surface-container-low p-4 rounded-md border border-outline-variant/20 text-xs text-on-surface/70 flex items-start gap-3 max-w-4xl mx-auto">
          <Info size={18} className="text-secondary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-primary">Indicative Pricing &amp; Reservation Policy</p>
            <p className="text-[11px] leading-relaxed text-on-surface/65">
              Room rates displayed in Ethiopian Birr (ETB) are estimated starting figures provided for design demonstration. Final room charges, corporate corporate discount agreements, VAT, and official service charges are confirmed when our reservation desk responds to your booking inquiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
