import { useState } from 'react'
import { CheckCircle2, Users, Calendar, Sparkles, Building, Video, Shield, Phone, Mail } from 'lucide-react'
import { EVENT_SPACES, HOTEL_INFO } from '../data/mockData'
import { api } from '../services/api'

export default function Events() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding Celebration',
    spaceName: 'The Emperor Grand Ballroom',
    guestCount: '150',
    preferredDate: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await api.submitContactInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `[Event Inquiry] ${formData.eventType} - ${formData.guestCount} Guests`,
        message: `Event Space: ${formData.spaceName}\nPreferred Date: ${formData.preferredDate}\nEstimated Guests: ${formData.guestCount}\nDetails: ${formData.message}`,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Error submitting event inquiry')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-28 pb-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] text-secondary tracking-[0.25em] font-medium uppercase block mb-2">
            WEDDINGS, BANQUETS &amp; EXECUTIVE SUMMITS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary tracking-tight">
            Events &amp; Conferences
          </h1>
          <p className="text-xs sm:text-sm text-on-surface/70 mt-3 leading-relaxed">
            Host distinguished gatherings in Debre Birhan. From majestic Ethiopian wedding celebrations in our Grand Ballroom to hybrid executive seminars equipped with high-speed fiber internet.
          </p>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENT_SPACES.map((space, idx) => (
            <div
              key={idx}
              className="bg-white border border-outline-variant/20 rounded-md overflow-hidden card-hover-effect flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
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

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
                    {space.idealFor}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-2">
                    {space.name}
                  </h3>
                  <p className="text-xs text-on-surface/70 leading-relaxed mb-4">
                    {space.description}
                  </p>

                  <div className="border-t border-outline-variant/15 pt-4 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-black/50 font-medium block">
                      KEY SPECIFICATIONS:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-on-surface/80">
                      {space.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant/15 mt-6 flex items-center justify-between">
                  <span className="text-xs text-on-surface/60 font-medium">Floor Area: {space.area}</span>
                  <a
                    href="#eventInquiryForm"
                    onClick={() => setFormData(prev => ({ ...prev, spaceName: space.name }))}
                    className="text-xs text-secondary hover:text-primary transition-colors uppercase tracking-wider font-semibold"
                  >
                    INQUIRE FOR THIS VENUE ↓
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Services Features */}
      <section className="bg-primary-container text-white py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] text-secondary-container tracking-[0.2em] font-medium uppercase block mb-2">
              COMPREHENSIVE SUPPORT
            </span>
            <h2 className="font-display text-3xl font-semibold text-white">Full-Service Event Execution</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            <div className="space-y-3 p-4 bg-white/5 rounded border border-white/10">
              <Sparkles size={24} className="text-secondary-container mx-auto sm:mx-0" />
              <h3 className="font-display text-lg font-medium">Bespoke Wedding Styling</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Stage design, floral arrangements, bridal dressing suites, and red carpet entrance.
              </p>
            </div>
            <div className="space-y-3 p-4 bg-white/5 rounded border border-white/10">
              <Video size={24} className="text-secondary-container mx-auto sm:mx-0" />
              <h3 className="font-display text-lg font-medium">Hybrid Audiovisual</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                4K laser projection, wireless microphones, and dedicated high-speed fiber internet for live broadcasts.
              </p>
            </div>
            <div className="space-y-3 p-4 bg-white/5 rounded border border-white/10">
              <Users size={24} className="text-secondary-container mx-auto sm:mx-0" />
              <h3 className="font-display text-lg font-medium">Master Banqueting</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Multi-course buffet or plated dinners prepared on-site, plus traditional coffee ceremony setups.
              </p>
            </div>
            <div className="space-y-3 p-4 bg-white/5 rounded border border-white/10">
              <Shield size={24} className="text-secondary-container mx-auto sm:mx-0" />
              <h3 className="font-display text-lg font-medium">Guaranteed Power &amp; Security</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Industrial backup generators ensuring uninterrupted power for summits and evening celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Inquiry Form Section */}
      <div id="eventInquiryForm" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-md border border-outline-variant/20 shadow-md">
          <div className="text-center mb-8">
            <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
              EVENT CONSULTATION
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-primary">
              Request Venue Availability &amp; Proposal
            </h2>
            <p className="text-xs text-on-surface/65 mt-2">
              Share your event dates, expected guest count, and catering requirements. Our event team will respond promptly.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-secondary/15 rounded-full flex items-center justify-center text-secondary">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-primary">Event Inquiry Received</h3>
              <p className="text-xs text-on-surface/75 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your inquiry for <strong>{formData.spaceName}</strong> has been logged. Our banquet team will prepare a preliminary proposal.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-primary text-white text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-secondary transition-soft"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                    ORGANIZER / CONTACT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Almaz Ayana"
                    className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+251 9... / International"
                    className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company-or-family.com"
                  className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                    EVENT TYPE
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full pb-1 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                  >
                    <option value="Wedding Celebration">Wedding Celebration</option>
                    <option value="Corporate Conference">Corporate Conference</option>
                    <option value="Executive Board Meeting">Executive Board Meeting</option>
                    <option value="State / NGO Banquet">State / NGO Banquet</option>
                    <option value="Anniversary & Birthday">Anniversary &amp; Birthday</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                    PREFERRED VENUE
                  </label>
                  <select
                    value={formData.spaceName}
                    onChange={(e) => setFormData({ ...formData, spaceName: e.target.value })}
                    className="w-full pb-1 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                  >
                    {EVENT_SPACES.map((s, idx) => (
                      <option key={idx} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                    ESTIMATED GUESTS
                  </label>
                  <input
                    type="number"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full pb-1 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                  TENTATIVE DATE
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full pb-1 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                  EVENT DETAILS &amp; CATERING SPECIFICATIONS
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Audiovisual requirements, lunch/dinner buffet preference, decor wishes..."
                  className="w-full p-2.5 text-xs bg-surface-container-low border border-outline-variant/40 rounded focus:border-secondary focus:outline-none transition-colors text-on-surface"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-on-primary text-xs tracking-widest uppercase py-4 hover:bg-secondary hover:text-white transition-soft cursor-pointer font-medium disabled:opacity-50"
                >
                  {loading ? 'SUBMITTING...' : 'SUBMIT EVENT INQUIRY'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
