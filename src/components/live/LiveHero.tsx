'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { SiteSetting, UiText } from '@/payload-types'
import type { Locale } from '@/lib/locale'
import { Header } from '../Header'
import { Hero } from '../Hero'

export function LiveHero({
  initialSiteSettings,
  uiText,
  locale,
  serverURL,
}: {
  initialSiteSettings: SiteSetting
  uiText: UiText
  locale: Locale
  serverURL: string
}) {
  const { data: siteSettings } = useLivePreview<SiteSetting>({
    initialData: initialSiteSettings,
    serverURL,
    depth: 1,
  })

  return (
    <>
      <Header locale={locale} uiText={uiText} siteName={siteSettings.name} />
      <Hero uiText={uiText} siteSettings={siteSettings} />
    </>
  )
}
