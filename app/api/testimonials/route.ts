import { connectDB } from '@/lib/db'
import Testimonial from '@/lib/models/Testimonial'
import { isAdmin } from '@/lib/auth'

export async function GET(request: Request) {
  await connectDB()
  const { searchParams } = new URL(request.url)
  // Admin can fetch all; public only gets approved
  const all = searchParams.get('all') === 'true'

  const filter = all ? {} : { isApproved: true }
  const testimonials = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 })
  return Response.json({ success: true, data: testimonials })
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const body = await request.json()

  try {
    const testimonial = await Testimonial.create(body)
    return Response.json({ success: true, data: testimonial }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create testimonial'
    return Response.json({ success: false, error: message }, { status: 400 })
  }
}
