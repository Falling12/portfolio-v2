import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Manrope, IBM_Plex_Mono } from 'next/font/google'
import './styles.css'
import { getLocale } from '@/lib/locale'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { resolveAccent } from '@/lib/accent'
import { getSiteSettings } from '@/lib/data'
import { ScrollReveal } from '@/components/ScrollReveal'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#141417',
  colorScheme: 'dark',
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const siteSettings = await getSiteSettings(locale)
  const title = `${siteSettings.name} — ${siteSettings.role}`
  const description = siteSettings.heroDescription

  return {
    metadataBase: new URL(serverURL),
    title: {
      default: title,
      template: `%s — ${siteSettings.name}`,
    },
    description,
    keywords: [siteSettings.name, siteSettings.role, siteSettings.location, 'Next.js', 'TypeScript', 'AI integration'],
    authors: [{ name: siteSettings.name, url: serverURL }],
    creator: siteSettings.name,
    publisher: siteSettings.name,
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: '/',
      siteName: siteSettings.name,
      locale: locale === 'hu' ? 'hu_HU' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const locale = await getLocale()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const siteSettings = await payload.findGlobal({ slug: 'siteSettings', locale })
  const accent = resolveAccent(siteSettings.accentColor)

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${manrope.variable} ${ibmPlexMono.variable}`}>
      <body style={{ '--accent': accent } as React.CSSProperties} className="selection:text-white">
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          }}
        />
        {children}
        <ScrollReveal />
      </body>
    </html>
  )
}
