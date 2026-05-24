import { connectDB } from '@/lib/db'
import Driver from '@/lib/models/Driver'
import { isAdmin } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  await connectDB()
  const { id } = await params
  const driver = await Driver.findById(id)
  if (!driver) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: driver })
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const body = await request.json()
  const driver = await Driver.findByIdAndUpdate(id, body, { new: true, runValidators: true })
  if (!driver) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: driver })
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const driver = await Driver.findByIdAndDelete(id)
  if (!driver) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: null })
}
