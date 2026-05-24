import { Suspense } from 'react'
import Link from 'next/link'
import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'
import { serialize } from '@/lib/serialize'
import { getSettings } from '@/lib/getSettings'
import CarCard from '@/components/CarCard'
import FilterBar from './FilterBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Fleet',
  description: 'Hand-picked vehicles for mountain terrain — with drivers who know every route in Uttarakhand.',
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
    <div style={{ paddingTop: 'var(--nav-height)' }}>

      {/* Page header */}
      <div className="border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 pt-12 pb-10">
          <nav className="flex items-center gap-[6px] text-[13px] text-stone mb-5">
            <Link href="/" className="hover:text-forest transition-colors">Home</Link>
            <span className="text-mist-dark text-[10px]">›</span>
            <span className="text-bark font-medium">Our Fleet</span>
          </nav>
          <h1 className="font-serif text-[clamp(36px,5vw,52px)] font-semibold text-bark leading-[1.1] mb-3">
            Our Fleet
          </h1>
          <p className="text-base text-stone leading-[1.65]">
            Hand-picked vehicles for mountain terrain — with drivers who know every route.
          </p>
        </div>
      </div>

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
