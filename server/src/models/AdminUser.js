import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    name: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
      default: 'Administrator',
    },
    role: {
      type: String,
      enum: ['superadmin', 'manager'],
      default: 'superadmin',
    },
  },
  {
    timestamps: true,
  }
)

// Pre-save hook: Hash password if modified
adminUserSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
    next()
  } catch (err) {
    next(err)
  }
})

// Compare candidate password
adminUserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash)
}

// Strip passwordHash in JSON serialization
adminUserSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.passwordHash
  return obj
}

export const AdminUser = mongoose.model('AdminUser', adminUserSchema)
