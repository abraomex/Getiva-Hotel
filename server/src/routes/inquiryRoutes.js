import { Router } from 'express'
import { createBookingInquiry, createContactInquiry } from '../controllers/inquiryController.js'
import { inquiryLimiter } from '../middleware/rateLimiter.js'
import { validate, bookingInquirySchema, contactInquirySchema } from '../middleware/validate.js'

const router = Router()

router.post('/booking', inquiryLimiter, validate(bookingInquirySchema), createBookingInquiry)
router.post('/contact', inquiryLimiter, validate(contactInquirySchema), createContactInquiry)

export default router
