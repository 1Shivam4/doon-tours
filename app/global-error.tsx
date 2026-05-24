'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#F8F7F4' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>⛰️</p>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: '#3D2B1F', margin: '0 0 12px' }}>
            Something went seriously wrong
          </h1>
          <p style={{ color: '#6B7280', fontSize: 15, lineHeight: 1.7, maxWidth: 400, margin: '0 0 32px' }}>
            A critical error occurred. Please refresh the page or contact us if the problem continues.
          </p>
          <button
            onClick={reset}
            style={{
              background: '#2C3E2D',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
