import { getLocale } from '@/lib/locale'
import { getAboutContent, getCapabilities, getFeaturedProjects, getSiteSettings, getUiText } from '@/lib/data'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Work } from '@/components/Work'
import { LiveCapabilities } from '@/components/live/LiveCapabilities'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function PreviewCapabilitiesPage() {
  const locale = await getLocale()
  const [siteSettings, aboutContent, capabilities, uiText, projects] = await Promise.all([
    getSiteSettings(locale),
    getAboutContent(locale),
    getCapabilities(locale),
    getUiText(locale),
    getFeaturedProjects(locale),
  ])

  return (
    <>
      <Header locale={locale} uiText={uiText} siteName={siteSettings.name} />
      <Hero uiText={uiText} siteSettings={siteSettings} />
      <Work uiText={uiText} projects={projects} locale={locale} />
      <LiveCapabilities initialCapabilities={capabilities} uiText={uiText} serverURL={serverURL} />
      <About uiText={uiText} about={aboutContent} />
      <Contact uiText={uiText} siteSettings={siteSettings} />
      <Footer uiText={uiText} siteSettings={siteSettings} />
    </>
  )
}
