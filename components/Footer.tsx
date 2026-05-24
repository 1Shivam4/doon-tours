import Link from 'next/link'
import { getSettings } from '@/lib/getSettings'

export default async function Footer() {
  const settings = await getSettings()

  const waHref = `https://wa.me/${settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`

  return (
    <footer className="bg-forest mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 pt-14 pb-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-serif text-2xl font-semibold text-white mb-3">
              DevBhumi<span className="text-saffron">Travels</span>
            </div>
            <p className="text-sm text-white/50 leading-7 mb-5 max-w-[260px]">
              {settings.tagline || 'Your trusted travel partner for exploring the mountains, rivers and temples of Uttarakhand.'}
            </p>
            <div className="flex gap-2">
              {[
                { icon: '📸', label: 'Instagram' },
                { icon: '📘', label: 'Facebook' },
                { icon: '📱', label: 'WhatsApp', href: waHref },
              ].map(({ icon, label, href }) => (
                href
                  ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-base hover:bg-white/15 transition-colors cursor-pointer">
                      {icon}
                    </a>
                  : <div key={label} aria-label={label}
                      className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-base hover:bg-white/15 transition-colors cursor-pointer">
                      {icon}
                    </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-4">Navigation</div>
            <ul className="flex flex-col gap-[10px]">
              {[
                { label: 'Home',      href: '/' },
                { label: 'Our Fleet', href: '/cars' },
                ...(settings.packagesEnabled   ? [{ label: 'Packages',   href: '/packages' }]   : []),
                ...(settings.guesthouseEnabled ? [{ label: 'Guesthouse', href: '/guesthouse' }] : []),
                { label: 'About',     href: '/about' },
                { label: 'Contact',   href: '/contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/65 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-4">Destinations</div>
            <ul className="flex flex-col gap-[10px]">
              {['Kedarnath', 'Badrinath', 'Valley of Flowers', 'Auli', 'Rishikesh', 'Mussoorie'].map(d => (
                <li key={d}>
                  <span className="text-sm text-white/65 hover:text-white transition-colors cursor-pointer">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-4">Get in Touch</div>
            <div className="flex flex-col gap-3">
              {settings.phone && (
                <div className="flex items-start gap-[10px] text-[13px] text-white/60 leading-[1.5]">
                  <span className="mt-[1px]">📱</span>
                  <span>{settings.phone}<br />Available 8am – 9pm</span>
                </div>
              )}
              {settings.email && (
                <div className="flex items-start gap-[10px] text-[13px] text-white/60">
                  <span>📧</span>
                  <span>{settings.email}</span>
                </div>
              )}
              {settings.address && (
                <div className="flex items-start gap-[10px] text-[13px] text-white/60 leading-[1.5]">
                  <span className="mt-[1px]">📍</span>
                  <span>{settings.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] text-white/35">
          <span>© {new Date().getFullYear()} {settings.businessName || 'DevBhumi Travels'}. All rights reserved.</span>
          <div className="flex gap-5">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="hover:text-white/60 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
