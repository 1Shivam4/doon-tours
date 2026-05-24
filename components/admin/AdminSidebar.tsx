'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  packagesEnabled:   boolean
  guesthouseEnabled: boolean
}

const NAV = [
  { label: 'Dashboard',     href: '/admin',              icon: '🏠' },
  { label: 'Cars',          href: '/admin/cars',          icon: '🚗' },
  { label: 'Testimonials',  href: '/admin/testimonials',  icon: '⭐' },
  { label: 'Destinations',  href: '/admin/destinations',  icon: '📍' },
  { label: 'Blogs',         href: '/admin/blogs',         icon: '📝' },
  { label: 'Packages',      href: '/admin/packages',      icon: '📦', toggle: 'packages'   },
  { label: 'Guesthouse',    href: '/admin/guesthouse',    icon: '🏡', toggle: 'guesthouse' },
  { label: 'Settings',      href: '/admin/settings',      icon: '⚙️' },
]

export default function AdminSidebar({ packagesEnabled, guesthouseEnabled }: Props) {
  const pathname = usePathname()
  const router   = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-60 min-h-screen bg-forest flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="font-serif text-xl font-semibold text-white">
          DevBhumi<span className="text-saffron">Travels</span>
        </Link>
        <div className="text-[11px] text-white/40 mt-[2px] font-medium tracking-wide">Admin Panel</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-[2px]">
        {NAV.map(({ label, href, icon, toggle }) => {
          if (toggle === 'packages'   && !packagesEnabled)   return null
          if (toggle === 'guesthouse' && !guesthouseEnabled) return null

          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-[9px] rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-white/65 hover:text-white hover:bg-white/8'
              }`}
            >
              <span className="text-base w-5 text-center">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-[9px] rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/8 transition-colors mb-1"
        >
          <span className="text-base w-5 text-center">↗</span>
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-white/8 transition-colors"
        >
          <span className="text-base w-5 text-center">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  )
}
