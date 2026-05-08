// .vitepress/data/datasets.ts
//
// Cross-domain balance required. Current per-domain counts:
//   bio       : 1 (IDR)
//   geo       : 5 (CMIP6, MUR SST, NASA POWER, NWM, Planetary Computer)
//   ml-hpc    : 0
//   genomics  : 0
//   other     : 1 (webKnossos)
// Adding bio / genomics datasets is a priority for the next content PR.

import type { Dataset } from './types'

export const datasets: Dataset[] = [
  {
    name: 'CMIP6',
    href: 'https://console.cloud.google.com/marketplace/details/noaa-public/cmip6',
    blurb: 'Coupled Model Intercomparison Project Phase 6 climate model output.',
    hosting: 'Google Cloud',
    size: '1 PB',
    domain: 'geo',
  },
  {
    name: 'Image Data Resource (IDR)',
    href: 'https://idr.github.io/ome-ngff-samples/',
    blurb: 'Bio-image samples in OME-Zarr from EBI/IDR.',
    hosting: 'EBI',
    size: '3 TB',
    domain: 'bio',
  },
  {
    name: 'Microsoft Planetary Computer',
    href: 'https://planetarycomputer.microsoft.com/catalog?filter=zarr',
    blurb: 'Cloud-native catalog of geospatial Zarr datasets.',
    hosting: 'Microsoft Azure',
    domain: 'geo',
  },
  {
    name: 'MUR Sea Surface Temperature',
    href: 'https://registry.opendata.aws/mur',
    blurb: 'Multi-scale Ultra-high Resolution sea-surface temperature.',
    hosting: 'AWS Open Data',
    size: '54 TB',
    domain: 'geo',
  },
  {
    name: 'NASA POWER',
    href: 'https://registry.opendata.aws/nasa-power/',
    blurb: 'Solar and meteorological data for renewable-energy and agricultural applications.',
    hosting: 'AWS Open Data',
    domain: 'geo',
  },
  {
    name: 'National Water Model',
    href: 'https://discourse.pangeo.io/t/the-national-water-model-reanalysis-zarr-dataset-on-aws/1449',
    blurb: 'NOAA National Water Model reanalysis.',
    hosting: 'AWS',
    size: '5 TB',
    domain: 'geo',
  },
  {
    name: 'webKnossos',
    href: 'https://zarr.webknossos.org/',
    blurb: 'Connectomics datasets exposed as Zarr.',
    hosting: 'scalableminds GmbH',
    size: '70 TB',
    domain: 'other',
  },
]
