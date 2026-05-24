import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

const sections = [
  {
    title: '1. Information We Collect',
    body: `When you contact us via our website form or WhatsApp, we collect the information you provide — including your name, phone number, email address (optional), travel dates, and trip requirements. We do not collect any payment information through our website.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `The information you provide is used solely to respond to your enquiry, confirm bookings, and coordinate your trip logistics. We do not use your data for advertising purposes or sell it to third parties.`,
  },
  {
    title: '3. WhatsApp Communication',
    body: `When you use our WhatsApp contact flow, your information is shared with WhatsApp (Meta Platforms) as part of normal app usage. We recommend reviewing WhatsApp's own privacy policy. Conversations on WhatsApp are not stored on our servers.`,
  },
  {
    title: '4. Data Storage & Security',
    body: `Any enquiry data submitted through our contact form is stored securely in our database and is accessible only to DevBhumi Travels staff. We take reasonable precautions to protect your data from unauthorised access, though no system is completely secure.`,
  },
  {
    title: '5. Cookies',
    body: `Our website may use minimal functional cookies necessary for the site to operate correctly. We do not use tracking or advertising cookies. No personal data is collected through cookies.`,
  },
  {
    title: '6. Your Rights',
    body: `You may request access to, correction of, or deletion of any personal data we hold about you at any time by contacting us directly via WhatsApp or email. We will respond to such requests within 7 business days.`,
  },
  {
    title: '7. Third-Party Services',
    body: `Our website uses Cloudinary for image hosting and MongoDB Atlas for data storage. Both services maintain their own privacy and security standards. Links to third-party sites are provided for convenience; we are not responsible for their privacy practices.`,
  },
  {
    title: '8. Changes to This Policy',
    body: `We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of our services constitutes acceptance of the updated policy.`,
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>

      {/* Header */}
      <div className="bg-forest">
        <div className="max-w-[760px] mx-auto px-6 md:px-8 py-16">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-3">Legal</div>
          <h1 className="font-serif text-[clamp(32px,5vw,48px)] font-semibold text-white leading-[1.1] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-white/55">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[760px] mx-auto px-6 md:px-8 py-14">
        <p className="text-base text-stone leading-[1.8] mb-10">
          At DevBhumi Travels, your privacy matters. This policy explains what data we collect, how we use it, and your rights.
        </p>

        <div className="flex flex-col gap-10">
          {sections.map(({ title, body }) => (
            <div key={title}>
              <h2 className="font-serif text-xl font-semibold text-bark mb-3">{title}</h2>
              <p className="text-[15px] text-stone leading-[1.8]">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-border text-sm text-stone">
          Questions about your data? <Link href="/contact" className="text-forest font-medium hover:underline">Contact us</Link>.
        </div>
      </div>
    </div>
  )
}
