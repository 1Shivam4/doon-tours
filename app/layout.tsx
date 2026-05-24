import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Dancing_Script } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-dancing',
  display: 'swap',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devbhumitravels.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'DevBhumi Travels — Car Rental with Driver in Uttarakhand | Char Dham Yatra',
    template: '%s | DevBhumi Travels',
  },
  description:
    'Experience Uttarakhand with local expert drivers. Car rental with drivers for Char Dham Yatra, Himalayan trips, pilgrimage tours, and family vacations. Transparent pricing, 5000+ happy journeys, 4.9★ rating.',
  keywords: [
    'Uttarakhand car rental',
    'Char Dham Yatra cab',
    'Kedarnath taxi',
    'Rishikesh travel',
    'Himalayan road trips',
    'mountain travel with driver',
    'Uttarakhand tourism',
    'pilgrimage tour packages',
    'Auli skiing transport',
    'Valley of Flowers trek',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'DevBhumi Travels',
    title: 'DevBhumi Travels — Car Rental with Driver in Uttarakhand',
    description:
      'Premium car rental with professional drivers for Char Dham Yatra, pilgrimages, and Himalayan adventures. Transparent pricing, real-time tracking, 24/7 support.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevBhumi Travels — Uttarakhand Car Rental & Tours',
    description:
      'Local expert drivers, well-maintained vehicles, transparent pricing. Char Dham Yatra specialists.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dancingScript.variable}`}>
      <body>{children}</body>
    </html>
  )
}
