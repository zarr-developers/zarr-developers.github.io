---
layout: single
author_profile: false
sidebar:
  title: Contenido
  nav: sidebar
excerpt: ¿Tienes datos hermosos en Zarr? ¡Muéstranos en Bluesky!
header:
  overlay_image: /assets/img/llc4320_sst.png
  overlay_filter: 0.5
  caption: "Créditos: Ryan Abernathey"
  actions:
    - label: Comparte aquí!
      url: https://bsky.app/intent/compose?text=@zarr.dev%20%23beautifuldata
---

Zarr es un proyecto comunitario para desarrollar especificaciones y software para
almacenamiento de grandes matrices tipadas N- dimensionales, también conocidas comúnmente como tensores. Un enfoque particular de Zarr es brindar soporte para el almacenamiento utilizando sistemas distribuidos como almacenes de objetos en la nube y permitir Entrada/Salida eficientes para aplicaciones informáticas paralelas.

## Descripción

Zarr está motivado por la necesidad de un formato simple, transparente, abierto e impulsado por la comunidad que admita Entrada/Salida distribuidas de alto rendimiento en diferentes sistemas de almacenamiento. Los datos de Zarr se pueden almacenar en cualquier sistema de almacenamiento que pueda representarse como un almacén de llave-valor, incluidos los sistemas de archivos más comúnmente POSIX y el almacenamiento de objetos en la nube, pero también archivos zip, así como bases de datos relacionales y de documentos.

Consulte los siguientes repositorios de GitHub para obtener más información:

- [Zarr Python](https://github.com/zarr-developers/zarr)
- [Especificaciones de Zarr](https://github.com/zarr-developers/zarr-specs)
- [Numcodecs](https://github.com/zarr-developers/numcodecs)
- [Z5](https://github.com/constantinpape/z5)
- [N5](https://github.com/saalfeldlab/n5)
- [Zarr.jl](https://github.com/meggart/Zarr.jl)
- [ndarray.scala](https://github.com/lasersonlab/ndarray.scala)

## Aplicaciones

- Serialización simple y rápida de matrices tipo NumPy, accesibles desde lenguajes como Python, C, C++, Rust, Javascript y Java.
- Almacenamiento de imágenes N-dimensionales a múltiples escalas, por ejemplo en microscopía óptica y electrónica
- Rásteres geoespaciales, por ejemplo siguiendo las convenciones de metadatos de NetCDF/CF

## Características

- Fraccione matrices multidimensionales a lo largo de cualquier dimensión.
- Almacene matrices en la memoria, en el disco, dentro de un archivo Zip, en S3, etc.
- Lea y escriba matrices simultáneamente desde múltiples subprocesos o procesos.
- Organice matrices en jerarquías mediante grupos anotables.

## Patrocinio

Zarr es un proyecto patrocinado por NumFOCUS, una organización 501(c)(3) benéfica pública estadounidense .

Los proyectos patrocinados por NumFOCUS dependen del generoso apoyo de patrocinadores corporativos, socios institucionales y donantes individuales.

## Videos

[Videos](https://www.youtube.com/playlist?list=PLvkeNUPrCU04Xvcph4ErxsRkZq28Oucr7)
de miembros de la comunidad hablando de Zarr. Si tiene un vídeo que le gustaría que compartiéramos, ¡háganoslo saber!

<div class="video">
    <figure>
        <iframe width="640" height="480"
            src="https://www.youtube.com/embed/videoseries?list=PLvkeNUPrCU04Xvcph4ErxsRkZq28Oucr7"
            frameborder="0" allowfullscreen></iframe>
    </figure>
</div>
