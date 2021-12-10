# zarr-developers.github.io

Main Zarr website hosted at https://zarr.dev

## Building

```
conda create -n zarr.dev -c conda-forge rb-bundler c-compiler compilers cxx-compiler
conda activate zarr.dev
bundle install
bundle exec jekyll serve
```

Note: using conda-forge packages directly failed on eventmachine (Dec 2021):
```
conda create -n zarr.dev -c conda-forge rb-jekyll rb-bundler rb-public_suffix rb-minima rb-jekyll-feed
conda activate zarr.dev
bundle exec jekyll serve
```
