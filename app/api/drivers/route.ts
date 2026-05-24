import { connectDB } from '@/lib/db'
import Driver from '@/lib/models/Driver'
import { isAdmin } from '@/lib/auth'

export async function GET() {
  await connectDB()
  const drivers = await Driver.find().sort({ name: 1 })
  return Response.json({ success: true, data: drivers })
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const body = await request.json()

  try {
    const driver = await Driver.create(body)
    return Response.json({ success: true, data: driver }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create driver'
    return Response.json({ success: false, error: message }, { status: 400 })
  }
}
