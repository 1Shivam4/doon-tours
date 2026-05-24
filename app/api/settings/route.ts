import { connectDB } from '@/lib/db'
import SiteSettings from '@/lib/models/SiteSettings'
import { isAdmin } from '@/lib/auth'

export async function GET() {
  await connectDB()
  // Always return the singleton — create with defaults if missing
  let settings = await SiteSettings.findOne()
  if (!settings) settings = await SiteSettings.create({})
  return Response.json({ success: true, data: settings })
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const body = await request.json()

  const settings = await SiteSettings.findOneAndUpdate(
    {},
    body,
    { new: true, upsert: true, runValidators: true }
  )
  return Response.json({ success: true, data: settings })
}
