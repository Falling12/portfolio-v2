import { cookies } from 'next/headers'

export const LOCALE_COOKIE = 'locale'
export const LOCALES = ['en', 'hu'] as const
export type Locale = (typeof LOCALES)[number]

export async function getLocale(): Promise<Locale> {
  const store = await cookies()
  const value = store.get(LOCALE_COOKIE)?.value
  return value === 'hu' ? 'hu' : 'en'
}
