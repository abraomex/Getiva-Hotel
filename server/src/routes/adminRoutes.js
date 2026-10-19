import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { getDashboard } from '../controllers/adminController.js'
import {
  adminGetRooms,
  adminCreateRoom,
  adminUpdateRoom,
  adminDeleteRoom,
} from '../controllers/roomController.js'
import {
  adminGetGallery,
  adminCreateGallery,
  adminUpdateGallery,
  adminDeleteGallery,
} from '../controllers/galleryController.js'
import {
  adminGetInquiries,
  adminUpdateInquiryStatus,
} from '../controllers/inquiryController.js'
import { adminUpdateContent } from '../controllers/contentController.js'

const router = Router()

// All routes under /api/admin require authentication
router.use(requireAuth)

// Dashboard
router.get('/dashboard', getDashboard)

// Rooms
router.get('/rooms', adminGetRooms)
router.post('/rooms', adminCreateRoom)
router.patch('/rooms/:id', adminUpdateRoom)
router.delete('/rooms/:id', adminDeleteRoom)

// Gallery
router.get('/gallery', adminGetGallery)
router.post('/gallery', adminCreateGallery)
router.patch('/gallery/:id', adminUpdateGallery)
router.delete('/gallery/:id', adminDeleteGallery)

// Inquiries
router.get('/inquiries/:type', adminGetInquiries)
router.patch('/inquiries/:type/:id', adminUpdateInquiryStatus)

// Site Content
router.put('/content/:section', adminUpdateContent)

export default router
