Zarr - scalable storage of tensor data for parallel and distributed computing
-----------------------------------------------------------------------------

<p class="stretch"><img src="../images/logo2.png"></p>

Alistair Miles ([@alimanfoo](https://github.com/alimanfoo)) - SciPy 2019

====

@@TODO mosquito image

====

## Motivation: Why Zarr?

===

@@TODO image of tensor -> compute -> tensor

5 key features...

===

### (1) Larger than memory

Input and/or output tensors are too big to fit comfortably in main
memory.

@@TODO image of larger than memory

===

### (2) Computation can be parallelised

Some part of the computation can be parallelised by processing data in
chunks.

@@TODO image of tensor -> parallel compute -> compute -> parallel compute -> tensor

===

### E.g., embarassingly parallel

@@TODO image of tensor -> parallel compute -> tensor

===

### (3) I/O is the bottleneck

Computational complexity is moderate &rarr; significant amount of time is
spent in reading and/or writing data.

@@TODO image of tensor -> bottleneck -> parallel compute -> bottleneck -> tensor

N.B., bottleneck may be due to (a) limited I/O bandwidth, (b) I/O is
not parallel.

===

### (4) Data are compressible

* Compression is a very active area of innovation. 

* Modern compressors achieve good compression ratios with high speed.

* Opportunity to trade I/O for computation. 

* Compression can increase effective I/O bandwidth, sometimes
  dramatically.

===

### (5) Speed matters

* Rich datasets &rarr; exploratory science &rarr; interactive analysis
  &rarr; many rounds of summarise, visualise, hypothesise, model,
  test, repeat.
  
* E.g., genome sequencing.

  * Each genome is a complete molecular blueprint for an organism.
  
  * Each genome is a history book handed down through the ages, with
    each generation making its mark.
	
  * Modern experiments sequence genomes from 1000s of individuals and
    compare them.

===

### Problem: key features

0. Inputs and outputs are tensors.
1. Data are larger than memory.
2. Computation can be parallelised.
3. I/O is the bottleneck.
4. Data are compressible.
5. Speed matters.

====

## Solution

1. Chunked, parallel computing framework.
2. Chunked, parallel tensor storage library. 

Align the chunks!

====

## Aside...

===

<p><img style="max-width:30%; max-height:30%" src="scipy-2019-files/dask.svg"></p>

```python
import dask.array as da

# @@TODO check this works!
x = da.from_array(storage)
y = (x - x.mean(axis=1)) / x.std(axis=1)
u, s, v = da.svd_compressed(y, 20)
u = u.compute()
```

* Write code using a numpy-like API.
* Parallel execution on local workstation, HPC cluster, Kubernetes cluster, ...

===

<p class="stretch"><img src="scipy-2019-files/pangeo.png"></p>

* Scale up ocean / atmosphere / land / climate science.
* Handle petabyte-scale datasets on HPC and cloud platforms.
* Interested to use cloud object stores: Amazon S3, Azure Blob Storage, Google Cloud Storage, ...

====

## Tensor storage: prior art

===

### HDF5 (h5py)

* Store tensors ("datasets").
* Divide data into regular chunks.
* Chunks are compressed.
* Group tensors into a hierarchy.
* Smooth integration with NumPy...

```python
import h5py
x = h5py.File('example.h5')['x']
# read 1000 rows into numpy array
y = x[:1000]
```

===

### HDF5 - limitations

* No thread-based parallelism.
* Cannot do parallel writes with compression.
* Not easy to plug in a new compressor.
* No support for cloud object stores (but see [Kita](https://www.hdfgroup.org/solutions/hdf-kita/hdf-kita-architecture)).

See also [moving away from
HDF5](https://cyrille.rossant.net/moving-away-hdf5/) by Cyrille Rossant.

===

### bcolz

<p class="stretch"><img style="max-height: 60%; max-width: 60%" src="scipy-2019-files/bcolz.png"><img style="max-height: 50%; max-width: 50%" src="scipy-2019-files/francesc.png"></p>

* Developed by [Francesc Alted](https://github.com/FrancescAlted).
* Chunked storage, primarily intended for storing 1D arrays (table columns), but can also store tensors.
* Implementation is simple (in a good way).
* Data format on disk is simple - one file for metadata, one file for each chunk.
* Showcase for the [Blosc compressor](http://blosc.org/).

===

### bcolz - limitations

* Chunking in 1 dimension only.
* No support for cloud object stores.

====

## How hard could it be ...

... to implement a chunked storage library for tensor data that
supported parallel reads, parallel writes, was easy to plug in new
compressors, and easy to plug in different storage systems like cloud
object stores?

===

```<montage/>```

===

<p class="stretch"><img src="scipy-2019-files/montage.png" style="float: left">3 years, 1,107 commits, 39 releases, 259 issues, 165 PRs, and at least 2 babies later ...</p>

====

## Compressors

===

### Compressor benchmark (genomic data)

<p class="stretch"><img src="scipy-2019-files/compressors.png"></p>

<small><a href="http://alimanfoo.github.io/2016/09/21/genotype-compression-benchmark.html">http://alimanfoo.github.io/2016/09/21/genotype-compression-benchmark.html</a></small>
