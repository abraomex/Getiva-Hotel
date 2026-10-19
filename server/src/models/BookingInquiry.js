import mongoose from 'mongoose'

const bookingInquirySchema = new mongoose.Schema(
  {
    guestName: {
      type: String,
      required: [true, 'Guest name is required'],
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
    roomIdString: {
      type: String,
      trim: true,
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    guests: {
      adults: { type: Number, default: 2, min: 1 },
      children: { type: Number, default: 0, min: 0 },
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'contacted', 'archived'],
      default: 'pending',
      index: true,
    },
    internalNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

export const BookingInquiry = mongoose.model('BookingInquiry', bookingInquirySchema)
