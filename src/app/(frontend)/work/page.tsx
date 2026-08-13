import { getLocale } from '@/lib/locale'
import { getProjects, getSiteSettings, getUiText } from '@/lib/data'
import { Header } from '@/components/Header'
import { AllWork } from '@/components/AllWork'
import { Footer } from '@/components/Footer'

export default async function WorkIndexPage() {
  const locale = await getLocale()
  const [siteSettings, uiText, projects] = await Promise.all([
    getSiteSettings(locale),
    getUiText(locale),
    getProjects(locale),
  ])

  return (
    <>
      <Header locale={locale} uiText={uiText} siteName={siteSettings.name} />
      <AllWork uiText={uiText} projects={projects} locale={locale} />
      <Footer uiText={uiText} siteSettings={siteSettings} />
    </>
  )
}
