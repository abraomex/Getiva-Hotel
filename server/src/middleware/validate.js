import { z } from 'zod'

export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    // Assign cleaned/parsed values back
    if (parsed.body) req.body = parsed.body
    if (parsed.query) req.query = parsed.query
    if (parsed.params) req.params = parsed.params
    next()
  } catch (err) {
    if (err instanceof z.ZodError) {
      const issues = err.errors.map(e => ({
        path: e.path.join('.').replace(/^(body|query|params)\./, ''),
        message: e.message,
      }))
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: issues,
      })
    }
    next(err)
  }
}

// Common Validation Schemas
export const bookingInquirySchema = z.object({
  body: z.object({
    guestName: z.string().min(2, 'Guest name must be at least 2 characters').max(120),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().min(6, 'Phone number must be at least 6 digits').optional().or(z.literal('')),
    roomId: z.string().optional().or(z.literal('')),
    checkIn: z.string().optional().or(z.literal('')),
    checkOut: z.string().optional().or(z.literal('')),
    adults: z.coerce.number().min(1).default(1),
    children: z.coerce.number().min(0).default(0),
    message: z.string().max(1000).optional().or(z.literal('')),
  }).refine(data => Boolean(data.email || data.phone), {
    message: 'Either email or phone number must be provided',
    path: ['contact'],
  }),
})

export const contactInquirySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(120),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    subject: z.string().max(200).optional().or(z.literal('')),
    message: z.string().min(5, 'Message must be at least 5 characters').max(2000),
  }).refine(data => Boolean(data.email || data.phone), {
    message: 'Either email or phone number must be provided',
    path: ['contact'],
  }),
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid administrator email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
})
