import { ImageResponse } from 'next/og'

export const alt = 'DevBhumi Travels — Uttarakhand Tours & Travel'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#071525',
          padding: '80px 96px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Accent bar */}
        <div style={{ width: 64, height: 4, background: '#4db8ff', marginBottom: 40, borderRadius: 2 }} />

        {/* Business name */}
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.05, marginBottom: 20 }}>
          <span>DevBhumi</span><span style={{ color: '#4db8ff' }}>Travels</span>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.65)', fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
          Uttarakhand Tours &amp; Travel
        </div>

        {/* Region pill */}
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 999,
            padding: '10px 20px',
          }}
        >
          <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', fontFamily: 'system-ui', fontWeight: 500 }}>
            Rishikesh · Kedarnath · Char Dham · Auli · Mussoorie
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
