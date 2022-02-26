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
  overlay_image: /images/arabidopsis.png
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
  caption: "Credit: Image courtesy of [OME](https://www.openmicroscopy.org/2020/11/04/zarr-data.html) by Valuchova et al. CC-BY 4.0, [eLife 2020](https://doi.org/10.7554/eLife.52546) [(idr0077)](https://doi.org/10.17867/10000144)"
  actions:
    - label: "Tweet here!"
      url: "https://twitter.com/intent/tweet?via=zarr_dev&hashtags=beautifuldata"
---

Zarr is a community project to develop specifications and software for
storage of large N-dimensional typed arrays, also commonly known as
tensors. A particular focus of Zarr is to provide support for storage
using distributed systems like cloud object stores, and to enable
efficient I/O for parallel computing applications.

>Recent Updates

- [Zarr 2.11](https://zarr.readthedocs.io/en/stable/release.html#release-2-11-0) is released! Check out the [blog](https://zarr.dev/blog/release-2-11). 🥂
- [Sanket Verma](https://twitter.com/msankeys963/) has officially joined Zarr as the new Community Manager! 🎉 Read the blog post [here](https://zarr.dev/blog/welcoming-community-manager/).


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
* [N5](https://github.com/zarr-developers/numcodecs)
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

{% include video id="qyJXBlrdzBs" provider="youtube" %}

## Community meetings

A [Google calendar](https://calendar.google.com/calendar/embed?src=c_ba2k79i3u0lkf49vo0jre27j14%40group.calendar.google.com&ctz=Europe%2FBerlin) ([ics](https://calendar.google.com/calendar/ical/c_ba2k79i3u0lkf49vo0jre27j14%40group.calendar.google.com/public/basic.ics)) lists the [regular community meetings](https://github.com/zarr-developers/community/issues/1).

<iframe id="calendariframe"
  src="https://calendar.google.com/calendar/embed?ctz=local&amp;src=c_ba2k79i3u0lkf49vo0jre27j14%40group.calendar.google.com&ctz=Europe%2FBerlin" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

<script>document.getElementById("calendariframe").src = document.getElementById("calendariframe").src.replace("ctz=local", "ctz=" + Intl.DateTimeFormat().resolvedOptions().timeZone)</script>

## Blog

Check out the newly launched Zarr blog [here](https://zarr.dev/blog).
