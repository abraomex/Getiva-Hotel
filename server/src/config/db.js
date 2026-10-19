import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod = null

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/getva_hotel'

  try {
    // Attempt connecting to the configured MongoDB URI
    mongoose.set('strictQuery', true)
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    })
    console.log(`[DB] Connected to MongoDB: ${uri}`)
  } catch (err) {
    console.warn(`[DB] Could not connect to external MongoDB at ${uri} (${err.message}).`)
    console.log('[DB] Launching internal in-memory MongoDB engine for zero-setup demonstration...')

    try {
      mongod = await MongoMemoryServer.create()
      const memUri = mongod.getUri()
      await mongoose.connect(memUri)
      console.log(`[DB] Connected to In-Memory MongoDB: ${memUri}`)
    } catch (memErr) {
      console.error('[DB] Failed to start In-Memory MongoDB:', memErr.message)
      throw memErr
    }
  }

  return mongoose.connection
}

export async function closeDB() {
  await mongoose.disconnect()
  if (mongod) {
    await mongod.stop()
  }
}
