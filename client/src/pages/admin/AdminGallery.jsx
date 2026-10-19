import { useState, useEffect } from 'react'
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react'
import { api } from '../../services/api'
import { GALLERY_ITEMS } from '../../data/mockData'

export default function AdminGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    url: '',
    title: '',
    caption: '',
    category: 'rooms',
  })

  useEffect(() => {
    loadGallery()
  }, [])

  async function loadGallery() {
    setLoading(true)
    try {
      const data = await api.getGallery('all')
      setImages(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!formData.url.trim()) return

    const newImage = {
      id: `img-${Date.now()}`,
      url: formData.url,
      title: formData.title || 'Getva Hotel Photo',
      caption: formData.caption,
      category: formData.category,
    }

    const updated = [newImage, ...images]
    setImages(updated)
    setModalOpen(false)
    setFormData({ url: '', title: '', caption: '', category: 'rooms' })
  }

  const handleDelete = (id) => {
    if (confirm('Delete this photograph from the gallery?')) {
      setImages(images.filter(img => (img.id !== id && img._id !== id)))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-1">
            MEDIA ASSET MANAGEMENT
          </span>
          <h1 className="font-display text-3xl font-bold text-primary">Photo Gallery</h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary text-white text-xs uppercase tracking-widest px-5 py-3 hover:bg-secondary transition-soft flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} />
          <span>ADD PHOTOGRAPH</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs uppercase tracking-widest text-on-surface/50">
          Loading gallery items...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id || img._id}
              className="bg-white rounded-md border border-outline-variant/20 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-black/5">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 rounded">
                  {img.category}
                </span>
                <button
                  onClick={() => handleDelete(img.id || img._id)}
                  className="absolute top-3 right-3 p-1.5 bg-red-600/80 hover:bg-red-700 text-white rounded transition-colors"
                  title="Delete image"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-display text-sm font-semibold text-primary">{img.title}</h4>
                {img.caption && <p className="text-xs text-on-surface/60 line-clamp-2">{img.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white p-6 max-w-md w-full rounded-md shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
              <h3 className="font-display text-lg font-bold text-primary">Add Gallery Photo</h3>
              <button onClick={() => setModalOpen(false)} className="text-on-surface/50 hover:text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                  IMAGE URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full p-2 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                  TITLE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emperor Suite Master Bed"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
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
                  <option value="rooms">Rooms &amp; Suites</option>
                  <option value="dining">Highland Dining</option>
                  <option value="events">Events &amp; Banquets</option>
                  <option value="exterior">Exterior &amp; Grounds</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-black/60 font-medium mb-1">
                  CAPTION / ALT TEXT
                </label>
                <input
                  type="text"
                  placeholder="Brief descriptive text"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full p-2 border border-outline-variant/40 rounded focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 uppercase tracking-wider text-on-surface/70"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white uppercase tracking-wider px-5 py-2 hover:bg-secondary transition-soft"
                >
                  SAVE PHOTO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
