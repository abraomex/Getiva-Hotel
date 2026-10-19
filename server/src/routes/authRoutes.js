import { Router } from 'express'
import { login, logout, getMe } from '../controllers/authController.js'
import { authLimiter } from '../middleware/rateLimiter.js'
import { validate, loginSchema } from '../middleware/validate.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/login', authLimiter, validate(loginSchema), login)
router.post('/logout', logout)
router.get('/me', requireAuth, getMe)

export default router
