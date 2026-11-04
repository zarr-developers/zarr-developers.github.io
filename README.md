# zarr.dev

Main Zarr website hosted at https://zarr.dev

## Local development

This site is built with [VitePress](https://vitepress.dev/). Requires Node.js 20+.

```bash
npm ci
npm run docs:dev      # dev server at http://localhost:5173/
npm run docs:build    # production build into .vitepress/dist/
npm run docs:preview  # preview the production build
```

## Deployment

The site deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`. The custom domain `zarr.dev` is preserved by `public/CNAME`, which VitePress copies into the build output.

## Redirects

Site-wide redirects (e.g. `/numcodecs/blosc` → `numcodecs.readthedocs.io`) are defined as a single YAML map at `.vitepress/redirects.yml`. The build hook in `.vitepress/plugins/redirects.ts` generates one static `<from>/index.html` meta-refresh stub per entry into the build output.

To add a redirect: append an entry to `.vitepress/redirects.yml` (`/path: target-url`) and rebuild.

## Extensions registry

Pages under `/extensions/` (e.g. `/extensions/codecs/jpeg/`) are rendered from [zarr-developers/zarr-extensions](https://github.com/zarr-developers/zarr-extensions), which remains the normative source. `scripts/fetch-extensions.mjs` runs before `docs:dev` and `docs:build`: it clones the registry and writes each `README.md` as an `index.md` page into `extensions/`, and copies all other files (`schema.json`, sample data, …) into `public/extensions/` so they are served verbatim. Both directories are generated and gitignored. Edit links on these pages point to the registry repo.

To preview a local registry checkout, set `ZARR_EXTENSIONS_DIR=/path/to/zarr-extensions`; to build from another branch or tag, set `ZARR_EXTENSIONS_REF`.

The deploy workflow rebuilds daily and on a `zarr-extensions-updated` `repository_dispatch` event, so registry changes show up without a commit here.
