import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'
import { connectDB, closeDB } from '../src/config/db.js'
import { seedDatabase } from '../src/seed/seed.js'

let authToken = ''

beforeAll(async () => {
  await connectDB()
  await seedDatabase()

  // Authenticate admin
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin@getvahotel.com',
      password: 'Admin@Getva2026',
    })
  authToken = loginRes.body.token
}, 30000)

afterAll(async () => {
  await closeDB()
})

describe('Getva Hotel REST API Verification', () => {
  it('GET /api/health should return healthy status', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('healthy')
    expect(res.body.service).toContain('Getva Hotel')
  })

  it('GET /api/rooms should return published rooms', async () => {
    const res = await request(app).get('/api/rooms')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.data.length).toBeGreaterThan(0)
  })

  it('GET /api/rooms/:slug should return a single room', async () => {
    const res = await request(app).get('/api/rooms/simien-executive-suite')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toContain('Simien Highland Executive Suite')
  })

  it('GET /api/gallery should return gallery images', async () => {
    const res = await request(app).get('/api/gallery')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.length).toBeGreaterThan(0)
  })

  it('POST /api/inquiries/booking should validate and create inquiry', async () => {
    const payload = {
      guestName: 'Tadesse Haile',
      email: 'tadesse@example.com',
      phone: '+251911223344',
      roomId: 'simien-executive-suite',
      adults: 2,
      children: 1,
      message: 'Testing reservation inquiry flow for Getva Hotel presentation.',
    }

    const res = await request(app)
      .post('/api/inquiries/booking')
      .send(payload)

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.guestName).toBe('Tadesse Haile')
  })

  it('POST /api/inquiries/booking should reject invalid payload without contact', async () => {
    const invalidPayload = {
      guestName: 'Anonymous',
      message: 'No contact provided',
    }

    const res = await request(app)
      .post('/api/inquiries/booking')
      .send(invalidPayload)

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('POST /api/inquiries/contact should validate and submit contact message', async () => {
    const payload = {
      name: 'Selamawit Kebede',
      email: 'selam@example.com',
      subject: 'Wedding Banquet Inquiry',
      message: 'Requesting capacity details for Emperor Grand Ballroom in November.',
    }

    const res = await request(app)
      .post('/api/inquiries/contact')
      .send(payload)

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
  })

  it('GET /api/admin/dashboard should reject unauthorized requests', async () => {
    const res = await request(app).get('/api/admin/dashboard')
    expect(res.status).toBe(401)
  })

  it('GET /api/admin/dashboard should accept authenticated requests', async () => {
    const res = await request(app)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${authToken}`)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.totalRooms).toBeGreaterThanOrEqual(1)
  })
})
