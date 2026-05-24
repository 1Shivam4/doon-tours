import { connectDB } from '@/lib/db'
import Destination from '@/lib/models/Destination'
import { isAdmin } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  await connectDB()
  const { id } = await params
  const dest = await Destination.findById(id)
  if (!dest) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: dest })
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const body = await request.json()
  const dest = await Destination.findByIdAndUpdate(id, body, { new: true, runValidators: true })
  if (!dest) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: dest })
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const dest = await Destination.findByIdAndDelete(id)
  if (!dest) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: null })
}
