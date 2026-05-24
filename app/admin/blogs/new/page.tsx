import BlogForm from '@/components/admin/BlogForm'

export default function NewBlogPage() {
  return (
    <div className="p-8">
      <div className="max-w-[760px] mb-6">
        <h1 className="font-serif text-3xl font-semibold text-bark mb-1">New Blog Post</h1>
        <p className="text-sm text-stone">Draft a Wikipedia-style article or guide for tourists.</p>
      </div>
      <BlogForm />
    </div>
  )
}
