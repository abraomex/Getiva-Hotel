import { Room } from '../models/Room.js'
import { GalleryImage } from '../models/GalleryImage.js'
import { BookingInquiry } from '../models/BookingInquiry.js'
import { ContactInquiry } from '../models/ContactInquiry.js'

// GET /api/admin/dashboard
export async function getDashboard(req, res, next) {
  try {
    const [
      totalRooms,
      totalGallery,
      newBookingInquiries,
      newContactInquiries,
      recentBookings,
      recentContacts,
    ] = await Promise.all([
      Room.countDocuments({ published: true }),
      GalleryImage.countDocuments({ published: true }),
      BookingInquiry.countDocuments({ status: 'pending' }),
      ContactInquiry.countDocuments({ status: 'new' }),
      BookingInquiry.find().sort({ createdAt: -1 }).limit(5),
      ContactInquiry.find().sort({ createdAt: -1 }).limit(5),
    ])

    res.json({
      success: true,
      data: {
        totalRooms,
        totalGallery,
        newBookingInquiries,
        newContactInquiries,
        recentBookings,
        recentContacts,
      },
    })
  } catch (err) {
    next(err)
  }
}
