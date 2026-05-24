import Link from 'next/link'
import CarCard from '@/components/CarCard'
import type { CarData } from '@/lib/types'

interface Props {
  cars: CarData[]
  waNumber: string
}

export default function FleetPreview({ cars, waNumber }: Props) {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-8 py-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-2">
            Meet Your Vehicle
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-semibold text-bark leading-[1.12] tracking-[-0.01em]">
            Well-maintained SUVs<br />
            <em className="not-italic text-stone">for every journey type</em>
          </h2>
          <p className="text-base text-stone leading-[1.75] max-w-[480px] mt-3">From comfortable Innova Crystas for couples to spacious Tempo Travellers for groups. Every vehicle is regularly serviced and fitted for mountain terrain.</p>
        </div>
        <Link
          href="/cars"
          className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-semibold text-forest border-[1.5px] border-forest px-5 py-[10px] rounded-lg hover:bg-forest hover:text-white transition-all whitespace-nowrap"
        >
          View All Cars →
        </Link>
      </div>

      {/* Cars grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <CarCard key={car._id} car={car} waNumber={waNumber} />
        ))}
      </div>
    </section>
  )
}
