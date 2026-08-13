import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Csanád Senk',
    },
    {
      name: 'role',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      defaultValue: 'Debrecen, Hungary',
    },
    {
      name: 'currentRoleLabel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'currentRoleValue',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'availabilityLabel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'availabilityStatus',
      type: 'select',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Unavailable', value: 'unavailable' },
      ],
      defaultValue: 'available',
      required: true,
    },
    {
      name: 'availabilityValue',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'contactDescription',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'github',
      type: 'text',
    },
    {
      name: 'linkedin',
      type: 'text',
    },
    {
      name: 'accentColor',
      type: 'select',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Orange', value: 'orange' },
        { label: 'Red', value: 'red' },
      ],
      defaultValue: 'blue',
      required: true,
    },
  ],
}
