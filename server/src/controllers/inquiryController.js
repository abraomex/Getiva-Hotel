import { BookingInquiry } from '../models/BookingInquiry.js'
import { ContactInquiry } from '../models/ContactInquiry.js'
import { Room } from '../models/Room.js'

// Public: POST /api/inquiries/booking
export async function createBookingInquiry(req, res, next) {
  try {
    const { guestName, email, phone, roomId, checkIn, checkOut, adults, children, message } = req.body

    let roomRef = null
    if (roomId && roomId.match(/^[0-9a-fA-F]{24}$/)) {
      roomRef = roomId
    } else if (roomId) {
      const found = await Room.findOne({ slug: roomId })
      if (found) roomRef = found._id
    }

    const inquiry = await BookingInquiry.create({
      guestName,
      email,
      phone,
      room: roomRef,
      roomIdString: roomId || '',
      checkIn: checkIn ? new Date(checkIn) : undefined,
      checkOut: checkOut ? new Date(checkOut) : undefined,
      guests: {
        adults: Number(adults) || 1,
        children: Number(children) || 0,
      },
      message,
      status: 'pending',
    })

    res.status(201).json({
      success: true,
      message: 'Booking inquiry registered. Our reservation team in Debre Birhan will contact you.',
      data: {
        id: inquiry._id,
        guestName: inquiry.guestName,
        status: inquiry.status,
        createdAt: inquiry.createdAt,
      },
    })
  } catch (err) {
    next(err)
  }
}

// Public: POST /api/inquiries/contact
export async function createContactInquiry(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body

    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
    })

    res.status(201).json({
      success: true,
      message: 'Message delivered. Our guest relations team will respond promptly.',
      data: {
        id: inquiry._id,
        name: inquiry.name,
        createdAt: inquiry.createdAt,
      },
    })
  } catch (err) {
    next(err)
  }
}

// Admin: GET /api/admin/inquiries/:type
export async function adminGetInquiries(req, res, next) {
  try {
    const { type } = req.params
    const { status } = req.query
    const query = {}

    if (status && status !== 'all') {
      query.status = status
    }

    if (type === 'booking') {
      const inquiries = await BookingInquiry.find(query)
        .populate('room', 'name slug category')
        .sort({ createdAt: -1 })
      return res.json({ success: true, count: inquiries.length, data: inquiries })
    }

    const contacts = await ContactInquiry.find(query).sort({ createdAt: -1 })
    res.json({ success: true, count: contacts.length, data: contacts })
  } catch (err) {
    next(err)
  }
}

// Admin: PATCH /api/admin/inquiries/:type/:id
export async function adminUpdateInquiryStatus(req, res, next) {
  try {
    const { type, id } = req.params
    const { status, internalNotes } = req.body

    const Model = type === 'booking' ? BookingInquiry : ContactInquiry
    const updateData = {}
    if (status) updateData.status = status
    if (internalNotes !== undefined) updateData.internalNotes = internalNotes

    const updated = await Model.findByIdAndUpdate(id, updateData, { new: true })

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' })
    }

    res.json({ success: true, message: 'Inquiry status updated', data: updated })
  } catch (err) {
    next(err)
  }
}
