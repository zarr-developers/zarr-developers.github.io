---
title: Affiliated Projects
---

<script setup>
import { affiliated } from '../.vitepress/data/affiliated'

const KIND_LABELS = {
  specification: 'Specification',
  implementation: 'Implementation',
  tool: 'Tool',
  conventions: 'Conventions',
}
</script>

<PageHero
  eyebrow="Community"
  headline="Affiliated projects."
  lead="Affiliated Software Projects are part of the Zarr Project under its NumFOCUS fiscal sponsorship. Each one governs itself through its own Core Developers Group and publishes its own governance document. This page is the official registry of affiliated projects."
/>

<div class="affiliated-grid">
  <article v-for="p in affiliated" :key="p.name" class="affiliated-card">
    <span class="affiliated-card__kind">{{ KIND_LABELS[p.kind] }}</span>
    <a class="affiliated-card__title" :href="p.docs ?? `https://github.com/${p.repo}`" rel="noopener" target="_blank">
      {{ p.name }} <span aria-hidden="true">→</span>
    </a>
    <p class="affiliated-card__body">{{ p.blurb }}</p>
    <div class="affiliated-card__links">
      <a :href="`https://github.com/${p.repo}`" rel="noopener" target="_blank">
        <img
          class="affiliated-card__badge"
          :src="`https://img.shields.io/github/stars/${p.repo}?style=social`"
          :alt="`${p.repo} on GitHub`"
          loading="lazy"
          referrerpolicy="no-referrer"
        />
      </a>
      <span class="status-badge" :class="`status-badge--${p.status}`">
        <span class="status-badge__label">status</span><span class="status-badge__value">{{ p.status }}</span>
      </span>
    </div>
  </article>
</div>

<p class="affiliated-note"><strong>Approved</strong> projects meet all affiliation criteria. <strong>Pending</strong> projects have been affiliated by the ZSC but are still publishing their governance document.</p>

## Becoming an affiliated project

Affiliation is described in the [Zarr governance framework](https://github.com/zarr-developers/governance/blob/main/GOVERNANCE.md#tier-3-affiliated-software-projects--core-developers-groups). Projects are considered against these criteria:

1. Be open source.
2. Be directly related to Zarr (e.g. an implementation, tool, extension, or convention).
3. Demonstrate a critical mass of sustained development activity.
4. Have a publicly documented governance process (adopting the [default template](https://github.com/zarr-developers/governance/blob/main/AFFILIATED_PROJECT_GOVERNANCE.md) is fine).

The process is:

1. **Publish a governance document** in your project's own repository. Adopting the [default template](https://github.com/zarr-developers/governance/blob/main/AFFILIATED_PROJECT_GOVERNANCE.md) as-is is fine. You can change it later without ZSC approval.
2. **Request affiliation.** Open an issue on the [governance repository](https://github.com/zarr-developers/governance/issues) describing the project and linking to its governance document. The Zarr Steering Council (ZSC) votes on affiliation.
3. **Add your card.** Once affiliation is approved, open a PR adding your project to [`.vitepress/data/affiliated.ts`](https://github.com/zarr-developers/zarr-developers.github.io/blob/main/.vitepress/data/affiliated.ts), with links to its repository and documentation. One approval from a ZSC member is enough to merge.

<style scoped>
.affiliated-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
  margin: 8px 0 16px;
}
.affiliated-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 16px 18px 14px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.affiliated-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.affiliated-card__kind {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}
.affiliated-card__title {
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  line-height: 1.3;
}
.affiliated-card__title:hover {
  color: var(--vp-c-brand-1);
}
.affiliated-card__body {
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin: 0;
}
.affiliated-card__links {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding-top: 4px;
}
.affiliated-card__links a {
  display: inline-flex;
}
.affiliated-card__badge {
  height: 20px;
  width: auto;
}
.affiliated-note {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
/* Two-part badge in the style of shields.io: grey label, coloured value. */
.status-badge {
  display: inline-flex;
  height: 20px;
  border-radius: 3px;
  overflow: hidden;
  font-family: Verdana, Geneva, DejaVu Sans, sans-serif;
  font-size: 11px;
  line-height: 20px;
  color: #fff;
  text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3);
}
.status-badge__label,
.status-badge__value {
  padding: 0 6px;
}
.status-badge__label {
  background: #555;
}
.status-badge--approved .status-badge__value {
  background: #4c1;
}
.status-badge--pending .status-badge__value {
  background: #dfb317;
}
</style>
