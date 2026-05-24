import Link from 'next/link'

interface Props {
  waNumber: string
}

export default function HeroSection({ waNumber }: Props) {
  const waHref = `https://wa.me/${waNumber}`

  return (
    <section
      className="relative overflow-hidden bg-forest flex items-center"
      style={{ minHeight: 560, paddingTop: 'calc(var(--nav-height) + 80px)', paddingBottom: 80 }}
    >
      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 15% 60%, rgba(212,134,10,0.15) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 15%, rgba(74,124,142,0.12) 0%, transparent 45%)
          `,
        }}
      />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 w-full">
        <div className="max-w-[580px]">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-saffron mb-5">
            <span className="text-[10px]">✦</span>
            Uttarakhand Specialists
          </div>

          {/* Heading */}
          <h1 className="font-serif text-[clamp(42px,6vw,64px)] font-semibold text-white leading-[1.06] tracking-[-0.01em] mb-5">
            Explore the<br />
            <em className="not-italic text-white/75">Himalayas,</em><br />
            Your Way
          </h1>

          {/* Body */}
          <p className="text-base text-white/65 leading-[1.75] mb-9 max-w-[420px]">
            Comfortable cars, experienced local drivers, and knowledge of every
            road — from Rishikesh to Kedarnath and beyond.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-light text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-px"
            >
              Browse Our Fleet
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/88 text-sm font-semibold px-6 py-3 rounded-lg transition-colors border"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              WhatsApp Us →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
