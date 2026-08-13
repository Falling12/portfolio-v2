import type { Locale } from './locale'

const ARCHIVE_COPY = {
  en: {
    eyebrow: 'Full archive',
    heading: 'All projects',
    description: 'Every product, dashboard, and system shipped — client work and independent builds alike.',
    viewAll: 'View all projects',
  },
  hu: {
    eyebrow: 'Teljes archívum',
    heading: 'Összes projekt',
    description: 'Minden termék, dashboard és rendszer, amit eddig leszállítottam — ügyfélmunkák és önálló projektek egyaránt.',
    viewAll: 'Összes projekt megtekintése',
  },
} as const

export function getArchiveCopy(locale: Locale) {
  return ARCHIVE_COPY[locale]
}
