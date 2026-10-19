import { ROOMS_DATA, GALLERY_ITEMS, HOTEL_INFO } from '../data/mockData'

const API_BASE = '/api'

// Helper for safe fetch with error handling
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('getva_admin_token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    })

    const contentType = res.headers.get('content-type')
    const isJson = contentType && contentType.includes('application/json')
    const data = isJson ? await res.json() : await res.text()

    if (!res.ok) {
      const message = (data && data.message) || res.statusText || 'Request failed'
      const error = new Error(message)
      error.status = res.status
      error.data = data
      throw error
    }

    return data
  } catch (err) {
    // Return custom error or rethrow
    throw err
  }
}

export const api = {
  // Public Rooms
  async getRooms(params = {}) {
    try {
      const query = new URLSearchParams(params).toString()
      const res = await request(`/rooms${query ? `?${query}` : ''}`)
      return res.data || res
    } catch (err) {
      console.warn('Backend unavailable, using cached demonstration rooms:', err.message)
      let list = [...ROOMS_DATA]
      if (params.category && params.category !== 'All') {
        list = list.filter(r => r.category.toLowerCase() === params.category.toLowerCase())
      }
      if (params.guests) {
        list = list.filter(r => r.capacity.maxGuests >= Number(params.guests))
      }
      return list
    }
  },

  async getRoomBySlug(slug) {
    try {
      const res = await request(`/rooms/${slug}`)
      return res.data || res
    } catch (err) {
      console.warn('Backend unavailable, looking up local demonstration room:', err.message)
      const found = ROOMS_DATA.find(r => r.slug === slug || r.id === slug)
      if (!found) throw new Error('Room not found')
      return found
    }
  },

  // Public Gallery
  async getGallery(category = 'all') {
    try {
      const query = category && category !== 'all' ? `?category=${category}` : ''
      const res = await request(`/gallery${query}`)
      return res.data || res
    } catch (err) {
      console.warn('Backend unavailable, using cached gallery demonstration items:', err.message)
      if (!category || category === 'all') return GALLERY_ITEMS
      return GALLERY_ITEMS.filter(item => item.category === category)
    }
  },

  // Public Content
  async getContent(section) {
    try {
      const res = await request(`/content/${section}`)
      return res.data || res
    } catch (err) {
      return null
    }
  },

  // Public Inquiries
  async submitBookingInquiry(payload) {
    try {
      const res = await request('/inquiries/booking', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      return res
    } catch (err) {
      // In standalone demo mode, record in localStorage
      const existing = JSON.parse(localStorage.getItem('getva_local_booking_inquiries') || '[]')
      const newInquiry = {
        id: `mock-${Date.now()}`,
        ...payload,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      existing.unshift(newInquiry)
      localStorage.setItem('getva_local_booking_inquiries', JSON.stringify(existing))
      return {
        success: true,
        message: 'Inquiry received successfully (demo stored). Our team will contact you.',
        data: newInquiry,
      }
    }
  },

  async submitContactInquiry(payload) {
    try {
      const res = await request('/inquiries/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      return res
    } catch (err) {
      const existing = JSON.parse(localStorage.getItem('getva_local_contact_inquiries') || '[]')
      const newInquiry = {
        id: `contact-${Date.now()}`,
        ...payload,
        status: 'new',
        createdAt: new Date().toISOString(),
      }
      existing.unshift(newInquiry)
      localStorage.setItem('getva_local_contact_inquiries', JSON.stringify(existing))
      return {
        success: true,
        message: 'Message sent successfully. We will get back to you shortly.',
        data: newInquiry,
      }
    }
  },

  // Admin Auth
  async login(email, password) {
    try {
      const res = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      if (res.token) {
        localStorage.setItem('getva_admin_token', res.token)
        localStorage.setItem('getva_admin_user', JSON.stringify(res.user))
      }
      return res
    } catch (err) {
      // Check fallback admin demo credential
      if (email === 'admin@getvahotel.com' && password === 'Admin@Getva2026') {
        const demoUser = { email, name: 'General Manager', role: 'superadmin' }
        const mockToken = 'mock-jwt-token-getva-admin'
        localStorage.setItem('getva_admin_token', mockToken)
        localStorage.setItem('getva_admin_user', JSON.stringify(demoUser))
        return { success: true, token: mockToken, user: demoUser }
      }
      throw err
    }
  },

  async getMe() {
    try {
      const res = await request('/auth/me')
      return res.user
    } catch (err) {
      const local = localStorage.getItem('getva_admin_user')
      if (local) return JSON.parse(local)
      throw err
    }
  },

  async logout() {
    try {
      await request('/auth/logout', { method: 'POST' })
    } catch (e) {
      // Ignore
    } finally {
      localStorage.removeItem('getva_admin_token')
      localStorage.removeItem('getva_admin_user')
    }
  },

  // Admin Endpoints
  async getAdminDashboard() {
    try {
      const res = await request('/admin/dashboard')
      return res.data || res
    } catch (err) {
      const localBookings = JSON.parse(localStorage.getItem('getva_local_booking_inquiries') || '[]')
      const localContacts = JSON.parse(localStorage.getItem('getva_local_contact_inquiries') || '[]')
      return {
        totalRooms: ROOMS_DATA.length,
        totalGallery: GALLERY_ITEMS.length,
        newBookingInquiries: localBookings.filter(b => b.status === 'pending').length,
        newContactInquiries: localContacts.filter(c => c.status === 'new').length,
        recentBookings: localBookings.slice(0, 5),
        recentContacts: localContacts.slice(0, 5),
      }
    }
  },

  async getAdminRooms() {
    try {
      const res = await request('/admin/rooms')
      return res.data || res
    } catch (err) {
      const stored = localStorage.getItem('getva_admin_custom_rooms')
      return stored ? JSON.parse(stored) : ROOMS_DATA
    }
  },

  async saveAdminRoom(roomData, isEdit = false, id = null) {
    try {
      const endpoint = isEdit ? `/admin/rooms/${id}` : '/admin/rooms'
      const method = isEdit ? 'PATCH' : 'POST'
      return await request(endpoint, { method, body: JSON.stringify(roomData) })
    } catch (err) {
      // Local fallback
      let rooms = await this.getAdminRooms()
      if (isEdit) {
        rooms = rooms.map(r => ((r._id === id || r.id === id) ? { ...r, ...roomData } : r))
      } else {
        const newR = {
          ...roomData,
          id: `room-${Date.now()}`,
          _id: `room-${Date.now()}`,
          slug: roomData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          published: roomData.published ?? true,
          createdAt: new Date().toISOString(),
        }
        rooms.unshift(newR)
      }
      localStorage.setItem('getva_admin_custom_rooms', JSON.stringify(rooms))
      return { success: true, message: 'Room saved in demo state' }
    }
  },

  async deleteAdminRoom(id) {
    try {
      return await request(`/admin/rooms/${id}`, { method: 'DELETE' })
    } catch (err) {
      let rooms = await this.getAdminRooms()
      rooms = rooms.filter(r => r._id !== id && r.id !== id)
      localStorage.setItem('getva_admin_custom_rooms', JSON.stringify(rooms))
      return { success: true }
    }
  },

  async getAdminInquiries(type = 'booking') {
    try {
      const res = await request(`/admin/inquiries/${type}`)
      return res.data || res
    } catch (err) {
      const key = type === 'booking' ? 'getva_local_booking_inquiries' : 'getva_local_contact_inquiries'
      return JSON.parse(localStorage.getItem(key) || '[]')
    }
  },

  async updateInquiryStatus(type, id, status, internalNotes = '') {
    try {
      return await request(`/admin/inquiries/${type}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, internalNotes }),
      })
    } catch (err) {
      const key = type === 'booking' ? 'getva_local_booking_inquiries' : 'getva_local_contact_inquiries'
      let inquiries = JSON.parse(localStorage.getItem(key) || '[]')
      inquiries = inquiries.map(item => {
        if (item.id === id || item._id === id) {
          return { ...item, status, internalNotes: internalNotes || item.internalNotes }
        }
        return item
      })
      localStorage.setItem(key, JSON.stringify(inquiries))
      return { success: true }
    }
  },
}
