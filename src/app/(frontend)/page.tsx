import { getLocale } from '@/lib/locale'
import { getAboutContent, getCapabilities, getFeaturedProjects, getSiteSettings, getUiText } from '@/lib/data'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Work } from '@/components/Work'
import { CapabilitiesSection } from '@/components/CapabilitiesSection'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function HomePage() {
  const locale = await getLocale()
  const [siteSettings, aboutContent, capabilities, uiText, projects] = await Promise.all([
    getSiteSettings(locale),
    getAboutContent(locale),
    getCapabilities(locale),
    getUiText(locale),
    getFeaturedProjects(locale),
  ])

  const sameAs = [siteSettings.github, siteSettings.linkedin].filter(
    (url): url is string => typeof url === 'string' && url.length > 0,
  )

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteSettings.name,
    jobTitle: siteSettings.role,
    url: serverURL,
    email: `mailto:${siteSettings.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteSettings.location,
    },
    description: aboutContent.bioParagraph1,
    knowsAbout: (capabilities.items || []).map((item) => item.title),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSettings.name,
    url: serverURL,
    inLanguage: locale,
  }

  return (
    <>
      <JsonLd data={personJsonLd} />
      <JsonLd data={websiteJsonLd} />
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
