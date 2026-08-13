import type { Media } from '@/payload-types'

export function mediaUrl(media: Media): string {
  return media.url || ''
}
