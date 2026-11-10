import { defineConfig } from 'vitepress'
import { zarrConfig } from '@zarr-developers/vitepress-theme/config'
import { redirectsPlugin, defaultPluginOptions } from './plugins/redirects'

// Read the path prefix from RTD's canonical URL env var when present
// (e.g. https://<slug>.readthedocs.build/en/171/ → /en/171/), so all
// asset URLs resolve correctly under the PR-preview subpath. Defaults
// to '/' for the GitHub Pages build at zarr.dev.
const rtdUrl = process.env.READTHEDOCS_CANONICAL_URL
const base = rtdUrl ? new URL(rtdUrl).pathname : '/'

export default defineConfig({
  extends: zarrConfig({
    site: 'zarr.dev',
    title: 'Zarr',
    description: 'A specification, implementations in 10 languages, and an ecosystem of datasets and tools, built by an open community.',
    repo: 'zarr-developers/zarr-developers.github.io',
    github: 'https://github.com/zarr-developers',
  }),
  base,
  // Head tags only zarr.dev has; the shared ones come from zarrConfig().
  head: [
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Zarr' }],
    ['meta', { name: 'application-name', content: 'Zarr' }],
  ],
  srcExclude: [
    'docs/**',
    'README.md',
    'NOTICE.md',
  ],
  vite: {
    plugins: [redirectsPlugin(defaultPluginOptions(process.cwd()))],
  },
  themeConfig: {
    footer: {
      message:
        'Site content released under <a href="https://github.com/zarr-developers/zarr-developers.github.io/blob/main/LICENSE.txt">CC BY 3.0</a>. Logos are trademarks of their respective owners; use here is for identification only and does not imply endorsement (see <a href="https://github.com/zarr-developers/zarr-developers.github.io/blob/main/NOTICE.md">NOTICE</a>).',
    },
  },
})
