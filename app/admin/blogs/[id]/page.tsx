import { connectDB } from '@/lib/db'
import Blog from '@/lib/models/Blog'
import { serialize } from '@/lib/serialize'
import { notFound } from 'next/navigation'
import BlogForm from '@/components/admin/BlogForm'

type Ctx = { params: Promise<{ id: string }> }

export default async function EditBlogPage({ params }: Ctx) {
  await connectDB()
  const { id } = await params
  
  const rawBlog = await Blog.findById(id).lean()
  if (!rawBlog) notFound()

  const blog = serialize(rawBlog)

  const formattedCategories = Array.isArray(blog.categories)
    ? blog.categories.join(', ')
    : ''

  const initialData = {
    title:        blog.title,
    slug:         blog.slug,
    summary:      blog.summary,
    introduction: blog.introduction,
    sections:     blog.sections || [],
    infobox:      blog.infobox || [],
    categories:   formattedCategories,
    isActive:     blog.isActive,
    order:        blog.order || 0,
  }

  return (
    <div className="p-8">
      <div className="max-w-[760px] mb-6">
        <h1 className="font-serif text-3xl font-semibold text-bark mb-1">Edit Blog Post</h1>
        <p className="text-sm text-stone">Update section headers, infobox details, images, or draft status.</p>
      </div>
      <BlogForm initial={initialData} blogId={blog._id} initialImages={blog.images || []} />
    </div>
  )
}
