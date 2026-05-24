import { connectDB } from '@/lib/db'
import Blog from '@/lib/models/Blog'
import { serialize } from '@/lib/serialize'
import { getSettings } from '@/lib/getSettings'
import { seedBlogs } from '@/lib/seedBlogs'
import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/home/CtaBanner'
import BlogsClient from './BlogsClient'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Uttarakhand Travel Guides — Char Dham Yatra, Treks, Hill Stations & More',
  description: 'Complete travel wiki, local guides, and detailed itineraries for Uttarakhand — from Char Dham pilgrimage routes to Auli skiing, Valley of Flowers treks, and hidden hill stations. Expert insights from locals.',
}

export default async function BlogsPage() {
  const settings = await getSettings()
  await connectDB()
  await seedBlogs()

  const rawBlogs = await Blog.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean()
  const blogs = serialize(rawBlogs)
  const waNumber = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

  return (
    <div>
      <PageHero
        badge="Local Knowledge Matters"
        title="Your Complete Uttarakhand Travel Encyclopedia"
        subtitle="Deep local insights, destination guides, seasonal access tips, and detailed itineraries for everything from Char Dham Yatra to hidden mountain villages. Written by locals who've driven these roads 100 times over."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Travel Guides' }]}
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80"
      />
      <BlogsClient initialBlogs={blogs} />
      <CtaBanner waNumber={waNumber} />
    </div>
  )
}
