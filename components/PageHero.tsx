import Link from 'next/link'

export interface Crumb { label: string; href?: string }

interface Props {
  badge?: string
  title: string
  subtitle?: string
  breadcrumb?: Crumb[]
  /** Cloudinary or any HTTPS image URL used as the background. Falls back to forest gradient. */
  image?: string
}

export default function PageHero({ badge, title, subtitle, breadcrumb, image }: Props) {
  return (
    <div
      style={{
        paddingTop: 'var(--nav-height)',
        ...(image && {
          backgroundImage: `linear-gradient(to bottom right, rgba(28,42,29,0.80) 0%, rgba(44,62,45,0.60) 100%), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }),
      }}
      className={`relative overflow-hidden ${image ? '' : 'bg-forest'}`}
    >
      {/* Noise texture overlay — only when no photo */}
      {!image && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 15% 60%, rgba(212,134,10,0.13) 0%, transparent 55%),
                radial-gradient(ellipse at 90% 10%, rgba(74,124,142,0.10) 0%, transparent 45%)
              `,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </>
      )}

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">

        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-[6px] text-[13px] text-white/50 mb-6" aria-label="Breadcrumb">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-[6px]">
                {i > 0 && <span className="text-white/25 text-[10px]">›</span>}
                {crumb.href
                  ? <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                  : <span className="text-white/80">{crumb.label}</span>
                }
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-saffron mb-3">
            {badge}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-[clamp(34px,5vw,56px)] font-semibold text-white leading-[1.1] mb-4 max-w-[680px]">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-[16px] text-white/65 max-w-[520px] leading-[1.75]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom fade into page background */}
      {image && (
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(248,247,244,0.08))' }}
        />
      )}
    </div>
  )
}
