import { connectDB } from '@/lib/db'
import Blog from '@/lib/models/Blog'
import { isAdmin } from '@/lib/auth'
import { seedBlogs } from '@/lib/seedBlogs'

export async function GET() {
  await connectDB()
  // Trigger seeding if empty
  await seedBlogs()
  const blogs = await Blog.find({ isActive: true }).sort({ order: 1 })
  return Response.json({ success: true, data: blogs })
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const body = await request.json()

  try {
    const blog = await Blog.create(body)
    return Response.json({ success: true, data: blog }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create blog'
    return Response.json({ success: false, error: message }, { status: 400 })
  }
}
