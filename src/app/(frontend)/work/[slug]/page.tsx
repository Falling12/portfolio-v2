import { notFound } from 'next/navigation'
import { getLocale } from '@/lib/locale'
import { getProjectBySlug, getSiteSettings, getUiText } from '@/lib/data'
import { getArchiveCopy } from '@/lib/archiveCopy'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { LiveProject } from '@/components/LiveProject'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = await getLocale()
  const [project, siteSettings, uiText] = await Promise.all([
    getProjectBySlug(slug, locale),
    getSiteSettings(locale),
    getUiText(locale),
  ])

  if (!project) notFound()

  return (
    <>
      <Header locale={locale} uiText={uiText} siteName={siteSettings.name} />
      <LiveProject
        initialProject={project}
        serverURL={serverURL}
        viewProjectBackLabel={getArchiveCopy(locale).heading}
      />
      <Footer uiText={uiText} siteSettings={siteSettings} />
    </>
  )
}
