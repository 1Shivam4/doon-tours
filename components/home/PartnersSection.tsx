import Link from 'next/link'

interface Props {
  waNumber: string
}

const benefits = [
  {
    icon: '📈',
    title: 'Exclusive commission rates',
    body: 'Higher margins for bulk bookings and repeat partnerships. We reward loyalty.',
  },
  {
    icon: '🤝',
    title: 'Dedicated partner support',
    body: 'Direct point of contact for quotes, custom itineraries, and priority bookings.',
  },
  {
    icon: '🎯',
    title: 'White-label options',
    body: 'Co-brand packages, custom itineraries, and marketing support for your brand.',
  },
  {
    icon: '📱',
    title: 'Instant booking API',
    body: 'Real-time availability, pricing, and booking confirmation for your platform.',
  },
]

export default function PartnersSection({ waNumber }: Props) {
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hi! I am a travel agent interested in partnering with DevBhumi Travels.')}`

  return (
    <section className="bg-mist border-y border-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Copy */}
          <div>
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-3">For Travel Agents & Tour Operators</div>
            <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-semibold text-bark leading-[1.2] mb-5">
              Grow your Uttarakhand offerings with us
            </h2>
            <p className="text-[16px] text-stone leading-[1.8] mb-6">
              We partner with travel agents, tour operators, and OTAs across India. Get priority support, competitive commissions, and white-label options to scale your Uttarakhand packages.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                '✓ 1,000+ completed partnerships',
                '✓ Instant quote API access',
                '✓ Custom package builder',
                '✓ 24/7 partner support',
              ].map(item => (
                <li key={item} className="text-[15px] text-stone flex items-center gap-3">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forest hover:bg-forest/90 text-white text-sm font-semibold px-7 py-[14px] rounded-lg transition-all hover:-translate-y-px shadow-[0_4px_20px_rgba(44,62,45,0.35)]"
            >
              Become a Partner →
            </a>
          </div>

          {/* Right: Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-5 border border-border hover:shadow-[var(--shadow-hover)] transition-all duration-300"
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-bark text-[14px] mb-2">{benefit.title}</h3>
                <p className="text-[13px] text-stone leading-[1.65]">{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
