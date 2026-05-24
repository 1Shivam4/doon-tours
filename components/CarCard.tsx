import Image from 'next/image'
import Link from 'next/link'
import type { CarData } from '@/lib/types'

const TYPE_BADGE: Record<string, string> = {
  'SUV':              'bg-forest',
  'Sedan':            'bg-river',
  'Tempo Traveller':  'bg-earth',
  'Other':            'bg-stone',
}

const CAR_PLACEHOLDER = 'linear-gradient(135deg, #c4d4e8 0%, #9ab8d4 100%)'

interface Props {
  car: CarData
  waNumber?: string
}

export default function CarCard({ car, waNumber }: Props) {
  const wa = waNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const waText = encodeURIComponent(`Hi, I'd like to enquire about the ${car.name} for an Uttarakhand trip.`)
  const waHref = `https://wa.me/${wa}?text=${waText}`

  const badgeClass = TYPE_BADGE[car.type] ?? 'bg-stone'

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden cursor-pointer group transition-all duration-[350ms] hover:-translate-y-[3px] hover:shadow-[var(--shadow-hover)]">

      {/* Image */}
      <div className="relative h-[200px] overflow-hidden" style={{ background: CAR_PLACEHOLDER }}>
        {car.images[0] ? (
          <Image
            src={car.images[0]}
            alt={car.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-forest/40">
              Car Photo
            </span>
          </div>
        )}

        {/* Type badge */}
        <span className={`absolute top-3 left-3 ${badgeClass} text-white text-[10px] font-semibold tracking-[0.08em] uppercase px-3 py-[5px] rounded-sm`}>
          {car.type}
        </span>

        {/* Price badge */}
        <span
          className="absolute bottom-3 right-3 text-white text-[13px] font-semibold px-[14px] py-[6px] rounded-md"
          style={{ background: 'rgba(13,30,56,0.85)', backdropFilter: 'blur(4px)' }}
        >
          ₹{car.pricePerDay.toLocaleString('en-IN')}{' '}
          <span className="text-[10px] font-normal opacity-75">/ day</span>
        </span>
      </div>

      {/* Body */}
      <div className="p-5">

        {/* Name */}
        <div className="font-serif text-[22px] font-semibold text-bark leading-[1.2] mb-3">
          {car.name}
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-[6px] mb-4">
          <span className="flex items-center gap-1 text-xs font-medium text-stone bg-mist px-[10px] py-[5px] rounded-sm">
            🪑 {car.seats} Seats
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-stone bg-mist px-[10px] py-[5px] rounded-sm">
            ❄️ AC
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-stone bg-mist px-[10px] py-[5px] rounded-sm">
            ⛽ {car.fuel}
          </span>
          {car.features.slice(0, 1).map(f => (
            <span key={f} className="flex items-center gap-1 text-xs font-medium text-stone bg-mist px-[10px] py-[5px] rounded-sm">
              🔧 {f}
            </span>
          ))}
        </div>

        {/* Driver */}
        {car.driver && (
          <div className="flex items-center gap-3 py-[14px] border-y border-mist-dark mb-4">
            <div className="w-[38px] h-[38px] rounded-full bg-mist border-2 border-mist-dark flex items-center justify-center text-[13px] font-semibold text-forest flex-shrink-0">
              {car.driver.initials}
            </div>
            <div>
              <div className="text-[13px] font-semibold text-bark mb-[2px]">{car.driver.name}</div>
              <div className="text-[11px] text-stone leading-[1.4]">
                {car.driver.experience} yrs experience · {car.driver.trips}+ trips
              </div>
              <div className="flex gap-1 mt-1 flex-wrap">
                {car.driver.languages.map(lang => (
                  <span
                    key={lang}
                    className="text-[10px] font-medium text-river px-2 py-[2px] rounded-full border"
                    style={{ background: 'rgba(44,123,240,0.1)', borderColor: 'rgba(44,123,240,0.2)' }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/cars/${car.slug}`}
            className="flex-1 text-center text-[13px] font-semibold text-forest border-[1.5px] border-forest px-4 py-[10px] rounded-lg hover:bg-forest hover:text-white transition-all"
          >
            View Details
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-[13px] font-semibold text-white bg-wa-green hover:bg-[#20bd5a] px-4 py-[10px] rounded-lg transition-colors"
          >
            📱 Enquire
          </a>
        </div>
      </div>
    </div>
  )
}
