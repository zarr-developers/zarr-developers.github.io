// .vitepress/data/affiliated.ts
//
// The official registry of Zarr Affiliated Software Projects. See the
// governance framework:
//   https://github.com/zarr-developers/governance/blob/main/GOVERNANCE.md
//
// Only add a project here after the Zarr Steering Council (ZSC) has voted
// to approve its affiliation; record the date of that decision in
// `affiliated`. A PR adding an approved project needs one ZSC approval.
//
// Each project hosts its own governance document in its repository
// (adopting the default template in AFFILIATED_PROJECT_GOVERNANCE.md is
// fine). Set `status` to 'pending' until that document is published.

import type { AffiliatedProject } from './types'

export const affiliated: AffiliatedProject[] = [
  { name: 'Zarr Format Working Group', kind: 'specification',
    repo: 'zarr-developers/zarr-specs',
    docs: 'https://zarr-specs.readthedocs.io/',
    blurb: 'Stewards the Zarr Format Specification and the Zarr Extensions Registry.',
    affiliated: '2026-10-21', status: 'approved' },
  { name: 'Zarr-Python', kind: 'implementation',
    repo: 'zarr-developers/zarr-python',
    docs: 'https://zarr.readthedocs.io/',
    blurb: 'The reference Python implementation of chunked, compressed, N-dimensional Zarr arrays.',
    affiliated: '2026-10-21', status: 'pending' },
  { name: 'Numcodecs', kind: 'tool',
    repo: 'zarr-developers/numcodecs',
    docs: 'https://numcodecs.readthedocs.io/',
    blurb: 'Buffer compression and transformation codecs for Python, used by Zarr-Python.',
    affiliated: '2026-10-21', status: 'pending' },
  { name: 'zarr-java', kind: 'implementation',
    repo: 'zarr-developers/zarr-java',
    blurb: 'A Java implementation of the Zarr Specification.',
    affiliated: '2026-10-21', status: 'pending' },
  { name: 'VirtualiZarr', kind: 'tool',
    repo: 'zarr-developers/VirtualiZarr',
    docs: 'https://virtualizarr.readthedocs.io/',
    blurb: 'Create virtual Zarr stores that reference existing archival files, using Xarray syntax.',
    affiliated: '2026-10-21', status: 'pending' },
  { name: 'Zarr Conventions', kind: 'conventions',
    repo: 'zarr-conventions/zarr-conventions-spec',
    docs: 'https://zarr-conventions.github.io/zarr-conventions-spec/',
    blurb: 'Community-maintained, domain-agnostic metadata conventions layered on top of Zarr.',
    affiliated: '2026-10-21', status: 'pending' },
]
