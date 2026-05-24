import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'
import Destination from '@/lib/models/Destination'
import Testimonial from '@/lib/models/Testimonial'
import { getSettings } from '@/lib/getSettings'
import { serialize } from '@/lib/serialize'
import JsonLd from '@/components/JsonLd'

import HeroSection from '@/components/home/HeroSection'
import TrustBar from '@/components/home/TrustBar'
import DestinationsSection from '@/components/home/DestinationsSection'
import FleetPreview from '@/components/home/FleetPreview'
import HowItWorks from '@/components/home/HowItWorks'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CtaBanner from '@/components/home/CtaBanner'
import FaqSection, { faqSchema } from '@/components/home/FaqSection'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devbhumitravels.com'

export default async function HomePage() {
  await connectDB()

  const [settings, rawCars, rawDestinations, rawTestimonials] = await Promise.all([
    getSettings(),
    Car.find({ isAvailable: true }).populate('driver').limit(3).sort({ createdAt: 1 }).lean(),
    Destination.find({ isActive: true }).sort({ order: 1 }).lean(),
    Testimonial.find({ isApproved: true }).sort({ order: 1 }).limit(3).lean(),
  ])

  const cars         = serialize(rawCars)
  const destinations = serialize(rawDestinations)
  const testimonials = serialize(rawTestimonials)
  const waNumber     = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BASE_URL,
    name: settings.businessName || 'DevBhumi Travels',
    description: 'Comfortable cars, experienced local drivers, and deep knowledge of every road in Uttarakhand — from Rishikesh to Kedarnath and beyond.',
    url: BASE_URL,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dehradun',
      addressRegion: 'Uttarakhand',
      addressCountry: 'IN',
    },
    openingHours: 'Mo-Su 08:00-21:00',
    priceRange: '₹₹',
    areaServed: { '@type': 'State', name: 'Uttarakhand' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Uttarakhand Car Rental Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SUV Rental with Driver' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Char Dham Yatra Cab' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tempo Traveller for Groups' } },
      ],
    },
  }

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />
      <HeroSection waNumber={waNumber} />
      <TrustBar />
      <DestinationsSection destinations={destinations} />
      <FleetPreview cars={cars} waNumber={waNumber} />
      <HowItWorks />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection />
      <CtaBanner waNumber={waNumber} />
    </>
  )
}
