import { Room } from '../models/Room.js'

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

// Public: GET /api/rooms
export async function getRooms(req, res, next) {
  try {
    const { category, guests, search, sort } = req.query
    const query = { published: true }

    if (category && category !== 'All') {
      query.category = category
    }

    if (guests) {
      query['capacity.maxGuests'] = { $gte: Number(guests) }
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    let sortOptions = { sortOrder: 1, createdAt: -1 }
    if (sort === 'price-low') sortOptions = { 'pricePerNight.amount': 1 }
    if (sort === 'price-high') sortOptions = { 'pricePerNight.amount': -1 }
    if (sort === 'capacity') sortOptions = { 'capacity.maxGuests': -1 }

    const rooms = await Room.find(query).sort(sortOptions)
    res.json({ success: true, count: rooms.length, data: rooms })
  } catch (err) {
    next(err)
  }
}

// Public: GET /api/rooms/:slug
export async function getRoomBySlug(req, res, next) {
  try {
    const { slug } = req.params
    const room = await Room.findOne({
      $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }],
      published: true,
    })

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' })
    }

    res.json({ success: true, data: room })
  } catch (err) {
    next(err)
  }
}

// Admin: GET /api/admin/rooms
export async function adminGetRooms(req, res, next) {
  try {
    const rooms = await Room.find().sort({ sortOrder: 1, createdAt: -1 })
    res.json({ success: true, count: rooms.length, data: rooms })
  } catch (err) {
    next(err)
  }
}

// Admin: POST /api/admin/rooms
export async function adminCreateRoom(req, res, next) {
  try {
    const data = { ...req.body }
    if (!data.slug && data.name) {
      data.slug = slugify(data.name)
    }

    // Check slug collision
    const existing = await Room.findOne({ slug: data.slug })
    if (existing) {
      data.slug = `${data.slug}-${Date.now().toString().slice(-4)}`
    }

    const room = await Room.create(data)
    res.status(201).json({ success: true, message: 'Room created', data: room })
  } catch (err) {
    next(err)
  }
}

// Admin: PATCH /api/admin/rooms/:id
export async function adminUpdateRoom(req, res, next) {
  try {
    const { id } = req.params
    const room = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' })
    }

    res.json({ success: true, message: 'Room updated', data: room })
  } catch (err) {
    next(err)
  }
}

// Admin: DELETE /api/admin/rooms/:id
export async function adminDeleteRoom(req, res, next) {
  try {
    const { id } = req.params
    const room = await Room.findByIdAndDelete(id)

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' })
    }

    res.json({ success: true, message: 'Room deleted' })
  } catch (err) {
    next(err)
  }
}
