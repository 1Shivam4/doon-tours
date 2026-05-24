import { connectDB } from '@/lib/db'
import Car from '@/lib/models/Car'
import Driver from '@/lib/models/Driver'
import Testimonial from '@/lib/models/Testimonial'
import Destination from '@/lib/models/Destination'
import Blog from '@/lib/models/Blog'
import { getSettings } from '@/lib/getSettings'
import Link from 'next/link'

export default async function AdminDashboard() {
  await connectDB()
  const [settings, cars, drivers, pending, destinations, blogs] = await Promise.all([
    getSettings(),
    Car.countDocuments(),
    Driver.countDocuments(),
    Testimonial.countDocuments({ isApproved: false }),
    Destination.countDocuments({ isActive: true }),
    Blog.countDocuments(),
  ])

  const stats = [
    { label: 'Cars in Fleet',    value: cars,         href: '/admin/cars',         icon: '🚗' },
    { label: 'Drivers',          value: drivers,       href: '/admin/cars',         icon: '👨‍✈️' },
    { label: 'Pending Reviews',  value: pending,       href: '/admin/testimonials', icon: '⭐', warn: pending > 0 },
    { label: 'Destinations',     value: destinations,  href: '/admin/destinations', icon: '📍' },
    { label: 'Blog Posts',       value: blogs,         href: '/admin/blogs',        icon: '📝' },
  ]

  const toggles = [
    { label: 'Packages',   enabled: settings.packagesEnabled,   href: '/admin/settings' },
    { label: 'Guesthouse', enabled: settings.guesthouseEnabled, href: '/admin/settings' },
  ]

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-semibold text-bark mb-1">Dashboard</h1>
      <p className="text-sm text-stone mb-8">Welcome back. Here&apos;s what&apos;s happening.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, href, icon, warn }) => (
          <Link key={label} href={href}
            className="bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow group"
          >
            <div className="text-2xl mb-3">{icon}</div>
            <div className={`font-serif text-4xl font-semibold mb-1 ${warn ? 'text-saffron' : 'text-bark'}`}>
              {value}
            </div>
            <div className="text-[13px] text-stone group-hover:text-forest transition-colors">{label}</div>
          </Link>
        ))}
      </div>

      {/* Feature toggles summary */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg font-semibold text-bark">Feature Toggles</h2>
          <Link href="/admin/settings" className="text-sm text-forest font-medium hover:underline">
            Manage →
          </Link>
        </div>
        <div className="flex gap-4">
          {toggles.map(({ label, enabled }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-500' : 'bg-stone/40'}`} />
              <span className="text-sm text-stone">{label}</span>
              <span className={`text-[11px] font-semibold px-2 py-[2px] rounded-full ${
                enabled
                  ? 'bg-green-100 text-green-700'
                  : 'bg-mist text-stone'
              }`}>
                {enabled ? 'ON' : 'OFF'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h2 className="font-serif text-lg font-semibold text-bark mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ Add Car',         href: '/admin/cars/new' },
            { label: '+ Add Blog',        href: '/admin/blogs/new' },
            { label: '+ Add Destination', href: '/admin/destinations' },
            { label: 'Review Testimonials',href: '/admin/testimonials' },
            { label: 'Site Settings',     href: '/admin/settings' },
          ].map(({ label, href }) => (
            <Link key={href} href={href}
              className="text-sm font-medium text-forest border border-forest px-4 py-2 rounded-lg hover:bg-forest hover:text-white transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
