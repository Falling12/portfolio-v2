import type { GlobalConfig } from 'payload'

export const AboutContent: GlobalConfig = {
  slug: 'aboutContent',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'bioParagraph1',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'bioParagraph2',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'stack',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'text',
          required: true,
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
