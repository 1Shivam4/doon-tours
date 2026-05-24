import { MetadataRoute } from 'next'
import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devbhumitravels.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB()
  const cars = await Car.find({ isAvailable: true }).select('slug updatedAt').lean<{ slug: string; updatedAt?: Date }[]>()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/cars`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/packages`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/guesthouse`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/terms`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const carRoutes: MetadataRoute.Sitemap = cars.map(car => ({
    url: `${BASE_URL}/cars/${car.slug}`,
    lastModified: car.updatedAt ?? new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...carRoutes]
}
