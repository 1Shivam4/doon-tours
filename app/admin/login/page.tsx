'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res  = await fetch('/api/admin/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password }),
    })
    const json = await res.json()
    if (json.success) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Incorrect password. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-serif text-3xl font-semibold text-white mb-1">
            DevBhumi<span className="text-saffron">Travels</span>
          </div>
          <div className="text-sm text-white/50">Admin Panel</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
          <h1 className="font-serif text-2xl font-semibold text-bark mb-6">Sign in</h1>

          <label className="block text-[12px] font-semibold text-stone uppercase tracking-[0.04em] mb-[6px]">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            className="w-full text-sm text-bark bg-white border border-border rounded-lg px-4 py-3 outline-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(13,33,69,0.12)] mb-4"
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest hover:bg-forest-light disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs mt-6">
          Set <code className="font-mono">ADMIN_PASSWORD</code> in your .env file
        </p>
      </div>
    </div>
  )
}
