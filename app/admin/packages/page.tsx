import Link from 'next/link'
import { connectDB } from '@/lib/db'
import Package from '@/lib/models/Package'
import { getSettings } from '@/lib/getSettings'
import { serialize } from '@/lib/serialize'

export default async function AdminPackagesPage() {
  await connectDB()
  const [packages, settings] = await Promise.all([
    Package.find().sort({ order: 1 }).lean().then(serialize),
    getSettings(),
  ])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-serif text-3xl font-semibold text-bark">Packages</h1>
      </div>
      <p className="text-sm text-stone mb-6">
        {settings.packagesEnabled
          ? 'The /packages page is live.'
          : <span>The packages page is <strong>disabled</strong>. <Link href="/admin/settings" className="text-forest underline">Enable it in Settings</Link>.</span>
        }
      </p>

      {packages.length === 0 ? (
        <div className="bg-white border border-border rounded-xl text-center py-16 text-stone">
          <p className="font-serif text-xl mb-2">No packages yet</p>
          <p className="text-sm">Use the API or a future form to add tour packages.</p>
        </div>
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-mist text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Title</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Duration</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Price</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(packages as any[]).map(pkg => (
                <tr key={pkg._id} className="hover:bg-mist/50">
                  <td className="px-5 py-3 font-semibold text-bark">{pkg.title}</td>
                  <td className="px-5 py-3 text-stone">{pkg.duration}</td>
                  <td className="px-5 py-3 text-stone">₹{pkg.price.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-semibold px-2 py-[2px] rounded-full ${pkg.isActive ? 'bg-green-100 text-green-700' : 'bg-mist text-stone'}`}>
                      {pkg.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
