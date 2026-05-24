import { connectDB } from '@/lib/db'
import Blog from '@/lib/models/Blog'
import { serialize } from '@/lib/serialize'
import { notFound } from 'next/navigation'
import { getSettings } from '@/lib/getSettings'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/home/CtaBanner'
import type { Metadata } from 'next'

type Ctx = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  await connectDB()
  const { slug } = await params
  const blog = await Blog.findOne({ slug, isActive: true })
  if (!blog) return { title: 'Article Not Found' }
  return {
    title: `${blog.title} | Travel Wiki`,
    description: blog.summary,
  }
}

function getAnchorId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function parseMarkdown(text: string) {
  if (!text) return ''
  
  // Escape HTML tags to prevent XSS/broken layouts
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Bold: **text** -> strong
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-bark">$1</strong>')

  // Links: [text](url) -> a
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-river hover:underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>')

  // Split by double newlines into blocks (paragraphs or lists)
  const blocks = html.split(/\n\s*\n/)
  
  return blocks.map(block => {
    const trimmed = block.trim()
    if (!trimmed) return ''

    // Bulleted lists (lines starting with * or -)
    if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
      const items = trimmed.split('\n').map(li => {
        const cleaned = li.trim().replace(/^[\*\-]\s*/, '')
        return `<li class="ml-6 list-disc mb-1.5 text-stone leading-[1.65] text-[15px]">${cleaned}</li>`
      }).join('')
      return `<ul class="my-4 space-y-1">${items}</ul>`
    }

    // Default paragraph
    const withBreaks = trimmed.replace(/\n/g, '<br />')
    return `<p class="mb-4 text-stone leading-[1.7] text-[15px]">${withBreaks}</p>`
  }).join('')
}

export default async function BlogDetailPage({ params }: Ctx) {
  const settings = await getSettings()
  await connectDB()
  const { slug } = await params
  
  const rawBlog = await Blog.findOne({ slug, isActive: true }).lean()
  if (!rawBlog) notFound()

  const blog = serialize(rawBlog)
  const waNumber = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

  const mainImage = blog.images?.[0]
  const galleryImages = blog.images || []

  return (
    <div>
      <PageHero
        badge="Travel Wiki & Guide"
        title={blog.title}
        subtitle={blog.summary}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Wiki', href: '/blogs' },
          { label: blog.title }
        ]}
        image={mainImage || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80'}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-12">
        {/* Outer Grid */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar - Table of Contents */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <div className="bg-mist/30 border border-border p-5 rounded-xl sticky top-24 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-bark mb-4 pb-2 border-b border-border">
                Contents
              </h3>
              <nav className="flex flex-col gap-2.5 text-sm">
                <a href="#introduction" className="text-river hover:underline font-medium flex items-center gap-2">
                  <span>0.</span> Introduction
                </a>
                {blog.sections?.map((sec: any, idx: number) => (
                  <a
                    key={idx}
                    href={`#${getAnchorId(sec.heading)}`}
                    className="text-river hover:underline font-medium flex items-center gap-2 ml-1"
                  >
                    <span>{idx + 1}.</span> {sec.heading}
                  </a>
                ))}
                {galleryImages.length > 1 && (
                  <a href="#gallery" className="text-river hover:underline font-medium flex items-center gap-2">
                    <span>{blog.sections?.length + 1 || 1}.</span> Image Gallery
                  </a>
                )}
              </nav>
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="flex-1 min-w-0">
            
            {/* Wikipedia title header styling */}
            <header className="mb-6">
              <h1 className="font-serif text-3xl md:text-4xl font-normal text-bark leading-tight mb-1 border-b border-[#a2a9b1] pb-1.5">
                {blog.title}
              </h1>
              <div className="text-[12px] text-stone italic">
                From DevBhumi Travels, the local travel wiki & guide
              </div>
            </header>

            {/* Wikipedia Right-floating Infobox (stacks on mobile) */}
            {blog.infobox?.length > 0 && (
              <div className="w-full md:w-[320px] md:float-right md:ml-6 mb-6 border border-[#a2a9b1] rounded-lg overflow-hidden bg-[#f8f9fa] shadow-sm flex flex-col">
                <div className="bg-forest text-white px-4 py-2.5 text-center font-serif font-semibold text-[15px] tracking-wide">
                  {blog.title}
                </div>
                {mainImage && (
                  <div className="relative h-[200px] w-full bg-white border-b border-[#a2a9b1] p-2 flex items-center justify-center">
                    <img
                      src={mainImage}
                      alt={blog.title}
                      className="max-h-full max-w-full object-contain mx-auto"
                    />
                  </div>
                )}
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    {blog.infobox.map((row: any, idx: number) => (
                      <tr key={idx} className="border-b border-[#e2e6df] last:border-b-0 hover:bg-mist/10">
                        <td className="font-semibold text-bark py-2.5 px-3 w-1/3 bg-mist/20 border-r border-[#e2e6df]">
                          {row.key}
                        </td>
                        <td className="text-stone py-2.5 px-3 whitespace-pre-line leading-relaxed">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Lead introduction paragraph */}
            <div
              id="introduction"
              className="text-[16px] text-bark leading-[1.7] mb-8 font-sans scroll-mt-24"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(blog.introduction) }}
            />

            {/* Wiki Sections */}
            {blog.sections?.map((sec: any, idx: number) => {
              const id = getAnchorId(sec.heading)
              return (
                <section key={idx} id={id} className="mb-8 scroll-mt-24">
                  <h2 className="font-serif text-2xl font-normal text-bark border-b border-[#a2a9b1] pb-1 mt-8 mb-4">
                    {sec.heading}
                  </h2>
                  <div
                    className="font-sans"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(sec.body) }}
                  />
                </section>
              )
            })}

            {/* Wikipedia-style Thumbnails Image Gallery */}
            {galleryImages.length > 1 && (
              <section id="gallery" className="scroll-mt-24 mt-12">
                <h2 className="font-serif text-2xl font-normal text-bark border-b border-[#a2a9b1] pb-1 mb-6">
                  Image Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryImages.slice(1).map((img: string, idx: number) => (
                    <div key={idx} className="border border-[#ccc] p-3 bg-[#f8f9fa] shadow-sm rounded-lg flex flex-col">
                      <div className="relative h-44 w-full bg-white rounded overflow-hidden">
                        <img
                          src={img}
                          alt={`${blog.title} view ${idx + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 text-xs text-stone italic mt-2 leading-relaxed">
                        {blog.title} — Scenic view reference #{idx + 2}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Wikipedia Category footer block */}
            {blog.categories?.length > 0 && (
              <div className="border border-[#a2a9b1] bg-[#f8f9fa] p-3 rounded-lg text-xs mt-12 flex flex-wrap items-center gap-2">
                <span className="font-bold text-bark uppercase tracking-wider text-[10px]">Categories:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {blog.categories.map((c: string, idx: number) => (
                    <span key={c} className="flex items-center">
                      {idx > 0 && <span className="text-stone/30 mr-1.5">|</span>}
                      <Link href="/blogs" className="text-river hover:underline font-semibold">
                        {c}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            )}

          </article>
        </div>
      </div>
      <CtaBanner waNumber={waNumber} />
    </div>
  )
}
