import { ImageResponse } from 'next/og'
import { getSiteSettings } from '@/lib/data'
import { resolveAccentHex } from '@/lib/accent'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

export default async function AppleIcon() {
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
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        {initials(siteSettings.name)}
      </div>
    ),
    { ...size },
  )
}
