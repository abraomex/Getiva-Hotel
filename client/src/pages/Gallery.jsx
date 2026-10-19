import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react'
import { api } from '../services/api'
import { GALLERY_ITEMS } from '../data/mockData'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    async function loadGallery() {
      setLoading(true)
      try {
        const data = await api.getGallery(activeCategory)
        setItems(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadGallery()
  }, [activeCategory])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % items.length)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + items.length) % items.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, items.length])

  const categories = [
    { label: 'All Photographs', value: 'all' },
    { label: 'Rooms & Suites', value: 'rooms' },
    { label: 'Highland Dining', value: 'dining' },
    { label: 'Banquets & Events', value: 'events' },
    { label: 'Exterior & Gardens', value: 'exterior' },
  ]

  const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] text-secondary tracking-[0.25em] font-medium uppercase block mb-2">
            VISUAL PORTFOLIO
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary tracking-tight">
            The Getva Experience
          </h1>
          <p className="text-xs sm:text-sm text-on-surface/70 mt-3 leading-relaxed">
            A glimpse into the architecture, mountain atmosphere, culinary arts, and celebratory occasions in Debre Birhan.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setActiveCategory(c.value)}
              className={`text-xs uppercase tracking-wider px-4 py-2 rounded-xs font-medium transition-colors cursor-pointer ${
                activeCategory === c.value
                  ? 'bg-secondary text-white shadow-xs'
                  : 'bg-white text-on-surface/70 hover:bg-surface-container-low border border-outline-variant/30'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs uppercase tracking-widest text-on-surface/50">Loading gallery photographs...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center bg-white border border-outline-variant/20 rounded-md">
            <p className="text-sm font-medium text-primary">No images in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative bg-white rounded-md overflow-hidden border border-outline-variant/20 card-hover-effect cursor-pointer"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title || item.alt || 'Getva Hotel Photo'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-medium tracking-widest uppercase bg-black/60 backdrop-blur-xs text-white px-2.5 py-1">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={14} />
                  </div>

                  {/* Caption banner */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-display text-base font-medium line-clamp-1">{item.title}</h3>
                    {item.caption && (
                      <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">{item.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-50 focus:outline-none"
            aria-label="Close Lightbox"
          >
            <X size={28} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev - 1 + items.length) % items.length)
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-50 bg-black/40 hover:bg-black/80 rounded-full transition-colors focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev + 1) % items.length)
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-50 bg-black/40 hover:bg-black/80 rounded-full transition-colors focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image & Caption Container */}
          <div
            className="max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.url}
              alt={currentItem.title || currentItem.alt || 'Getva Hotel Photo'}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xs shadow-2xl"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-secondary-container">
                {currentItem.category} • {lightboxIndex + 1} of {items.length}
              </span>
              <h3 className="font-display text-lg font-semibold">{currentItem.title}</h3>
              {currentItem.caption && (
                <p className="text-xs text-white/60 max-w-xl mx-auto">{currentItem.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
