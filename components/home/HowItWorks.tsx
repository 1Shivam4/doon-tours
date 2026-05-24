const steps = [
  {
    num: '1',
    title: 'Tell us your plan',
    desc:  'Message us on WhatsApp with your travel dates, route, group size, and budget. No forms, no friction — just a conversation.',
  },
  {
    num: '2',
    title: 'Get a detailed quote',
    desc:  'We send back a transparent breakdown: vehicle cost, driver, fuel, estimated times, and any tolls/extras. No hidden charges, ever.',
  },
  {
    num: '3',
    title: 'Confirm and travel',
    desc:  'Once you approve, your driver arrives on time with the right vehicle. Track the journey in real-time and relax.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-mist py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-2">
            Booking Made Easy
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-semibold text-bark leading-[1.12] tracking-[-0.01em]">
            Get quote to confirmation <em className="not-italic text-stone">in three simple steps</em>
          </h2>
          <p className="text-base text-stone leading-[1.75] max-w-[520px] mx-auto mt-3">No complicated forms. No phone calls passed around. Just honest conversations and transparent pricing.</p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">

          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-7 h-px bg-mist-dark"
            style={{ left: 'calc(16.66% + 16px)', right: 'calc(16.66% + 16px)' }}
          />

          {steps.map(({ num, title, desc }) => (
            <div key={num} className="text-center px-6 relative z-10">
              <div className="w-14 h-14 rounded-full bg-forest text-white font-serif text-2xl font-semibold flex items-center justify-center mx-auto mb-4 border-4 border-mist">
                {num}
              </div>
              <div className="font-serif text-xl font-semibold text-bark mb-2">{title}</div>
              <div className="text-sm text-stone leading-[1.65]">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
