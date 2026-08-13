import { cache } from 'react'
import { getPayloadClient } from './payload'
import type { Locale } from './locale'

export const getSiteSettings = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'siteSettings', locale })
})

export const getAboutContent = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'aboutContent', locale })
})

export const getCapabilities = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'capabilities', locale })
})

export const getUiText = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'uiText', locale })
})

export const getProjects = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    locale,
    sort: '_order',
    limit: 100,
  })
  return result.docs
})

export const getFeaturedProjects = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    locale,
    sort: '_order',
    where: { featured: { equals: true } },
    limit: 100,
  })
  return result.docs
})

export const getProjectBySlug = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] ?? null
})
