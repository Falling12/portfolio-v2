import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  orderable: true,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['index', 'title', 'slug', 'isCoreSpecialism'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'index',
      type: 'text',
      required: true,
      admin: { description: 'Display index, e.g. "01"' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'techTags',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'screenshot',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'screenshotLabel',
      type: 'text',
      admin: { description: 'Shown when no screenshot is uploaded, e.g. "screenshot — landing page"' },
    },
    {
      name: 'screenshotStyle',
      type: 'select',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark terminal', value: 'dark-terminal' },
      ],
      defaultValue: 'light',
    },
    {
      name: 'gallery',
      type: 'array',
      labels: { singular: 'Image', plural: 'Gallery images' },
      admin: {
        description: 'Additional screenshots shown below the primary screenshot on the project detail page.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'isCoreSpecialism',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'True only for the AI/automation project — drives the accent-outlined pill' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Shown in the homepage Selected Work list. All projects remain reachable at /work/[slug] regardless.' },
    },
    {
      name: 'detailContent',
      type: 'richText',
      localized: true,
    },
  ],
}
