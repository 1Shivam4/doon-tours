import Link from 'next/link'

interface Props {
  waNumber: string
}

const trustCards = [
  { icon: '🏔️', value: '50+',   label: 'Homestays & Farms' },
  { icon: '⭐', value: '4.9',    label: 'Guest satisfaction' },
  { icon: '🧭', value: '2026',  label: 'Himalayan Portal' },
]

const quickTrust = [
  '✓ Vetted local hill drivers',
  '✓ Direct host & farmhouse booking',
  '✓ Handcrafted tour packages',
  '✓ 24/7 WhatsApp enquiry support',
]

export default function HeroSection({ waNumber }: Props) {
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hi! I would like to plan a custom trip to Uttarakhand with DevBhumi Travels.')}`

  return (
    <section
      className="relative overflow-hidden bg-forest"
      style={{ minHeight: 640, paddingTop: 'var(--nav-height)' }}
    >
      {/* Ambient gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 10% 70%, rgba(77,184,255,0.18) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 10%, rgba(24,117,240,0.20) 0%, transparent 45%),
            radial-gradient(ellipse at 60% 90%, rgba(7,21,37,0.8) 0%, transparent 40%)
          `,
        }}
      />

      {/* Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-center min-h-[calc(640px-var(--nav-height))] py-16">

          {/* ── Left: copy ── */}
          <div className="flex flex-col justify-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-5 w-fit">
              <span
                className="w-5 h-[1.5px] bg-saffron"
                style={{ display: 'inline-block' }}
              />
              Uttarakhand Travel Portal · Launching 2026
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[clamp(40px,5.5vw,68px)] font-semibold text-white leading-[1.05] tracking-[-0.01em] mb-5">
              Local Stays &<br />
              <span
                className="relative"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #7bcfff 0%, #4db8ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Tailored Journeys
              </span>
            </h1>

            {/* Sub */}
            <p className="text-[16px] text-white/60 leading-[1.8] mb-8 max-w-[480px]">
              We connect you directly with hill-certified drivers, handpicked guesthouses, and serene organic farmhouses across Uttarakhand. Settle details directly, avoid hefty agency markups, and plan your perfect Himalayan pilgrimage or retreat with our tailored tour packages.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-light text-white text-sm font-semibold px-7 py-[14px] rounded-lg transition-all hover:-translate-y-px shadow-[0_4px_20px_rgba(77,184,255,0.35)]"
              >
                Explore Packages →
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white text-sm font-semibold px-7 py-[14px] rounded-lg transition-all hover:-translate-y-px"
                style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
              >
                💬 Send Enquiry Quote
              </a>
            </div>

            {/* Quick trust pills */}
            <div className="flex flex-wrap gap-2">
              {quickTrust.map(t => (
                <span
                  key={t}
                  className="text-[12px] text-white/55 flex items-center gap-[6px]"
                >
                  <span className="w-[5px] h-[5px] rounded-full bg-saffron/70 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: visual panel ── */}
          <div className="hidden lg:flex flex-col gap-4 items-end">

            {/* Main visual card */}
            <div
              className="w-full rounded-2xl overflow-hidden relative"
              style={{
                height: 340,
                background: 'linear-gradient(145deg, #071525 0%, #0d2145 40%, #0a1e3a 100%)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
              }}
            >
              {/* Mountain silhouette SVG */}
              <svg
                viewBox="0 0 420 340"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMax slice"
              >
                {/* Sky glow */}
                <defs>
                  <radialGradient id="glow" cx="50%" cy="35%" r="50%">
                    <stop offset="0%" stopColor="#4db8ff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4db8ff" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="moon" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7bcfff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#4db8ff" stopOpacity="0.4" />
                  </radialGradient>
                </defs>
                <rect width="420" height="340" fill="url(#glow)" />

                {/* Stars */}
                {[[40,30],[90,50],[160,20],[220,45],[300,25],[360,55],[400,30],[130,60],[250,15]].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r="1.2" fill="white" opacity="0.6" />
                ))}

                {/* Moon */}
                <circle cx="340" cy="55" r="18" fill="url(#moon)" opacity="0.85" />

                {/* Far mountains — light */}
                <path
                  d="M0,200 L60,130 L120,170 L180,100 L240,150 L300,90 L360,140 L420,110 L420,340 L0,340 Z"
                  fill="rgba(44,123,240,0.18)"
                />
                {/* Mid mountains */}
                <path
                  d="M0,240 L80,160 L150,200 L210,130 L280,180 L340,120 L420,160 L420,340 L0,340 Z"
                  fill="rgba(7,45,100,0.5)"
                />
                {/* Near mountains — dark */}
                <path
                  d="M0,280 L70,210 L130,250 L190,185 L260,235 L320,175 L380,220 L420,200 L420,340 L0,340 Z"
                  fill="rgba(5,20,50,0.9)"
                />
                {/* Ground */}
                <rect x="0" y="305" width="420" height="35" fill="rgba(5,15,35,0.95)" />

                {/* Road */}
                <path
                  d="M190,340 L195,310 L210,305 L225,310 L230,340 Z"
                  fill="rgba(77,184,255,0.15)"
                />

                {/* Pine trees */}
                {[30,60,80,350,380,400].map((x,i) => (
                  <g key={i}>
                    <polygon points={`${x},290 ${x-8},315 ${x+8},315`} fill="rgba(5,20,50,1)" />
                    <polygon points={`${x},302 ${x-6},320 ${x+6},320`} fill="rgba(7,25,60,1)" />
                  </g>
                ))}
              </svg>

              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: 'linear-gradient(to top, rgba(5,15,35,0.9) 0%, transparent 100%)' }}>
                <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-saffron/80 mb-1">Uttarakhand, India</div>
                <div className="text-white text-sm font-medium opacity-80">Kedarnath · Auli · Char Dham · Valley of Flowers</div>
              </div>
            </div>

            {/* Floating trust cards */}
            <div className="flex gap-3 w-full">
              {trustCards.map(card => (
                <div
                  key={card.label}
                  className="flex-1 rounded-xl p-4 flex flex-col gap-1"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="text-lg">{card.icon}</div>
                  <div className="font-serif text-xl font-semibold text-white leading-none">{card.value}</div>
                  <div className="text-[11px] text-white/50">{card.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile trust cards (shown below copy on small screens) */}
          <div className="flex gap-3 lg:hidden">
            {trustCards.map(card => (
              <div
                key={card.label}
                className="flex-1 rounded-xl p-3 flex flex-col gap-1"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div className="text-base">{card.icon}</div>
                <div className="font-serif text-lg font-semibold text-white leading-none">{card.value}</div>
                <div className="text-[10px] text-white/50">{card.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
