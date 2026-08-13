import type { MetadataRoute } from 'next'
import { getSiteSettings } from '@/lib/data'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const siteSettings = await getSiteSettings('en')

  return {
    name: `${siteSettings.name} — ${siteSettings.role}`,
    short_name: siteSettings.name,
    description: siteSettings.heroDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#141417',
    theme_color: '#141417',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
