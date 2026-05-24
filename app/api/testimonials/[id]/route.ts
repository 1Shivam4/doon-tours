import { connectDB } from '@/lib/db'
import Testimonial from '@/lib/models/Testimonial'
import { isAdmin } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const body = await request.json()
  const t = await Testimonial.findByIdAndUpdate(id, body, { new: true, runValidators: true })
  if (!t) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: t })
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const t = await Testimonial.findByIdAndDelete(id)
  if (!t) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: null })
}
