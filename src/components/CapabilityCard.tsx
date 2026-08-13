'use client'

import { useRef } from 'react'
import type { Capability } from '@/payload-types'

type Item = NonNullable<Capability['items']>[number]

export function CapabilityCard({
  item,
  index,
  coreSpecialismLabel,
}: {
  item: Item
  index: number
  coreSpecialismLabel: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{ '--stagger-index': index } as React.CSSProperties}
      className={`stagger-item group relative overflow-hidden bg-paper p-8 transition-colors duration-500 hover:bg-surface md:p-16 ${item.isCoreSpecialism ? 'border-l-2 border-[var(--accent)]' : ''}`}
    >
      <div className="spotlight-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {item.isCoreSpecialism && (
        <div className="pointer-events-none absolute inset-0 bg-[var(--accent)]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <span
          className={`font-mono text-4xl font-semibold tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${item.isCoreSpecialism ? 'text-[var(--accent)]' : 'text-muted'}`}
        >
          {item.index}
        </span>
        {item.isCoreSpecialism && (
          <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--accent)] uppercase">
            {coreSpecialismLabel}
          </span>
        )}
      </div>
      <h3 className="relative z-10 mb-4 font-heading text-2xl font-bold">{item.title}</h3>
      <p className="relative z-10 leading-relaxed text-muted">{item.body}</p>
    </div>
  )
}
