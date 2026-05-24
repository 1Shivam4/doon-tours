import type { TestimonialData } from '@/lib/types'

const AVATAR_STYLES = [
  { bg: 'bg-mist',             text: 'text-forest' },
  { bg: 'bg-[#EEF0EC]',       text: 'text-river'  },
  { bg: 'bg-[#FFF5E0]',       text: 'text-earth'  },
]

interface Props {
  testimonials: TestimonialData[]
}

export default function TestimonialsSection({ testimonials }: Props) {
  if (!testimonials.length) return null

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-8 py-20">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-2">
          Real Journeys, Real Stories
        </div>
        <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-semibold text-bark leading-[1.12] tracking-[-0.01em]">
          What travellers tell us <em className="not-italic text-stone">after their journey</em>
        </h2>
        <p className="text-base text-stone leading-[1.75] max-w-[480px] mx-auto mt-3">From pilgrims completing their Char Dham Yatra to families rediscovering mountain magic together.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => {
          const style = AVATAR_STYLES[i % AVATAR_STYLES.length]
          return (
            <div
              key={t._id}
              className="bg-white border border-border rounded-xl p-6"
            >
              <div className="text-sm text-saffron tracking-[2px] mb-3">★★★★★</div>
              <p className="font-serif text-[17px] italic text-bark leading-[1.65] mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-[10px]">
                <div className={`w-9 h-9 rounded-full ${style.bg} flex items-center justify-center text-xs font-bold ${style.text} flex-shrink-0`}>
                  {t.avatarInitials}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-bark">{t.authorName}</div>
                  <div className="text-[11px] text-stone">{t.location}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
