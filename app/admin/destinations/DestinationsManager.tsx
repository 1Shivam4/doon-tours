'use client'

import { useState } from 'react'

interface D { _id: string; name: string; tag: string; image: string; order: number; isActive: boolean }

export default function DestinationsManager({ initial }: { initial: D[] }) {
  const [items, setItems] = useState<D[]>(initial)
  const [adding, setAdding] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', tag: '', order: items.length + 1 })
  const [saving, setSaving]  = useState(false)

  async function toggleActive(d: D) {
    const res  = await fetch(`/api/destinations/${d._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !d.isActive }),
    })
    const json = await res.json()
    if (json.success) setItems(prev => prev.map(i => i._id === d._id ? { ...i, isActive: !i.isActive } : i))
  }

  async function remove(id: string) {
    if (!confirm('Delete this destination?')) return
    const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' })
    if ((await res.json()).success) setItems(prev => prev.filter(i => i._id !== id))
  }

  async function addDestination() {
    if (!newItem.name || !newItem.tag) return
    setSaving(true)
    const res  = await fetch('/api/destinations', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newItem, isActive: true }),
    })
    const json = await res.json()
    if (json.success) {
      setItems(prev => [...prev, json.data])
      setNewItem({ name: '', tag: '', order: items.length + 2 })
      setAdding(false)
    }
    setSaving(false)
  }

  const inputClass = 'w-full text-sm text-bark bg-white border border-border rounded-lg px-3 py-2 outline-none focus:border-forest transition-all'

  return (
    <div className="max-w-[720px]">
      <div className="bg-white border border-border rounded-xl overflow-hidden mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-mist text-left">
              <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Name</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Tag</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-stone uppercase tracking-wide">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map(d => (
              <tr key={d._id} className="hover:bg-mist/50">
                <td className="px-5 py-3 font-semibold text-bark">{d.name}</td>
                <td className="px-5 py-3 text-stone text-[13px]">{d.tag}</td>
                <td className="px-5 py-3">
                  <button onClick={() => toggleActive(d)}
                    className={`text-[11px] font-semibold px-2 py-[2px] rounded-full transition-colors ${
                      d.isActive ? 'bg-green-100 text-green-700' : 'bg-mist text-stone'}`}>
                    {d.isActive ? 'Visible' : 'Hidden'}
                  </button>
                </td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => remove(d._id)} className="text-xs text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {adding ? (
        <div className="bg-white border border-border rounded-xl p-5 flex flex-col gap-3">
          <h3 className="font-semibold text-bark text-sm">New Destination</h3>
          <div className="grid grid-cols-2 gap-3">
            <input className={inputClass} placeholder="Name (e.g. Kedarnath)"
              value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} />
            <input className={inputClass} placeholder="Tag (e.g. Sacred Pilgrimage · 3583m)"
              value={newItem.tag} onChange={e => setNewItem(p => ({ ...p, tag: e.target.value }))} />
          </div>
          <div className="flex gap-3">
            <button onClick={addDestination} disabled={saving}
              className="bg-forest text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-forest-light transition-colors disabled:opacity-60">
              {saving ? 'Adding…' : 'Add'}
            </button>
            <button onClick={() => setAdding(false)} className="text-sm text-stone hover:text-bark">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)}
          className="text-sm font-medium text-forest border border-forest px-4 py-2 rounded-lg hover:bg-forest hover:text-white transition-all">
          + Add Destination
        </button>
      )}
    </div>
  )
}
