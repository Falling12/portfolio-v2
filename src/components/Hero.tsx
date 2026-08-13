import Link from 'next/link'
import type { SiteSetting, UiText } from '@/payload-types'
import { ArrowDownRightIcon, LightningIcon } from './icons'

export function Hero({ uiText, siteSettings }: { uiText: UiText; siteSettings: SiteSetting }) {
  const [firstName, ...rest] = siteSettings.name.split(' ')
  const lastName = rest.join(' ')

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden border-b border-rule pt-[104px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 md:px-[100px]">
        <div className="grid grid-cols-1 items-center gap-8 pt-12 md:grid-cols-12 md:gap-16 md:pt-0">
          <div className="reveal-up flex flex-col justify-center md:col-span-7">
            <div className="mb-8 flex w-max items-center gap-3 rounded-full border border-rule bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="font-mono text-xs tracking-widest text-muted uppercase">{siteSettings.role}</span>
            </div>

            <h1 className="relative left-[-0.02em] mb-8 font-heading text-[14vw] leading-[0.85] font-bold tracking-tighter uppercase md:text-[8.5rem]">
              {firstName}
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.3)' }}>
                {lastName}
              </span>
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-relaxed font-light text-muted md:text-xl">
              {siteSettings.heroDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 bg-[var(--accent)] px-8 py-4 text-sm font-semibold tracking-widest text-white uppercase transition-[transform,box-shadow,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:shadow-[0_10px_30px_-10px_var(--accent)] hover:brightness-110 active:scale-[0.97]"
              >
                {uiText.hero.primaryCta}{' '}
                <ArrowDownRightIcon className="h-[18px] w-[18px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 border border-rule px-8 py-4 text-sm font-medium tracking-widest uppercase transition-[color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.97]"
              >
                {uiText.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="reveal-up relative hidden h-[500px] md:col-span-5 lg:flex" style={{ transitionDelay: '200ms' }}>
            <div className="ambient-glow pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] bg-[var(--accent)]/25 blur-3xl" />
            <div className="float-panel absolute inset-0 overflow-hidden rounded-2xl border border-rule bg-gradient-to-br from-surface/80 to-paper shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-rule bg-white/[0.02] p-5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                </div>
                <div className="font-mono text-[10px] tracking-widest text-muted uppercase">pipeline.agent.ts</div>
              </div>

              <div className="p-6 font-mono text-xs leading-loose text-muted md:text-sm">
                <div className="mb-2 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">01</span>
                  <span className="text-[var(--accent)]">import</span> {'{ Agent }'}{' '}
                  <span className="text-[var(--accent)]">from</span> {"'@ai/core';"}
                </div>
                <div className="mb-2 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">02</span>
                  <span className="text-[var(--accent)]">import</span> {'{ VectorStore }'}{' '}
                  <span className="text-[var(--accent)]">from</span> {"'@ai/db';"}
                </div>
                <div className="mb-6 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">03</span>
                </div>
                <div className="mb-2 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">04</span>
                  <span className="text-ink">const</span> pipeline = <span className="text-ink">new</span> Agent({'{'}
                </div>
                <div className="mb-2 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">05</span>
                  &nbsp;&nbsp;model: <span className="text-muted">&apos;gpt-4-turbo&apos;</span>,
                </div>
                <div className="mb-2 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">06</span>
                  &nbsp;&nbsp;tools: [buildTools, dbConnect],
                </div>
                <div className="mb-2 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">07</span>
                  &nbsp;&nbsp;mode: <span className="text-muted">&apos;autonomous&apos;</span>
                </div>
                <div className="mb-2 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">08</span>
                  {'});'}
                </div>
                <div className="mb-6 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">09</span>
                </div>
                <div className="mb-2 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">10</span>
                  <span className="text-muted/60">{'// Awaiting deployment commands...'}</span>
                </div>
                <div className="mb-2 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">11</span>
                  <span className="text-ink">await</span> pipeline.execute(blueprint);
                </div>
                <div className="mt-4 flex gap-4">
                  <span className="text-[var(--accent)]/40 select-none">12</span>
                  <div className="h-4 w-2 animate-pulse bg-[var(--accent)]" />
                </div>
              </div>

              <div className="float-badge absolute right-6 bottom-6 flex items-center gap-4 rounded-xl border border-rule bg-paper/90 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 text-[var(--accent)]">
                  <LightningIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="mb-1 font-mono text-[10px] tracking-widest text-muted uppercase">
                    {siteSettings.availabilityLabel}
                  </div>
                  <div className="text-sm font-semibold">{siteSettings.availabilityValue}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reveal-up relative z-10 mx-auto mt-16 flex w-full max-w-[1440px] flex-col gap-4 border-t border-rule px-6 pt-6 pb-8 font-mono text-xs tracking-widest text-muted uppercase md:mt-24 md:flex-row md:items-center md:justify-between md:px-[100px]">
        <div className="flex items-center gap-3">
          <div
            className={`h-2 w-2 rounded-full bg-[var(--accent)] ${siteSettings.availabilityStatus === 'available' ? 'animate-pulse' : ''}`}
          />
          {siteSettings.availabilityValue}
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-12">
          <span>
            {siteSettings.currentRoleLabel}: {siteSettings.currentRoleValue}
          </span>
          <span>
            {uiText.hero.location}: {siteSettings.location}
          </span>
        </div>
      </div>
    </section>
  )
}
