---
layout: home

hero:
  name: Zarr
  text: The open foundation for chunked, compressed, N-dimensional arrays
  tagline: A specification, implementations in 10 languages, and an ecosystem of datasets and tools, built by an open community.
  # Hero image area is filled by ZarrHero.vue via the home-hero-image
  # theme slot (see .vitepress/theme/index.ts).
  actions:
    - theme: brand
      text: GitHub
      link: https://github.com/zarr-developers
    - theme: alt
      text: Read the blog
      link: https://zarr.dev/blog/

features:
  - icon: 📐
    title: Specification
    details: An open, versioned format definition with a community-driven enhancement (ZEP) process.
    link: https://zarr-specs.readthedocs.io/
  - icon: ⚙️
    title: Implementations
    details: Libraries in 10 languages — Python, Rust, C, C++, Java, JavaScript, Julia, R, OCaml, Elixir.
    link: /implementations
  - icon: 📦
    title: Datasets
    details: Petabytes of public, analysis-ready Zarr data across climate, bio-imaging, and beyond.
    link: /datasets
  - icon: 🧩
    title: Ecosystem
    details: Tools built on Zarr — Xarray, Icechunk, VirtualiZarr, TensorStore, deck.gl-zarr, xpublish, and more.
    linkText: GitHub org
    link: https://github.com/zarr-developers
  - icon: 🤝
    title: Community
    details: ZEPs, office hours, community calls, and governance. Everyone is welcome.
    link: /community
---

<AdoptersMarquee />

<ImplementationsGrid compact />

<BackingBand />
