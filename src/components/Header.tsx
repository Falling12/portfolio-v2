'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { setLocale } from '@/app/actions/setLocale'
import type { Locale } from '@/lib/locale'
import type { UiText } from '@/payload-types'

export function Header({
  locale,
  uiText,
  siteName,
}: {
  locale: Locale
  uiText: UiText
  siteName: string
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [menuClosedForPathname, setMenuClosedForPathname] = useState(pathname)

  if (pathname !== menuClosedForPathname) {
    setMenuClosedForPathname(pathname)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`navbar-glass fixed top-0 left-0 z-40 flex h-[72px] w-full items-center justify-between gap-10 border-b px-6 transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-[100px] ${
        isScrolled ? 'border-rule shadow-[0_8px_30px_rgba(0,0,0,0.35)]' : 'border-transparent shadow-none'
      }`}
    >
      <Link
        href="/#top"
        className="z-10 font-heading text-lg font-semibold tracking-tight transition-colors hover:text-[var(--accent)]"
      >
        {siteName}
      </Link>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 font-mono text-[13px] tracking-[0.04em] text-muted uppercase md:flex">
        <Link href="/work" className="nav-link transition-colors hover:text-ink">
          {uiText.nav.work}
        </Link>
        <Link href="/#capabilities" className="nav-link transition-colors hover:text-ink">
          {uiText.nav.capabilities}
        </Link>
        <Link href="/#about" className="nav-link transition-colors hover:text-ink">
          {uiText.nav.about}
        </Link>
        <Link href="/#contact" className="nav-link transition-colors hover:text-ink">
          {uiText.nav.contact}
        </Link>
      </nav>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden items-center gap-2 rounded-full border border-rule px-3 py-1 font-mono text-xs font-semibold tracking-widest uppercase sm:flex">
          <form action={setLocale.bind(null, 'en')}>
            <button
              type="submit"
              className="cursor-pointer border-0 bg-transparent font-inherit transition-colors duration-200"
              style={{ color: locale === 'en' ? 'var(--color-ink)' : 'var(--color-muted)' }}
            >
              EN
            </button>
          </form>
          <span className="text-rule">/</span>
          <form action={setLocale.bind(null, 'hu')}>
            <button
              type="submit"
              className="cursor-pointer border-0 bg-transparent font-inherit transition-colors duration-200"
              style={{ color: locale === 'hu' ? 'var(--color-ink)' : 'var(--color-muted)' }}
            >
              HU
            </button>
          </form>
        </div>
        <Link
          href="/#contact"
          className="hidden items-center justify-center border border-rule px-5 py-2 text-sm font-semibold transition-[color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.97] md:inline-flex"
        >
          {uiText.cta}
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="relative z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-rule transition-transform duration-200 active:scale-90 md:hidden"
        >
          <span className="relative h-3 w-4">
            <span
              className={`absolute top-1/2 left-0 h-[1.4px] w-full origin-center bg-current transition-transform duration-300 ease-out ${isMenuOpen ? '-translate-y-1/2 rotate-45' : '-translate-y-[calc(50%+5px)]'}`}
            />
            <span
              className={`absolute top-1/2 left-0 h-[1.4px] w-full -translate-y-1/2 bg-current transition-opacity duration-200 ease-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`absolute top-1/2 left-0 h-[1.4px] w-full origin-center bg-current transition-transform duration-300 ease-out ${isMenuOpen ? '-translate-y-1/2 -rotate-45' : 'translate-y-[calc(5px-50%)]'}`}
            />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-[72px] z-0 grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          isMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <nav className="navbar-glass flex flex-col gap-1 border-b border-rule px-6 py-6">
            <Link href="/work" className="rounded px-2 py-3 text-lg text-ink hover:bg-surface">
              {uiText.nav.work}
            </Link>
            <Link href="/#capabilities" className="rounded px-2 py-3 text-lg text-ink hover:bg-surface">
              {uiText.nav.capabilities}
            </Link>
            <Link href="/#about" className="rounded px-2 py-3 text-lg text-ink hover:bg-surface">
              {uiText.nav.about}
            </Link>
            <Link href="/#contact" className="rounded px-2 py-3 text-lg text-ink hover:bg-surface">
              {uiText.nav.contact}
            </Link>
            <Link
              href="/#contact"
              className="mt-3 flex items-center justify-center border border-rule px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {uiText.cta}
            </Link>
            <div className="mt-4 flex items-center gap-1.5 border-t border-rule pt-4 sm:hidden">
              <form action={setLocale.bind(null, 'en')}>
                <button
                  type="submit"
                  className="cursor-pointer rounded-full border-0 px-[11px] py-[5px] font-mono text-[11px] tracking-[0.06em]"
                  style={{
                    background: locale === 'en' ? 'var(--color-ink)' : 'transparent',
                    color: locale === 'en' ? 'var(--color-paper)' : 'var(--color-muted)',
                  }}
                >
                  EN
                </button>
              </form>
              <form action={setLocale.bind(null, 'hu')}>
                <button
                  type="submit"
                  className="cursor-pointer rounded-full border-0 px-[11px] py-[5px] font-mono text-[11px] tracking-[0.06em]"
                  style={{
                    background: locale === 'hu' ? 'var(--color-ink)' : 'transparent',
                    color: locale === 'hu' ? 'var(--color-paper)' : 'var(--color-muted)',
                  }}
                >
                  HU
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
