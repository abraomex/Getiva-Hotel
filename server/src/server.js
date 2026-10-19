import 'dotenv/config'
import app from './app.js'
import { connectDB, closeDB } from './config/db.js'
import { seedDatabase } from './seed/seed.js'

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    // 1. Connect Database
    await connectDB()

    // 2. Ensure initial seed exists
    await seedDatabase()

    // 3. Start Express Server
    const server = app.listen(PORT, () => {
      console.log(`====================================================`)
      console.log(`  GETVA HOTEL REST API — DEBRE BIRHAN, ETHIOPIA`)
      console.log(`  Status: Running on http://localhost:${PORT}`)
      console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`  Health Check: http://localhost:${PORT}/api/health`)
      console.log(`====================================================`)
    })

    // Graceful Shutdown
    const shutdown = async (signal) => {
      console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`)
      server.close(async () => {
        await closeDB()
        console.log('[Server] Database closed. Process terminated.')
        process.exit(0)
      })
    }

    process.on('SIGINT', () => shutdown('SIGINT'))
    process.on('SIGTERM', () => shutdown('SIGTERM'))
  } catch (err) {
    console.error('[Server Error] Startup failed:', err.message)
    process.exit(1)
  }
}

startServer()
