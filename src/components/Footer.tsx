import type { SiteSetting, UiText } from '@/payload-types'

export function Footer({ uiText, siteSettings }: { uiText: UiText; siteSettings: SiteSetting }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-rule bg-paper">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row md:px-[100px]">
        <div className="font-mono text-sm text-muted">
          &copy; {year} {siteSettings.name}
        </div>
        <div className="flex items-center gap-8 text-sm font-medium tracking-wide">
          <a href={`mailto:${siteSettings.email}`} className="text-muted transition-colors hover:text-ink">
            {siteSettings.email}
          </a>
          {siteSettings.github && (
            <a href={siteSettings.github} className="text-muted transition-colors hover:text-ink">
              {uiText.footer.github}
            </a>
          )}
          {siteSettings.linkedin && (
            <a href={siteSettings.linkedin} className="text-muted transition-colors hover:text-ink">
              {uiText.footer.linkedin}
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
