'use client'

import { useState } from 'react'

interface T { _id: string; quote: string; authorName: string; location: string; avatarInitials: string; isApproved: boolean }

export default function TestimonialsManager({ initial }: { initial: T[] }) {
  const [items, setItems] = useState<T[]>(initial)

  async function toggle(t: T) {
    const res  = await fetch(`/api/testimonials/${t._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isApproved: !t.isApproved }),
    })
    const json = await res.json()
    if (json.success) setItems(prev => prev.map(i => i._id === t._id ? { ...i, isApproved: !i.isApproved } : i))
  }

  async function remove(id: string) {
    if (!confirm('Delete this testimonial?')) return
    const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    if ((await res.json()).success) setItems(prev => prev.filter(i => i._id !== id))
  }

  const pending  = items.filter(i => !i.isApproved)
  const approved = items.filter(i => i.isApproved)

  return (
    <div className="flex flex-col gap-6 max-w-[800px]">
      {pending.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="text-sm font-semibold text-amber-800 mb-4">⏳ {pending.length} pending approval</div>
          <div className="flex flex-col gap-3">
            {pending.map(t => <Card key={t._id} t={t} onToggle={toggle} onDelete={remove} />)}
          </div>
        </div>
      )}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-mist text-[11px] font-semibold text-stone uppercase tracking-wide">
          Approved ({approved.length})
        </div>
        {approved.length === 0
          ? <p className="text-center py-10 text-sm text-stone">No approved testimonials yet.</p>
          : <div className="divide-y divide-border">{approved.map(t => <Card key={t._id} t={t} onToggle={toggle} onDelete={remove} />)}</div>
        }
      </div>
    </div>
  )
}

function Card({ t, onToggle, onDelete }: { t: T; onToggle: (t: T) => void; onDelete: (id: string) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-full bg-mist border border-mist-dark flex items-center justify-center text-xs font-bold text-forest flex-shrink-0">
          {t.avatarInitials}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-bark text-sm">{t.authorName} <span className="text-stone font-normal">· {t.location}</span></div>
          <p className="text-sm text-stone mt-1 italic line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button onClick={() => onToggle(t)}
          className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-colors ${
            t.isApproved
              ? 'bg-mist text-stone hover:bg-mist-dark'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}>
          {t.isApproved ? 'Unapprove' : 'Approve'}
        </button>
        <button onClick={() => onDelete(t._id)}
          className="text-[11px] font-semibold px-3 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
          Delete
        </button>
      </div>
    </div>
  )
}
