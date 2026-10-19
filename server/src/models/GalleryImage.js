import mongoose from 'mongoose'

const galleryImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      default: '',
    },
    alt: {
      type: String,
      trim: true,
      default: '',
    },
    caption: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      enum: ['rooms', 'dining', 'events', 'exterior', 'wellness'],
      default: 'rooms',
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

export const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema)
