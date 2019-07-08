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

### Larger than memory

Input and/or output tensors are too big to fit comfortably in main
memory.

@@TODO image of larger than memory

===

### Computation can be parallelised

Some part of the computation can be parallelised by processing data in
chunks.

@@TODO image of tensor -> parallel compute -> compute -> parallel compute -> tensor

===

### E.g., embarassingly parallel

@@TODO image of tensor -> parallel compute -> tensor

===

### I/O is the bottleneck

Computational complexity is moderate, significant amount of time is
spent in reading and/or writing data.

@@TODO image of tensor -> bottleneck -> parallel compute -> bottleneck -> tensor

N.B., bottleneck may be due to (a) limited I/O bandwidth, (b) I/O is
not parallel.

===

### Data are compressible

* Compression is a very active area of innovation. 

* Modern compressors achieve good compression ratios with high speed.

* Opportunity to trade I/O for computation. 

* Compression can increase effective I/O bandwidth, sometimes
  dramatically.

