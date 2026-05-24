import { connectDB } from '@/lib/db'
import Destination from '@/lib/models/Destination'
import { serialize } from '@/lib/serialize'
import DestinationsManager from './DestinationsManager'

export default async function AdminDestinationsPage() {
  await connectDB()
  const destinations = serialize(await Destination.find().sort({ order: 1 }).lean())
  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-semibold text-bark mb-1">Destinations</h1>
      <p className="text-sm text-stone mb-8">Manage destination cards shown on the homepage.</p>
      <DestinationsManager initial={destinations} />
    </div>
  )
}
