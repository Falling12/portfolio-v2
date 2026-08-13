import Link from 'next/link'
import type { Project, UiText } from '@/payload-types'
import type { Locale } from '@/lib/locale'
import { getArchiveCopy } from '@/lib/archiveCopy'
import { PlaceholderScreenshot } from './PlaceholderMedia'
import { mediaUrl } from '@/lib/media'

export function Work({ uiText, projects, locale }: { uiText: UiText; projects: Project[]; locale: Locale }) {
  const total = String(projects.length).padStart(2, '0')
  const archiveCopy = getArchiveCopy(locale)

  return (
    <section id="work" className="mx-auto w-full max-w-[1440px] border-t border-rule">
      <div className="glass-panel sticky top-[72px] z-30 flex items-center justify-between border-b border-rule px-6 py-6 md:px-[100px]">
        <h2 className="font-heading text-2xl font-semibold tracking-tight uppercase">{uiText.work.heading}</h2>
        <span className="font-mono text-sm text-muted">[ {uiText.work.eyebrow} ]</span>
      </div>

      <div className="flex flex-col">
        {projects.map((project, i) => {
          const reversed = i % 2 === 1
          return (
            <article
              key={project.id}
              className="group relative flex min-h-[90dvh] flex-col border-b border-rule md:flex-row"
            >
              <div
                className={`order-2 flex w-full flex-col justify-between border-b border-rule p-6 md:w-[35%] md:border-r md:border-b-0 md:p-12 ${reversed ? 'md:order-2 md:border-r-0 md:border-l' : 'md:order-1'}`}
              >
                <div>
                  <span className="mb-4 block font-mono text-sm text-muted">
                    {project.index} / {total}
                  </span>
                  <h3 className="mb-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">{project.title}</h3>
                  <p className="text-lg text-muted">{project.summary}</p>
                </div>
                <div className="mt-12">
                  <div className="mb-8 flex flex-wrap gap-2">
                    {(project.techTags || []).map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-3 py-1 text-xs ${project.isCoreSpecialism ? 'border-[var(--accent)]/30 text-[var(--accent)]' : 'border-rule text-muted'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.isCoreSpecialism && (
                    <span className="mb-4 inline-block rounded-full border border-[var(--accent)] px-2.5 py-0.5 font-mono text-[11px] tracking-[0.1em] text-[var(--accent)] uppercase">
                      {uiText.work.aiBadge}
                    </span>
                  )}
                  <Link
                    href={`/work/${project.slug}`}
                    className="flex items-center gap-2 font-medium text-[var(--accent)] transition-transform duration-300 ease-out hover:text-ink group-hover:translate-x-2"
                  >
                    {uiText.work.viewProject} <span className="font-mono">→</span>
                  </Link>
                </div>
              </div>

              <div
                className={`mask-reveal order-1 flex w-full items-center justify-center overflow-hidden p-6 md:w-[65%] md:p-12 ${reversed ? 'md:order-1' : 'md:order-2'}`}
              >
                <div className="img-mask relative h-full min-h-[400px] w-full">
                  <Link href={`/work/${project.slug}`} className="block h-full w-full">
                    {project.screenshot && typeof project.screenshot === 'object' ? (
                      <img
                        src={mediaUrl(project.screenshot)}
                        alt={project.screenshot.alt}
                        className="img-scale h-full w-full object-cover opacity-80 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="img-scale h-full">
                        <PlaceholderScreenshot
                          label={project.screenshotLabel || ''}
                          variant={project.screenshotStyle === 'dark-terminal' ? 'dark-terminal' : 'light'}
                          terminalTitle={
                            project.screenshotStyle === 'dark-terminal' ? 'agent-pipeline — run #248' : undefined
                          }
                        />
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="flex justify-center border-t border-rule py-10">
        <Link
          href="/work"
          className="flex items-center gap-2 font-mono text-sm tracking-[0.04em] text-muted uppercase transition-colors hover:text-[var(--accent)]"
        >
          {archiveCopy.viewAll} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
