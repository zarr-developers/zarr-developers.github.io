import { defineConfig } from 'vitepress'
import { redirectsPlugin, defaultPluginOptions } from './plugins/redirects'

// Read the path prefix from RTD's canonical URL env var when present
// (e.g. https://<slug>.readthedocs.build/en/171/ → /en/171/), so all
// asset URLs resolve correctly under the PR-preview subpath. Defaults
// to '/' for the GitHub Pages build at zarr.dev.
const rtdUrl = process.env.READTHEDOCS_CANONICAL_URL
const base = rtdUrl ? new URL(rtdUrl).pathname : '/'

export default defineConfig({
  base,
  title: 'Zarr',
  description: 'A specification, implementations in 10 languages, and an ecosystem of datasets and tools, built by an open community.',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: 'https://zarr.dev' },
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Zarr' }],
    ['meta', { name: 'application-name', content: 'Zarr' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Zarr' }],
    ['meta', { property: 'og:title', content: 'Zarr' }],
    ['meta', { property: 'og:description', content: 'A specification, implementations in 10 languages, and an ecosystem of datasets and tools, built by an open community.' }],
    ['meta', { property: 'og:image', content: 'https://zarr.dev/android-chrome-512x512.png' }],
    ['meta', { property: 'og:url', content: 'https://zarr.dev/' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'Zarr' }],
    ['meta', { name: 'twitter:description', content: 'A specification, implementations in 10 languages, and an ecosystem of datasets and tools, built by an open community.' }],
    ['meta', { name: 'twitter:image', content: 'https://zarr.dev/android-chrome-512x512.png' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-BCRR9QE7Z0' }],
    ['script', {}, `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BCRR9QE7Z0');`],
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
    logo: '/android-chrome-192x192.png',
    search: { provider: 'local' },
    nav: [
      { text: 'Implementations', link: '/implementations' },
      { text: 'Datasets', link: '/datasets' },
      { text: 'Adopters', link: '/adopters' },
      {
        text: 'Community',
        items: [
          { text: 'Overview', link: '/community' },
          { text: 'Office Hours', link: '/office-hours' },
          { text: 'ZEPs', link: 'https://zarr.dev/zeps/' },
          { text: 'Slides', link: '/slides' },
        ],
      },
      {
        text: 'Resources',
        items: [
          { text: 'Specification', link: 'https://zarr-specs.readthedocs.io/' },
          { text: 'Documentation', link: 'https://zarr.readthedocs.io/en/stable/' },
          { text: 'Conventions', link: '/conventions' },
          { text: 'Blog', link: 'https://zarr.dev/blog/' },
        ],
      },
    ],
    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 530"><path d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.612 9.997 86.535 9.997 68.825c0-88.687 77.742-60.816 125.72-24.795z" fill="currentColor"/></svg>',
        },
        link: 'https://bsky.app/profile/zarr.dev',
        ariaLabel: 'Bluesky',
      },
      { icon: 'mastodon', link: 'https://fosstodon.org/@zarr' },
      { icon: 'github', link: 'https://github.com/zarr-developers' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.81.49 3.51 1.34 4.97L2 22l5.16-1.35A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="currentColor"/></svg>',
        },
        link: 'https://ossci.zulipchat.com/',
        ariaLabel: 'Zulip',
      },
    ],
    editLink: {
      pattern: 'https://github.com/zarr-developers/zarr-developers.github.io/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message:
        'Site content released under <a href="https://github.com/zarr-developers/zarr-developers.github.io/blob/main/LICENSE.txt">CC BY 3.0</a>. Logos are trademarks of their respective owners; use here is for identification only and does not imply endorsement (see <a href="https://github.com/zarr-developers/zarr-developers.github.io/blob/main/NOTICE.md">NOTICE</a>).',
      copyright: 'Copyright © Zarr contributors',
    },
  },
})
