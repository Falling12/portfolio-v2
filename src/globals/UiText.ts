import type { GlobalConfig } from 'payload'

const t = (name: string, required = true) => ({
  name,
  type: 'text' as const,
  localized: true,
  required,
})

export const UiText: GlobalConfig = {
  slug: 'uiText',
  label: 'UI Text (nav, buttons, labels)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nav',
      type: 'group',
      fields: [t('work'), t('capabilities'), t('about'), t('contact')],
    },
    t('cta'),
    {
      name: 'hero',
      type: 'group',
      fields: [t('primaryCta'), t('secondaryCta'), t('location')],
    },
    {
      name: 'work',
      type: 'group',
      fields: [t('eyebrow'), t('heading'), t('viewProject'), t('aiBadge')],
    },
    {
      name: 'capabilities',
      type: 'group',
      fields: [t('eyebrow'), t('heading'), t('coreSpecialism')],
    },
    {
      name: 'about',
      type: 'group',
      fields: [t('eyebrow'), t('heading'), t('stackLabel')],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        t('heading'),
        t('emailLabel'),
        t('nameLabel'),
        t('namePlaceholder'),
        t('emailFieldLabel'),
        t('emailPlaceholder'),
        t('messageLabel'),
        t('messagePlaceholder'),
        t('submit'),
        t('success'),
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [t('github'), t('linkedin')],
    },
  ],
}
