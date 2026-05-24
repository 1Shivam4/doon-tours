import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
}

const sections = [
  {
    title: '1. Booking & Confirmation',
    body: `All bookings are confirmed only after direct communication via WhatsApp or phone call with DevBhumi Travels. A booking is considered final once both parties agree on the route, dates, vehicle, and fare. We recommend confirming at least 48 hours before the travel date.`,
  },
  {
    title: '2. Pricing & Payments',
    body: `Prices are quoted per day or per trip as agreed. Fuel charges, toll taxes, state permits, and driver allowances are charged as per actuals unless otherwise stated in the quote. Advance payment terms will be discussed at the time of booking.`,
  },
  {
    title: '3. Cancellations & Refunds',
    body: `Cancellations made more than 24 hours before the scheduled departure are eligible for a full refund of any advance paid. Cancellations within 24 hours may incur a cancellation fee. No-shows are non-refundable. Cancellations due to extreme weather, road closures, or government orders will be handled on a case-by-case basis.`,
  },
  {
    title: '4. Driver Conduct & Safety',
    body: `All our drivers are experienced, licensed, and familiar with Uttarakhand's mountain terrain. Passengers are requested to follow driver instructions regarding route conditions, road safety, and halts. DevBhumi Travels is not liable for delays caused by road closures, weather conditions, or acts of nature.`,
  },
  {
    title: '5. Passenger Responsibilities',
    body: `Passengers are responsible for ensuring they carry valid identification. Any damage to the vehicle caused by passengers will be charged at actuals. Smoking, alcohol consumption, or illegal activities inside the vehicle are strictly prohibited.`,
  },
  {
    title: '6. Modifications to Itinerary',
    body: `Any changes to the agreed itinerary requested by the passenger during the trip may result in additional charges. Requests for route changes should be communicated to the driver in advance to allow for proper planning.`,
  },
  {
    title: '7. Liability',
    body: `DevBhumi Travels acts as a facilitator of transportation services. We are not responsible for any loss, injury, or damage arising from unforeseen circumstances including but not limited to accidents, natural disasters, or third-party acts. All passengers travel at their own risk.`,
  },
  {
    title: '8. Governing Law',
    body: `These terms are governed by the laws of Uttarakhand, India. Any disputes shall be subject to the jurisdiction of courts in Rishikesh, Uttarakhand.`,
  },
]

export default function TermsPage() {
  return (
    <div>
      <PageHero
        badge="Legal"
        title="Terms & Conditions"
        subtitle="Last updated: January 2025"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]}
      />

      {/* Content */}
      <div className="max-w-[760px] mx-auto px-6 md:px-8 py-14">
        <p className="text-base text-stone leading-[1.8] mb-10">
          By booking with DevBhumi Travels, you agree to the following terms and conditions. Please read them carefully before confirming your trip.
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
          Questions? <Link href="/contact" className="text-forest font-medium hover:underline">Contact us</Link> and we&apos;ll be happy to clarify.
        </div>
      </div>
    </div>
  )
}
