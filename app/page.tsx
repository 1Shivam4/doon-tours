import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'
import Destination from '@/lib/models/Destination'
import Testimonial from '@/lib/models/Testimonial'
import { getSettings } from '@/lib/getSettings'
import { serialize } from '@/lib/serialize'

import HeroSection from '@/components/home/HeroSection'
import TrustBar from '@/components/home/TrustBar'
import DestinationsSection from '@/components/home/DestinationsSection'
import FleetPreview from '@/components/home/FleetPreview'
import HowItWorks from '@/components/home/HowItWorks'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CtaBanner from '@/components/home/CtaBanner'

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

  return (
    <>
      <HeroSection waNumber={waNumber} />
      <TrustBar />
      <DestinationsSection destinations={destinations} />
      <FleetPreview cars={cars} waNumber={waNumber} />
      <HowItWorks />
      <TestimonialsSection testimonials={testimonials} />
      <CtaBanner waNumber={waNumber} />
    </>
  )
}
