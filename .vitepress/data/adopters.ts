// .vitepress/data/adopters.ts
//
// Cross-domain balance is required. Current per-domain counts:
//   bio       : 5 (DANDI, HHMI Janelia, OME, scalableminds, WEBKNOSSOS)
//   geo       : 8 (CarbonPlan, ESA, NASA, Pangeo, Unidata, LEAP, LDEO, NCAR)
//   ml-hpc    : 0
//   genomics  : 0
//   other     : 3 (Google Research, Microsoft, Columbia)
// When adding entries, prefer domains under-represented above. An NGFF /
// bio-imaging community member must review before merge.

import type { Adopter } from './types'

export const adopters: Adopter[] = [
  {
    name: 'CarbonPlan',
    logo: '/adopters/logos/carbonplan.svg',
    href: 'https://carbonplan.org/',
    blurb: 'Storage format for analysis and visualization of climate data.',
    domain: 'geo',
  },
  {
    name: 'DANDI',
    logo: '/adopters/logos/dandi.svg',
    href: 'https://dandiarchive.org/',
    blurb: 'Lightsheet microscopy and ex-vivo MRI datasets; backend candidate for Neurodata Without Borders.',
    domain: 'bio',
  },
  {
    name: 'ESA',
    logo: '/adopters/logos/esa.png',
    href: 'https://esa.int/',
    blurb: 'Copernicus Sentinel data and future Expansion missions via the EOPF (Earth observation processing Framework).',
    domain: 'geo',
  },
  {
    name: 'Google Research',
    logo: '/adopters/logos/google_research.png',
    href: 'https://research.google/',
    blurb: 'Open-source projects (Neuroglancer, TensorStore, Xarray-Beam, Xarray-TensorStore) and large-scale weather datasets such as ARCO-ERA5.',
    domain: 'other',
  },
  {
    name: 'HHMI Janelia',
    logo: '/adopters/logos/hhmi.png',
    href: 'https://www.janelia.org/',
    blurb: 'Storing and accessing large imaging datasets across the Janelia Research Campus.',
    domain: 'bio',
  },
  {
    name: 'LEAP',
    logo: '/adopters/logos/leap.webp',
    href: 'https://leap.columbia.edu/',
    blurb: 'Data format for the LEAP-Pangeo data library used in climate-modeling analytics and machine learning.',
    domain: 'geo',
  },
  {
    name: 'Microsoft Planetary Computer',
    logo: '/adopters/logos/microsoft.png',
    href: 'https://planetarycomputer.microsoft.com/catalog?filter=zarr',
    blurb: 'Cloud-native storage format for chunked, N-dimensional arrays of geospatial data.',
    domain: 'other',
  },
  {
    name: 'NASA',
    logo: '/adopters/logos/nasa.webp',
    href: 'https://www.nasa.gov/',
    blurb: 'Analysis-ready data store for chunked, N-dimensional arrays of geospatial data.',
    domain: 'geo',
  },
  {
    name: 'OME',
    logo: '/adopters/logos/ome_logo.svg',
    href: 'https://www.openmicroscopy.org/',
    blurb: 'OME-Zarr stores large, n-dimensional biological images as part of the Next-generation file format (NGFF) effort.',
    domain: 'bio',
  },
  {
    name: 'Pangeo',
    logo: '/adopters/logos/pangeo.png',
    href: 'https://pangeo.io/',
    blurb: 'Cloud-native storage format for ocean, weather, climate, and geospatial data.',
    domain: 'geo',
  },
  {
    name: 'scalable minds',
    logo: '/adopters/logos/scalableminds.svg',
    href: 'https://scalableminds.com/',
    blurb: 'Storing and processing peta-scale 3D images of brain tissue for connectomics analyses.',
    domain: 'bio',
  },
  {
    name: 'Unidata',
    logo: '/adopters/logos/unidata.png',
    href: 'https://www.unidata.ucar.edu/',
    blurb: 'Developing the netCDF libraries to support Zarr datasets across atmospheric and geoscientific communities.',
    domain: 'geo',
  },
  {
    name: 'WEBKNOSSOS',
    logo: '/adopters/logos/webknossos.svg',
    href: 'https://webknossos.org/',
    blurb: 'Web-based platform for visualizing and collaboratively annotating large 3D images.',
    domain: 'bio',
  },
  {
    name: 'Columbia University',
    logo: '/adopters/logos/columbia.png',
    href: 'https://www.columbia.edu/',
    blurb: 'Research use across geosciences and computational climate.',
    domain: 'other',
  },
  {
    name: 'LDEO',
    logo: '/adopters/logos/ldeo.png',
    href: 'https://lamont.columbia.edu/',
    blurb: 'Lamont-Doherty Earth Observatory at Columbia.',
    domain: 'geo',
  },
  {
    name: 'NCAR',
    logo: '/adopters/logos/ncar.svg',
    href: 'https://ncar.ucar.edu/',
    blurb: 'National Center for Atmospheric Research.',
    domain: 'geo',
  },
]
