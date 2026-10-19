import fs from 'fs'
import path from 'path'
import { MongoMemoryServer } from 'mongodb-memory-server'

const dataDir = path.resolve(process.cwd(), 'data', 'db')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

async function startLocalMongo() {
  console.log('[MongoDaemon] Starting local MongoDB instance on port 27017...')
  try {
    const mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbPath: dataDir,
        storageEngine: 'wiredTiger',
      },
      spawn: { timeout: 60000 },
    })
    console.log(`[MongoDaemon] MongoDB 27017 is online at: ${mongod.getUri()}`)
    console.log(`[MongoDaemon] Data persisted in: ${dataDir}`)

    // Keep event loop active
    setInterval(() => {}, 1000 * 60 * 60)
    process.on('SIGINT', async () => {
      console.log('[MongoDaemon] Stopping...')
      await mongod.stop()
      process.exit(0)
    })
  } catch (err) {
    if (err.message && err.message.includes('EADDRINUSE')) {
      console.log('[MongoDaemon] Port 27017 is already in use by another MongoDB process.')
    } else {
      console.error('[MongoDaemon] Error starting local MongoDB:', err.message)
    }
  }
}

startLocalMongo()
