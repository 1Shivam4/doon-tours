'use client'

import { useState } from 'react'
import Link from 'next/link'

interface BlogItem {
  _id: string
  title: string
  slug: string
  categories: string[]
  isActive: boolean
  order: number
}

export default function BlogsList({ initial }: { initial: BlogItem[] }) {
  const [items, setItems] = useState<BlogItem[]>(initial)

  async function toggleActive(blog: BlogItem) {
    const res = await fetch(`/api/blogs/${blog._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !blog.isActive }),
    })
    const json = await res.json()
    if (json.success) {
      setItems(prev => prev.map(i => i._id === blog._id ? { ...i, isActive: !i.isActive } : i))
    }
  }

  async function remove(id: string) {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
    const json = await res.json()
    if (json.success) {
      setItems(prev => prev.filter(i => i._id !== id))
    }
  }

  return (
    <div className="max-w-[960px]">
      <div className="flex justify-end mb-4">
        <Link href="/admin/blogs/new"
          className="text-sm font-medium text-forest border border-forest px-4 py-2 rounded-lg hover:bg-forest hover:text-white transition-all">
          + Add Blog Post
        </Link>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden mb-4 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-mist text-left">
              <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Title</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Slug</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Categories</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-stone">
                  No blog posts found. Click &quot;Add Blog Post&quot; to create one.
                </td>
              </tr>
            ) : (
              items.map(blog => (
                <tr key={blog._id} className="hover:bg-mist/30 transition-colors">
                  <td className="px-5 py-3 font-semibold text-bark max-w-[280px] truncate">{blog.title}</td>
                  <td className="px-5 py-3 text-stone text-[13px]">{blog.slug}</td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {blog.categories.map(c => (
                        <span key={c} className="text-[10px] bg-mist text-stone px-1.5 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => toggleActive(blog)}
                      className={`text-[11px] font-semibold px-2.5 py-[3px] rounded-full transition-colors ${
                        blog.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-stone/10 text-stone hover:bg-stone/20'}`}>
                      {blog.isActive ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right flex justify-end gap-3 items-center h-full">
                    <Link href={`/admin/blogs/${blog._id}`} className="text-xs text-forest hover:underline">
                      Edit
                    </Link>
                    <button onClick={() => remove(blog._id)} className="text-xs text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
