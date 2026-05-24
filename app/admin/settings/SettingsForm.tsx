'use client'

import { useState } from 'react'

interface Settings {
  packagesEnabled:   boolean
  guesthouseEnabled: boolean
  businessName:      string
  tagline:           string
  whatsappNumber:    string
  phone:             string
  email:             string
  address:           string
}

function Toggle({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-semibold text-bark">{label}</div>
        <div className="text-xs text-stone mt-[2px]">{desc}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-forest' : 'bg-stone/30'}`}
      >
        <span className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  )
}

const inputClass = 'w-full text-sm text-bark bg-white border border-border rounded-lg px-4 py-[10px] outline-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(13,33,69,0.12)] transition-all'
const labelClass = 'block text-[12px] font-semibold text-stone uppercase tracking-[0.04em] mb-[6px]'

export default function SettingsForm({ initial }: { initial: Settings }) {
  const [form, setForm]       = useState<Settings>(initial)
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)
  const [error, setError]     = useState('')

  function set(key: keyof Settings, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-[680px]">

      {/* Feature toggles */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h2 className="font-serif text-lg font-semibold text-bark mb-1">Feature Toggles</h2>
        <p className="text-xs text-stone mb-4">Show or hide pages in the public navigation.</p>
        <Toggle
          label="Packages Page"
          desc="Enables the /packages route and adds it to the navbar."
          checked={form.packagesEnabled}
          onChange={v => set('packagesEnabled', v)}
        />
        <Toggle
          label="Guesthouse Page"
          desc="Enables the /guesthouse route and adds it to the navbar."
          checked={form.guesthouseEnabled}
          onChange={v => set('guesthouseEnabled', v)}
        />
      </div>

      {/* Business info */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h2 className="font-serif text-lg font-semibold text-bark mb-4">Business Info</h2>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Business Name</label>
              <input className={inputClass} value={form.businessName} onChange={e => set('businessName', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input className={inputClass} value={form.tagline} onChange={e => set('tagline', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <input className={inputClass} value={form.whatsappNumber} onChange={e => set('whatsappNumber', e.target.value)} placeholder="918532805298" />
              <p className="text-[11px] text-stone mt-1">Include country code, no + or spaces</p>
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input className={inputClass} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 85328 05298" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input className={inputClass} value={form.address} onChange={e => set('address', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Save */}
      {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-forest hover:bg-forest-light disabled:opacity-60 text-white font-semibold px-6 py-[10px] rounded-lg transition-colors"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        {saved && <span className="text-sm text-green-600 font-medium">✓ Saved! Reload the site to see changes.</span>}
      </div>
    </div>
  )
}
