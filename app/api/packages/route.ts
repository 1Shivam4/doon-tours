import { connectDB } from '@/lib/db'
import Package from '@/lib/models/Package'
import { isAdmin } from '@/lib/auth'

export async function GET() {
  await connectDB()
  const packages = await Package.find({ isActive: true }).sort({ order: 1, createdAt: -1 })
  return Response.json({ success: true, data: packages })
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const body = await request.json()

  try {
    const pkg = await Package.create(body)
    return Response.json({ success: true, data: pkg }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create package'
    return Response.json({ success: false, error: message }, { status: 400 })
  }
}
