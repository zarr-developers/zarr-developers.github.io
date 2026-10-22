// .vitepress/data/types.ts
//
// Shared shapes used by data modules and components in this directory.
// Keep these definitions narrow — adding a field is a breaking change for
// every data file. Domain values are the cross-community balance lens used
// in the marquee and the LogoWall (see header comments in adopters.ts /
// datasets.ts).

export type Domain =
  | 'bio'        // bio-imaging, microscopy, neuroscience
  | 'geo'        // Earth science, climate, geospatial
  | 'genomics'   // single-cell, sequencing
  | 'ml-hpc'     // ML training, large-scale compute
  | 'other'      // astronomy, simulation, etc.

export interface Adopter {
  name: string
  logo: string                // absolute path under /adopters/logos/...
  href: string
  blurb: string               // 1–3 sentences, plain text (no markdown)
  domain: Domain
}

export interface Dataset {
  name: string
  logo?: string               // optional /datasets/logos/...
  href: string
  blurb: string
  hosting?: string            // e.g. "AWS Open Data", "Google Cloud"
  size?: string               // e.g. "1 PB", "3 TB"
  domain: Domain
}

export interface Implementation {
  language: string            // e.g. "Python", "Rust"
  name: string                // package name, e.g. "Zarr-Python"
  href: string
  v2: boolean
  v3: boolean
  /**
   * Optional shields.io URL showing release-date or last-commit. Rendered
   * as a small inline image on each card. Pick whichever signal best
   * reflects the project's release cadence:
   *   https://img.shields.io/github/release-date/<owner>/<repo>
   *   https://img.shields.io/github/release-date-pre/<owner>/<repo>
   *   https://img.shields.io/github/last-commit/<owner>/<repo>
   */
  activity?: string
}

export interface AffiliatedProject {
  name: string
  repo: string                // GitHub "owner/name"; drives the star badge
  docs?: string               // documentation site, if the project has one
  blurb: string               // 1–2 sentences, plain text (no markdown)
  kind: 'specification' | 'implementation' | 'tool' | 'conventions'
  affiliated: string          // ISO date of the ZSC affiliation decision
  /**
   * 'approved' once the project meets every affiliation criterion;
   * 'pending' while it is still publishing its governance document.
   */
  status: 'approved' | 'pending'
}

export interface BackingEntry {
  name: string
  logo: string                // absolute path under /backing/logos/...
  href: string
  kind: 'fiscal-host' | 'standards-body' | 'sponsor'
}
