'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import type { Media, Project } from '@/payload-types'
import { PlaceholderScreenshot } from './PlaceholderMedia'
import { ImageCarousel } from './ImageCarousel'
import { mediaUrl } from '@/lib/media'

export function LiveProject({
  initialProject,
  serverURL,
  viewProjectBackLabel,
}: {
  initialProject: Project
  serverURL: string
  viewProjectBackLabel: string
}) {
  const { data: project } = useLivePreview<Project>({
    initialData: initialProject,
    serverURL,
    depth: 2,
  })

  const images = [
    project.screenshot && typeof project.screenshot === 'object' ? project.screenshot : null,
    ...(project.gallery || []).map((entry) => (entry.image && typeof entry.image === 'object' ? entry.image : null)),
  ]
    .filter((media): media is Media => media !== null)
    .map((media) => ({ src: mediaUrl(media), alt: media.alt }))

  return (
    <article className="px-6 py-16 md:px-[100px] md:py-24">
      <Link href="/work" className="font-mono text-xs tracking-[0.1em] text-muted uppercase hover:text-ink">
        ← {viewProjectBackLabel}
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <div className="font-mono text-xs tracking-[0.14em] text-muted">{project.index}</div>
      </div>
      <h1 className="m-0 mt-3.5 font-heading text-4xl font-semibold tracking-[-0.03em] md:text-[56px]">
        {project.title}
      </h1>
      <p className="m-0 mt-4 max-w-2xl text-lg leading-[1.55] text-muted md:text-xl">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(project.techTags || []).map((tag) => (
          <span key={tag} className="rounded-full border border-rule px-2.5 py-1.5 font-mono text-xs text-muted">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10">
        {images.length > 0 ? (
          <ImageCarousel images={images} />
        ) : (
          <PlaceholderScreenshot
            label={project.screenshotLabel || ''}
            variant={project.screenshotStyle === 'dark-terminal' ? 'dark-terminal' : 'light'}
            terminalTitle={project.screenshotStyle === 'dark-terminal' ? 'agent-pipeline — run #248' : undefined}
          />
        )}
      </div>

      {project.detailContent && (
        <div className="prose prose-invert prose-lg mt-10 max-w-2xl">
          <RichText data={project.detailContent} />
        </div>
      )}
    </article>
  )
}
