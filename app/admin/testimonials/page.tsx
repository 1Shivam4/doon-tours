import { connectDB } from '@/lib/db'
import Testimonial from '@/lib/models/Testimonial'
import { serialize } from '@/lib/serialize'
import TestimonialsManager from './TestimonialsManager'

export default async function AdminTestimonialsPage() {
  await connectDB()
  const testimonials = serialize(await Testimonial.find().sort({ createdAt: -1 }).lean())
  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-semibold text-bark mb-1">Testimonials</h1>
      <p className="text-sm text-stone mb-8">Approve or remove customer reviews.</p>
      <TestimonialsManager initial={testimonials} />
    </div>
  )
}
