const faqs = [
  {
    q: 'Do you provide a driver with every vehicle?',
    a: 'Yes — every booking includes an experienced local driver. Our drivers are licensed for commercial hill driving and have an average of 6+ years on Uttarakhand\'s mountain roads, including high-altitude routes like Kedarnath and Hemkund Sahib.',
  },
  {
    q: 'Which areas of Uttarakhand do you cover?',
    a: 'We cover all of Uttarakhand: Dehradun, Rishikesh, Haridwar, Mussoorie, Auli, Kedarnath, Badrinath, Gangotri, Yamunotri, Hemkund Sahib, Valley of Flowers, Chopta, Tungnath, and all Char Dham routes. We also do Dehradun airport transfers.',
  },
  {
    q: 'How do I book a trip?',
    a: 'Message us on WhatsApp with your pickup location, destination, travel dates, and group size. We respond within 30 minutes and send a confirmed quote with no hidden charges.',
  },
  {
    q: 'What is included in the price per day?',
    a: 'The daily rate includes the vehicle, driver, and fuel for the agreed route. Tolls, parking fees, and driver accommodation for multi-day overnight trips are separate and will be clearly communicated before you confirm.',
  },
  {
    q: 'Can I book for the full Char Dham Yatra?',
    a: 'Absolutely — Char Dham Yatra is our most popular booking. The full circuit (Yamunotri → Gangotri → Kedarnath → Badrinath) typically takes 10–14 days. We provide a dedicated vehicle and driver for the entire journey. Book at least 4–6 weeks ahead for the peak May–June season.',
  },
  {
    q: 'Do you operate during winter months?',
    a: 'Yes, for most destinations. However, high-altitude shrines — Kedarnath, Badrinath, Hemkund Sahib, Gangotri, and Yamunotri — close between November and April/May due to snow. We advise on road access and open dates before every booking.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'For peak season (May–June and September–October), we recommend booking 2–3 weeks ahead for standard trips and 4–6 weeks for Char Dham. Off-season bookings can often be arranged within 24–48 hours.',
  },
  {
    q: 'Do you offer Tempo Travellers for group trips?',
    a: 'Yes. Our Force Tempo Traveller accommodates up to 12 passengers and is well-suited for family Char Dham yatras and group road trips across Uttarakhand. It includes reclining seats, a music system, and first-aid kit.',
  },
]

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FaqSection() {
  return (
    <section className="bg-snow border-t border-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-[760px] mx-auto">

          {/* Header */}
          <div className="mb-10">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-saffron mb-3">Got Questions?</div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] font-semibold text-bark leading-[1.2] mb-3">
              Everything you need to know about booking with us
            </h2>
            <p className="text-base text-stone leading-[1.75]">From Char Dham Yatra timings to vehicle options and seasonal access, we've answered the most common questions below.</p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-2">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white border border-border rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-mist/40 transition-colors">
                  <span className="text-[15px] font-semibold text-bark leading-snug">{faq.q}</span>
                  <span className="text-forest text-2xl font-light flex-shrink-0 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 pt-0 text-[14px] text-stone leading-[1.8] border-t border-border/60">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          {/* Footer nudge */}
          <p className="mt-8 text-[13px] text-stone text-center">
            Still have questions?{' '}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest font-semibold hover:underline"
            >
              Chat with us on WhatsApp →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
