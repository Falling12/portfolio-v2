import { getLocale } from '@/lib/locale'
import { getAboutContent, getCapabilities, getFeaturedProjects, getSiteSettings, getUiText } from '@/lib/data'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Work } from '@/components/Work'
import { CapabilitiesSection } from '@/components/CapabilitiesSection'
import { LiveAbout } from '@/components/live/LiveAbout'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function PreviewAboutPage() {
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
      <CapabilitiesSection uiText={uiText} capabilities={capabilities} />
      <LiveAbout initialAboutContent={aboutContent} uiText={uiText} serverURL={serverURL} />
      <Contact uiText={uiText} siteSettings={siteSettings} />
      <Footer uiText={uiText} siteSettings={siteSettings} />
    </>
  )
}
