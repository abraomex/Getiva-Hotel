import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod = null

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/getva_hotel'

  try {
    // 1. Attempt connecting to configured MONGODB_URI
    mongoose.set('strictQuery', true)
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 })
    console.log(`[DB] Connected to MongoDB: ${uri}`)
    return mongoose.connection
  } catch (err) {
    console.warn(`[DB] Primary connection to ${uri} failed (${err.message}).`)
  }

  // 2. Try default local MongoDB port 27017 if different from uri
  if (uri !== 'mongodb://127.0.0.1:27017/getva_hotel') {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/getva_hotel', { serverSelectionTimeoutMS: 2000 })
      console.log('[DB] Connected to local MongoDB on port 27017')
      return mongoose.connection
    } catch (e) {
      // Continue to embedded launcher
    }
  }

  // 3. Launch embedded MongoDB on port 27017
  console.log('[DB] Launching internal in-memory MongoDB engine for zero-setup demonstration...')
  try {
    mongod = await MongoMemoryServer.create({
      instance: { port: 27017 },
      spawn: { timeout: 60000 },
    })
    global.__MONGOD__ = mongod
    const memUri = mongod.getUri()
    await mongoose.connect(memUri)
    console.log(`[DB] Connected to In-Memory MongoDB: ${memUri}`)
  } catch (memErr) {
    // If port 27017 was somehow taken, spawn on dynamic port
    mongod = await MongoMemoryServer.create({ spawn: { timeout: 60000 } })
    global.__MONGOD__ = mongod
    const fallbackUri = mongod.getUri()
    await mongoose.connect(fallbackUri)
    console.log(`[DB] Connected to In-Memory MongoDB (Dynamic Port): ${fallbackUri}`)
  }

  return mongoose.connection
}

export async function closeDB() {
  await mongoose.disconnect()
  if (mongod) {
    await mongod.stop()
  }
}
