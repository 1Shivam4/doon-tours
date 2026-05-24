import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'
import { serialize } from '@/lib/serialize'
import CarForm from '@/components/admin/CarForm'

type Params = Promise<{ id: string }>

export default async function AdminCarEditPage({ params }: { params: Params }) {
  const { id } = await params
  await connectDB()
  const raw = await Car.findById(id).lean()
  if (!raw) notFound()
  const car = serialize(raw)

  const initial = {
    name:        car.name,
    slug:        car.slug,
    type:        car.type,
    seats:       car.seats,
    fuel:        car.fuel,
    pricePerDay: car.pricePerDay,
    features:    (car.features as string[]).join(', '),
    driver:      car.driver?.toString() ?? '',
    isAvailable: car.isAvailable,
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-semibold text-bark mb-1">Edit Car</h1>
      <p className="text-sm text-stone mb-8">{car.name}</p>
      <CarForm initial={initial} carId={id} />
    </div>
  )
}
