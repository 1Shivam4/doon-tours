import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'
import { isAdmin } from '@/lib/auth'

type Ctx = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  await connectDB()
  const { slug } = await params
  const car = await Car.findOne({ slug }).populate('driver')
  if (!car) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: car })
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { slug } = await params
  const body = await request.json()

  const car = await Car.findOneAndUpdate({ slug }, body, { new: true, runValidators: true })
  if (!car) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: car })
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { slug } = await params
  const car = await Car.findOneAndDelete({ slug })
  if (!car) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: null })
}
