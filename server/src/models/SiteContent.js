import mongoose from 'mongoose'

const siteContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: [true, 'Content section key is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
    },
  },
  {
    timestamps: true,
  }
)

export const SiteContent = mongoose.model('SiteContent', siteContentSchema)
