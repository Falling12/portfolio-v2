import type { GlobalConfig } from 'payload'

export const Capabilities: GlobalConfig = {
  slug: 'capabilities',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          name: 'index',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'isCoreSpecialism',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'True for AI integration & automation — drives accent left-border + "Core specialism" eyebrow' },
        },
      ],
    },
  ],
}
