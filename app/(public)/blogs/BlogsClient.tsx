'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Blog {
  _id:          string
  title:        string
  slug:         string
  summary:      string
  introduction: string
  images:       string[]
  categories:   string[]
  updatedAt:    string
}

const FALLBACK_GRADIENTS: Record<string, string> = {
  'Kedarnath':         'linear-gradient(135deg,#3a5c3b,#6a9c5b)',
  'Badrinath':         'linear-gradient(135deg,#2a4a6b,#4a7c8e)',
  'Valley of Flowers': 'linear-gradient(135deg,#5a7a3a,#8ab46a)',
  'Auli':              'linear-gradient(135deg,#4a3a2a,#8a6a4a)',
  'Rishikesh':         'linear-gradient(135deg,#3a5a5a,#5a8a8a)',
  'Mussoorie':         'linear-gradient(135deg,#5a3a5a,#8a5a8a)',
}

const DEFAULT_GRADIENT = 'linear-gradient(135deg,#2C3E2D,#4A7C8E)'

export default function BlogsClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Extract all unique categories
  const categories = ['All', ...Array.from(new Set(initialBlogs.flatMap(b => b.categories || [])))]

  // Filter logic
  const filtered = initialBlogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.summary.toLowerCase().includes(search.toLowerCase()) ||
      blog.categories.some(c => c.toLowerCase().includes(search.toLowerCase()))
      
    const matchesCategory = 
      selectedCategory === 'All' || 
      blog.categories.includes(selectedCategory)

    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-12">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b border-border">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-forest text-white border-forest shadow-sm'
                  : 'bg-white text-stone border-border hover:bg-mist hover:text-bark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search wiki articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full text-sm text-bark bg-white border border-border rounded-full pl-5 pr-10 py-2.5 outline-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(44,62,45,0.06)] transition-all"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone text-sm pointer-events-none">🔍</span>
        </div>
      </div>

      {/* Blogs Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white border border-border rounded-xl">
          <p className="font-serif text-2xl text-stone mb-2">No articles found</p>
          <p className="text-sm text-stone">Try clearing your filters or searching for something else.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(blog => {
            const date = new Date(blog.updatedAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })
            const mainImage = blog.images?.[0]

            return (
              <div key={blog._id} className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-[var(--shadow-hover)] hover:-translate-y-[3px] transition-all duration-[350ms] group flex flex-col h-full">
                {/* Image */}
                <Link href={`/blogs/${blog.slug}`} className="relative h-[200px] w-full block overflow-hidden">
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[350ms] group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div
                      className="w-full h-full transition-transform duration-[350ms] group-hover:scale-[1.03]"
                      style={{ background: FALLBACK_GRADIENTS[blog.title] ?? DEFAULT_GRADIENT }}
                    />
                  )}
                </Link>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {blog.categories.slice(0, 3).map(c => (
                      <span key={c} className="text-[10px] font-semibold tracking-[0.06em] uppercase text-saffron bg-saffron/10 px-2 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-semibold text-bark mb-2 group-hover:text-forest transition-colors leading-[1.25]">
                    <Link href={`/blogs/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-stone leading-[1.6] mb-5 line-clamp-3">
                    {blog.summary}
                  </p>

                  {/* Bottom details */}
                  <div className="mt-auto pt-4 border-t border-mist flex justify-between items-center text-xs text-stone">
                    <span>Modified: {date}</span>
                    <Link href={`/blogs/${blog.slug}`} className="font-semibold text-forest group-hover:underline flex items-center gap-1">
                      Read Wiki <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
