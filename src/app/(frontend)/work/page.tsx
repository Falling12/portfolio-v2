import type { Metadata } from 'next'
import { getLocale } from '@/lib/locale'
import { getProjects, getSiteSettings, getUiText } from '@/lib/data'
import { Header } from '@/components/Header'
import { AllWork } from '@/components/AllWork'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const [siteSettings, uiText] = await Promise.all([getSiteSettings(locale), getUiText(locale)])

  return {
    title: uiText.work.heading,
    description: uiText.work.eyebrow,
    alternates: { canonical: '/work' },
    openGraph: {
      title: `${uiText.work.heading} — ${siteSettings.name}`,
      description: uiText.work.eyebrow,
      url: '/work',
    },
  }
}

export default async function WorkIndexPage() {
  const locale = await getLocale()
  const [siteSettings, uiText, projects] = await Promise.all([
    getSiteSettings(locale),
    getUiText(locale),
    getProjects(locale),
  ])

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: uiText.work.heading,
    url: `${serverURL}/work`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${serverURL}/work/${project.slug}`,
        name: project.title,
      })),
    },
  }

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <Header locale={locale} uiText={uiText} siteName={siteSettings.name} />
      <AllWork uiText={uiText} projects={projects} locale={locale} />
      <Footer uiText={uiText} siteSettings={siteSettings} />
    </>
  )
}
