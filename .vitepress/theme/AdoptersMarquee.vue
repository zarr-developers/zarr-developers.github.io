<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { adopters } from '../data/adopters'
import type { Domain } from '../data/types'

const props = defineProps<{
  /** Optional filter — when set, only adopters in these domains are shown. */
  tags?: Domain[]
}>()

const visible = computed(() =>
  props.tags?.length
    ? adopters.filter((a) => props.tags!.includes(a.domain))
    : adopters,
)

// Render the list twice so translateX(-50%) gives a seamless loop.
const doubled = computed(() => [...visible.value, ...visible.value])
</script>

<template>
  <section class="zarr-marquee zarr-section" aria-label="Used by">
    <h2 class="zarr-marquee__heading">Used by</h2>
    <div class="zarr-marquee__viewport">
      <div class="zarr-marquee__track zarr-marquee-track">
        <a
          v-for="(a, i) in doubled"
          :key="`${a.name}-${i}`"
          class="zarr-marquee__item"
          :href="a.href"
          :title="a.name"
          rel="noopener"
          target="_blank"
        >
          <img :src="withBase(a.logo)" :alt="a.name" loading="lazy" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.zarr-marquee {
  margin-top: var(--zarr-section-gap);
}
.zarr-marquee__heading {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
  text-align: center;
  margin: 0 0 18px;
}
.zarr-marquee__viewport {
  position: relative;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 var(--zarr-marquee-fade),
    #000 calc(100% - var(--zarr-marquee-fade)),
    transparent 100%
  );
          mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 var(--zarr-marquee-fade),
    #000 calc(100% - var(--zarr-marquee-fade)),
    transparent 100%
  );
}
.zarr-marquee__track {
  display: flex;
  gap: 56px;
  width: max-content;
  animation: zarr-scroll-x var(--zarr-marquee-speed) linear infinite;
}
.zarr-marquee__viewport:hover .zarr-marquee__track {
  animation-play-state: paused;
}
.zarr-marquee__item {
  display: inline-flex;
  align-items: center;
  height: var(--zarr-marquee-logo-h);
}
.zarr-marquee__item img {
  height: 100%;
  width: auto;
  max-width: 180px;
  object-fit: contain;
  filter: grayscale(0.15) opacity(0.85);
  transition: filter 0.2s ease;
}
.zarr-marquee__item:hover img {
  filter: none;
}
.dark .zarr-marquee__item img {
  filter: grayscale(0.15) opacity(0.9);
}
</style>
