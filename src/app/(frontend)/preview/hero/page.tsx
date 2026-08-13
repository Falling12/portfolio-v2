import { getLocale } from '@/lib/locale'
import { getAboutContent, getCapabilities, getFeaturedProjects, getSiteSettings, getUiText } from '@/lib/data'
import { LiveHero } from '@/components/live/LiveHero'
import { Work } from '@/components/Work'
import { CapabilitiesSection } from '@/components/CapabilitiesSection'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function PreviewHeroPage() {
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
      <LiveHero initialSiteSettings={siteSettings} uiText={uiText} locale={locale} serverURL={serverURL} />
      <Work uiText={uiText} projects={projects} locale={locale} />
      <CapabilitiesSection uiText={uiText} capabilities={capabilities} />
      <About uiText={uiText} about={aboutContent} />
      <Contact uiText={uiText} siteSettings={siteSettings} />
      <Footer uiText={uiText} siteSettings={siteSettings} />
    </>
  )
}
