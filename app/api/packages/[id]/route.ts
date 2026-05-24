import { connectDB } from '@/lib/db'
import Package from '@/lib/models/Package'
import { isAdmin } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  await connectDB()
  const { id } = await params
  const pkg = await Package.findById(id)
  if (!pkg) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: pkg })
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const body = await request.json()
  const pkg = await Package.findByIdAndUpdate(id, body, { new: true, runValidators: true })
  if (!pkg) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: pkg })
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const pkg = await Package.findByIdAndDelete(id)
  if (!pkg) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: null })
}
