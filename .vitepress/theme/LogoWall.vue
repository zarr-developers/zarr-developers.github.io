<script setup lang="ts">
import { withBase } from 'vitepress'

interface Entry {
  name: string
  logo?: string
  href: string
  blurb?: string
  hosting?: string
  size?: string
}

defineProps<{ entries: Entry[] }>()
</script>

<template>
  <div class="zarr-wall">
    <a
      v-for="e in entries"
      :key="e.name"
      class="zarr-wall__card"
      :href="e.href"
      rel="noopener"
      target="_blank"
    >
      <div v-if="e.logo" class="zarr-wall__logo-frame">
        <img :src="withBase(e.logo)" :alt="e.name" loading="lazy" />
      </div>
      <div v-else class="zarr-wall__name-frame">{{ e.name }}</div>
      <div class="zarr-wall__body">
        <h3>{{ e.name }}</h3>
        <p v-if="e.blurb">{{ e.blurb }}</p>
        <p v-if="e.hosting || e.size" class="zarr-wall__meta">
          <span v-if="e.hosting">{{ e.hosting }}</span>
          <span v-if="e.hosting && e.size"> · </span>
          <span v-if="e.size">{{ e.size }}</span>
        </p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.zarr-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
  margin: 32px 0;
}
.zarr-wall__card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}
.zarr-wall__card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}
.zarr-wall__logo-frame,
.zarr-wall__name-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
}
.zarr-wall__logo-frame img {
  max-height: 72px;
  max-width: 80%;
  object-fit: contain;
}

/* Dark-mode rescue for monochrome-dark adopter logos lives in
   .vitepress/theme/custom.css (unscoped). Vue's scoped CSS collapses
   `:global(.dark) .selector` to just `.dark` for non-inheriting
   properties, so this kind of theme override has to be unscoped. */
.zarr-wall__name-frame {
  font-weight: 700;
  font-size: 18px;
  color: var(--vp-c-text-1);
}
.zarr-wall__body h3 {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 600;
}
.zarr-wall__body p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}
.zarr-wall__meta {
  margin-top: 6px !important;
  font-size: 12px !important;
  color: var(--vp-c-text-3) !important;
}
</style>
