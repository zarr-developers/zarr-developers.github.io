---
title: Zarr Adopters
---

<script setup>
import { computed } from 'vue'
import { adopters } from '../.vitepress/data/adopters'

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
  for (const a of adopters) {
    const k = a.domain
    if (!buckets.has(k)) buckets.set(k, [])
    buckets.get(k).push(a)
  }
  return order
    .filter((k) => buckets.has(k))
    .map((k) => ({ key: k, label: DOMAIN_LABELS[k] ?? k, items: buckets.get(k) }))
})

const stats = computed(() => {
  const total = adopters.length
  const domainCount = grouped.value.length
  return { total, domainCount }
})
</script>

<PageHero
  eyebrow="Adopters"
  headline="Used in production by leaders across science and industry."
  lead="Peta-scale, from Earth observation to bio-imaging. Zarr is how teams move large arrays through cloud storage and analysis pipelines."
>
  <template #meta>
    <div class="adopters-stats">
      <span><strong>{{ stats.total }}</strong> organizations</span>
      <span class="dot" aria-hidden="true">·</span>
      <span><strong>{{ stats.domainCount }}</strong> domains</span>
      <span class="dot" aria-hidden="true">·</span>
      <span>add yours via <a href="https://github.com/zarr-developers/community/issues/60">an issue</a></span>
    </div>
  </template>
</PageHero>

<div v-for="group in grouped" :key="group.key" class="adopters-section">
  <h2 class="adopters-section__h">{{ group.label }}</h2>
  <LogoWall :entries="group.items" />
</div>

<p class="adopters-permission">
  OME logo used by <a href="https://www.openmicroscopy.org/artwork/">permission</a>, trademarked <a href="https://www.glencoesoftware.com/">Glencoe Software, Inc.</a>
</p>

<style scoped>
.adopters-stats {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.adopters-stats strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.adopters-stats .dot {
  color: var(--vp-c-text-3);
}
.adopters-section {
  margin-top: 56px;
}
.adopters-section__h {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
  border: none;
  padding: 0;
}
.adopters-permission {
  margin-top: 64px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
</style>
