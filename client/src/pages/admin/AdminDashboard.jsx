import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BedDouble, Image as ImageIcon, Inbox, MessageSquare, ArrowRight, PlusCircle, CheckCircle, Clock } from 'lucide-react'
import { api } from '../../services/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalGallery: 0,
    newBookingInquiries: 0,
    newContactInquiries: 0,
    recentBookings: [],
    recentContacts: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api.getAdminDashboard()
        setStats(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
          OPERATIONAL OVERVIEW
        </span>
        <h1 className="font-display text-3xl font-bold text-primary">Executive Dashboard</h1>
        <p className="text-xs text-on-surface/60 mt-1">
          Getva Hotel • Debre Birhan, Amhara Region, Ethiopia
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-md border border-outline-variant/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-black/50 font-medium block">
              PUBLISHED ROOMS
            </span>
            <span className="font-display text-3xl font-bold text-primary mt-1 block">
              {stats.totalRooms}
            </span>
            <Link to="/admin/rooms" className="text-[11px] text-secondary hover:underline mt-2 inline-block">
              Manage Catalog →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <BedDouble size={22} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-md border border-outline-variant/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-black/50 font-medium block">
              GALLERY PHOTOGRAPHS
            </span>
            <span className="font-display text-3xl font-bold text-primary mt-1 block">
              {stats.totalGallery}
            </span>
            <Link to="/admin/gallery" className="text-[11px] text-secondary hover:underline mt-2 inline-block">
              Manage Images →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <ImageIcon size={22} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-md border border-outline-variant/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-black/50 font-medium block">
              NEW BOOKING INQUIRIES
            </span>
            <span className="font-display text-3xl font-bold text-secondary mt-1 block">
              {stats.newBookingInquiries}
            </span>
            <Link to="/admin/inquiries" className="text-[11px] text-secondary hover:underline mt-2 inline-block">
              Review Inquiries →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
            <Inbox size={22} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-md border border-outline-variant/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-black/50 font-medium block">
              NEW CONTACT MESSAGES
            </span>
            <span className="font-display text-3xl font-bold text-primary mt-1 block">
              {stats.newContactInquiries}
            </span>
            <Link to="/admin/inquiries" className="text-[11px] text-secondary hover:underline mt-2 inline-block">
              Review Messages →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <MessageSquare size={22} />
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-surface-container-low p-6 rounded-md border border-outline-variant/20">
        <h3 className="text-xs uppercase tracking-wider font-semibold text-primary mb-4">
          QUICK ACTIONS
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/rooms"
            className="bg-primary text-white text-xs uppercase tracking-wider px-4 py-2.5 rounded-xs hover:bg-secondary transition-soft flex items-center gap-2"
          >
            <PlusCircle size={14} />
            <span>Create New Room</span>
          </Link>
          <Link
            to="/admin/gallery"
            className="bg-white border border-outline-variant/40 text-on-surface text-xs uppercase tracking-wider px-4 py-2.5 rounded-xs hover:border-primary transition-colors flex items-center gap-2"
          >
            <ImageIcon size={14} />
            <span>Add Gallery Photograph</span>
          </Link>
          <Link
            to="/admin/inquiries"
            className="bg-white border border-outline-variant/40 text-on-surface text-xs uppercase tracking-wider px-4 py-2.5 rounded-xs hover:border-primary transition-colors flex items-center gap-2"
          >
            <Inbox size={14} />
            <span>Process Recent Inquiries</span>
          </Link>
          <Link
            to="/admin/content"
            className="bg-white border border-outline-variant/40 text-on-surface text-xs uppercase tracking-wider px-4 py-2.5 rounded-xs hover:border-primary transition-colors flex items-center gap-2"
          >
            <span>Edit Website Headlines</span>
          </Link>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Inquiries */}
        <div className="bg-white p-6 rounded-md border border-outline-variant/20 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15 mb-4">
            <h3 className="font-display text-lg font-semibold text-primary">Recent Booking Inquiries</h3>
            <Link to="/admin/inquiries" className="text-xs text-secondary hover:underline">
              View All
            </Link>
          </div>

          {stats.recentBookings.length === 0 ? (
            <p className="text-xs text-on-surface/50 py-6 text-center">No recent booking requests recorded.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentBookings.map((b) => (
                <div
                  key={b.id || b._id}
                  className="p-3 bg-surface-container-low rounded border border-outline-variant/15 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-primary">{b.guestName}</p>
                    <p className="text-[11px] text-on-surface/60">
                      {b.phone || b.email} • Party: {b.adults} Adults
                    </p>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-secondary/15 text-secondary">
                    {b.status || 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Inquiries */}
        <div className="bg-white p-6 rounded-md border border-outline-variant/20 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15 mb-4">
            <h3 className="font-display text-lg font-semibold text-primary">Recent Contact Messages</h3>
            <Link to="/admin/inquiries" className="text-xs text-secondary hover:underline">
              View All
            </Link>
          </div>

          {stats.recentContacts.length === 0 ? (
            <p className="text-xs text-on-surface/50 py-6 text-center">No contact inquiries received yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentContacts.map((c) => (
                <div
                  key={c.id || c._id}
                  className="p-3 bg-surface-container-low rounded border border-outline-variant/15 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-primary">{c.name}</p>
                    <p className="text-[11px] text-on-surface/60 line-clamp-1">{c.subject || c.message}</p>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-outline-variant/30 text-on-surface/75">
                    {c.status || 'New'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
