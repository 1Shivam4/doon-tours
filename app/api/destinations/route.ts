import { connectDB } from '@/lib/db'
import Destination from '@/lib/models/Destination'
import { isAdmin } from '@/lib/auth'

export async function GET() {
  await connectDB()
  const destinations = await Destination.find({ isActive: true }).sort({ order: 1 })
  return Response.json({ success: true, data: destinations })
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const body = await request.json()

  try {
    const destination = await Destination.create(body)
    return Response.json({ success: true, data: destination }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create destination'
    return Response.json({ success: false, error: message }, { status: 400 })
  }
}
