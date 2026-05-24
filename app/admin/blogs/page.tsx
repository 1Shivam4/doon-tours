import { connectDB } from '@/lib/db'
import Blog from '@/lib/models/Blog'
import { serialize } from '@/lib/serialize'
import { seedBlogs } from '@/lib/seedBlogs'
import BlogsList from './BlogsList'

export default async function AdminBlogsPage() {
  await connectDB()
  await seedBlogs()
  const blogs = serialize(await Blog.find().sort({ order: 1, createdAt: -1 }).lean())

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-semibold text-bark mb-1">Blog Posts</h1>
      <p className="text-sm text-stone mb-8">Manage the Wikipedia-style travel guides shown on the website.</p>
      <BlogsList initial={blogs} />
    </div>
  )
}
