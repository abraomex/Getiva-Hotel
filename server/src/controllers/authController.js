import jwt from 'jsonwebtoken'
import { AdminUser } from '../models/AdminUser.js'

function generateToken(user) {
  const secret = process.env.JWT_SECRET || 'getva_hotel_fallback_secret_key'
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn }
  )
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    const user = await AdminUser.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative email or password.',
      })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative email or password.',
      })
    }

    const token = generateToken(user)

    // Set secure httpOnly cookie
    res.cookie('getva_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (err) {
    next(err)
  }
}

// POST /api/auth/logout
export async function logout(req, res) {
  res.clearCookie('getva_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
  res.json({ success: true, message: 'Logged out successfully' })
}

// GET /api/auth/me
export async function getMe(req, res) {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    },
  })
}
