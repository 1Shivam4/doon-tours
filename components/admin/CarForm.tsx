'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from './ImageUploader'

interface Driver { _id: string; name: string }
interface CarFormData {
  name: string; slug: string; type: string; seats: number; fuel: string
  pricePerDay: number; features: string; driver: string; isAvailable: boolean
}

const TYPES = ['SUV', 'Sedan', 'Tempo Traveller', 'Other']
const FUELS = ['Diesel', 'Petrol', 'CNG', 'Electric']

const inputClass  = 'w-full text-sm text-bark bg-white border border-border rounded-lg px-4 py-[10px] outline-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(44,62,45,0.1)] transition-all'
const labelClass  = 'block text-[12px] font-semibold text-stone uppercase tracking-[0.04em] mb-[6px]'
const selectClass = `${inputClass} cursor-pointer`

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function CarForm({ initial, carId, initialImages }: { initial?: Partial<CarFormData>; carId?: string; initialImages?: string[] }) {
  const router  = useRouter()
  const isEdit  = Boolean(carId)
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')
  const [images, setImages]   = useState<string[]>(initialImages ?? [])
  const [form, setForm]       = useState<CarFormData>({
    name: '', slug: '', type: 'SUV', seats: 7, fuel: 'Diesel',
    pricePerDay: 0, features: '', driver: '', isAvailable: true,
    ...initial,
  })

  useEffect(() => {
    fetch('/api/drivers').then(r => r.json()).then(j => setDrivers(j.data ?? []))
  }, [])

  function set(key: keyof CarFormData, value: string | number | boolean) {
    setForm(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'name' && !isEdit) next.slug = slugify(value as string)
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      ...form,
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
      driver:   form.driver || null,
      images,
    }
    try {
      const url    = isEdit ? `/api/cars/${form.slug}` : '/api/cars'
      const method = isEdit ? 'PUT' : 'POST'
      const res    = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      router.push('/admin/cars')
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!carId || !confirm('Delete this car? This cannot be undone.')) return
    await fetch(`/api/cars/${form.slug}`, { method: 'DELETE' })
    router.push('/admin/cars')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[680px] flex flex-col gap-6">

      <div className="bg-white border border-border rounded-xl p-6">
        <h2 className="font-serif text-lg font-semibold text-bark mb-4">Vehicle Details</h2>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Name *</label>
              <input required className={inputClass} value={form.name}
                onChange={e => set('name', e.target.value)} placeholder="Toyota Innova Crysta" />
            </div>
            <div>
              <label className={labelClass}>Slug (URL key) *</label>
              <input required className={inputClass} value={form.slug}
                onChange={e => set('slug', e.target.value)} placeholder="toyota-innova-crysta"
                readOnly={isEdit} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Type</label>
              <select className={selectClass} value={form.type} onChange={e => set('type', e.target.value)}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Seats</label>
              <input type="number" min={1} className={inputClass} value={form.seats}
                onChange={e => set('seats', Number(e.target.value))} />
            </div>
            <div>
              <label className={labelClass}>Fuel</label>
              <select className={selectClass} value={form.fuel} onChange={e => set('fuel', e.target.value)}>
                {FUELS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Price / Day (₹)</label>
              <input type="number" min={0} className={inputClass} value={form.pricePerDay}
                onChange={e => set('pricePerDay', Number(e.target.value))} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Features (comma-separated)</label>
            <input className={inputClass} value={form.features}
              onChange={e => set('features', e.target.value)}
              placeholder="GPS Navigation, First Aid Kit, Music System, USB Charging" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Driver</label>
              <select className={selectClass} value={form.driver} onChange={e => set('driver', e.target.value)}>
                <option value="">— No driver assigned —</option>
                {drivers.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.isAvailable}
                  onChange={e => set('isAvailable', e.target.checked)}
                  className="w-4 h-4 accent-forest" />
                <span className="text-sm font-medium text-bark">Available for booking</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h2 className="font-serif text-lg font-semibold text-bark mb-1">Photos</h2>
        <p className="text-xs text-stone mb-4">First photo is shown as the main image. You can add multiple.</p>
        <ImageUploader images={images} onChange={setImages} />
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving}
          className="bg-forest hover:bg-forest-light disabled:opacity-60 text-white font-semibold px-6 py-[10px] rounded-lg transition-colors">
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Car'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="text-sm text-stone border border-border px-5 py-[10px] rounded-lg hover:bg-mist transition-colors">
          Cancel
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete}
            className="ml-auto text-sm text-red-600 border border-red-200 px-5 py-[10px] rounded-lg hover:bg-red-50 transition-colors">
            Delete Car
          </button>
        )}
      </div>
    </form>
  )
}
