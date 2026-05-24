import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'
import { getSettings } from '@/lib/getSettings'
import { serialize } from '@/lib/serialize'
import InquirySidebar from './InquirySidebar'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devbhumitravels.com'

type Params = Promise<{ slug: string }>

type CarLean = { name: string; seats: number; fuel: string; pricePerDay: number; type: string; slug: string }

export async function generateStaticParams() {
  await connectDB()
  const cars = await Car.find({ isAvailable: true }).select('slug').lean<{ slug: string }[]>()
  return cars.map(car => ({ slug: car.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  await connectDB()
  const car = await Car.findOne({ slug }).lean<CarLean & { images?: string[] }>()
  if (!car) return { title: 'Car Not Found' }
  const description = `Hire the ${car.name} (${car.seats}-seater, ${car.fuel}) for ₹${car.pricePerDay.toLocaleString('en-IN')}/day in Uttarakhand. Experienced driver included. Char Dham, Kedarnath & Rishikesh routes.`
  return {
    title: car.name,
    description,
    alternates: { canonical: `${BASE_URL}/cars/${car.slug}` },
    openGraph: {
      title: `${car.name} — DevBhumi Travels`,
      description,
      url: `${BASE_URL}/cars/${car.slug}`,
      images: car.images && car.images.length > 0
        ? [{ url: car.images[0], width: 1200, height: 630, alt: `${car.name} - DevBhumi Travels` }]
        : undefined,
    },
  }
}

const TYPE_BADGE: Record<string, string> = {
  'SUV':             'bg-forest',
  'Sedan':           'bg-river',
  'Tempo Traveller': 'bg-earth',
  'Other':           'bg-stone',
}

export default async function CarDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  await connectDB()

  const settings = await getSettings()
  const rawCar = await Car.findOne({ slug }).populate('driver').lean()
  if (!rawCar) notFound()

  const car    = serialize(rawCar)
  const waNumber = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const badgeClass = TYPE_BADGE[car.type] ?? 'bg-stone'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Our Fleet', item: `${BASE_URL}/cars` },
      { '@type': 'ListItem', position: 3, name: car.name, item: `${BASE_URL}/cars/${car.slug}` },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${car.name} — Car Rental Uttarakhand`,
    serviceType: 'Car Rental with Driver',
    description: `Hire the ${car.name} (${car.seats}-seater, ${car.fuel}) for ₹${car.pricePerDay.toLocaleString('en-IN')}/day in Uttarakhand. Experienced local driver included.`,
    url: `${BASE_URL}/cars/${car.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'DevBhumi Travels',
      url: BASE_URL,
    },
    areaServed: { '@type': 'State', name: 'Uttarakhand', containedInPlace: { '@type': 'Country', name: 'India' } },
    offers: {
      '@type': 'Offer',
      price: car.pricePerDay,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
    },
  }

  return (
    <div>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <PageHero
        badge={car.type}
        title={car.name}
        subtitle={`${car.seats}-seater · ${car.fuel} · ₹${car.pricePerDay.toLocaleString('en-IN')} per day · Driver included`}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Our Fleet', href: '/cars' },
          { label: car.name },
        ]}
        image={car.images?.[0]}
      />
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* ── Left column ── */}
          <div>

            {/* Image */}
            <div
              className="relative w-full rounded-xl overflow-hidden mb-8"
              style={{ height: 340, background: 'linear-gradient(135deg,#c9d4c0,#a8b89e)' }}
            >
              {car.images[0] ? (
                <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl">🚗</span>
                  <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-forest/40">
                    Photo coming soon
                  </span>
                </div>
              )}
              <span className={`absolute top-4 left-4 ${badgeClass} text-white text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-[6px] rounded`}>
                {car.type}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold text-bark leading-[1.15] mb-5">
              {car.name}
            </h1>

            {/* Quick specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: '🪑', label: 'Seats',    value: `${car.seats} Passengers` },
                { icon: '⛽', label: 'Fuel',     value: car.fuel },
                { icon: '❄️', label: 'Climate',  value: 'Full AC' },
                { icon: '🏔️', label: 'Terrain', value: 'Mountain Ready' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-mist rounded-lg p-4 text-center">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-[11px] font-semibold text-stone uppercase tracking-wide mb-[2px]">{label}</div>
                  <div className="text-[13px] font-semibold text-bark">{value}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            {car.features.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-xl font-semibold text-bark mb-4">Inclusions & Features</h2>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((f: string) => (
                    <span key={f} className="text-[12px] font-semibold text-forest bg-mist px-[14px] py-[6px] rounded-lg flex items-center gap-[6px]">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Driver */}
            {car.driver && (
              <div className="bg-white border border-border rounded-xl p-6">
                <h2 className="font-serif text-xl font-semibold text-bark mb-4">Your Driver</h2>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-mist border-2 border-mist-dark flex items-center justify-center text-lg font-semibold text-forest flex-shrink-0">
                    {car.driver.initials}
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-semibold text-bark mb-1">{car.driver.name}</div>
                    <div className="text-sm text-stone mb-3">
                      {car.driver.experience} years experience · {car.driver.trips}+ trips completed
                    </div>
                    <div className="flex flex-wrap gap-[6px]">
                      {car.driver.languages.map((lang: string) => (
                        <span
                          key={lang}
                          className="text-[11px] font-medium text-river px-3 py-[3px] rounded-full border"
                          style={{ background: 'rgba(74,124,142,0.1)', borderColor: 'rgba(74,124,142,0.2)' }}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right column — sticky sidebar ── */}
          <div className="lg:sticky" style={{ top: 'calc(var(--nav-height) + 24px)' }}>
            <InquirySidebar
              carName={car.name}
              pricePerDay={car.pricePerDay}
              waNumber={waNumber}
              phone={settings.phone || ''}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
