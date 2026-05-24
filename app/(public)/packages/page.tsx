import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSettings } from '@/lib/getSettings'
import { connectDB } from '@/lib/db'
import Package from '@/lib/models/Package'
import { serialize } from '@/lib/serialize'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = { title: 'Tour Packages' }

export default async function PackagesPage() {
  const settings = await getSettings()
  if (!settings.packagesEnabled) notFound()

  await connectDB()
  const raw = await Package.find({ isActive: true }).sort({ order: 1 }).lean()
  const packages = serialize(raw)
  const waNumber  = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="bg-forest">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-3">Curated Experiences</div>
          <h1 className="font-serif text-[clamp(36px,5vw,52px)] font-semibold text-white leading-[1.1] mb-4">Tour Packages</h1>
          <p className="text-base text-white/65 max-w-[460px] leading-[1.75]">
            Handcrafted itineraries for the most beautiful routes in Uttarakhand — everything arranged, nothing to worry about.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-14">
        {packages.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-3xl text-stone mb-3">Packages coming soon</p>
            <p className="text-sm text-stone">We&apos;re putting together some great itineraries. Check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg: any) => {
              const waText = encodeURIComponent(`Hi, I'd like to enquire about the *${pkg.title}* package.`)
              return (
                <div key={pkg._id} className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-[var(--shadow-hover)] hover:-translate-y-[3px] transition-all duration-[350ms]">
                  <div className="h-[180px] bg-mist flex items-center justify-center">
                    <span className="text-3xl">🏔️</span>
                  </div>
                  <div className="p-5">
                    <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-saffron mb-1">{pkg.duration}</div>
                    <h2 className="font-serif text-xl font-semibold text-bark mb-2">{pkg.title}</h2>
                    <p className="text-sm text-stone leading-[1.65] mb-4 line-clamp-2">{pkg.description}</p>
                    {pkg.destinations.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {pkg.destinations.map((d: string) => (
                          <span key={d} className="text-[11px] font-medium text-earth bg-[#FFF5E0] px-2 py-[2px] rounded">✦ {d}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="font-serif text-2xl font-semibold text-forest">
                        ₹{pkg.price.toLocaleString('en-IN')}
                        <span className="text-sm font-normal text-stone ml-1">/ person</span>
                      </div>
                      <a href={`https://wa.me/${waNumber}?text=${waText}`} target="_blank" rel="noopener noreferrer"
                        className="text-[13px] font-semibold text-white bg-wa-green hover:bg-[#20bd5a] px-4 py-2 rounded-lg transition-colors">
                        📱 Enquire
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <CtaBanner waNumber={waNumber} />
    </div>
  )
}
