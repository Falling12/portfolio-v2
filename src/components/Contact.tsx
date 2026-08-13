'use client'

import { useState, useTransition } from 'react'
import type { SiteSetting, UiText } from '@/payload-types'
import { PaperPlaneRightIcon } from './icons'

export function Contact({ uiText, siteSettings }: { uiText: UiText; siteSettings: SiteSetting }) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
          }),
        })
        if (!res.ok) throw new Error('Failed')
        setSent(true)
        form.reset()
      } catch {
        setError('Something went wrong — please try again.')
      }
    })
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:py-32 md:px-[100px]">
      <div className="reveal-up grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="mb-8 font-heading text-6xl leading-[0.9] font-bold tracking-tighter uppercase md:text-8xl">
              {uiText.contact.heading}
            </h2>
            <p className="mb-12 max-w-md text-xl font-light text-muted">{siteSettings.contactDescription}</p>
          </div>

          <div>
            <span className="mb-2 block font-mono text-sm tracking-widest text-muted uppercase">
              {uiText.contact.emailLabel}
            </span>
            <a
              href={`mailto:${siteSettings.email}`}
              className="inline-block border-b border-transparent pb-1 font-heading text-2xl transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:text-3xl"
            >
              {siteSettings.email}
            </a>
          </div>
        </div>

        <div className="border border-rule bg-surface/30 p-6 md:p-12">
          <form onSubmit={handleSubmit} className="relative flex flex-col gap-8">
            <div className="group relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={uiText.contact.namePlaceholder}
                className="peer w-full border-b border-rule bg-transparent py-4 text-lg text-ink placeholder-transparent transition-colors outline-none focus:border-[var(--accent)]"
              />
              <label
                htmlFor="name"
                className="pointer-events-none absolute top-4 left-0 text-lg text-muted transition-all peer-valid:-top-3 peer-valid:text-xs peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[var(--accent)]"
              >
                {uiText.contact.nameLabel}
              </label>
            </div>

            <div className="group relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder={uiText.contact.emailPlaceholder}
                className="peer w-full border-b border-rule bg-transparent py-4 text-lg text-ink placeholder-transparent transition-colors outline-none focus:border-[var(--accent)]"
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute top-4 left-0 text-lg text-muted transition-all peer-valid:-top-3 peer-valid:text-xs peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[var(--accent)]"
              >
                {uiText.contact.emailFieldLabel}
              </label>
            </div>

            <div className="group relative mt-4">
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder={uiText.contact.messagePlaceholder}
                className="peer w-full resize-none border-b border-rule bg-transparent py-4 text-lg text-ink placeholder-transparent transition-colors outline-none focus:border-[var(--accent)]"
              />
              <label
                htmlFor="message"
                className="pointer-events-none absolute top-4 left-0 text-lg text-muted transition-all peer-valid:-top-3 peer-valid:text-xs peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[var(--accent)]"
              >
                {uiText.contact.messageLabel}
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending || sent}
              className="btn-hover group mt-8 flex w-full items-center justify-center gap-2 border border-rule px-8 py-5 text-center font-heading text-sm font-semibold tracking-widest uppercase transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
            >
              <span>{uiText.contact.submit}</span>
              {isPending ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/25 border-t-current" />
              ) : (
                <PaperPlaneRightIcon className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              )}
            </button>
            <span
              role="status"
              className={`block min-h-4 font-mono text-xs transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                sent || error
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-1 opacity-0'
              } ${error ? 'text-red-400' : 'text-[var(--accent)]'}`}
            >
              {sent ? uiText.contact.success : error}
            </span>
          </form>
        </div>
      </div>
    </section>
  )
}
