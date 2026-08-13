import type { AboutContent, UiText } from '@/payload-types'
import { PlaceholderPortrait } from './PlaceholderMedia'
import { mediaUrl } from '@/lib/media'

export function About({ uiText, about }: { uiText: UiText; about: AboutContent }) {
  const stack = about.stack || []

  return (
    <section id="about" className="border-y border-rule">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col lg:flex-row">
        <div className="flex min-h-[50vh] w-full items-center justify-center border-b border-rule bg-surface/50 p-4 md:p-8 lg:min-h-0 lg:w-5/12 lg:border-r lg:border-b-0">
          {about.portrait && typeof about.portrait === 'object' ? (
            <img
              src={mediaUrl(about.portrait)}
              alt={about.portrait.alt}
              className="aspect-[3/4] w-full max-w-md border border-rule object-cover shadow-2xl grayscale contrast-125"
            />
          ) : (
            <PlaceholderPortrait />
          )}
        </div>

        <div className="reveal-up flex w-full flex-col justify-center p-4 md:p-12 lg:w-7/12 lg:p-24">
          <h2 className="mb-8 font-heading text-4xl font-bold tracking-tight">{uiText.about.heading}</h2>

          <div className="mb-16 space-y-6 text-lg leading-relaxed font-light text-muted">
            <p>{about.bioParagraph1}</p>
            <p>{about.bioParagraph2}</p>
          </div>

          <div className="stagger-container reveal-up border-t border-rule pt-12">
            <h3 className="mb-8 font-mono text-sm tracking-widest text-muted uppercase">{uiText.about.stackLabel}</h3>

            <ul className="flex flex-col divide-y divide-rule border-t border-rule">
              {stack.map((row, i) => (
                <li
                  key={row.id}
                  className="stagger-item group flex flex-col justify-between py-4 sm:flex-row sm:items-center"
                  style={{ '--stagger-index': i } as React.CSSProperties}
                >
                  <span
                    className="font-heading text-xl font-medium"
                    style={{ color: row.highlighted ? 'var(--accent)' : undefined }}
                  >
                    {row.category}
                  </span>
                  <span className="font-mono text-sm text-muted transition-colors group-hover:text-ink">
                    {row.items}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
