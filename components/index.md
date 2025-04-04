---
layout: single
author_profile: false
title: Zarr Components
sidebar:
  title: "Content"
  nav: sidebar
---

Zarr consists of several components, both abstract and concrete. These span both the physical storage layer and the conceptual structural layer. Zarr-related projects all follow the Zarr specification (and hence data model), but otherwise may choose to implement other layers however they wish.

## Abstract components

**Specification**: All zarr-related projects obey the [Zarr Specification](https://zarr-specs.readthedocs.io/), which formally describes how to serialize and de-serialize array data and metadata as byte streams via an [Abstract Key-Value Store Interface](https://zarr-specs.readthedocs.io/en/latest/v3/core/v3.0.html#abstract-store-interface), using a system of [Codecs](https://zarr-specs.readthedocs.io/en/latest/v3/core/v3.0.html#chunk-encoding) to describe the encoding and serialization steps.

**Data Model**: The specification's description of the [Stored Representation](https://zarr-specs.readthedocs.io/en/latest/v3/core/v3.0.html#stored-representation) implies a particular data model, based on the [HDF Abstract Data Model](https://support.hdfgroup.org/documentation/hdf5/latest/_h5_d_m__u_g.html). It consists of a heirarchical tree of groups and arrays, with optional arbitrary metadata at every node. This model is completely domain-agnostic.

**Format**: If the keys in the abstract key-value store interface are mapped unaltered to paths in a POSIX filesystem or prefixes in object storage, the data written to disk will follow the "Native Zarr Format". Most, but not all, zarr implementations will serialize to this format.

## Concrete components

