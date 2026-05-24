import { getSettings } from '@/lib/getSettings'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
  const settings = await getSettings()

  const links = [
    { label: 'Home',       href: '/' },
    { label: 'Our Fleet',  href: '/cars' },
    ...(settings.packagesEnabled   ? [{ label: 'Packages',   href: '/packages' }]   : []),
    ...(settings.guesthouseEnabled ? [{ label: 'Stays',      href: '/guesthouse' }] : []),
    { label: 'Blogs',      href: '/blogs' },
    { label: 'Contact',    href: '/contact' },
  ]

  return (
    <NavbarClient
      links={links}
      whatsappNumber={settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}
      businessName={settings.businessName || 'DevBhumi Travels'}
    />
  )
}
