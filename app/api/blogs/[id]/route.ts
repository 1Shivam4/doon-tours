import { connectDB } from '@/lib/db'
import Blog from '@/lib/models/Blog'
import { isAdmin } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  await connectDB()
  const { id } = await params
  const blog = await Blog.findById(id)
  if (!blog) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: blog })
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const body = await request.json()
  
  try {
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!blog) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
    return Response.json({ success: true, data: blog })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update blog'
    return Response.json({ success: false, error: message }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const blog = await Blog.findByIdAndDelete(id)
  if (!blog) return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  return Response.json({ success: true, data: null })
}
