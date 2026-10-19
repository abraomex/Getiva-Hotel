import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react'
import { api } from '../../services/api'

export default function AdminRooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    category: 'Suites',
    shortDescription: '',
    description: '',
    adults: 2,
    children: 1,
    maxGuests: 3,
    bedType: 'King Bed',
    roomSize: '45 m²',
    view: 'Mountain View',
    amount: 5000,
    currency: 'ETB',
    imageUrl: '',
    amenities: 'Highland Mountain View, High-Speed Fiber Wi-Fi, Fireplace, 24/7 Room Service',
    published: true,
    featured: false,
  })

  useEffect(() => {
    loadRooms()
  }, [])

  async function loadRooms() {
    setLoading(true)
    try {
      const data = await api.getAdminRooms()
      setRooms(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const openCreateModal = () => {
    setEditingRoom(null)
    setFormData({
      name: '',
      category: 'Suites',
      shortDescription: '',
      description: '',
      adults: 2,
      children: 1,
      maxGuests: 3,
      bedType: 'King Bed',
      roomSize: '45 m²',
      view: 'Mountain View',
      amount: 5000,
      currency: 'ETB',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      amenities: 'Highland Mountain View, High-Speed Fiber Wi-Fi, Fireplace, 24/7 Room Service',
      published: true,
      featured: false,
    })
    setModalOpen(true)
  }

  const openEditModal = (room) => {
    setEditingRoom(room)
    setFormData({
      name: room.name,
      category: room.category || 'Suites',
      shortDescription: room.shortDescription || '',
      description: room.description || '',
      adults: room.capacity?.adults || 2,
      children: room.capacity?.children || 0,
      maxGuests: room.capacity?.maxGuests || 2,
      bedType: room.bedType || 'King Bed',
      roomSize: room.roomSize || '45 m²',
      view: room.view || 'Mountain View',
      amount: room.pricePerNight?.amount || 0,
      currency: room.pricePerNight?.currency || 'ETB',
      imageUrl: room.images?.[0]?.url || '',
      amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : '',
      published: room.published ?? true,
      featured: room.featured ?? false,
    })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const payload = {
      name: formData.name,
      category: formData.category,
      shortDescription: formData.shortDescription,
      description: formData.description,
      capacity: {
        adults: Number(formData.adults),
        children: Number(formData.children),
        maxGuests: Number(formData.maxGuests),
      },
      bedType: formData.bedType,
      roomSize: formData.roomSize,
      view: formData.view,
      pricePerNight: {
        amount: Number(formData.amount),
        currency: formData.currency,
        isPriceApproved: false,
      },
      images: [
        {
          url: formData.imageUrl || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
          alt: formData.name,
          isPrimary: true,
        },
      ],
      amenities: formData.amenities.split(',').map((s) => s.trim()).filter(Boolean),
      published: formData.published,
      featured: formData.featured,
    }

    try {
      await api.saveAdminRoom(payload, Boolean(editingRoom), editingRoom?._id || editingRoom?.id)
      setModalOpen(false)
      loadRooms()
    } catch (err) {
      alert('Error saving room: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.deleteAdminRoom(id)
      setDeleteConfirmId(null)
      loadRooms()
    } catch (err) {
      alert('Error deleting room: ' + err.message)
    }
  }

  const togglePublish = async (room) => {
    const updated = !room.published
    try {
      await api.saveAdminRoom({ published: updated }, true, room._id || room.id)
      setRooms(rooms.map(r => ((r._id === room._id || r.id === room.id) ? { ...r, published: updated } : r)))
    } catch (err) {
      alert('Error updating status: ' + err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
            CATALOG MANAGEMENT
          </span>
          <h1 className="font-display text-3xl font-bold text-primary">Rooms &amp; Suites</h1>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-primary text-white text-xs uppercase tracking-widest px-5 py-3 hover:bg-secondary transition-soft flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} />
          <span>ADD NEW SUITE</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border border-outline-variant/20 overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-20 text-center text-xs uppercase tracking-widest text-on-surface/50">
            Loading catalog...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low border-b border-outline-variant/20 uppercase tracking-wider text-[10px] text-black/60">
                <tr>
                  <th className="px-6 py-4">Room &amp; Category</th>
                  <th className="px-6 py-4">Capacity</th>
                  <th className="px-6 py-4">Indicative Rate</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15 text-on-surface/80">
                {rooms.map((room) => {
                  const img = room.images?.[0]?.url || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=80'
                  return (
                    <tr key={room.id || room._id} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={img} alt={room.name} className="w-12 h-12 object-cover rounded" />
                          <div>
                            <p className="font-semibold text-primary">{room.name}</p>
                            <span className="text-[10px] text-secondary uppercase font-medium">
                              {room.category || 'Suite'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        Up to {room.capacity?.maxGuests || 2} Guests ({room.bedType || 'King Bed'})
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary">
                        {room.pricePerNight?.amount ? `${room.pricePerNight.amount.toLocaleString()} ${room.pricePerNight.currency || 'ETB'}` : 'On Request'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublish(room)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold cursor-pointer ${
                            room.published
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                          }`}
                        >
                          {room.published ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span>{room.published ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(room)}
                          className="p-1.5 text-on-surface/60 hover:text-secondary transition-colors"
                          title="Edit Room"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(room.id || room._id)}
                          className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                          title="Delete Room"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white p-6 max-w-sm w-full rounded-md shadow-xl text-center space-y-4">
            <h3 className="font-display text-lg font-bold text-primary">Confirm Deletion</h3>
            <p className="text-xs text-on-surface/70">
              Are you sure you wish to delete this accommodation from the Getva catalog? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs uppercase tracking-wider text-on-surface/70 hover:text-primary"
              >
                CANCEL
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 rounded"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white p-6 sm:p-8 max-w-2xl w-full rounded-md shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-6">
              <h2 className="font-display text-xl font-bold text-primary">
                {editingRoom ? 'Edit Room Details' : 'Add New Room / Suite'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-on-surface/50 hover:text-primary">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                    ROOM NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
                    placeholder="e.g. Entoto Luxury Suite"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                    CATEGORY
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
                  >
                    <option value="Suites">Suites</option>
                    <option value="Presidential">Presidential</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Standard">Standard</option>
                    <option value="Twin">Twin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                  SHORT HIGHLIGHT DESCRIPTION
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-2 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
                  placeholder="One sentence summary for catalog cards"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                  FULL DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
                  placeholder="Comprehensive architectural and room specifications..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                    MAX GUESTS
                  </label>
                  <input
                    type="number"
                    value={formData.maxGuests}
                    onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
                    className="w-full p-2 border border-outline-variant/40 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                    BED TYPE
                  </label>
                  <input
                    type="text"
                    value={formData.bedType}
                    onChange={(e) => setFormData({ ...formData, bedType: e.target.value })}
                    className="w-full p-2 border border-outline-variant/40 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                    ROOM SIZE
                  </label>
                  <input
                    type="text"
                    value={formData.roomSize}
                    onChange={(e) => setFormData({ ...formData, roomSize: e.target.value })}
                    className="w-full p-2 border border-outline-variant/40 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                    INDICATIVE RATE (ETB / NIGHT)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full p-2 border border-outline-variant/40 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                    IMAGE PHOTOGRAPH URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full p-2 border border-outline-variant/40 rounded"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                  AMENITIES (COMMA-SEPARATED)
                </label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  className="w-full p-2 border border-outline-variant/40 rounded"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded text-secondary focus:ring-secondary"
                  />
                  <span>Publish Immediately</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-secondary focus:ring-secondary"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 uppercase tracking-wider text-on-surface/70 hover:text-primary"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white uppercase tracking-wider px-6 py-2.5 hover:bg-secondary transition-soft"
                >
                  SAVE SUITE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
