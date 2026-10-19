import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, Send, ShieldCheck } from 'lucide-react'
import { HOTEL_INFO } from '../data/mockData'
import { api } from '../services/api'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim()) {
      setError('Please provide your name.')
      return
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      setError('Please provide either an email or phone number so we can respond.')
      return
    }
    if (!formData.message.trim()) {
      setError('Please enter your message or question.')
      return
    }

    setLoading(true)
    try {
      await api.submitContactInquiry(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      setError(err.message || 'Unable to submit your inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-28 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] text-secondary tracking-[0.25em] font-medium uppercase block mb-2">
            REACH GUEST RELATIONS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary tracking-tight">
            Connect With Getva Hotel
          </h1>
          <p className="text-xs sm:text-sm text-on-surface/70 mt-3 leading-relaxed">
            Whether inquiring about room reservations, wedding receptions, conference facilities, or corporate corporate rates in Debre Birhan, our dedicated front office is at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info & Location */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-md border border-outline-variant/20 shadow-xs space-y-6">
              <h2 className="font-display text-2xl font-semibold text-primary">Front Office &amp; Concierge</h2>
              
              <ul className="space-y-4 text-xs text-on-surface/80">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary block">Physical Address:</span>
                    <span>{HOTEL_INFO.address}</span>
                    <span className="block text-on-surface/60 text-[11px] mt-0.5">
                      North Shewa Zone, Amhara Region, Ethiopia
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary block">Telephone:</span>
                    <span>{HOTEL_INFO.phone}</span>
                    <span className="block text-on-surface/60 text-[11px] mt-0.5">
                      Direct line to reception desk
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary block">Electronic Mail:</span>
                    <span>{HOTEL_INFO.inquiriesEmail}</span>
                    <span className="block text-on-surface/60 text-[11px] mt-0.5">
                      Reservations &amp; event proposals
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary block">Operating Schedule:</span>
                    <span>24 Hours / 7 Days Reception &amp; Security</span>
                    <span className="block text-on-surface/60 text-[11px] mt-0.5">
                      Check-in 14:00 • Check-out 11:00
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map / Route Placeholder */}
            <div className="bg-white p-6 rounded-md border border-outline-variant/20 shadow-xs space-y-3">
              <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block">
                LOCATION MAP
              </span>
              <div className="relative h-48 bg-surface-container-low rounded overflow-hidden flex items-center justify-center border border-outline-variant/30 text-center p-4">
                <div className="space-y-2">
                  <MapPin size={28} className="text-secondary mx-auto animate-bounce" />
                  <p className="text-xs font-semibold text-primary">Getva Hotel Debre Birhan</p>
                  <p className="text-[11px] text-on-surface/60">
                    Latitude 9.6797° N, Longitude 39.5325° E<br />
                    Along the main Addis Ababa - Dessie Highway
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-md border border-outline-variant/20 shadow-md">
              <div className="mb-8">
                <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
                  DIRECT MESSAGE
                </span>
                <h2 className="font-display text-2xl font-semibold text-primary">
                  Send an Inquiry to Our Guest Services
                </h2>
                <p className="text-xs text-on-surface/65 mt-1">
                  We answer inquiries regarding room bookings, long-term business delegations, and special celebrations within 24 hours.
                </p>
              </div>

              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-secondary/15 rounded-full flex items-center justify-center text-secondary">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-primary">Inquiry Sent Successfully</h3>
                  <p className="text-xs text-on-surface/75 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Getva Hotel. Your communication has been dispatched to our guest service desk in Debre Birhan.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSuccess(false)}
                      className="bg-primary text-white text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-secondary transition-soft"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dawit Wolde"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                        TELEPHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        placeholder="+251 9... / International"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      placeholder="Room inquiry, wedding banqueting, corporate rates..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please specify dates, number of guests, or any special requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 text-xs bg-surface-container-low border border-outline-variant/40 rounded focus:border-secondary focus:outline-none transition-colors text-on-surface"
                    />
                  </div>

                  <div className="bg-surface-container-low p-3 rounded text-[11px] text-on-surface/70 flex items-start gap-2 border border-outline-variant/20">
                    <ShieldCheck size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span>
                      Your contact information is handled securely and solely utilized to respond to your inquiry.
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-on-primary text-xs tracking-widest uppercase py-4 hover:bg-secondary hover:text-white transition-soft cursor-pointer font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Send size={14} />
                      <span>{loading ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
