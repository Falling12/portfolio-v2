'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { AboutContent, UiText } from '@/payload-types'
import { About } from '../About'

export function LiveAbout({
  initialAboutContent,
  uiText,
  serverURL,
}: {
  initialAboutContent: AboutContent
  uiText: UiText
  serverURL: string
}) {
  const { data: about } = useLivePreview<AboutContent>({
    initialData: initialAboutContent,
    serverURL,
    depth: 1,
  })

  return <About uiText={uiText} about={about} />
}
