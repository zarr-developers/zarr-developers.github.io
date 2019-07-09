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

### ```<montage/>```

<p class="stretch"><img src="scipy-2019-files/montage.png" style="float: left">3 years, 1,107 commits, 39 releases, 259 issues, 165 PRs, and at least 2 babies later ...</p>

====

### Zarr Python

```bash
pip install zarr
```

```bash
conda install -c conda-forge zarr
```

```python
>>> import zarr
>>> zarr.__version__
'2.3.2'
```

===

### Creating a hierarchy

```python
>>> store = zarr.DirectoryStore('example.zarr')
>>> root = zarr.group(store)
>>> root
<zarr.hierarchy.Group '/'>
```

Using DirectoryStore the data will be stored on the local file
system. 

===

### Creating an array

```python
>>> x = root.zeros('x', 
...                shape=(10000, 10000), 
...                chunks=(1000, 1000), 
...                dtype='<i4')
>>> x
<zarr.core.Array '/x' (10000, 10000) int32>
```

* Creates a 2-dimensional array of 32-bit integers with 10,000 rows
and 10,000 columns.

* Divided into chunks where each chunk has 1,000 rows and 1,000 columns.

* There will be 100 chunks in total, arranged in a 10x10 grid.

===

### Creating an array (h5py-style API)

```python
>>> x = root.create_dataset('x', 
...                         shape=(10000, 10000), 
...                         chunks=(1000, 1000), 
...                         dtype='<i4')
>>> x
<zarr.core.Array '/x' (10000, 10000) int32>
```

===

### Creating an array (big)

```python
>>> big = root.zeros('big',
...                  shape=(100_000_000, 100_000_000),
...                  chunks=(10_000, 10_000),
...                  dtype='i4')
>>> big
<zarr.core.Array '/big' (100000000, 100000000) int32>
```

===

### Creating an array (big)

```python
>>> big.info
Name               : /big
Type               : zarr.core.Array
Data type          : int32
Shape              : (100000000, 100000000)
Chunk shape        : (10000, 10000)
Order              : C
Read-only          : False
Compressor         : Blosc(cname='lz4', clevel=5, shuffle=SHUFFLE, blocksize=0)
Store type         : zarr.storage.DirectoryStore
No. bytes          : 40000000000000000 (35.5P)
No. bytes stored   : 355
Storage ratio      : 112676056338028.2
Chunks initialized : 0/100000000
```

* That's a 35 petabyte array.
* N.B., chunks are initialized on write.

===

### Writing data into an array

```python
>>> big[0, 0:20000] = np.arange(20000)
>>> big[0:20000, 0] = np.arange(20000)
```

* Same API as writing into numpy array or h5py dataset.

===

### Reading data from an array

```python
>>> big[0:1000, 0:1000]
array([[  0,   1,   2, ..., 997, 998, 999],
       [  1,   0,   0, ...,   0,   0,   0],
       [  2,   0,   0, ...,   0,   0,   0],
       ...,
       [997,   0,   0, ...,   0,   0,   0],
       [998,   0,   0, ...,   0,   0,   0],
       [999,   0,   0, ...,   0,   0,   0]], dtype=int32)
```

* Same API as slicing a numpy array or reading from an h5py dataset.

===

### Chunks are initialized on write

```python
>>> big.info
Name               : /big
Type               : zarr.core.Array
Data type          : int32
Shape              : (100000000, 100000000)
Chunk shape        : (10000, 10000)
Order              : C
Read-only          : False
Compressor         : Blosc(cname='lz4', clevel=5, shuffle=SHUFFLE, blocksize=0)
Store type         : zarr.storage.DirectoryStore
No. bytes          : 40000000000000000 (35.5P)
No. bytes stored   : 5171386 (4.9M)
Storage ratio      : 7734870303.6
Chunks initialized : 3/100000000
```

===

### Files on disk

```bash
$ tree -a example.zarr
example.zarr
├── big
│   ├── 0.0
│   ├── 0.1
│   ├── 1.0
│   └── .zarray
├── x
│   └── .zarray
└── .zgroup

2 directories, 6 files
```

===

### Array metadata

```bash
$ cat example.zarr/big/.zarray 
{
    "chunks": [
        10000,
        10000
    ],
    "compressor": {
        "blocksize": 0,
        "clevel": 5,
        "cname": "lz4",
        "id": "blosc",
        "shuffle": 1
    },
    "dtype": "<i4",
    "fill_value": 0,
    "filters": null,
    "order": "C",
    "shape": [
        100000000,
        100000000
    ],
    "zarr_format": 2
}
```

===

### Reading unwritten regions

```python
>>> big[-1000:, -1000:]
array([[0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0],
       ...,
       [0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0]], dtype=int32)
```

* No data on disk, fill value is used (in this case zero).

===

### Reading the whole array

```python
>>> big[:]
MemoryError
```

* Read the whole array into memory (if you can!)

====

## [Storage alternatives](https://zarr.readthedocs.io/en/stable/tutorial.html#storage-alternatives)

* `zarr.DirectoryStore`
* `zarr.DictStore` (in-memory)
* `zarr.ZipStore`
* `zarr.DBMStore`, `zarr.LMDBStore`, `zarr.SQLiteStore`
* `zarr.MongoDBStore`, `zarr.RedisStore`
* `zarr.ABSStore`, `s3fs.S3Map`, `gcsfs.GCSMap`

===

### Local file system (DirectoryStore)

```python
>>> store = zarr.DirectoryStore('example.zarr')
>>> root = zarr.group(store)
>>> root.tree()
/
 ├── big (100000000, 100000000) int32
 └── x (10000, 10000) int32
>>> root['big']
<zarr.core.Array '/big' (100000000, 100000000) int32>
```

===

### Local file system (ZipStore)

```bash
$ cd example.zarr && zip -r0v ../example.zip ./*
```

```python
>>> store = zarr.ZipStore('example.zip')
>>> root = zarr.group(store)
>>> root.tree()
/
 ├── big (100000000, 100000000) int32
 └── x (10000, 10000) int32
>>> root['big']
<zarr.core.Array '/big' (100000000, 100000000) int32>
```

===

### Google cloud storage (via [gcsfs](https://github.com/dask/gcsfs))

```bash
$ gsutil config
$ gsutil rsync -ru example.zarr/ gs://zarr-demo/example.zarr/
```

```python
>>> import gcsfs
>>> gcs = gcsfs.GCSFileSystem(token='anon', access='read_only')
>>> store = gcsfs.GCSMap('zarr-demo/example.zarr', gcs=gcs, check=False)
>>> root = zarr.group(store)
>>> root.tree()
/
 ├── big (100000000, 100000000) int32
 └── x (10000, 10000) int32
>>> root['big']
<zarr.core.Array '/big' (100000000, 100000000) int32>
```

===

### Google cloud storage

<p class="stretch"><img src="scipy-2019-files/gcs.png"></p>

====

## Compressors

===

### Compressor benchmark (genomic data)

<p class="stretch"><img src="scipy-2019-files/compressors.png"></p>

<small><a href="http://alimanfoo.github.io/2016/09/21/genotype-compression-benchmark.html">http://alimanfoo.github.io/2016/09/21/genotype-compression-benchmark.html</a></small>

====

## TODO

* 

====

## Future

* Zarr/N5
* v3 protocol spec
