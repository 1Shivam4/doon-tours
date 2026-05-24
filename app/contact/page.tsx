import type { Metadata } from 'next'
import { getSettings } from '@/lib/getSettings'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with DevBhumi Travels. WhatsApp, call, or fill in the form and we will respond within 30 minutes.',
}

export default async function ContactPage() {
  const settings = await getSettings()
  const waNumber = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const waHref   = `https://wa.me/${waNumber}`

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>

      {/* Header */}
      <div className="bg-forest">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-3">
            Get In Touch
          </div>
          <h1 className="font-serif text-[clamp(36px,5vw,52px)] font-semibold text-white leading-[1.1] mb-4">
            Plan Your Trip
          </h1>
          <p className="text-base text-white/65 max-w-[460px] leading-[1.75]">
            Tell us your dates, destinations and group size. We will respond within 30 minutes on WhatsApp.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

          {/* Form */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-bark mb-6">Send us your requirements</h2>
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-5">

            {/* Quick WhatsApp */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-wa-green/10 border border-wa-green/25 rounded-xl p-5 hover:bg-wa-green/15 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-wa-green flex items-center justify-center text-xl flex-shrink-0">
                💬
              </div>
              <div>
                <div className="font-semibold text-bark text-sm mb-[2px]">Chat on WhatsApp</div>
                <div className="text-[13px] text-stone">Fastest response — usually under 10 mins</div>
              </div>
            </a>

            {/* Contact details */}
            <div className="bg-white border border-border rounded-xl p-6 flex flex-col gap-4">
              <h3 className="font-serif text-lg font-semibold text-bark">Contact Details</h3>

              {settings.phone && (
                <div className="flex items-start gap-3 text-sm text-stone">
                  <span className="text-base mt-px">📱</span>
                  <div>
                    <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="font-medium text-bark hover:text-forest transition-colors">
                      {settings.phone}
                    </a>
                    <div className="text-xs text-stone mt-[2px]">Available 8am – 9pm daily</div>
                  </div>
                </div>
              )}

              {settings.email && (
                <div className="flex items-start gap-3 text-sm text-stone">
                  <span className="text-base mt-px">📧</span>
                  <a href={`mailto:${settings.email}`} className="font-medium text-bark hover:text-forest transition-colors">
                    {settings.email}
                  </a>
                </div>
              )}

              {settings.address && (
                <div className="flex items-start gap-3 text-sm text-stone">
                  <span className="text-base mt-px">📍</span>
                  <span>{settings.address}</span>
                </div>
              )}
            </div>

            {/* Response promise */}
            <div className="bg-mist rounded-xl p-5 text-sm text-stone leading-[1.65]">
              <strong className="text-bark block mb-1">⚡ Quick response guaranteed</strong>
              We reply to every inquiry within 30 minutes during operating hours. For urgent bookings, WhatsApp is fastest.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
