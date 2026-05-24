import Link from 'next/link'
import type { Metadata } from 'next'
import { getSettings } from '@/lib/getSettings'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'DevBhumi Travels — your trusted local guide to the Himalayas. Based in Uttarakhand, built on a decade of mountain road experience.',
}

const values = [
  {
    icon: '🏔️',
    title: 'Local expertise',
    body: 'Our drivers know every curve between Rishikesh and Kedarnath. No navigation guesswork — just experience built over years on these roads.',
  },
  {
    icon: '🚗',
    title: 'Well-maintained fleet',
    body: 'Our SUVs and Tempo Travellers are serviced regularly and fitted for mountain terrain — winter tyres, first-aid kits, and reliable 4WD where it counts.',
  },
  {
    icon: '🤝',
    title: 'Transparent pricing',
    body: 'What we quote is what you pay. No hidden tolls, no surprise surcharges. We settle everything upfront so you can focus on the journey.',
  },
  {
    icon: '📍',
    title: 'Pilgrimage specialists',
    body: 'Char Dham Yatra, Hemkund Sahib, Triyuginarayan — we\'ve covered every sacred circuit and understand the seasonal access windows.',
  },
]

const milestones = [
  { year: '2014', event: 'Founded in Dehradun with one Innova and a simple promise — be reliable.' },
  { year: '2017', event: 'Expanded to a 10-vehicle fleet to handle Char Dham season demand.' },
  { year: '2020', event: 'Digitised bookings and launched the first WhatsApp-first enquiry system.' },
  { year: '2024', event: 'Crossed 5,000 successful journeys across Uttarakhand\'s highways and high passes.' },
]

export default async function AboutPage() {
  const settings = await getSettings()
  const waNumber = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const waHref = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent('Hi! I would like to know more about DevBhumi Travels.')}` : '#'

  return (
    <div>
      <PageHero
        badge="Our Story"
        title={`Rooted in Uttarakhand.\nBuilt for the mountains.`}
        subtitle="DevBhumi Travels was founded by locals who grew up navigating these roads. Every car, every driver, every route is one we personally stand behind."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80"
      />

      {/* Story */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] font-semibold text-bark leading-[1.2] mb-5">
              A decade on Himalayan roads
            </h2>
            <div className="flex flex-col gap-4 text-[15px] text-stone leading-[1.8]">
              <p>
                We started with a single Innova Crysta and one guiding principle: show up on time, take people safely,
                bring them home. A decade later we run a full fleet — but that principle hasn&apos;t moved an inch.
              </p>
              <p>
                Uttarakhand is our home. The Garhwal hills, the Kumaon valleys, the high passes that close in winter —
                we understand this terrain the way you understand your own street. That local knowledge is the most
                valuable thing we bring to every trip.
              </p>
              <p>
                Whether you&apos;re embarking on a Char Dham Yatra, planning a family road trip to Auli, or need a
                reliable cab for a Dehradun airport transfer, we treat every booking with the same care.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-forest text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px flex-1 bg-mist-dark my-1" />}
                </div>
                <div className={`pb-8 ${i === milestones.length - 1 ? '' : ''}`}>
                  <div className="text-[11px] font-semibold text-saffron tracking-wide mb-1">{m.year}</div>
                  <p className="text-[14px] text-stone leading-[1.65]">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-mist border-y border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
          <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold text-bark mb-2 text-center">
            Why travellers choose us
          </h2>
          <p className="text-stone text-center text-[15px] mb-12">The four things we never compromise on.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-xl p-6 border border-border">
                <div className="text-3xl mb-4">{v.icon}</div>
                <div className="font-semibold text-bark text-[15px] mb-2">{v.title}</div>
                <p className="text-[13px] text-stone leading-[1.7]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: '5,000+', label: 'Journeys completed' },
            { stat: '10+',    label: 'Years on the road' },
            { stat: '15+',    label: 'Vehicles in fleet' },
            { stat: '4.9★',   label: 'Average rating' },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div className="font-serif text-[clamp(36px,4vw,48px)] font-semibold text-forest leading-none mb-2">{stat}</div>
              <div className="text-[13px] text-stone">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-saffron">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-14 md:py-20 text-center">
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] font-semibold text-white mb-4">
            Ready to plan your trip?
          </h2>
          <p className="text-white/80 text-[15px] mb-8 max-w-md mx-auto">
            Message us on WhatsApp — we respond within the hour and help you plan the whole route.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-forest text-sm font-semibold px-7 py-3 rounded-lg hover:bg-snow transition-colors"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/cars"
              className="border border-white text-white text-sm font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse Our Fleet
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
