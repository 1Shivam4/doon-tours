import Link from 'next/link'

interface Props {
  waNumber: string
}

export default function CtaBanner({ waNumber }: Props) {
  const waHref = `https://wa.me/${waNumber}`

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-8 pb-20">
      <div
        className="relative overflow-hidden rounded-[20px] px-10 md:px-16 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        style={{ background: 'var(--bark)' }}
      >
        {/* Subtle glow */}
        <div
          className="absolute -top-10 -right-10 w-[300px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,134,10,0.15) 0%, transparent 70%)' }}
        />

        {/* Content */}
        <div className="relative">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-saffron mb-2">
            Plan Your Journey
          </div>
          <h2 className="font-serif text-[clamp(28px,4vw,36px)] font-semibold text-white leading-[1.15] mb-2">
            Ready to explore the mountains?<br />
            <span className="text-white/70">Let's plan your perfect trip.</span>
          </h2>
          <p className="text-[15px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Choose your destination, tell us your dates, and we'll handle the rest.
No hidden costs. No stress. Just unforgettable memories.
          </p>
        </div>

        {/* Actions */}
        <div className="relative flex flex-col gap-[10px] items-start md:items-stretch flex-shrink-0">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-wa-green hover:bg-[#20bd5a] text-white text-[15px] font-semibold px-7 py-[14px] rounded-lg transition-colors"
          >
            📱 WhatsApp Us Now
          </a>
          <Link
            href="/cars"
            className="inline-flex items-center justify-center text-sm font-semibold rounded-lg px-5 py-3 transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            View Our Fleet →
          </Link>
        </div>
      </div>
    </section>
  )
}
