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

const PIPELINE_NODES = [
  { cx: 235, cy: 110, r: 5, label: 'web' },
  { cx: 193, cy: 36, r: 4.5, label: 'apps' },
  { cx: 108, cy: 36, r: 4.5, label: 'data' },
  { cx: 65, cy: 110, r: 5, label: 'dash' },
  { cx: 108, cy: 184, r: 4.5, label: 'infra' },
  { cx: 193, cy: 184, r: 5, label: 'ai' },
]

const BARS = [
  { dur: '2.2s', delay: '0s' },
  { dur: '1.8s', delay: '0.3s' },
  { dur: '2.6s', delay: '0.1s' },
  { dur: '2s', delay: '0.5s' },
  { dur: '2.4s', delay: '0.2s' },
]

export function PlaceholderPortrait() {
  return (
    <div className="relative flex aspect-[3/4] w-full max-w-md flex-col overflow-hidden border border-rule bg-gradient-to-br from-surface to-paper">
      <div className="ambient-glow pointer-events-none absolute top-[-15%] right-[-15%] h-2/3 w-2/3 rounded-full bg-[var(--accent)]/40 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '2rem 2rem',
        }}
      />

      <div className="relative z-10 flex items-center justify-between p-5">
        <div className="inline-flex w-max items-center gap-2 rounded-full border border-rule bg-paper/70 px-3 py-1 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase">Pipeline · live</span>
        </div>
      </div>

      {/* Six disciplines (web, apps, data, dashboards, infra, AI) orbiting a center node — you.
          Pulses trace every edge continuously so it reads as a running system, not a diagram. */}
      <svg viewBox="0 0 300 220" className="relative z-10 w-full flex-1" fill="none" aria-hidden="true">
        {PIPELINE_NODES.map((node, i) => (
          <path
            key={`edge-${i}`}
            id={`edge-${i}`}
            d={`M150,110 L${node.cx},${node.cy}`}
            stroke="var(--accent)"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        ))}
        {PIPELINE_NODES.map((node, i) => (
          <circle key={`node-${i}`} cx={node.cx} cy={node.cy} r={node.r} stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
        ))}
        <circle cx="150" cy="110" r="8" fill="var(--accent)" className="animate-pulse" />

        {PIPELINE_NODES.map((node, i) => {
          const dur = `${2.4 + i * 0.35}s`
          const begin = `${i * 0.4}s`
          return (
            <circle key={`pulse-${i}`} r={2.4} fill="var(--accent)" className="flow-pulse">
              <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
                <mpath href={`#edge-${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.85;1"
                dur={dur}
                begin={begin}
                repeatCount="indefinite"
              />
            </circle>
          )
        })}
      </svg>

      <div className="relative z-10 flex items-end justify-between gap-4 p-5">
        <div className="flex h-8 items-end gap-1">
          {BARS.map((bar, i) => (
            <div
              key={i}
              className="bar-grow w-1.5 rounded-t-sm bg-[var(--accent)]"
              style={{ height: '100%', animationDuration: bar.dur, animationDelay: bar.delay }}
            />
          ))}
        </div>
        <span className="font-mono text-[9px] tracking-[0.1em] text-muted uppercase">Shipping</span>
      </div>
    </div>
  )
}
