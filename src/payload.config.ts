import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { SiteSettings } from './globals/SiteSettings'
import { AboutContent } from './globals/AboutContent'
import { Capabilities } from './globals/Capabilities'
import { UiText } from './globals/UiText'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const livePreviewBreakpoints = [
  { name: 'desktop', label: 'Desktop (1440px)', width: 1440, height: 900 },
  { name: 'tablet', label: 'Tablet (900px)', width: 900, height: 1000 },
  { name: 'mobile', label: 'Mobile (390px)', width: 390, height: 844 },
]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    {
      ...Projects,
      admin: {
        ...Projects.admin,
        livePreview: {
          url: ({ data }) => `${serverURL}/work/${data.slug}`,
          breakpoints: livePreviewBreakpoints,
        },
      },
    },
    ContactSubmissions,
  ],
  globals: [
    {
      ...SiteSettings,
      admin: {
        ...SiteSettings.admin,
        livePreview: { url: `${serverURL}/preview/hero`, breakpoints: livePreviewBreakpoints },
      },
    },
    {
      ...AboutContent,
      admin: {
        ...AboutContent.admin,
        livePreview: { url: `${serverURL}/preview/about`, breakpoints: livePreviewBreakpoints },
      },
    },
    {
      ...Capabilities,
      admin: {
        ...Capabilities.admin,
        livePreview: { url: `${serverURL}/preview/capabilities`, breakpoints: livePreviewBreakpoints },
      },
    },
    {
      ...UiText,
      admin: {
        ...UiText.admin,
        livePreview: { url: `${serverURL}/preview/chrome`, breakpoints: livePreviewBreakpoints },
      },
    },
  ],
  localization: {
    locales: ['en', 'hu'],
    defaultLocale: 'en',
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [],
})
