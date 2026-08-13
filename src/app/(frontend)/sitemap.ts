import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/data'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects('en')

  return [
    {
      url: serverURL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${serverURL}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${serverURL}/work/${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
