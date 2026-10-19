# GETVA HOTEL — FULL MERN STACK APPLICATION
> **Location:** Debre Birhan, Amhara Region, Ethiopia (Elevation 2,840 m)  
> **Aesthetic DNA:** Editorial Luxury, High-End Hospitality & Curated Club Design  
> **Origin:** Proposed Client Demonstration Prototype

---

## 1. Project Overview

Getva Hotel is a complete, full-stack MERN (MongoDB, Express, React 19, Node.js) web application designed for a prospective client presentation in Debre Birhan, Ethiopia.

The platform provides:
- **Public Guest Portal:**
  - Immersive homepage with video/panoramic visual ambiance and high-elevation multi-segment room filtering.
  - Full room and suite showcase with capacities, amenities, and indicative pricing.
  - Dedicated room detail pages with photo carousels, full specifications, and instant reservation inquiry drawer.
  - Dining & lounge guides for *The Highland Hearth*, *Debre Birhan Coffee & Pastry Lounge*, and *The Horizon Terrace Bar*.
  - Conference & wedding banqueting facilities featuring *The Emperor Grand Ballroom* (up to 550 delegates).
  - Responsive visual gallery with accessible modal lightbox (with keyboard navigation and backdrop dismissal).
  - Authentic About page honoring Debre Birhan’s highland heritage without fabricated claims.
  - Direct contact inquiry system with validation and feedback.
- **Administrative Management Console (`/admin`):**
  - Secure JWT and httpOnly cookie authentication with rate limiting and password hashing.
  - Executive dashboard with live counters (rooms, gallery, pending inquiries).
  - Room catalog manager (create, edit, publish/draft toggle, delete).
  - Photo gallery manager (upload URLs, categorize, captions).
  - Inquiries workflow management (booking requests, contact messages, review status, internal staff notes).
  - Website content editor (CMS) for homepage copy, contact telephone numbers, and addresses.

---

## 2. Technology Stack

### Frontend (`client/`)
- **React 19** with **Vite 6**
- **React Router DOM 7** (Declarative client-side routing)
- **Tailwind CSS v4** & Vanilla CSS design tokens following `UI_STYLE_PROMPT.md`
- **Lucide React** (Minimalist iconography)
- **Typography:** `Playfair Display` (Serif Display) and `Outfit` (Modern Clean Sans) via Google Fonts.

### Backend (`server/`)
- **Node.js** & **Express.js** (REST API)
- **MongoDB** & **Mongoose 8**
- **Authentication & Security:**
  - `jsonwebtoken` (JWT bearer tokens and httpOnly cookies)
  - `bcryptjs` (Salted password hashing)
  - `helmet` (Security headers, CSP, and clickjacking prevention)
  - `express-rate-limit` (Strict limits on auth and public forms)
  - `cors` (Restricted client origin)
  - `zod` (Strict request schema validation)
- **Automated Testing:** `vitest` and `supertest`

---

## 3. Directory Structure

```
Getiva Hotel/
├── client/                     # Frontend Vite SPA
│   ├── public/                 # Static assets, favicon.svg, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── components/         # Navbar, Footer, RoomCard, BookingModal, Toast
│   │   ├── layouts/            # PublicLayout, AdminLayout
│   │   ├── pages/              # Home, Rooms, RoomDetails, Restaurant, Events, Gallery, About, Contact, 404
│   │   │   └── admin/          # AdminLogin, AdminDashboard, AdminRooms, AdminGallery, AdminInquiries, AdminContent
│   │   ├── data/               # mockData.js (Highland rooms, dining venues, event spaces)
│   │   ├── services/           # api.js, authContext.jsx
│   │   ├── styles/             # index.css (Luxury color tokens, Playfair & Outfit styles)
│   │   ├── App.jsx             # Route definitions
│   │   └── main.jsx            # Entry point
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend REST API
│   ├── src/
│   │   ├── config/             # db.js (MongoDB Atlas & in-memory zero-setup fallback)
│   │   ├── controllers/        # room, inquiry, gallery, content, auth, admin controllers
│   │   ├── middleware/         # auth, validate (Zod), rateLimiter, errorHandler
│   │   ├── models/             # Room, BookingInquiry, ContactInquiry, GalleryImage, SiteContent, AdminUser
│   │   ├── routes/             # REST endpoint routers
│   │   ├── seed/               # seed.js (5 luxury suites, 9 gallery items, bootstrap admin)
│   │   ├── app.js              # Express app with Helmet, CORS & middleware
│   │   ├── db-runner.js        # Optional persistent local MongoDB daemon
│   │   └── server.js           # Express listener and graceful shutdown
│   ├── test/                   # api.test.js (Vitest & Supertest integration suite)
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   └── nodemon.json
│
├── UI_STYLE_PROMPT.md          # Approved design blueprint & token specification
├── README.md                   # Complete documentation
└── .gitignore                  # Git ignore rules
```

---

## 4. Setup & Installation

### Prerequisites
- **Node.js:** v18.0.0 or higher (v26+ verified)
- **npm:** v9.0.0 or higher

### Step 1: Clone or Navigate to the Project
```bash
cd "Getiva Hotel"
```

### Step 2: Configure Environment Variables

**Backend (`server/.env`):**
```env
PORT=5000
NODE_ENV=development

# MongoDB Connection
# Option A: MongoDB Atlas (Recommended for production)
MONGODB_URI=mongodb+srv://abrhambelaydbu_db_user:8sqzIMrhEAXhJXlG@cluster0.b5obmb9.mongodb.net/getva_hotel?retryWrites=true&w=majority

# Option B: Local MongoDB Daemon
# MONGODB_URI=mongodb://127.0.0.1:27017/getva_hotel

JWT_SECRET=getva_hotel_debre_birhan_secure_jwt_secret_key_2026_xyz!
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173

# Admin Initial Bootstrap Credentials
ADMIN_BOOTSTRAP_EMAIL=admin@getvahotel.com
ADMIN_BOOTSTRAP_PASSWORD=Admin@Getva2026
ADMIN_BOOTSTRAP_NAME=General Manager
```

> **MongoDB Atlas Network Whitelist Note:**  
> When using MongoDB Atlas, verify that your IP address is whitelisted in MongoDB Atlas:  
> **Atlas Dashboard → Security → Network Access → Add IP Address → "Allow Access from Anywhere" (`0.0.0.0/0`)** or your current IP. If Atlas is unreachable, the backend automatically launches its embedded in-memory database engine for seamless local demonstrations!

**Frontend (`client/.env`):**
```env
VITE_API_BASE_URL=/api
VITE_SITE_URL=https://getvahotel.com
VITE_HOTEL_NAME=Getva Hotel Debre Birhan
```

---

## 5. Running the Application

### Option A: Running Both Servers Concurrently

**Terminal 1 — Backend API:**
```bash
cd server
npm start
# Server starts on http://localhost:5000
```

**Terminal 2 — Frontend Client:**
```bash
cd client
npm run dev
# Vite dev server starts on http://localhost:5173
```

Open your browser at:
`http://localhost:5173`

---

## 6. Administrator Access

Navigate to: `http://localhost:5173/admin/login`

- **Administrator Email:** `admin@getvahotel.com`
- **Password:** `Admin@Getva2026`
- **Convenience Feature:** Click *"Fill Demo Admin Credentials"* on the login page for one-click access.

From the Admin Dashboard, management can:
1. Review all incoming booking and contact inquiries.
2. Update inquiry status (`pending`, `reviewed`, `contacted`, `archived`) and append internal staff notes.
3. Publish, unpublish, edit, or create new rooms and suites.
4. Add and remove gallery photographs.
5. Customize website headlines and contact numbers.

---

## 7. Automated Testing & Verification

### Backend Integration Tests (Vitest + Supertest)
```bash
cd server
npm test
```
*Executes 9 automated integration tests covering health check, rooms API, gallery API, inquiry Zod validation, rate limiting, and authenticated admin routes.*

### Frontend Production Build
```bash
cd client
npm run build
```
*Verifies clean bundling, asset minification, and zero syntax errors.*

---

## 8. REST API Documentation

### Public Endpoints
- `GET /api/health` — Service health check and location status
- `GET /api/rooms` — Query published rooms (supports `?category=`, `?guests=`, `?search=`, `?sort=`)
- `GET /api/rooms/:slug` — Retrieve single room details by URL slug
- `GET /api/gallery` — Retrieve published gallery images (supports `?category=`)
- `GET /api/content/:section` — Retrieve public CMS section content (`homepage`, `about`, `contact`)
- `POST /api/inquiries/booking` — Submit reservation request (Validates guest name, contact phone/email, dates)
- `POST /api/inquiries/contact` — Submit general contact message

### Authentication Endpoints
- `POST /api/auth/login` — Authenticate admin, returns JWT & sets httpOnly cookie
- `POST /api/auth/logout` — Clear session cookie
- `GET /api/auth/me` — Verify authenticated administrator profile

### Protected Admin Endpoints (Require `Authorization: Bearer <token>`)
- `GET /api/admin/dashboard` — Live counts and recent activity
- `GET /api/admin/rooms` — All rooms including drafts
- `POST /api/admin/rooms` — Create room
- `PATCH /api/admin/rooms/:id` — Update room fields
- `DELETE /api/admin/rooms/:id` — Delete room
- `GET /api/admin/gallery` — All gallery photos
- `POST /api/admin/gallery` — Add gallery photo
- `DELETE /api/admin/gallery/:id` — Remove gallery photo
- `GET /api/admin/inquiries/:type` — Query booking or contact inquiries (`?status=`)
- `PATCH /api/admin/inquiries/:type/:id` — Update inquiry status & internal notes
- `PUT /api/admin/content/:section` — Update website CMS content block

---

## 9. Important Client Demonstration Notice

1. **Proposed Website Demonstration:** This project is a proposed design and technical implementation created for Getva Hotel stakeholders in Debre Birhan, Ethiopia.
2. **Inquiry Policy:** Website requests are preliminary booking inquiries. Inquiries do not constitute automated credit-card confirmations. Room availability and tariffs are finalized upon direct communication with hotel reception.
3. **Photography & Branding:** Images used throughout the demo are high-resolution editorial placeholders representing high-end hospitality spaces, easily replaced with official Getva Hotel property photography.
