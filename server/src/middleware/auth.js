import jwt from 'jsonwebtoken'
import { AdminUser } from '../models/AdminUser.js'

export async function requireAuth(req, res, next) {
  try {
    let token = null

    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies && req.cookies.getva_token) {
      token = req.cookies.getva_token
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No token provided.',
      })
    }

    const secret = process.env.JWT_SECRET || 'getva_hotel_fallback_secret_key'
    const decoded = jwt.verify(token, secret)

    const user = await AdminUser.findById(decoded.id)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Administrator session is invalid or user was removed.',
      })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
    })
  }
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Insufficient administrative privileges.',
      })
    }
    next()
  }
}
