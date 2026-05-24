import Link from 'next/link'
import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'
import { serialize } from '@/lib/serialize'

export default async function AdminCarsPage() {
  await connectDB()
  const cars = serialize(await Car.find().populate('driver').sort({ createdAt: -1 }).lean())

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-bark mb-1">Cars</h1>
          <p className="text-sm text-stone">{cars.length} vehicle{cars.length !== 1 ? 's' : ''} in fleet</p>
        </div>
        <Link href="/admin/cars/new"
          className="bg-forest hover:bg-forest-light text-white text-sm font-semibold px-5 py-[10px] rounded-lg transition-colors">
          + Add Car
        </Link>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        {cars.length === 0 ? (
          <div className="text-center py-16 text-stone">
            <p className="font-serif text-xl mb-2">No cars yet</p>
            <Link href="/admin/cars/new" className="text-sm text-forest font-medium hover:underline">Add your first car →</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-mist text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Vehicle</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Type</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Price/day</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Driver</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cars.map((car: any) => (
                <tr key={car._id} className="hover:bg-mist/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-bark">{car.name}</td>
                  <td className="px-5 py-4 text-stone">{car.type}</td>
                  <td className="px-5 py-4 text-stone">₹{car.pricePerDay.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-4 text-stone">{car.driver?.name ?? '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-semibold px-2 py-[2px] rounded-full ${
                      car.isAvailable ? 'bg-green-100 text-green-700' : 'bg-mist text-stone'}`}>
                      {car.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/admin/cars/${car._id}/edit`}
                      className="text-sm text-forest font-medium hover:underline mr-4">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
