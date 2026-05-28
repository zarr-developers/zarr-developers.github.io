// .vitepress/data/leaderboard.ts
//
// Community-submitted Zarr stores, sorted by size.
// To add an entry, append to the array below and open a PR.
// The store must be publicly readable (anonymous S3/GCS/HTTPS access).

import type { LeaderboardEntry } from './types'

export const leaderboard: LeaderboardEntry[] = [
  {
    nickname: 'ERA5 Reanalysis',
    store_link: 's3://example-bucket/era5-reanalysis.zarr',
    size_bytes: 2_400_000_000_000_000,
    total_chunks: 1_200_000_000,
    tech: 'native-zarr-v3',
    submitted_by: 'alice',
    last_verified: '2026-05-01',
    docs_url: 'https://example.com/era5-blog',
  },
  {
    nickname: 'CMIP6 Mirror',
    store_link: 'gs://example/cmip6-mirror.zarr',
    size_bytes: 850_000_000_000_000,
    total_chunks: 410_000_000,
    tech: 'icechunk',
    submitted_by: 'bob',
    last_verified: '2026-04-22',
  },
  {
    nickname: 'Sentinel-2 Mosaic',
    store_link: 's3://example/sentinel2-mosaic',
    size_bytes: 312_000_000_000_000,
    total_chunks: 88_000_000,
    tech: 'virtual-icechunk',
    submitted_by: 'carol',
    last_verified: '2026-05-10',
  },
  {
    nickname: 'GOES-16',
    store_link: 'https://example.org/goes16.zarr',
    size_bytes: 95_000_000_000_000,
    total_chunks: 22_000_000,
    tech: 'native-zarr-v3',
    submitted_by: 'dave',
    last_verified: '2026-03-15',
  },
  {
    nickname: 'NOAA HRRR',
    store_link: 's3://example/noaa-hrrr.zarr',
    size_bytes: 41_000_000_000_000,
    total_chunks: 9_500_000,
    tech: 'native-zarr-v2',
    submitted_by: 'erin',
    last_verified: '2026-05-20',
    docs_url: 'https://example.com/hrrr-notebook',
  },
  {
    nickname: 'GEFS Reforecast',
    store_link: 's3://example/gefs-reforecast.zarr',
    size_bytes: 28_000_000_000_000,
    total_chunks: 7_200_000,
    tech: 'native-zarr-v3',
    submitted_by: 'frank',
    last_verified: '2026-04-10',
  },
  {
    nickname: 'OpenNeuro Brain Imaging',
    store_link: 's3://example/openneuro-brain.zarr',
    size_bytes: 15_000_000_000_000,
    total_chunks: 3_100_000,
    tech: 'native-zarr-v2',
    submitted_by: 'grace',
    last_verified: '2026-05-05',
    docs_url: 'https://example.com/openneuro-docs',
  },
  {
    nickname: 'Copernicus DEM Global',
    store_link: 'gs://example/copernicus-dem-global.zarr',
    size_bytes: 8_500_000_000_000,
    total_chunks: 1_800_000,
    tech: 'virtualizarr',
    submitted_by: 'hana',
    last_verified: '2026-03-28',
  },
]
