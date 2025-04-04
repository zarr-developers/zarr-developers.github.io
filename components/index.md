---
layout: single
author_profile: false
title: Zarr Components
sidebar:
  title: "Content"
  nav: sidebar
---

Zarr consists of several components, both abstract and concrete. 
These span both the physical storage layer and the conceptual structural layer. 
Zarr-related projects all follow the Zarr specification (and hence data model), but otherwise may choose to implement other layers however they wish.

## Abstract components

These abstract components together describe what type of data can be stored in zarr, and how to store it, without assuming you are working in a particular programming language, or with a particular storage system.

**Specification**: All zarr-related projects obey the [Zarr Specification](https://zarr-specs.readthedocs.io/), which formally describes how to serialize and de-serialize array data and metadata as byte streams via an [Abstract Key-Value Store Interface](https://zarr-specs.readthedocs.io/en/latest/v3/core/v3.0.html#abstract-store-interface). 
A system of [Codecs](https://zarr-specs.readthedocs.io/en/latest/v3/core/v3.0.html#chunk-encoding) is used to describe the encoding and serialization steps.

**Data Model**: The specification's description of the [Stored Representation](https://zarr-specs.readthedocs.io/en/latest/v3/core/v3.0.html#stored-representation) implies a particular data model, based on the [HDF Abstract Data Model](https://support.hdfgroup.org/documentation/hdf5/latest/_h5_d_m__u_g.html). 
It consists of a heirarchical tree of groups and arrays, with optional arbitrary metadata at every node. This model is completely domain-agnostic.

**Format**: If the keys in the abstract key-value store interface are mapped unaltered to paths in a POSIX filesystem or prefixes in object storage, the data written to disk will follow the "Native Zarr Format". 
Most, but not all, zarr implementations will serialize to this format.

**Extensions**: 

## Concrete components

Concrete implementations of the abstract components can be implemented in any language. 
The canonical reference implementation is [Zarr-Python](https://github.com/zarr-developers/zarr-python), but there are many [other implementations](https://zarr.dev/implementations/). 
Zarr-Python contains reference examples of useful constructs that can be re-implemented in other languages.

**Zarr-Python Abstract Base Classes**: Zarr-python's [`zarr.abc`](https://zarr.readthedocs.io/en/stable/api/zarr/abc/index.html) module contains abstract base classes enforcing a particular python realization of the specification's Key-Value Store interface, based on a `MutableMapping`-like API. 
This component is concrete in the sense that it is implemented in a specific programming language, and enforces particular syntax for getting and setting values in a key-value store.

**Zarr-Python Store Implementations**: Zarr-python's [`zarr.storage`](https://zarr.readthedocs.io/en/stable/api/zarr/abc/index.html) module contains concrete implementations of the `Store` ABC for interacting with particular storage systems, such as a local filesystem or object storage. These write data in the Native Zarr Format. 
It's expected that most users of zarr will just use one of these implementations.

**Zarr-Python User API**: Zarr-python's [`zarr.api`](https://zarr.readthedocs.io/en/stable/api/zarr/abc/index.html) module contains functions and classes for interacting with any concrete implementation of the `zarr.abc.Store` interface. 
This allows user applications to use a standard zarr API to read and write from a variety of common storage systems.

## Component Flexibility

One of Zarr's greatest strengths is its flexibility.
Here are a few interesting zarr-related projects, with descriptions of how they do or don't make use of different zarr components.

TODO