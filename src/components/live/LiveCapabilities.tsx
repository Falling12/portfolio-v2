'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Capability, UiText } from '@/payload-types'
import { CapabilitiesSection } from '../CapabilitiesSection'

export function LiveCapabilities({
  initialCapabilities,
  uiText,
  serverURL,
}: {
  initialCapabilities: Capability
  uiText: UiText
  serverURL: string
}) {
  const { data: capabilities } = useLivePreview<Capability>({
    initialData: initialCapabilities,
    serverURL,
    depth: 1,
  })

  return <CapabilitiesSection uiText={uiText} capabilities={capabilities} />
}
