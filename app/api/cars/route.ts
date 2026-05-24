import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'
import { isAdmin } from '@/lib/auth'

export async function GET(request: Request) {
  await connectDB()
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  const filter: Record<string, unknown> = {}
  if (type) filter.type = type

  const cars = await Car.find(filter).populate('driver').sort({ createdAt: -1 })
  return Response.json({ success: true, data: cars })
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const body = await request.json()

  try {
    const car = await Car.create(body)
    return Response.json({ success: true, data: car }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create car'
    return Response.json({ success: false, error: message }, { status: 400 })
  }
}
