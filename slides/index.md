---
title: Zarr Slides
---

<PageHero
  eyebrow="Slides"
  headline="Talks and presentations."
  lead="A small archive of slide decks from Zarr community talks and spec design discussions. Have a deck to add? Open a PR."
/>

<div class="slides-grid">
  <a class="slide-card" href="/slides/scipy-2019.pdf" target="_blank" rel="noopener">
    <div class="slide-card__date">2019 · SciPy</div>
    <div class="slide-card__title">SciPy 2019</div>
    <div class="slide-card__meta">PDF</div>
  </a>
  <a class="slide-card" href="/slides/v3-update-20190619.pdf" target="_blank" rel="noopener">
    <div class="slide-card__date">2019-06-19</div>
    <div class="slide-card__title">Zarr protocol spec v3 — design update</div>
    <div class="slide-card__meta">PDF</div>
  </a>
</div>

<style scoped>
.slides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
  margin: 24px 0;
}
.slide-card {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 18px 20px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}
.slide-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}
.slide-card__date {
  font-family: ui-monospace, SFMono-Regular, 'JetBrains Mono', Consolas, monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}
.slide-card__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}
.slide-card__meta {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--vp-c-brand-1);
}
</style>
