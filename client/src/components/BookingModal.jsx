import { useState, useRef, useEffect } from 'react'
import { X, Calendar, CheckCircle2, AlertCircle, Info, ShieldCheck } from 'lucide-react'
import { api } from '../services/api'
import { ROOMS_DATA } from '../data/mockData'

export default function BookingModal({ isOpen, onClose, selectedRoom = null }) {
  const dialogRef = useRef(null)

  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    roomId: selectedRoom?.id || selectedRoom?.slug || '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successData, setSuccessData] = useState(null)

  // Update room when selectedRoom prop changes
  useEffect(() => {
    if (selectedRoom) {
      setFormData(prev => ({
        ...prev,
        roomId: selectedRoom.id || selectedRoom.slug || selectedRoom._id || '',
      }))
    }
  }, [selectedRoom])

  // Dialog management following Modern Web Guidance (showModal + light dismiss fallback)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
      // Reset status on close
      setSuccessData(null)
      setError(null)
    }

    // Modern Web Guidance: Boundary click fallback for browsers without closedby support
    const handleBackdropClick = (event) => {
      if (event.target !== dialog) return
      const rect = dialog.getBoundingClientRect()
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width

      if (!isDialogContent) {
        onClose()
      }
    }

    const handleCancel = (e) => {
      e.preventDefault()
      onClose()
    }

    dialog.addEventListener('click', handleBackdropClick)
    dialog.addEventListener('cancel', handleCancel)

    return () => {
      dialog.removeEventListener('click', handleBackdropClick)
      dialog.removeEventListener('cancel', handleCancel)
    }
  }, [isOpen, onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.guestName.trim()) {
      setError('Please provide your full guest name.')
      return
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      setError('Please provide at least an email address or contact phone number.')
      return
    }

    setLoading(true)
    try {
      const res = await api.submitBookingInquiry(formData)
      setSuccessData(res.data || res)
    } catch (err) {
      setError(err.message || 'Unable to submit booking inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      id="bookingModal"
      closedby="any"
      aria-labelledby="bookingModalTitle"
      className="m-auto p-0 bg-white max-w-xl w-full rounded-md shadow-2xl border border-outline-variant/30 text-on-surface backdrop:bg-black/70 backdrop:backdrop-blur-xs"
    >
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-outline-variant/20">
          <div>
            <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
              RESERVATION INQUIRY
            </span>
            <h2 id="bookingModalTitle" className="font-display text-2xl font-semibold text-primary">
              Experience Getva Hotel
            </h2>
            <p className="text-xs text-on-surface/60 mt-1">
              Debre Birhan, Ethiopia • Tailored Highland Hospitality
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-on-surface/50 hover:text-primary transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success State */}
        {successData ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-secondary/15 rounded-full flex items-center justify-center text-secondary">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-primary">Inquiry Received</h3>
            <p className="text-xs text-on-surface/75 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-primary">{formData.guestName}</strong>. Your reservation inquiry has been registered with Getva Hotel guest relations.
            </p>

            <div className="bg-surface-container-low p-4 rounded text-left text-xs space-y-2 border border-outline-variant/20 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-on-surface/60">Reference Code:</span>
                <span className="font-mono font-semibold text-primary">
                  {successData.id || `GH-${Math.floor(100000 + Math.random() * 900000)}`}
                </span>
              </div>
              {formData.checkIn && (
                <div className="flex justify-between">
                  <span className="text-on-surface/60">Desired Dates:</span>
                  <span className="font-medium text-primary">
                    {formData.checkIn} {formData.checkOut ? `→ ${formData.checkOut}` : ''}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-on-surface/60">Party Size:</span>
                <span className="font-medium text-primary">
                  {formData.adults} Adults {formData.children > 0 ? `, ${formData.children} Children` : ''}
                </span>
              </div>
            </div>

            <div className="bg-secondary/10 border border-secondary/20 p-3 rounded text-[11px] text-secondary text-left flex items-start gap-2 max-w-md mx-auto">
              <Info size={16} className="shrink-0 mt-0.5" />
              <span>
                <strong>Important Policy:</strong> This inquiry does not guarantee room availability until our concierge team reviews capacity and provides official confirmation.
              </span>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="bg-primary text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-secondary transition-soft cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Room Selection */}
            <div className="space-y-1">
              <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                PREFERRED ROOM / SUITE
              </label>
              <select
                name="roomId"
                value={formData.roomId}
                onChange={handleChange}
                className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
              >
                <option value="">Any Available Room / Suite</option>
                {ROOMS_DATA.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Guest Name & Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  name="guestName"
                  required
                  placeholder="e.g. Abebe Bikila"
                  value={formData.guestName}
                  onChange={handleChange}
                  className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors placeholder:text-black/30 text-on-surface"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                  PHONE NUMBER *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+251 9... / International"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors placeholder:text-black/30 text-on-surface"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@domain.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors placeholder:text-black/30 text-on-surface"
              />
            </div>

            {/* Dates & Guests */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                  CHECK-IN
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full pb-1 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                  CHECK-OUT
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full pb-1 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                  ADULTS
                </label>
                <select
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                  className="w-full pb-1 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4+ Adults</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                  CHILDREN
                </label>
                <select
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  className="w-full pb-1 pt-1 text-xs bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3+</option>
                </select>
              </div>
            </div>

            {/* Special Requests / Notes */}
            <div className="space-y-1">
              <label className="block text-[10px] font-medium text-black/60 tracking-wider uppercase">
                ADDITIONAL INQUIRY NOTES OR SPECIAL REQUIREMENTS
              </label>
              <textarea
                name="message"
                rows={2}
                placeholder="Airport transfer from Addis Ababa, wedding suite preparation, dietary preferences..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 text-xs bg-surface-container-low border border-outline-variant/40 rounded focus:border-secondary focus:outline-none transition-colors text-on-surface placeholder:text-black/30"
              />
            </div>

            {/* Verified Policy Disclaimer */}
            <div className="bg-surface-container-low p-3 rounded text-[11px] text-on-surface/70 flex items-start gap-2 border border-outline-variant/20">
              <ShieldCheck size={16} className="text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>Booking Inquiry Notice:</strong> Submission transmits a reservation request to Getva Hotel in Debre Birhan. No advance payment is taken online. Official rates and room availability are finalized by our reservation team.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs uppercase tracking-wider px-5 py-3 text-on-surface/60 hover:text-primary transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-on-primary text-xs tracking-widest uppercase px-8 py-3 hover:bg-secondary hover:text-white transition-soft cursor-pointer disabled:opacity-50"
              >
                {loading ? 'TRANSMITTING...' : 'SEND INQUIRY'}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  )
}
