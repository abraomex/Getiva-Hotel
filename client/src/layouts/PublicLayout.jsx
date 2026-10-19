import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookingModal from '../components/BookingModal'

export default function PublicLayout() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null)
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  const handleOpenBooking = (room = null) => {
    setSelectedRoomForBooking(room)
    setBookingModalOpen(true)
  }

  const handleCloseBooking = () => {
    setBookingModalOpen(false)
    setSelectedRoomForBooking(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar onOpenBooking={() => handleOpenBooking(null)} />
      
      <main className="flex-1">
        <Outlet context={{ openBooking: handleOpenBooking }} />
      </main>

      <Footer onOpenBooking={() => handleOpenBooking(null)} />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        selectedRoom={selectedRoomForBooking}
      />
    </div>
  )
}
