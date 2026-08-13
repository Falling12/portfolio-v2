import type { Capability, UiText } from '@/payload-types'
import { CapabilityCard } from './CapabilityCard'

export function CapabilitiesSection({ uiText, capabilities }: { uiText: UiText; capabilities: Capability }) {
  const items = capabilities.items || []

  return (
    <section id="capabilities" className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[100px]">
      <h2 className="reveal-up mb-16 font-heading text-5xl font-bold tracking-tighter uppercase md:text-7xl">
        {uiText.capabilities.heading}
      </h2>

      <div className="stagger-container reveal-up grid grid-cols-1 gap-px border border-rule bg-rule md:grid-cols-2">
        {items.map((item, i) => (
          <CapabilityCard
            key={item.id ?? i}
            item={item}
            index={i}
            coreSpecialismLabel={uiText.capabilities.coreSpecialism}
          />
        ))}
      </div>
    </section>
  )
}
