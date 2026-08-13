'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { AboutContent, Capability, Project, SiteSetting, UiText } from '@/payload-types'
import type { Locale } from '@/lib/locale'
import { Header } from '../Header'
import { Hero } from '../Hero'
import { Work } from '../Work'
import { CapabilitiesSection } from '../CapabilitiesSection'
import { About } from '../About'
import { Contact } from '../Contact'
import { Footer } from '../Footer'

export function LiveChrome({
  initialUiText,
  siteSettings,
  aboutContent,
  capabilities,
  projects,
  locale,
  serverURL,
}: {
  initialUiText: UiText
  siteSettings: SiteSetting
  aboutContent: AboutContent
  capabilities: Capability
  projects: Project[]
  locale: Locale
  serverURL: string
}) {
  const { data: uiText } = useLivePreview<UiText>({
    initialData: initialUiText,
    serverURL,
    depth: 1,
  })

  return (
    <>
      <Header locale={locale} uiText={uiText} siteName={siteSettings.name} />
      <Hero uiText={uiText} siteSettings={siteSettings} />
      <Work uiText={uiText} projects={projects} locale={locale} />
      <CapabilitiesSection uiText={uiText} capabilities={capabilities} />
      <About uiText={uiText} about={aboutContent} />
      <Contact uiText={uiText} siteSettings={siteSettings} />
      <Footer uiText={uiText} siteSettings={siteSettings} />
    </>
  )
}
