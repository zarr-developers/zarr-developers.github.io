---
title: Zarr Datasets
---

<script setup>
import { computed } from 'vue'
import { datasets } from '../.vitepress/data/datasets'

const DOMAIN_LABELS = {
  bio: 'Bio-imaging',
  geo: 'Earth science',
  'ml-hpc': 'ML / HPC',
  genomics: 'Genomics',
  other: 'Other',
}

const grouped = computed(() => {
  const order = ['geo', 'bio', 'genomics', 'ml-hpc', 'other']
  const buckets = new Map()
  for (const d of datasets) {
    const k = d.domain
    if (!buckets.has(k)) buckets.set(k, [])
    buckets.get(k).push(d)
  }
  return order
    .filter((k) => buckets.has(k))
    .map((k) => ({ key: k, label: DOMAIN_LABELS[k] ?? k, items: buckets.get(k) }))
})

// Approximate total scale, parsing the (free-text) `size` field.
// Unrecognized units are silently skipped — the displayed value is a
// lower bound prefixed with "~".
const totalTB = computed(() => {
  let tb = 0
  for (const d of datasets) {
    if (!d.size) continue
    const m = d.size.match(/([\d.]+)\s*(PB|TB|GB)/i)
    if (!m) continue
    const n = Number(m[1])
    const unit = m[2].toUpperCase()
    tb += unit === 'PB' ? n * 1000 : unit === 'GB' ? n / 1000 : n
  }
  return tb
})
const totalDisplay = computed(() => {
  const tb = totalTB.value
  if (tb >= 1000) return `~${(tb / 1000).toFixed(1)} PB`
  return `~${Math.round(tb)} TB`
})
</script>

<PageHero
  eyebrow="Datasets"
  headline="Petabyte-scale public Zarr, free to read."
  lead="Public datasets stored as Zarr — climate model output, sea-surface temperature, bio-imaging, planetary observation. Read directly from cloud object storage in any Zarr-supporting language."
>
  <template #meta>
    <div class="datasets-stats">
      <span><strong>{{ datasets.length }}</strong> datasets</span>
      <span class="dot" aria-hidden="true">·</span>
      <span><strong>{{ totalDisplay }}</strong> aggregate</span>
      <span class="dot" aria-hidden="true">·</span>
      <span>add yours via <a href="https://github.com/zarr-developers/zarr-developers.github.io/">PR</a></span>
    </div>
  </template>
</PageHero>

<div v-for="group in grouped" :key="group.key" class="datasets-section">
  <h2 class="datasets-section__h">{{ group.label }}</h2>
  <LogoWall :entries="group.items" />
</div>

<p class="datasets-note">
  Please ensure the dataset you're contributing is public, free to use, documented, and illustrates Zarr within a specific domain. Only include URLs you expect to be stable and maintained in the foreseeable future.
</p>

<style scoped>
.datasets-stats {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.datasets-stats strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.datasets-stats .dot {
  color: var(--vp-c-text-3);
}
.datasets-section {
  margin-top: 56px;
}
.datasets-section__h {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
  border: none;
  padding: 0;
}
.datasets-note {
  margin-top: 64px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  max-width: 640px;
}
</style>
