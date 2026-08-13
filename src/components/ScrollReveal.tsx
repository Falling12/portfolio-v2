'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        }
      },
      { threshold: 0.15 },
    )

    // Re-query on every route change: this component lives in the root layout, which
    // persists across client-side navigations, so a new page's .reveal-up elements
    // are never picked up by an observer instance created only on first mount.
    const targets = document.querySelectorAll('.reveal-up, .stagger-container, .mask-reveal')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return null
}
