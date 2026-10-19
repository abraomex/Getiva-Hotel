import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB, closeDB } from '../config/db.js'
import { Room } from '../models/Room.js'
import { GalleryImage } from '../models/GalleryImage.js'
import { SiteContent } from '../models/SiteContent.js'
import { AdminUser } from '../models/AdminUser.js'

export const SEED_ROOMS = [
  {
    name: 'Simien Highland Executive Suite',
    slug: 'simien-executive-suite',
    category: 'Suites',
    badge: 'EXCLUSIVE',
    shortDescription: 'Expansive high-floor suite with an artisan stone fireplace, mountain panoramas, and private salon.',
    description: 'The Simien Highland Executive Suite is crafted for travelers seeking unhurried comfort in the crisp mountain air. Featuring a private parlor, bespoke handcrafted Ethiopian hardwood furnishings, an artisan stone fireplace, and floor-to-ceiling windows overlooking the Debre Birhan escarpment. Includes an en-suite rain shower, deep soaking tub, and dedicated workspace.',
    capacity: { adults: 2, children: 1, maxGuests: 3 },
    bedType: 'King Bed',
    roomSize: '58 m² / 624 sq ft',
    view: 'Highland Escarpment & City Skyline',
    pricePerNight: { amount: 6500, currency: 'ETB', isPriceApproved: false },
    amenities: [
      'Highland Mountain View',
      'Stone Hearth Fireplace',
      'High-Speed Fiber Wi-Fi',
      'Complimentary Artisan Breakfast',
      'En-suite Marble Bathroom',
      'Deep Soaking Tub',
      'Espresso & Traditional Tea Station',
      '55-inch Smart Television',
      'Executive Working Desk',
      '24/7 Room Service',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        alt: 'Simien Executive Suite master bedroom',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
        alt: 'Living area with modern sofa',
        isPrimary: false,
      },
    ],
    published: true,
    featured: true,
    sortOrder: 1,
  },
  {
    name: 'Menelik Royal Presidential Suite',
    slug: 'menelik-royal-presidential',
    category: 'Presidential',
    badge: 'SIGNATURE',
    shortDescription: 'The pinnacle of highland luxury featuring dual master bedrooms, private dining salon, and butler pantry.',
    description: 'Named in tribute to the storied historic roots of the surrounding plateau, the Menelik Royal Presidential Suite offers unmatched prestige. Boasting two luxurious en-suite bedrooms, a grand reception salon, an eight-seat dining table for private banquets, and a dedicated butler station.',
    capacity: { adults: 4, children: 2, maxGuests: 6 },
    bedType: 'Two Master King Beds',
    roomSize: '115 m² / 1,237 sq ft',
    view: 'Panoramic 180° Mountain View',
    pricePerNight: { amount: 14000, currency: 'ETB', isPriceApproved: false },
    amenities: [
      '180° Panoramic Highland Views',
      'Private Dining Salon (8 Seats)',
      'Dedicated Butler Service Option',
      'Dual Master En-Suite Bathrooms',
      'Dual Stone Fireplaces',
      'Fiber Internet & Conference Setup',
      'Mini Bar with Curated Beverages',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
        alt: 'Menelik Royal Presidential Suite grand hall',
        isPrimary: true,
      },
    ],
    published: true,
    featured: true,
    sortOrder: 2,
  },
  {
    name: 'Tegulet Mountain Deluxe Room',
    slug: 'tegulet-mountain-deluxe',
    category: 'Deluxe',
    badge: 'POPULAR',
    shortDescription: 'Serene mountain sanctuary with private balcony, plush king bedding, and rain shower.',
    description: 'The Tegulet Mountain Deluxe Room is designed for guests seeking peaceful rest after business meetings or highland excursions. Features warm oak accents, a private Juliette balcony, an ultra-plush mattress, and soothing ambient lighting.',
    capacity: { adults: 2, children: 1, maxGuests: 3 },
    bedType: 'King Bed',
    roomSize: '38 m² / 409 sq ft',
    view: 'Highland Valley View',
    pricePerNight: { amount: 4200, currency: 'ETB', isPriceApproved: false },
    amenities: [
      'Mountain Valley Balcony',
      'High-Speed Fiber Wi-Fi',
      'Work Desk with Universal Plugs',
      'Rainfall Glass Shower',
      'Complimentary Tea & Coffee',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
        alt: 'Tegulet Mountain Deluxe Room with private balcony',
        isPrimary: true,
      },
    ],
    published: true,
    featured: true,
    sortOrder: 3,
  },
  {
    name: 'Berhan Classic King Room',
    slug: 'berhan-classic-king',
    category: 'Standard',
    badge: 'BUSINESS',
    shortDescription: 'Tailored for the contemporary business traveler with high-speed fiber, ergonomic workstation, and quiet garden view.',
    description: 'Quiet and meticulously equipped, the Berhan Classic King caters to regional executives and visiting specialists. A soundproofed layout, high-bandwidth connection, and ergonomic seating guarantee productive work sessions and restorative sleep.',
    capacity: { adults: 2, children: 0, maxGuests: 2 },
    bedType: 'King Bed',
    roomSize: '32 m² / 344 sq ft',
    view: 'Quiet Courtyard Garden',
    pricePerNight: { amount: 3500, currency: 'ETB', isPriceApproved: false },
    amenities: [
      'Ergonomic Business Workstation',
      'Dedicated High-Speed Fiber Port',
      'Quiet Courtyard Setting',
      'Digital Safe Box',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
        alt: 'Berhan Classic King room',
        isPrimary: true,
      },
    ],
    published: true,
    featured: false,
    sortOrder: 4,
  },
  {
    name: 'Highland Twin Deluxe',
    slug: 'highland-twin-deluxe',
    category: 'Twin',
    badge: 'TWIN',
    shortDescription: 'Two plush queen beds, generous luggage storage, and scenic highland morning sunlight.',
    description: 'Ideal for colleagues traveling together or small family groups. Includes two queen-size beds dressed in 400-thread-count Egyptian cotton linens, a spacious dressing vestibule, and double vanity washbasins.',
    capacity: { adults: 2, children: 2, maxGuests: 4 },
    bedType: 'Two Queen Beds',
    roomSize: '42 m² / 452 sq ft',
    view: 'East-facing Sunrise Panorama',
    pricePerNight: { amount: 4600, currency: 'ETB', isPriceApproved: false },
    amenities: [
      'Two Queen Beds',
      'Double Vanity Bathroom',
      'Large Wardrobe & Luggage Bench',
      'High-Speed Wi-Fi',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80',
        alt: 'Highland Twin Deluxe with two elegant beds',
        isPrimary: true,
      },
    ],
    published: true,
    featured: false,
    sortOrder: 5,
  },
]

export const SEED_GALLERY = [
  {
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    title: 'Simien Highland Suite Master Bedroom',
    category: 'rooms',
    caption: 'Refined materials, warm lighting, and private fireplace in our premier suite.',
    sortOrder: 1,
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    title: 'The Highland Hearth Dining Hall',
    category: 'dining',
    caption: 'Gourmet dining featuring authentic Ethiopian and international recipes.',
    sortOrder: 2,
  },
  {
    url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    title: 'Emperor Grand Ballroom',
    category: 'events',
    caption: 'Magical wedding decor with romantic chandelier ambiance.',
    sortOrder: 3,
  },
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    title: 'Hotel Facade & Porte-Cochère',
    category: 'exterior',
    caption: 'Stately modern architecture welcoming guests to Debre Birhan.',
    sortOrder: 4,
  },
  {
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    title: 'Coffee & Patisserie Lounge',
    category: 'dining',
    caption: 'Traditional roasting ceremony and freshly brewed single-origin beans.',
    sortOrder: 5,
  },
  {
    url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    title: 'Menelik Suite Reception Salon',
    category: 'rooms',
    caption: 'Panoramic mountain salon finished in warm oak and brass accents.',
    sortOrder: 6,
  },
  {
    url: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80',
    title: 'Executive Conference Auditorium',
    category: 'events',
    caption: 'Equipped for hybrid international seminars and regional symposia.',
    sortOrder: 7,
  },
  {
    url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    title: 'Sunset Horizon Terrace Bar',
    category: 'dining',
    caption: 'Cozy fire pits and panoramic views overlooking the plateau.',
    sortOrder: 8,
  },
  {
    url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    title: 'Highland Garden Pavilion',
    category: 'exterior',
    caption: 'Manicured gardens and outdoor celebratory spaces.',
    sortOrder: 9,
  },
]

export async function seedDatabase() {
  console.log('[Seed] Seeding initial database records for Getva Hotel...')

  // 1. Seed or Verify Admin User
  const adminEmail = (process.env.ADMIN_BOOTSTRAP_EMAIL || 'admin@getvahotel.com').toLowerCase()
  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || 'Admin@Getva2026'
  const adminName = process.env.ADMIN_BOOTSTRAP_NAME || 'General Manager'

  let admin = await AdminUser.findOne({ email: adminEmail })
  if (!admin) {
    admin = new AdminUser({
      email: adminEmail,
      passwordHash: adminPassword, // will be hashed by pre-save hook
      name: adminName,
      role: 'superadmin',
    })
    await admin.save()
    console.log(`[Seed] Bootstrap Administrator created: ${adminEmail}`)
  } else {
    console.log(`[Seed] Administrator account verified: ${adminEmail}`)
  }

  // 2. Seed Rooms
  const roomCount = await Room.countDocuments()
  if (roomCount === 0) {
    await Room.insertMany(SEED_ROOMS)
    console.log(`[Seed] Seeded ${SEED_ROOMS.length} demonstration rooms & suites.`)
  } else {
    console.log(`[Seed] Rooms collection already populated (${roomCount} records).`)
  }

  // 3. Seed Gallery
  const galleryCount = await GalleryImage.countDocuments()
  if (galleryCount === 0) {
    await GalleryImage.insertMany(SEED_GALLERY)
    console.log(`[Seed] Seeded ${SEED_GALLERY.length} demonstration gallery photos.`)
  } else {
    console.log(`[Seed] Gallery collection already populated (${galleryCount} records).`)
  }

  // 4. Seed Site Content blocks
  const contentCount = await SiteContent.countDocuments()
  if (contentCount === 0) {
    await SiteContent.create([
      {
        section: 'homepage',
        data: {
          heroTitle: 'Highland Grandeur & Bespoke Hospitality',
          heroSubtitle: 'Welcome to Getva Hotel. Perched 2,840 meters above sea level in the refreshing mountain climate of Debre Birhan. A sanctuary for executive retreats, romantic weekend escapes, and majestic celebrations.',
        },
        updatedBy: admin._id,
      },
      {
        section: 'contact',
        data: {
          phone: '+251 11 681 0000 / +251 91 100 0000',
          email: 'info@getvahotel.com',
          address: 'Main Boulevard, Zone 01, Debre Birhan, Ethiopia',
        },
        updatedBy: admin._id,
      },
    ])
    console.log('[Seed] Seeded baseline site content.')
  }

  console.log('[Seed] Database seeding completed successfully.')
}

// Direct execution runner
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  async function run() {
    await connectDB()
    await seedDatabase()
    await closeDB()
    process.exit(0)
  }
  run().catch((err) => {
    console.error('[Seed Error]:', err)
    process.exit(1)
  })
}
