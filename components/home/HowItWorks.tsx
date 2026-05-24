const steps = [
  {
    num: '1',
    title: 'Browse our fleet',
    desc:  'Pick the car and driver that best fits your route, group size, and budget.',
  },
  {
    num: '2',
    title: 'Send requirements',
    desc:  'WhatsApp or call us with your travel dates, pickup point and destinations.',
  },
  {
    num: '3',
    title: 'Travel with ease',
    desc:  'Your driver arrives on time. Sit back and enjoy the Himalayas.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-mist py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-2">
            Simple Process
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-semibold text-bark leading-[1.12] tracking-[-0.01em]">
            Plan your trip <em className="not-italic text-stone">in three steps</em>
          </h2>
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
