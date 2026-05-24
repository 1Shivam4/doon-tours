import Image from 'next/image'
import Link from 'next/link'

const FALLBACK_GRADIENTS: Record<string, string> = {
  'Kedarnath':         'linear-gradient(135deg,#3a5c3b,#6a9c5b)',
  'Badrinath':         'linear-gradient(135deg,#2a4a6b,#4a7c8e)',
  'Valley of Flowers': 'linear-gradient(135deg,#5a7a3a,#8ab46a)',
  'Auli':              'linear-gradient(135deg,#4a3a2a,#8a6a4a)',
  'Rishikesh':         'linear-gradient(135deg,#3a5a5a,#5a8a8a)',
  'Mussoorie':         'linear-gradient(135deg,#5a3a5a,#8a5a8a)',
}

const DEFAULT_GRADIENT = 'linear-gradient(135deg,#071525,#2c7bf0)'

interface Props {
  destinations: any[]
}

export default function DestinationsSection({ destinations }: Props) {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-8 py-20">

      {/* Section header */}
      <div className="text-center mb-10">
        <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-2">
          Explore Every Route
        </div>
        <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-semibold text-bark leading-[1.12] tracking-[-0.01em] mb-3">
          Journey to <em className="not-italic text-stone">Uttarakhand's greatest destinations</em>
        </h2>
        <p className="text-base text-stone leading-[1.75] max-w-[480px] mx-auto">
          From the sacred four shrines of Char Dham Yatra to hidden Himalayan villages, adrenaline-pumping passes, and serene pilgrimage sites — we've driven them all, and we know them by heart.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {destinations.map((dest) => {
          const title = dest.title || dest.name
          const slug  = dest.slug || ''
          const tag   = Array.isArray(dest.categories) ? dest.categories.join(' · ') : dest.tag
          const image = Array.isArray(dest.images) ? dest.images[0] : dest.image
          
          return (
            <Link
              key={dest._id}
              href={slug ? `/blogs/${slug}` : '#'}
              className="relative rounded-xl overflow-hidden cursor-pointer group block"
              style={{ height: 200 }}
            >
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[350ms] group-hover:scale-[1.04]"
                />
              ) : (
                <div
                  className="w-full h-full transition-transform duration-[350ms] group-hover:scale-[1.04]"
                  style={{ background: FALLBACK_GRADIENTS[title] ?? DEFAULT_GRADIENT }}
                />
              )}

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(7,21,37,0.88) 0%, rgba(7,21,37,0.1) 60%)' }}
              />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-serif text-lg font-semibold text-white leading-[1.2] mb-[2px]">
                  {title}
                </div>
                <div className="text-[11px] text-white/60">{tag}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
