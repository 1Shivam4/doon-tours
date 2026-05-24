import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devbhumitravels.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'DevBhumi Travels — Uttarakhand Tours & Travel',
    template: '%s | DevBhumi Travels',
  },
  description:
    'Comfortable cars, experienced local drivers, and deep knowledge of every road in Uttarakhand — from Rishikesh to Kedarnath and beyond.',
  keywords: ['Uttarakhand tours', 'Char Dham taxi', 'Kedarnath cab', 'Rishikesh travel', 'Himalayan trips'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'DevBhumi Travels',
    title: 'DevBhumi Travels — Uttarakhand Tours & Travel',
    description:
      'Comfortable cars, experienced local drivers, and deep knowledge of every road in Uttarakhand — from Rishikesh to Kedarnath and beyond.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevBhumi Travels — Uttarakhand Tours & Travel',
    description:
      'Comfortable cars, experienced local drivers, and deep knowledge of every road in Uttarakhand.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
