---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: single
author_profile: false
sidebar:
  title: "Content"
  nav: sidebar
excerpt: "Have beautiful data in Zarr? Show us on Twitter!"
header:
  overlay_image: /images/llc4320_sst.png
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
  caption: "Credit: Ryan Abernathey"
  actions:
    - label: "Tweet here!"
      url: "https://twitter.com/intent/tweet?via=zarr_dev&hashtags=beautifuldata"
---

Zarr is a community project to develop specifications and software for
storage of large N-dimensional typed arrays, also commonly known as
tensors. A particular focus of Zarr is to provide support for storage
using distributed systems like cloud object stores, and to enable
efficient I/O for parallel computing applications.

## Description

Zarr is motivated by the need for a simple, transparent, open, and
community-driven format that supports high-throughput distributed I/O on
different storage systems. Zarr data can be stored in any storage system that
can be represented as a key-value store, including most commonly POSIX file
systems and cloud object storage but also zip files as well as relational and
document databases.

See the following GitHub repositories for more information:

* [Zarr Python](https://github.com/zarr-developers/zarr)
* [Zarr Specs](https://github.com/zarr-developers/zarr-specs)
* [Numcodecs](https://github.com/zarr-developers/numcodecs)
* [Z5](https://github.com/constantinpape/z5)
* [N5](https://github.com/saalfeldlab/n5)
* [Zarr.jl](https://github.com/meggart/Zarr.jl)
* [ndarray.scala](https://github.com/lasersonlab/ndarray.scala)

## Applications

* Simple and fast serialization of NumPy-like arrays, accessible from languages including Python, C, C++, Rust, Javascript and Java
* Multi-scale n-dimensional image storage, e.g. in light and electron microscopy
* Geospatial rasters, e.g. following the NetCDF / CF metadata conventions

## Features

* Chunk multi-dimensional arrays along any dimension.
* Store arrays in memory, on disk, inside a Zip file, on S3, etc.
* Read and write arrays concurrently from multiple threads or processes.
* Organize arrays into hierarchies via annotatable groups.

## Sponsorship

Zarr is a Sponsored Project of NumFOCUS, a US 501(c)(3) public charity.

NumFOCUS Sponsored Projects rely on the generous support of corporate sponsors, institutional partners, and individual donors.

## Videos

[Videos](https://www.youtube.com/playlist?list=PLvkeNUPrCU04Xvcph4ErxsRkZq28Oucr7)
of community members talking about Zarr. If you have a video you'd like us to share, let us know!

<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="Take a look at my video about Zarr! " data-hashtags="beautifuldata" data-related="zarr_dev" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<div class="video">
    <figure>
        <iframe width="640" height="480"
            src="https://www.youtube.com/embed/videoseries?list=PLvkeNUPrCU04Xvcph4ErxsRkZq28Oucr7"
            frameborder="0" allowfullscreen></iframe>
    </figure>
</div>
