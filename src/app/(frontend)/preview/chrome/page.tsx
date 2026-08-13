import { getLocale } from '@/lib/locale'
import { getAboutContent, getCapabilities, getFeaturedProjects, getSiteSettings, getUiText } from '@/lib/data'
import { LiveChrome } from '@/components/live/LiveChrome'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function PreviewChromePage() {
  const locale = await getLocale()
  const [siteSettings, aboutContent, capabilities, uiText, projects] = await Promise.all([
    getSiteSettings(locale),
    getAboutContent(locale),
    getCapabilities(locale),
    getUiText(locale),
    getFeaturedProjects(locale),
  ])

  return (
    <LiveChrome
      initialUiText={uiText}
      siteSettings={siteSettings}
      aboutContent={aboutContent}
      capabilities={capabilities}
      projects={projects}
      locale={locale}
      serverURL={serverURL}
    />
  )
}
