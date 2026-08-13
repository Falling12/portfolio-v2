import { ImageResponse } from 'next/og'
import { getSiteSettings } from '@/lib/data'
import { resolveAccentHex } from '@/lib/accent'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Portfolio'

export default async function OpengraphImage() {
  const siteSettings = await getSiteSettings('en')
  const accent = resolveAccentHex(siteSettings.accentColor)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#141417',
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: accent, display: 'flex' }} />
          <div style={{ fontSize: 24, color: '#9a9aa3', letterSpacing: 2, textTransform: 'uppercase' }}>
            {siteSettings.role}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: -4,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            {siteSettings.name}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 32,
            fontSize: 22,
            color: '#9a9aa3',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex' }}>{siteSettings.location}</div>
          <div style={{ display: 'flex', color: accent }}>{siteSettings.availabilityValue}</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
