// .vitepress/data/implementations.ts
//
// Each entry includes a shields.io URL (`activity`) so the grid card
// can show the latest release date / last commit inline. Pick whichever
// of `release-date`, `release-date-pre`, or `last-commit` best reflects
// the project's actual release cadence.

import type { Implementation } from './types'

export const implementations: Implementation[] = [
  // Python
  { language: 'Python',  name: 'Zarr-Python',  href: 'https://github.com/zarr-developers/zarr-python', v2: true,  v3: true,
    activity: 'https://img.shields.io/github/release-date-pre/zarr-developers/zarr-python' },
  { language: 'Python',  name: 'Zarrita',      href: 'https://github.com/scalableminds/zarrita',         v2: true,  v3: true,
    activity: 'https://img.shields.io/github/last-commit/scalableminds/zarrita' },
  // Rust / Rust+Python+C
  { language: 'Rust',    name: 'zarrs',        href: 'https://github.com/LDeakin/zarrs',                 v2: true,  v3: true,
    activity: 'https://img.shields.io/github/release-date-pre/LDeakin/zarrs' },
  // C / C++
  { language: 'C',       name: 'NetCDF-C',     href: 'https://github.com/Unidata/netcdf-c',              v2: true,  v3: false,
    activity: 'https://img.shields.io/github/release-date-pre/Unidata/netcdf-c' },
  { language: 'C++',     name: 'TensorStore',  href: 'https://github.com/google/tensorstore',            v2: true,  v3: true,
    activity: 'https://img.shields.io/github/last-commit/google/tensorstore' },
  { language: 'C++',     name: 'GDAL',         href: 'https://gdal.org/drivers/raster/zarr.html',        v2: true,  v3: false,
    activity: 'https://img.shields.io/github/release-date-pre/OSGeo/gdal' },
  { language: 'C++',     name: 'cpp-zarr',     href: 'https://github.com/abcucberkeley/cpp-zarr',        v2: true,  v3: false,
    activity: 'https://img.shields.io/github/release-date/abcucberkeley/cpp-zarr' },
  { language: 'C++',     name: 'z5',           href: 'https://github.com/constantinpape/z5',             v2: true,  v3: false,
    activity: 'https://img.shields.io/github/release-date/constantinpape/z5' },
  { language: 'C++',     name: 'xtensor-zarr', href: 'https://github.com/xtensor-stack/xtensor-zarr',    v2: true,  v3: false,
    activity: 'https://img.shields.io/github/last-commit/xtensor-stack/xtensor-zarr' },
  // Java
  { language: 'Java',    name: 'JZarr',        href: 'https://github.com/bcdev/jzarr',                   v2: true,  v3: true,
    activity: 'https://img.shields.io/github/last-commit/bcdev/jzarr' },
  { language: 'Java',    name: 'zarr-java',    href: 'https://github.com/zarr-developers/zarr-java',     v2: true,  v3: true,
    activity: 'https://img.shields.io/github/release-date-pre/zarr-developers/zarr-java' },
  { language: 'Java',    name: 'n5-zarr',      href: 'https://github.com/saalfeldlab/n5-zarr',           v2: true,  v3: false,
    activity: 'https://img.shields.io/github/last-commit/saalfeldlab/n5-zarr' },
  { language: 'Java',    name: 'netCDF-Java',  href: 'https://github.com/Unidata/netcdf-java',           v2: true,  v3: false,
    activity: 'https://img.shields.io/github/release-date-pre/Unidata/netcdf-java' },
  // JavaScript
  { language: 'JavaScript', name: 'zarrita.js', href: 'https://github.com/manzt/zarrita.js',             v2: true,  v3: true,
    activity: 'https://img.shields.io/github/release-date-pre/manzt/zarrita.js' },
  { language: 'JavaScript', name: 'Zarr.js',    href: 'https://github.com/gzuidhof/zarr.js',             v2: true,  v3: false,
    activity: 'https://img.shields.io/github/release-date-pre/gzuidhof/zarr.js' },
  // Julia / R / OCaml / Elixir
  { language: 'Julia',   name: 'Zarr.jl',      href: 'https://github.com/JuliaIO/Zarr.jl',               v2: true,  v3: false,
    activity: 'https://img.shields.io/github/release-date-pre/JuliaIO/Zarr.jl' },
  { language: 'R',       name: 'pizzarr',      href: 'https://github.com/keller-mark/pizzarr',           v2: true,  v3: false,
    activity: 'https://img.shields.io/github/last-commit/keller-mark/pizzarr' },
  { language: 'R',       name: 'Rarr',         href: 'https://github.com/grimbough/Rarr',                v2: true,  v3: false,
    activity: 'https://img.shields.io/github/last-commit/grimbough/Rarr' },
  { language: 'OCaml',   name: 'zarr-ml',      href: 'https://github.com/zoj613/zarr-ml',                v2: false, v3: true,
    activity: 'https://img.shields.io/github/release-date-pre/zoj613/zarr-ml' },
  { language: 'Elixir',  name: 'ExZarr',       href: 'https://github.com/thanos/ExZarr',                 v2: true,  v3: true,
    activity: 'https://img.shields.io/github/last-commit/thanos/ExZarr' },
]
