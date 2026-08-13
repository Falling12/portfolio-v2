import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale } from '@/lib/locale'
import { getProjectBySlug, getSiteSettings, getUiText } from '@/lib/data'
import { getArchiveCopy } from '@/lib/archiveCopy'
import { mediaUrl } from '@/lib/media'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { LiveProject } from '@/components/LiveProject'
import { JsonLd } from '@/components/JsonLd'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  const project = await getProjectBySlug(slug, locale)
  if (!project) return {}

  const screenshot = project.screenshot && typeof project.screenshot === 'object' ? project.screenshot : null

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: 'article',
      ...(screenshot ? { images: [{ url: mediaUrl(screenshot), alt: screenshot.alt }] } : {}),
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = await getLocale()
  const [project, siteSettings, uiText] = await Promise.all([
    getProjectBySlug(slug, locale),
    getSiteSettings(locale),
    getUiText(locale),
  ])

  if (!project) notFound()

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `${serverURL}/work/${project.slug}`,
    creator: {
      '@type': 'Person',
      name: siteSettings.name,
    },
    keywords: project.techTags || [],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: uiText.nav.work, item: `${serverURL}/work` },
      { '@type': 'ListItem', position: 2, name: project.title, item: `${serverURL}/work/${project.slug}` },
    ],
  }

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
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
