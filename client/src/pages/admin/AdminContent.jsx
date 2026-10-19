import { useState, useEffect } from 'react'
import { Save, CheckCircle2 } from 'lucide-react'
import { HOTEL_INFO } from '../../data/mockData'

export default function AdminContent() {
  const [content, setContent] = useState({
    heroTitle: 'Highland Grandeur & Bespoke Hospitality',
    heroSubtitle: 'Welcome to Getva Hotel. Perched 2,840 meters above sea level in the refreshing mountain climate of Debre Birhan. A sanctuary for executive retreats, romantic weekend escapes, and majestic celebrations.',
    aboutStory: HOTEL_INFO.description,
    phone: HOTEL_INFO.phone,
    email: HOTEL_INFO.email,
    address: HOTEL_INFO.address,
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setContent(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    localStorage.setItem('getva_custom_site_content', JSON.stringify(content))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
          CONTENT MANAGEMENT SYSTEM
        </span>
        <h1 className="font-display text-3xl font-bold text-primary">Website Content</h1>
        <p className="text-xs text-on-surface/60 mt-1">
          Customize visible headlines, hotel descriptions, and official contact details.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Website content saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-md border border-outline-variant/20 shadow-xs space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-primary border-b border-outline-variant/15 pb-2">
            Homepage Hero Section
          </h3>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
              HERO PRIMARY HEADLINE
            </label>
            <input
              type="text"
              name="heroTitle"
              value={content.heroTitle}
              onChange={handleChange}
              className="w-full p-2.5 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
              HERO SUBTITLE NARRATIVE
            </label>
            <textarea
              rows={3}
              name="heroSubtitle"
              value={content.heroSubtitle}
              onChange={handleChange}
              className="w-full p-2.5 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-outline-variant/15">
          <h3 className="font-display text-lg font-semibold text-primary border-b border-outline-variant/15 pb-2">
            About &amp; Heritage Copy
          </h3>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
              HOTEL ESSENCE DESCRIPTION
            </label>
            <textarea
              rows={4}
              name="aboutStory"
              value={content.aboutStory}
              onChange={handleChange}
              className="w-full p-2.5 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-outline-variant/15">
          <h3 className="font-display text-lg font-semibold text-primary border-b border-outline-variant/15 pb-2">
            Contact &amp; Location Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                TELEPHONE NUMBER(S)
              </label>
              <input
                type="text"
                name="phone"
                value={content.phone}
                onChange={handleChange}
                className="w-full p-2.5 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                INQUIRIES EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={content.email}
                onChange={handleChange}
                className="w-full p-2.5 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
              OFFICIAL PHYSICAL ADDRESS
            </label>
            <input
              type="text"
              name="address"
              value={content.address}
              onChange={handleChange}
              className="w-full p-2.5 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-outline-variant/20">
          <button
            type="submit"
            className="bg-primary text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-secondary transition-soft flex items-center gap-2 cursor-pointer font-medium"
          >
            <Save size={14} />
            <span>SAVE CONTENT EDITS</span>
          </button>
        </div>
      </form>
    </div>
  )
}
