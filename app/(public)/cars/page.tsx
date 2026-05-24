import { Suspense } from 'react'
import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'
import { serialize } from '@/lib/serialize'
import { getSettings } from '@/lib/getSettings'
import CarCard from '@/components/CarCard'
import FilterBar from './FilterBar'
import PageHero from '@/components/PageHero'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Car Rental With Driver in Uttarakhand — SUVs, Sedans & Tempo Travellers',
  description: 'Rent well-maintained vehicles with experienced local drivers for Char Dham Yatra, Himalayan road trips, and airport transfers. Transparent pricing, 24/7 support. ₹3,000-15,000/day.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://devbhumitravels.com'}/cars`,
  },
}

type SearchParams = Promise<{ type?: string; sort?: string }>

function buildSort(sort?: string): Record<string, 1 | -1> {
  if (sort === 'price-desc') return { pricePerDay: -1 }
  if (sort === 'seats')      return { seats: -1 }
  return { pricePerDay: 1 }
}

export default async function CarsPage({ searchParams }: { searchParams: SearchParams }) {
  const { type, sort } = await searchParams

  await connectDB()
  const settings = await getSettings()
  const waNumber = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

  const filter: Record<string, unknown> = { isAvailable: true }
  if (type && type !== 'All') filter.type = type

  const rawCars = await Car.find(filter).populate('driver').sort(buildSort(sort)).lean()
  const cars = serialize(rawCars)

  return (
    <div>
      <PageHero
        badge="Our Fleet"
        title="Choose the Right Car for Your Journey"
        subtitle="From Innova Crysta SUVs for couples to Tempo Travellers for groups — all with professional drivers licensed for mountain terrain. Available for airport transfers, day trips, or multi-day expeditions across Uttarakhand."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Our Fleet' }]}
        image="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=1400&q=80"
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">

        {/* Filter bar — wrapped in Suspense because FilterBar uses useSearchParams() */}
        <Suspense fallback={<div className="h-14 bg-mist rounded-xl animate-pulse mb-8" />}>
          <FilterBar total={cars.length} />
        </Suspense>

        {/* Grid */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <CarCard key={car._id} car={car} waNumber={waNumber} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-stone mb-2">No vehicles found</p>
            <p className="text-sm text-stone">Try a different filter above.</p>
          </div>
        )}
      </div>
    </div>
  )
}
