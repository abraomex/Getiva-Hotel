import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Room name is required'],
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: [true, 'Room slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      enum: ['Suites', 'Presidential', 'Deluxe', 'Standard', 'Twin'],
      default: 'Suites',
    },
    badge: {
      type: String,
      trim: true,
      default: '',
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    description: {
      type: String,
      required: [true, 'Room description is required'],
    },
    capacity: {
      adults: { type: Number, default: 2, min: 1 },
      children: { type: Number, default: 0, min: 0 },
      maxGuests: { type: Number, default: 2, min: 1 },
    },
    bedType: {
      type: String,
      default: 'King Bed',
    },
    roomSize: {
      type: String,
      default: '45 m²',
    },
    view: {
      type: String,
      default: 'Highland Mountain View',
    },
    amenities: {
      type: [String],
      default: [],
    },
    pricePerNight: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: 'ETB' },
      isPriceApproved: { type: Boolean, default: false },
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: '' },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Room = mongoose.model('Room', roomSchema)
