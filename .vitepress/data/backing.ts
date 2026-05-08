// .vitepress/data/backing.ts
//
// Institutional backing shown in the home "Sponsored by" band.
// Standards bodies (e.g. OGC GeoZarr SWG) are represented in the
// /community/ "Related communities" section instead, since they relate
// to specific conventions rather than sponsoring Zarr core.

import type { BackingEntry } from './types'

export const backing: BackingEntry[] = [
  {
    name: 'NumFOCUS',
    logo: '/backing/logos/numfocus.svg',
    href: 'https://numfocus.org/sponsored-projects',
    kind: 'fiscal-host',
  },
]
