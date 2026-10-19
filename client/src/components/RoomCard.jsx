import { Link } from 'react-router-dom'
import { Users, Maximize2, Sparkles, Check } from 'lucide-react'

export default function RoomCard({ room, onBook }) {
  const primaryImage =
    room.images && room.images.length > 0
      ? room.images.find(img => img.isPrimary)?.url || room.images[0].url
      : 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'

  return (
    <div className="group relative bg-white border border-outline-variant/20 card-hover-effect overflow-hidden rounded-md flex flex-col h-full">
      {/* Image Container with Scrim & Badges */}
      <Link to={`/rooms/${room.slug || room.id}`} className="relative h-64 overflow-hidden block">
        <img
          src={primaryImage}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {room.badge && (
            <span className="text-[9px] font-medium tracking-widest text-white bg-secondary py-1 px-2.5 uppercase">
              {room.badge}
            </span>
          )}
          {room.featured && (
            <span className="text-[9px] font-medium tracking-widest text-on-primary bg-primary py-1 px-2.5 uppercase">
              FEATURED
            </span>
          )}
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Eyebrow info */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-medium text-secondary tracking-widest uppercase">
              {room.category || 'LUXURY SUITE'}
            </span>
            {room.pricePerNight?.amount ? (
              <span className="text-xs font-semibold text-primary">
                {room.pricePerNight.amount.toLocaleString()} {room.pricePerNight.currency || 'ETB'}
                <span className="text-[10px] text-on-surface/50 font-normal"> / night*</span>
              </span>
            ) : (
              <span className="text-[10px] font-medium text-black/55 uppercase tracking-wider">
                RATES ON REQUEST
              </span>
            )}
          </div>

          {/* Main Title */}
          <h3 className="font-display text-xl font-semibold text-primary group-hover:text-secondary transition-colors line-clamp-1 mb-2">
            <Link to={`/rooms/${room.slug || room.id}`}>{room.name}</Link>
          </h3>

          {/* Subtitle / Key Specs */}
          <div className="flex items-center gap-4 text-xs text-on-surface/65 mb-3">
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-secondary" />
              <span>Up to {room.capacity?.maxGuests || 2} Guests</span>
            </span>
            {room.roomSize && (
              <span className="flex items-center gap-1.5">
                <Maximize2 size={13} className="text-secondary" />
                <span>{room.roomSize}</span>
              </span>
            )}
          </div>

          <p className="text-xs text-on-surface/70 line-clamp-2 mb-4 leading-relaxed">
            {room.shortDescription || room.description}
          </p>
        </div>

        {/* Amenity Highlights & Actions */}
        <div>
          <div className="border-t border-outline-variant/15 my-3" />
          
          <div className="flex flex-wrap gap-1.5 mb-5">
            {(room.amenities || []).slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[9px] font-medium tracking-wider uppercase border border-outline-variant/40 px-2.5 py-1 text-on-surface/75 bg-surface-container-low"
              >
                {amenity}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <Link
              to={`/rooms/${room.slug || room.id}`}
              className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1 group tracking-wider uppercase font-medium"
            >
              <span>DETAILS</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            <button
              onClick={() => onBook(room)}
              className="bg-primary text-on-primary text-[11px] tracking-widest uppercase px-4 py-2 hover:bg-secondary hover:text-white transition-soft cursor-pointer"
            >
              INQUIRE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
