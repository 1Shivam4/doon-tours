import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSettings } from '@/lib/getSettings'
import { connectDB } from '@/lib/db'
import Guesthouse from '@/lib/models/Guesthouse'
import { serialize } from '@/lib/serialize'
import CtaBanner from '@/components/home/CtaBanner'
import PageHero from '@/components/PageHero'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devbhumitravels.com'

export const metadata: Metadata = {
  title: 'Guesthouses & Farmhouses in Uttarakhand — Local Stays',
  description: 'Book handpicked, hygienic guesthouses and organic farmhouses across Uttarakhand. Direct local pricing, warm hospitality, and perfect bases for pilgrimages and treks.',
  alternates: { canonical: `${BASE_URL}/guesthouse` },
  openGraph: {
    title: 'Guesthouses & Organic Farmhouses — DevBhumi Travels',
    description: 'Direct partner coordination for local homestays, guesthouses, and farmhouses in Uttarakhand. Authentic local food, safety, and comfort guaranteed.',
    url: `${BASE_URL}/guesthouse`,
  },
}

export default async function GuesthousePage() {
  const settings = await getSettings()
  if (!settings.guesthouseEnabled) notFound()

  await connectDB()
  const raw = await Guesthouse.find({ isActive: true }).lean()
  const guesthouses = serialize(raw)
  const waNumber = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

  return (
    <div>
      <PageHero
        badge="Authentic Himalayan Stays"
        title="Guesthouses & Organic Farmhouses"
        subtitle="We partner directly with family-run mountain guesthouses and organic farmhouses across Uttarakhand. Experience genuine local hospitality, clean rooms, and traditional home-cooked food at direct pricing."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Guesthouses & Farms' }]}
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80"
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-14">
        {guesthouses.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-3xl text-stone mb-3">Guesthouse details coming soon</p>
            <p className="text-sm text-stone">Contact us on WhatsApp for accommodation enquiries.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {guesthouses.map((gh: any) => (
              <div key={gh._id}>
                <div className="mb-6">
                  <h2 className="font-serif text-3xl font-semibold text-bark mb-2">{gh.name}</h2>
                  <p className="text-sm text-stone mb-1">📍 {gh.location}</p>
                  <p className="text-base text-stone leading-[1.75] max-w-[640px]">{gh.description}</p>
                </div>

                {gh.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {gh.amenities.map((a: string) => (
                      <span key={a} className="text-[12px] font-semibold text-forest bg-mist px-[14px] py-[6px] rounded-lg">✓ {a}</span>
                    ))}
                  </div>
                )}

                {gh.rooms.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gh.rooms.map((room: any, i: number) => {
                      const waText = encodeURIComponent(`Hi, I'd like to book a *${room.type}* room at ${gh.name}.`)
                      return (
                        <div key={i} className="bg-white border border-border rounded-xl p-5">
                          <h3 className="font-serif text-xl font-semibold text-bark mb-1">{room.type}</h3>
                          <p className="text-sm text-stone mb-3">Up to {room.capacity} guests</p>
                          {room.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {room.amenities.map((a: string) => (
                                <span key={a} className="text-[11px] text-stone bg-mist px-2 py-[2px] rounded">✓ {a}</span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-4">
                            <div className="font-serif text-2xl font-semibold text-forest">
                              ₹{room.price.toLocaleString('en-IN')}
                              <span className="text-sm font-normal text-stone ml-1">/ night</span>
                            </div>
                            <a href={`https://wa.me/${waNumber}?text=${waText}`} target="_blank" rel="noopener noreferrer"
                              className="text-[13px] font-semibold text-white bg-wa-green hover:bg-[#20bd5a] px-4 py-2 rounded-lg transition-colors">
                              📱 Book
                            </a>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <CtaBanner waNumber={waNumber} />
    </div>
  )
}
