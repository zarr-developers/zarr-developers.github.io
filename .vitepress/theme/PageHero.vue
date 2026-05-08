<script setup lang="ts">
// Consistent page-level header band used across non-home pages.
// Accepts an eyebrow label (small uppercase tag), a headline, and a
// one-line lead. All slots optional so a page can compose freely.

defineProps<{
  eyebrow?: string
  headline?: string
  lead?: string
}>()
</script>

<template>
  <header class="zarr-page-hero">
    <div v-if="eyebrow" class="zarr-page-hero__eyebrow">{{ eyebrow }}</div>
    <h1 v-if="headline" class="zarr-page-hero__headline">{{ headline }}</h1>
    <p v-if="lead" class="zarr-page-hero__lead">{{ lead }}</p>
    <slot name="meta" />
  </header>
</template>

<style scoped>
.zarr-page-hero {
  margin: 0 0 56px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.zarr-page-hero__eyebrow {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-1);
  margin-bottom: 12px;
}
.zarr-page-hero__headline {
  font-size: clamp(28px, 4.5vw, 44px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 14px;
  border: none;
  padding: 0;
}
.zarr-page-hero__lead {
  font-size: clamp(16px, 1.6vw, 19px);
  line-height: 1.5;
  color: var(--vp-c-text-2);
  max-width: 640px;
  margin: 0;
}
</style>
