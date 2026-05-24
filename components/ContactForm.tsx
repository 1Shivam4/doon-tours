'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormValues {
  name:       string
  phone:      string
  email?:     string
  travelDate?: string
  groupSize?:  string
  message?:    string
}

const inputClass =
  'w-full font-sans text-sm text-bark bg-white border border-border rounded-lg px-[14px] py-[11px] outline-none transition-all focus:border-forest focus:shadow-[0_0_0_3px_rgba(44,62,45,0.1)] placeholder:text-[#b5b0ab]'

const labelClass = 'block text-[12px] font-semibold text-stone uppercase tracking-[0.04em] mb-[6px]'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  async function onSubmit(data: FormValues) {
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      window.open(json.data.waUrl, '_blank')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Your Name *</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className={inputClass}
            placeholder="Ankit Sharma"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Phone Number *</label>
          <input
            {...register('phone', { required: 'Phone is required', minLength: { value: 7, message: 'Enter a valid number' } })}
            type="tel"
            className={inputClass}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Email <span className="text-stone/60 normal-case font-normal">(optional)</span></label>
        <input
          {...register('email')}
          type="email"
          className={inputClass}
          placeholder="ankit@example.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Travel Date</label>
          <input {...register('travelDate')} type="date" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Group Size</label>
          <input
            {...register('groupSize')}
            type="number"
            min={1}
            className={inputClass}
            placeholder="4"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Message / Requirements</label>
        <textarea
          {...register('message')}
          rows={4}
          className={`${inputClass} resize-y leading-[1.6]`}
          placeholder="E.g. Kedarnath trip, 5 days, family of 4, need SUV..."
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-wa-green hover:bg-[#20bd5a] disabled:opacity-60 text-white text-[15px] font-semibold py-[14px] rounded-lg transition-colors"
      >
        {loading ? 'Opening WhatsApp…' : '📱 Send via WhatsApp'}
      </button>

      <p className="text-[12px] text-stone text-center">
        Tapping the button opens WhatsApp with your details pre-filled.
      </p>
    </form>
  )
}
