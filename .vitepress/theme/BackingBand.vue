<script setup lang="ts">
import { withBase } from 'vitepress'
import { backing } from '../data/backing'

const labelFor = (kind: 'fiscal-host' | 'standards-body' | 'sponsor'): string => ({
  'fiscal-host': 'Fiscal sponsor',
  'standards-body': 'Standards body',
  'sponsor': 'Sponsor',
}[kind])
</script>

<template>
  <section class="zarr-backing zarr-section" aria-label="Sponsored by">
    <h2 class="zarr-backing__heading">Sponsored by</h2>
    <div class="zarr-backing__row">
      <a
        v-for="b in backing"
        :key="b.name"
        class="zarr-backing__cell"
        :href="b.href"
        rel="noopener"
        target="_blank"
      >
        <img
          :src="withBase(b.logo)"
          :alt="b.name"
          loading="lazy"
          onerror="this.style.display='none'"
        />
        <div class="zarr-backing__meta">
          <strong>{{ b.name }}</strong>
          <span>{{ labelFor(b.kind) }}</span>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.zarr-backing__heading {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
  text-align: center;
  margin: 0 0 18px;
}
.zarr-backing__row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  align-items: center;
}
.zarr-backing__cell {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.zarr-backing__cell:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.zarr-backing__cell img {
  height: 32px;
  width: auto;
  object-fit: contain;
}
.zarr-backing__meta {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  line-height: 1.3;
}
.zarr-backing__meta strong {
  font-weight: 600;
}
.zarr-backing__meta span {
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
</style>
