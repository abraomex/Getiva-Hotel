import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { generalLimiter } from './middleware/rateLimiter.js'
import { errorHandler } from './middleware/errorHandler.js'

// Route Imports
import roomRoutes from './routes/roomRoutes.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import contentRoutes from './routes/contentRoutes.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
)

// CORS Configuration
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin || origin === allowedOrigin || origin.startsWith('http://localhost:')) {
        return callback(null, true)
      }
      callback(new Error('Blocked by CORS policy'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Parsers & Rate Limits
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use(cookieParser())
app.use(generalLimiter)

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Getva Hotel REST API',
    location: 'Debre Birhan, Ethiopia',
  })
})

// Mount API Routes
app.use('/api/rooms', roomRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

// Handle 404 for unmatched API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  })
})

// Centralized Error Handler
app.use(errorHandler)

export default app
