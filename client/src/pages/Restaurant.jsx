import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Coffee, Flame, Utensils, Clock, MapPin, Sparkles, Phone, CalendarCheck } from 'lucide-react'
import { DINING_VENUES, HOTEL_INFO } from '../data/mockData'

export default function Restaurant() {
  const { openBooking } = useOutletContext()

  const SAMPLE_MENU = [
    {
      category: 'Highland Ethiopian Specialties',
      description: 'Slow-cooked traditional delicacies served with warm teff injera or artisan crusty bread.',
      items: [
        {
          name: 'Debre Birhan Special Lamb Tibs',
          description: 'Tender cubed highland lamb sautéed with rosemary, red onions, garlic, and clarified seasoned butter (kibe).',
          tag: 'CHEF SIGNATURE',
        },
        {
          name: 'Slow-Simmered Doro Wat',
          description: 'Spiced chicken drumsticks stewed gently in rich berbere gravy, caramelized onions, and farm egg.',
          tag: 'TRADITIONAL',
        },
        {
          name: 'Highland Vegetable Mahberesheb',
          description: 'Colorful platter of slow-cooked yellow split peas (kik alicha), spicy red lentils (misir wat), collard greens (gomen), and beetroot.',
          tag: 'VEGAN',
        },
        {
          name: 'Tegulet Tegabino Shiro',
          description: 'Clay pot bubbling seasoned chickpea stew enriched with garlic, chili peppers, and spiced butter.',
          tag: 'POPULAR',
        },
      ],
    },
    {
      category: 'Continental & Grill Classics',
      description: 'Prepared to order by our culinary team with seasonal mountain herbs.',
      items: [
        {
          name: 'Pan-Roasted Nile Perch Fillet',
          description: 'Crispy skin fresh Nile perch served with lemon caper butter sauce and roasted seasonal vegetables.',
          tag: 'SEAFOOD',
        },
        {
          name: 'Char-Grilled Beef Tenderloin',
          description: 'Prime cut grilled over charcoal, accompanied by red wine reduction and truffle mash.',
          tag: 'GRILL',
        },
        {
          name: 'Highland Wild Mushroom Fettuccine',
          description: 'Fresh egg pasta tossed with sautéed highland mushrooms, parmesan cream, and garlic toast.',
          tag: 'VEGETARIAN',
        },
      ],
    },
    {
      category: 'Coffee & Patisserie',
      description: 'Handcrafted daily using highland honey and single-origin beans.',
      items: [
        {
          name: 'Traditional Coffee Ceremony (Jebena)',
          description: 'Freshly roasted green beans, ground by hand, and brewed three times (Abol, Tona, Baraka) with frankincense aroma.',
          tag: 'EXPERIENCE',
        },
        {
          name: 'Debre Birhan Honey Spice Cake',
          description: 'Warm spiced sponge infused with raw highland honey and cinnamon whipped cream.',
          tag: 'HOUSE SPECIAL',
        },
      ],
    },
  ]

  return (
    <div className="pt-28 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] text-secondary tracking-[0.25em] font-medium uppercase block mb-2">
            GASTRONOMY &amp; COFFEE HERITAGE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary tracking-tight">
            Culinary Experiences
          </h1>
          <p className="text-xs sm:text-sm text-on-surface/70 mt-3 leading-relaxed">
            Dining at Getva Hotel celebrates both the rich culinary soul of the Ethiopian highlands and refined international cuisine. We source fresh herbs, dairy, and seasonal produce from farms around Debre Birhan.
          </p>
        </div>
      </div>

      {/* Venues Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mb-24">
        {DINING_VENUES.map((venue, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Visual */}
            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative h-80 sm:h-96 rounded-md overflow-hidden shadow-md">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-widest px-3 py-1 font-semibold">
                  {venue.type}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className={`lg:col-span-6 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div>
                <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
                  {venue.cuisine}
                </span>
                <h2 className="font-display text-3xl font-semibold text-primary">{venue.name}</h2>
              </div>

              <p className="text-xs sm:text-sm text-on-surface/75 leading-relaxed">
                {venue.description}
              </p>

              <div className="p-3.5 bg-surface-container-low rounded border border-outline-variant/20 space-y-1 text-xs">
                <div className="flex items-center gap-2 font-medium text-primary">
                  <Clock size={14} className="text-secondary" />
                  <span>Verified Service Hours:</span>
                </div>
                <p className="text-on-surface/70 pl-6 text-[11px]">{venue.hours}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-black/50 font-medium block">
                  HIGHLIGHTS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {venue.highlights.map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-white border border-outline-variant/30 text-on-surface/80 rounded-xs"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Curated Sample Menu Section */}
      <section className="bg-surface-container-low/40 py-20 border-t border-outline-variant/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-2">
              CURATED SELECTION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary">
              Sample Dining Menu
            </h2>
            <p className="text-xs text-on-surface/65 mt-2">
              Seasonal dishes crafted by our culinary artisans. Daily specials vary based on highland market availability.
            </p>
          </div>

          <div className="space-y-12">
            {SAMPLE_MENU.map((section, sIdx) => (
              <div key={sIdx} className="bg-white p-8 rounded-md border border-outline-variant/20 shadow-xs">
                <div className="border-b border-outline-variant/20 pb-4 mb-6">
                  <h3 className="font-display text-2xl font-semibold text-primary">{section.category}</h3>
                  <p className="text-xs text-on-surface/60 mt-1">{section.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="space-y-1 border-b md:border-b-0 border-outline-variant/10 pb-4 md:pb-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-base font-medium text-primary">{item.name}</h4>
                        <span className="text-[8px] font-semibold tracking-widest uppercase bg-secondary/10 text-secondary px-2 py-0.5 rounded">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface/65 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Table Reservation Inquiry Callout */}
          <div className="mt-16 bg-primary-container text-white p-8 rounded-md text-center space-y-4">
            <h3 className="font-display text-2xl font-semibold">Reserve a Dining Table or Private Banquet</h3>
            <p className="text-xs text-white/70 max-w-xl mx-auto leading-relaxed">
              For private family dining, executive luncheons, or traditional coffee roasting ceremonies, contact our dining concierge directly.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-secondary text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-white hover:text-primary transition-soft font-medium"
              >
                CONTACT DINING CONCIERGE
              </Link>
              <button
                onClick={() => openBooking(null)}
                className="border border-white/40 text-white hover:bg-white hover:text-primary text-xs tracking-widest uppercase px-8 py-3.5 transition-colors font-medium"
              >
                REQUEST ROOM &amp; DINING
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
