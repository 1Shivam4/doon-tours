import mongoose from 'mongoose'
import './models/index'   // register all schemas so populate() always works

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined in .env')

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

const cached = global._mongoose ?? { conn: null, promise: null }
global._mongoose = cached

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: 'devbhumi' })
  }

  cached.conn = await cached.promise
  return cached.conn
}
