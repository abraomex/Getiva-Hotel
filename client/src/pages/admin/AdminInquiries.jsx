import { useState, useEffect } from 'react'
import { Inbox, MessageSquare, CheckCircle, Clock, Calendar, Phone, Mail, FileText, X, AlertTriangle } from 'lucide-react'
import { api } from '../../services/api'

export default function AdminInquiries() {
  const [activeTab, setActiveTab] = useState('booking')
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [internalNotes, setInternalNotes] = useState('')

  useEffect(() => {
    loadInquiries()
  }, [activeTab])

  async function loadInquiries() {
    setLoading(true)
    try {
      const data = await api.getAdminInquiries(activeTab)
      setInquiries(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateInquiryStatus(activeTab, id, newStatus, internalNotes)
      setInquiries(inquiries.map(i => ((i.id === id || i._id === id) ? { ...i, status: newStatus } : i)))
      if (selectedInquiry) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }))
      }
    } catch (err) {
      alert('Error updating status: ' + err.message)
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return
    try {
      await api.updateInquiryStatus(activeTab, selectedInquiry.id || selectedInquiry._id, selectedInquiry.status, internalNotes)
      setSelectedInquiry(prev => ({ ...prev, internalNotes }))
      alert('Internal staff notes saved.')
    } catch (err) {
      alert('Error saving notes: ' + err.message)
    }
  }

  const filtered = inquiries.filter(i => {
    if (statusFilter === 'all') return true
    return (i.status || 'pending').toLowerCase() === statusFilter.toLowerCase()
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
          GUEST COMMUNICATIONS
        </span>
        <h1 className="font-display text-3xl font-bold text-primary">Inquiries Review</h1>
      </div>

      {/* Policy Reminder */}
      <div className="p-3 bg-secondary/10 border border-secondary/20 rounded text-xs text-secondary flex items-start gap-2">
        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
        <span>
          <strong>Operational Workflow:</strong> Booking inquiries are preliminary reservation requests. Never represent an inquiry as a confirmed booking to a guest until verified room allocation and tariff agreements have been completed by hotel reception.
        </span>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('booking')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'booking'
                ? 'bg-primary text-white'
                : 'bg-surface-container-low text-on-surface/70 hover:bg-outline-variant/30'
            }`}
          >
            <Calendar size={14} />
            <span>Booking Requests ({activeTab === 'booking' ? inquiries.length : '...'})</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-primary text-white'
                : 'bg-surface-container-low text-on-surface/70 hover:bg-outline-variant/30'
            }`}
          >
            <MessageSquare size={14} />
            <span>General Messages ({activeTab === 'contact' ? inquiries.length : '...'})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-black/50 text-[10px] uppercase tracking-wider">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-outline-variant/40 bg-white px-3 py-1.5 rounded focus:outline-none"
          >
            <option value="all">All Inquiries</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="contacted">Contacted</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border border-outline-variant/20 overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-20 text-center text-xs uppercase tracking-widest text-on-surface/50">
            Loading inquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-on-surface/50">
            No inquiries match this status filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low border-b border-outline-variant/20 uppercase tracking-wider text-[10px] text-black/60">
                <tr>
                  <th className="px-6 py-4">Guest / Sender</th>
                  <th className="px-6 py-4">Contact</th>
                  {activeTab === 'booking' ? (
                    <>
                      <th className="px-6 py-4">Dates</th>
                      <th className="px-6 py-4">Party</th>
                    </>
                  ) : (
                    <th className="px-6 py-4">Subject</th>
                  )}
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15 text-on-surface/80">
                {filtered.map((item) => (
                  <tr key={item.id || item._id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-primary">
                      {item.guestName || item.name}
                    </td>
                    <td className="px-6 py-4 space-y-0.5">
                      {item.phone && <p className="text-[11px] flex items-center gap-1"><Phone size={10} /> {item.phone}</p>}
                      {item.email && <p className="text-[11px] text-on-surface/60 flex items-center gap-1"><Mail size={10} /> {item.email}</p>}
                    </td>
                    {activeTab === 'booking' ? (
                      <>
                        <td className="px-6 py-4 text-[11px]">
                          {item.checkIn ? `${item.checkIn} → ${item.checkOut || 'N/A'}` : 'Flexible / TBD'}
                        </td>
                        <td className="px-6 py-4 text-[11px]">
                          {item.adults || item.guests?.adults || 2} Adults
                        </td>
                      </>
                    ) : (
                      <td className="px-6 py-4 text-[11px] max-w-xs truncate">
                        {item.subject || 'General Inquiry'}
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <span className={`inline-block text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                        item.status === 'reviewed' ? 'bg-blue-50 text-blue-700' :
                        item.status === 'contacted' ? 'bg-emerald-50 text-emerald-700' :
                        item.status === 'archived' ? 'bg-zinc-100 text-zinc-500' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {item.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedInquiry(item)
                          setInternalNotes(item.internalNotes || '')
                        }}
                        className="text-secondary hover:text-primary font-semibold text-[11px] uppercase tracking-wider underline cursor-pointer"
                      >
                        Open Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 max-w-lg w-full rounded-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h3 className="font-display text-lg font-bold text-primary">
                Inquiry Details #{selectedInquiry.id || selectedInquiry._id}
              </h3>
              <button onClick={() => setSelectedInquiry(null)} className="text-on-surface/50 hover:text-primary">
                <X size={18} />
              </button>
            </div>

            <div className="bg-surface-container-low p-4 rounded text-xs space-y-2 border border-outline-variant/20">
              <div className="flex justify-between">
                <span className="text-on-surface/60">Guest Name:</span>
                <span className="font-semibold text-primary">{selectedInquiry.guestName || selectedInquiry.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface/60">Phone:</span>
                <span className="font-medium text-primary">{selectedInquiry.phone || 'None provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface/60">Email:</span>
                <span className="font-medium text-primary">{selectedInquiry.email || 'None provided'}</span>
              </div>
              {selectedInquiry.roomId && (
                <div className="flex justify-between">
                  <span className="text-on-surface/60">Selected Suite:</span>
                  <span className="font-medium text-secondary">{selectedInquiry.roomId}</span>
                </div>
              )}
              {selectedInquiry.checkIn && (
                <div className="flex justify-between">
                  <span className="text-on-surface/60">Dates:</span>
                  <span className="font-medium text-primary">{selectedInquiry.checkIn} to {selectedInquiry.checkOut}</span>
                </div>
              )}
            </div>

            {/* Guest Message */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-black/60 font-medium block">
                GUEST MESSAGE / SPECIAL REQUESTS:
              </span>
              <div className="p-3 bg-surface rounded border border-outline-variant/20 text-xs text-on-surface/80 whitespace-pre-wrap">
                {selectedInquiry.message || selectedInquiry.subject || 'No special requirements noted.'}
              </div>
            </div>

            {/* Status Selector */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-black/60 font-medium block">
                WORKFLOW STATUS:
              </span>
              <div className="flex flex-wrap gap-2">
                {['pending', 'reviewed', 'contacted', 'archived'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInquiry.id || selectedInquiry._id, st)}
                    className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded cursor-pointer ${
                      selectedInquiry.status === st
                        ? 'bg-secondary text-white font-semibold'
                        : 'bg-surface-container-low text-on-surface/70 hover:bg-outline-variant/30 border border-outline-variant/20'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-black/60 font-medium block">
                INTERNAL STAFF NOTES:
              </span>
              <textarea
                rows={2}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Log front desk calls, tariff quotes, or room allocations..."
                className="w-full p-2 text-xs border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
              />
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={handleSaveNotes}
                className="text-xs text-secondary hover:underline uppercase tracking-wider font-semibold"
              >
                Save Internal Notes
              </button>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="bg-primary text-white text-xs uppercase tracking-wider px-5 py-2 hover:bg-secondary transition-soft"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
