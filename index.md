---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: single
author_profile: false
sidebar:
  title: "Content"
  nav: sidebar
excerpt: "Have beautiful data in Zarr? Show us on Bluesky!"
header:
  overlay_image: /images/llc4320_sst.png
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
  caption: "Credit: Ryan Abernathey"
  actions:
    - label: "Share here!"
      url: "https://bsky.app/intent/compose?text=@zarr.dev%20%23beautifuldata"
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

For more details read about the various [components of Zarr](https://zarr.dev/components/), 
see the canonical [Zarr-Python](https://github.com/zarr-developers/zarr-python) implementation, 
or look through [other Zarr implementations](https://zarr.dev/implementations/) for one in your preferred language.

## Applications

* Multi-scale n-dimensional image storage, e.g. in light and electron microscopy.
* Genomics data, e.g. for quantitative and population genetics.
* Gridded scientific data in various domains, such as CFD or Plasma Physics.
* Geospatial rasters, e.g. following the NetCDF data model.
* Checkpointing ML model weights.

## Features

* Serialize NumPy-like arrays in a simple and fast way.
* Access from languages including Python, C, C++, Rust, Javascript and Java.
* Chunk multi-dimensional arrays along any dimension.
* Compress array chunks via an extensible system of compressors.
* Store arrays in memory, on disk, inside a Zip file, on S3, etc.
* Read and write arrays concurrently from multiple threads or processes.
* Organize arrays into hierarchies via annotatable groups.
* Extend easily thanks to the [flexible design](https://zarr.dev/flexibility/).

## Sponsorship

Zarr is a Sponsored Project of NumFOCUS, a US 501(c)(3) public charity.

NumFOCUS Sponsored Projects rely on the generous support of corporate sponsors, institutional partners, and individual donors.

## Videos

[Videos](https://www.youtube.com/playlist?list=PLvkeNUPrCU04Xvcph4ErxsRkZq28Oucr7)
of community members talking about Zarr. If you have a video you'd like us to share, let us know!

<div class="video">
    <figure>
        <iframe width="640" height="480"
            src="https://www.youtube.com/embed/videoseries?list=PLvkeNUPrCU04Xvcph4ErxsRkZq28Oucr7"
            frameborder="0" allowfullscreen></iframe>
    </figure>
</div>
