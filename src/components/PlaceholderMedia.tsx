import React from 'react'

export function PlaceholderScreenshot({
  label,
  variant = 'light',
  terminalTitle,
}: {
  label: string
  variant?: 'light' | 'dark-terminal'
  terminalTitle?: string
}) {
  const isDark = variant === 'dark-terminal'

  return (
    <div className="relative h-full min-h-[400px] w-full overflow-hidden border border-rule bg-paper">
      <div
        className="flex h-8 items-center gap-1.5 border-b border-rule px-3"
        style={{ background: isDark ? 'var(--color-paper)' : 'var(--color-surface)' }}
      >
        {isDark && terminalTitle ? (
          <>
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="font-mono text-[11px] text-muted">{terminalTitle}</span>
          </>
        ) : (
          <>
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </>
        )}
      </div>
      <div
        className="absolute inset-x-0 top-8 bottom-0 flex items-center justify-center"
        style={{
          backgroundImage: isDark
            ? 'repeating-linear-gradient(135deg, var(--color-paper) 0 9px, var(--color-surface) 9px 18px)'
            : 'repeating-linear-gradient(135deg, var(--color-surface) 0 9px, var(--color-paper) 9px 18px)',
        }}
      >
        <span className="border border-rule bg-paper px-3.5 py-2 font-mono text-xs tracking-[0.12em] text-muted uppercase">
          {label}
        </span>
      </div>
    </div>
  )
}

export function PlaceholderPortrait({ label }: { label: string }) {
  return (
    <div
      className="relative flex aspect-[3/4] w-full max-w-md items-center justify-center border border-rule"
      style={{
        backgroundImage: 'repeating-linear-gradient(135deg, var(--color-surface) 0 9px, var(--color-paper) 9px 18px)',
      }}
    >
      <span className="border border-rule bg-paper px-3.5 py-2 font-mono text-xs tracking-[0.12em] text-muted uppercase">
        {label}
      </span>
    </div>
  )
}
