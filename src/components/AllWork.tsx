import Link from 'next/link'
import type { Project, UiText } from '@/payload-types'
import type { Locale } from '@/lib/locale'
import { getArchiveCopy } from '@/lib/archiveCopy'
import { mediaUrl } from '@/lib/media'

export function AllWork({
  uiText,
  projects,
  locale,
}: {
  uiText: UiText
  projects: Project[]
  locale: Locale
}) {
  const copy = getArchiveCopy(locale)
  const total = String(projects.length).padStart(2, '0')

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-[104px] pb-24 md:px-[100px] md:pt-[152px]">
      <div className="reveal-up max-w-2xl border-b border-rule pb-10">
        <span className="mb-4 block font-mono text-sm tracking-[0.08em] text-muted uppercase">[ {copy.eyebrow} ]</span>
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl">{copy.heading}</h1>
        <p className="mt-4 text-lg text-muted">{copy.description}</p>
      </div>

      <div className="stagger-container flex flex-col">
        {projects.map((project, i) => (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            className="stagger-item group grid grid-cols-1 gap-4 border-b border-rule py-8 md:grid-cols-[4rem_1.4fr_1fr_auto] md:items-center md:gap-8"
            style={{ '--stagger-index': i } as React.CSSProperties}
          >
            <span className="font-mono text-xs whitespace-nowrap text-muted">
              {project.index} / {total}
            </span>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-heading text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-2xl">
                  {project.title}
                </h2>
                {project.isCoreSpecialism && (
                  <span className="rounded-full border border-[var(--accent)] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-[var(--accent)] uppercase">
                    {uiText.work.aiBadge}
                  </span>
                )}
              </div>
              <p className="mt-2 max-w-md text-sm text-muted">{project.summary}</p>
            </div>

            <div className="flex flex-wrap content-start gap-2">
              {(project.techTags || []).map((tag) => (
                <span key={tag} className="rounded-full border border-rule px-2.5 py-1 font-mono text-[11px] text-muted">
                  {tag}
                </span>
              ))}
            </div>

            <div className="hidden h-16 w-28 shrink-0 overflow-hidden border border-rule md:block">
              {project.screenshot && typeof project.screenshot === 'object' ? (
                <img
                  src={mediaUrl(project.screenshot)}
                  alt={project.screenshot.alt}
                  className="h-full w-full object-cover opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
              ) : (
                <div
                  className="h-full w-full opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  style={{
                    backgroundImage:
                      project.screenshotStyle === 'dark-terminal'
                        ? 'repeating-linear-gradient(135deg, var(--color-paper) 0 6px, var(--color-surface) 6px 12px)'
                        : 'repeating-linear-gradient(135deg, var(--color-surface) 0 6px, var(--color-paper) 6px 12px)',
                  }}
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
