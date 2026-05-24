import Link from 'next/link'
import { connectDB } from '@/lib/db'
import Guesthouse from '@/lib/models/Guesthouse'
import { getSettings } from '@/lib/getSettings'
import { serialize } from '@/lib/serialize'

export default async function AdminGuesthousePage() {
  await connectDB()
  const [guesthouses, settings] = await Promise.all([
    Guesthouse.find().lean().then(serialize),
    getSettings(),
  ])

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-semibold text-bark mb-2">Guesthouse</h1>
      <p className="text-sm text-stone mb-6">
        {settings.guesthouseEnabled
          ? 'The /guesthouse page is live.'
          : <span>The guesthouse page is <strong>disabled</strong>. <Link href="/admin/settings" className="text-forest underline">Enable it in Settings</Link>.</span>
        }
      </p>

      {guesthouses.length === 0 ? (
        <div className="bg-white border border-border rounded-xl text-center py-16 text-stone">
          <p className="font-serif text-xl mb-2">No guesthouse added yet</p>
          <p className="text-sm">Use <code className="font-mono text-xs bg-mist px-1 py-[2px] rounded">POST /api/guesthouse</code> to add one.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {(guesthouses as any[]).map(gh => (
            <div key={gh._id} className="bg-white border border-border rounded-xl p-5">
              <div className="font-serif text-xl font-semibold text-bark mb-1">{gh.name}</div>
              <div className="text-sm text-stone mb-2">📍 {gh.location} · {gh.rooms?.length ?? 0} room types</div>
              <span className={`text-[11px] font-semibold px-2 py-[2px] rounded-full ${gh.isActive ? 'bg-green-100 text-green-700' : 'bg-mist text-stone'}`}>
                {gh.isActive ? 'Active' : 'Hidden'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
