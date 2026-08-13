import { ImageResponse } from 'next/og'
import { getSiteSettings } from '@/lib/data'
import { resolveAccentHex } from '@/lib/accent'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

export default async function Icon() {
  const siteSettings = await getSiteSettings('en')
  const accent = resolveAccentHex(siteSettings.accentColor)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#141417',
          color: accent,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        {initials(siteSettings.name)}
      </div>
    ),
    { ...size },
  )
}
