'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{ paddingTop: 'var(--nav-height)' }}
      className="min-h-screen bg-snow flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="max-w-md">
        <p className="text-5xl mb-4">⛰️</p>
        <h2 className="font-serif text-3xl font-semibold text-bark mb-3">
          Something went wrong
        </h2>
        <p className="text-stone text-[15px] leading-[1.7] mb-8">
          An unexpected error occurred. Please try again — if the problem persists, reach out to us on WhatsApp.
        </p>
        <button
          onClick={reset}
          className="bg-forest text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-forest-light transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
