---
layout: single
author_profile: false
title: Implementaciones Zarr
sidebar:
  title: Contenido
  nav: sidebar
---

<0>
Zarr es un formato de almacenamiento de datos basado en una <1>especificación</1> de código abierto, lo que hace posibles implementaciones en varios lenguajes. Se utiliza en varios
dominios, incluidos geoespacial, bioimágenes, genómica, ciencia de datos y computación de alto desempeño (HPC). 🌏🔬🧬<br><br>

Las implementaciones de las versiones 2 y 3 de Zarr se enumeran (en orden alfabético por idioma) de la siguiente manera:<br><br> </font>

| Lenguaje      | Implementación | V2 | V3 | Última publicación/confirmación |
| ------------- | -------------- | -- | -- | ------------------------------- |
| C             | [NetCDF-C]     | ✓  |    | ![][NetCDF-C-re]                |
| C++           | [cpp-zarr]     | ✓  |    | ![][cpp-zarr-re]                |
| C++           | [GDAL]         | ✓  |    | ![][GDAL-re]                    |
| C++/Python    | [TensorStore]  | ✓  | ✓  | ![][tensorstore-lu]             |
| C++           | [xtensor-zarr] | ✓  | ✗  | ![][xtensor-zarr-lu]            |
| C++           | [z5]           | ✓  |    | ![][z5-re]                      |
| Java          | [JZarr]        | ✓  |    | ![][JZarr-lu]                   |
| Java          | [n5-zarr]      | ✓  |    | ![][n5-zarr-lu]                 |
| Java          | [netCDF-Java]  | ✓  |    | ![][netCDF-Java-re]             |
| Java          | [zarr-java]    | ?  | ?  | ![][zarr-java-re]               |
| Javascript    | [Zarr.js]      | ✓  |    | ![][Zarr.js-re]                 |
| Javascript    | [zarr-js]      | ✓  |    | ![][zarr-js-lu]                 |
| Javascript    | [zarrita.js]   | ✓  | ✓  | ![][zarrita.js-re]              |
| Julia         | [Zarr.jl]      | ✓  |    | ![][Zarr.jl-re]                 |
| OCaml         | [zarr-ml]      |    | ✓  | ![][zarr-ml-re]                 |
| Python        | [Zarr-Python]  | ✓  | ✓  | ![][Zarr-Python-re]             |
| Python        | [Zarrita]      | ✓  | ✓  | ![][Zarrita-lu]                 |
| R             | [pizzarr]      | ✓  |    | ![][pizzarr-lu]                 |
| R             | [Rarr]         | ✓  |    | ![][Rarr-lu]                    |
| Rust          | [charizarr]    |    | ?  | ![][charizarr-lu]               |
| Rust          | [rust-N5]      |    |    | ![][rust-N5-lu]                 |
| Rust          | [zarr]         |    | ?  | ![][zarr-lu]                    |
| Rust          | [zarr3-rs]     |    | ?  | ![][zarr3-rs-lu]                |
| Rust/Python/C | [zarrs]        | ✓  | ✓  | ![][zarrs-re]                   |

<0> ✓ Probablemente conforme</sup>
<0>? Conformidad desconocida</0>
<1>✗ No conforme</1>

[NetCDF-C]: https://github.com/Unidata/netcdf-c
[NetCDF-C-re]: https://img.shields.io/github/release-date-pre/Unidata/netcdf-c
[cpp-zarr]: https://github.com/abcucberkeley/cpp-zarr
[cpp-zarr-re]: https://img.shields.io/github/release-date/abcucberkeley/cpp-zarr
[GDAL]: https://gdal.org/drivers/raster/zarr.html
[GDAL-re]: https://img.shields.io/github/release-date-pre/OSGeo/gdal
[JZarr]: https://github.com/bcdev/jzarr
[JZarr-lu]: https://img.shields.io/github/last-commit/bcdev/jzarr
[Zarr.js]: https://github.com/gzuidhof/zarr.js
[Zarr.js-re]: https://img.shields.io/github/release-date-pre/gzuidhof/zarr.js
[Zarr.jl]: https://github.com/JuliaIO/Zarr.jl
[Zarr.jl-re]: https://img.shields.io/github/release-date-pre/JuliaIO/Zarr.jl
[Zarr-Python]: https://github.com/zarr-developers/zarr-python
[Zarr-Python-re]: https://img.shields.io/github/release-date-pre/zarr-developers/zarr-python
[Zarrita]: https://github.com/scalableminds/zarrita
[Zarrita-lu]: https://img.shields.io/github/last-commit/scalableminds/zarrita
[Rarr]: https://github.com/grimbough/Rarr
[Rarr-lu]: https://img.shields.io/github/last-commit/grimbough/Rarr
[rust-N5]: https://github.com/aschampion/rust-n5
[rust-N5-lu]: https://img.shields.io/github/last-commit/aschampion/rust-n5
[TensorStore]: https://github.com/google/tensorstore/
[TensorStore-lu]: https://img.shields.io/github/last-commit/google/tensorstore
[n5-zarr]: https://github.com/saalfeldlab/n5-zarr
[n5-zarr-lu]: https://img.shields.io/github/last-commit/saalfeldlab/n5-zarr
[zarr-js]: https://github.com/freeman-lab/zarr-js
[zarr-js-lu]: https://img.shields.io/github/last-commit/freeman-lab/zarr-js
[zarr]: https://github.com/sci-rs/zarr
[zarr-lu]: https://img.shields.io/github/last-commit/sci-rs/zarr
[xtensor-zarr]: https://github.com/xtensor-stack/xtensor-zarr
[xtensor-zarr-lu]: https://img.shields.io/github/last-commit/xtensor-stack/xtensor-zarr
[netCDF-Java]: https://github.com/Unidata/netcdf-java
[netCDF-Java-re]: https://img.shields.io/github/release-date-pre/Unidata/netcdf-java
[z5]: https://github.com/constantinpape/z5
[z5-re]: https://img.shields.io/github/release-date-pre/constantinpape/z5
[pizzarr]: https://keller-mark.github.io/pizzarr/
[pizzarr-lu]: https://img.shields.io/github/last-commit/keller-mark/pizzarr
[zarrs]: https://github.com/LDeakin/zarrs
[zarrs-re]: https://img.shields.io/github/release-date-pre/LDeakin/zarrs
[zarrita.js]: https://github.com/manzt/zarrita.js
[zarrita.js-re]: https://img.shields.io/github/release-date-pre/manzt/zarrita.js
[zarr-ml]: https://github.com/zoj613/zarr-ml
[zarr-ml-re]: https://img.shields.io/github/release-date-pre/zoj613/zarr-ml
[zarr3-rs]: https://github.com/clbarnes/zarr3-rs
[zarr3-rs-lu]: https://img.shields.io/github/last-commit/clbarnes/zarr3-rs
[charizarr]: https://github.com/mpiannucci/charizarr
[charizarr-lu]: https://img.shields.io/github/last-commit/mpiannucci/charizarr
[zarr-java]: https://github.com/zarr-developers/zarr-java
[zarr-java-re]: https://img.shields.io/github/release-date-pre/zarr-developers/zarr-java

<br>
→ No dude en agregar cualquier implementación que falte enviando una solicitud de cambio (PR) al <1>repositorio</1> del sitio web. 🤝🏻<0><0>

→ Participe en varias implementaciones de Zarr corrigiendo errores, resolviendo problemas, mejorando la documentación o contribuyendo al código base.
Si ha estado realizando alguna de estas actividades recientemente, lo invitamos a unirse a nuestras <a href="https://zarr.dev/community-calls/">reuniones comunitarias</a> y compartir su trabajo con nosotros. Estaremos encantados de mostrar sus esfuerzos. 💪🏻
</0>
