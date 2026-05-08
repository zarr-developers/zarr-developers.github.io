<script setup lang="ts">
// The chunked-cube SVG lives at /public/zarr-hero.svg and is loaded
// via fetch() on mount. Two reasons:
//   1. Keeps the home page's inline HTML payload small — the SVG is
//      ~60 KB and was previously inlined via `?raw` + v-html.
//   2. Lets the SVG's inline <style> block (which carries the @keyframes
//      for the chunk reveal) survive into the DOM — fetch + innerHTML
//      preserves <style> tags exactly.
//
// The host div uses `v-once` so Vue does not try to reconcile against
// the imperatively-injected SVG. The popup is a sibling, not a child,
// so Vue still owns that branch.
//
// Reveal: ~3s one-shot. Each chunk has class="c cN"; the cN class drives
// its individual chunkIn_N keyframe (opacity 0 → 1) and a SMIL translate
// (off-screen → in-place). After the reveal, chunks settle.
//
// Interactivity: hovering a chunk dims the rest and surfaces a callout
// with the chunk's address (chunk[z, y, x] derived from visual rank in
// the 3×3×3 grid), shape, and codec. Click/tap selects; tapping outside
// the cube dismisses. Conveys: chunks are independently addressable and
// each one carries its own compressed contents.
//
// SSR-safe: handlers and SVG injection happen only on mount.

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'

interface Hovered {
  index: number
  rect: DOMRect
}

const wrap = ref<HTMLDivElement | null>(null)
const svgHost = ref<HTMLDivElement | null>(null)
const hovered = ref<Hovered | null>(null)

let currentChunk: Element | null = null
let cleanup: (() => void) | null = null

// Visual-rank map: built lazily on first hover. The SVG's `cN` indices
// are arbitrary (whatever iteration order the author used), so we sort
// chunks by screen position so the visually top-left chunk gets rank 0
// → coords [0, 0, 0]. Coord order is (z, y, x) per zarr/numpy C-order.
let visualRank = new WeakMap<Element, number>()
let visualRankBuilt = false

function buildVisualRank(host: HTMLElement): void {
  const chunks = Array.from(host.querySelectorAll<Element>('.c'))
  const sorted = chunks
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .sort((a, b) => a.r.top - b.r.top || a.r.left - b.r.left)
  visualRank = new WeakMap()
  sorted.forEach((p, i) => visualRank.set(p.el, i))
  visualRankBuilt = true
}

function rankCoords(rank: number): [number, number, number] {
  // (z, y, x) — zarr / numpy C-order. Top-left visible chunk → [0,0,0].
  return [Math.floor(rank / 9), Math.floor(rank / 3) % 3, rank % 3]
}

const coords = computed(() =>
  hovered.value ? rankCoords(hovered.value.index).join(', ') : '',
)

// Popup positioning with edge detection. The popup sits 14 px to the
// right of the chunk by default. If that would push it past the viewport
// right edge (e.g. on a narrow mobile viewport), we flip to the left of
// the chunk; if neither fits, we center horizontally in the viewport.
// Vertical: top-align with the chunk; flip below if it would overflow.
const calloutStyle = computed(() => {
  if (!hovered.value || !wrap.value) return {}
  const w = wrap.value.getBoundingClientRect()
  const r = hovered.value.rect

  // Estimated callout dimensions (matches the rendered min-width and
  // typical content height; close enough for placement decisions).
  const POPUP_W = 200
  const POPUP_H = 90
  const GAP = 14
  const MARGIN = 8

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  let left: number
  if (r.right + GAP + POPUP_W <= vw - MARGIN) {
    left = r.right - w.left + GAP
  } else if (r.left - GAP - POPUP_W >= MARGIN) {
    left = r.left - w.left - GAP - POPUP_W
  } else {
    // Center horizontally in viewport (very narrow screens).
    left = vw / 2 - w.left - POPUP_W / 2
  }

  let top: number
  if (r.top + POPUP_H <= vh - MARGIN) {
    top = r.top - w.top - 8
  } else {
    top = r.bottom - w.top + 8
  }

  return { left: `${left}px`, top: `${top}px` }
})

onMounted(async () => {
  const root = wrap.value
  const host = svgHost.value
  if (!root || !host) return

  // Fetch and inject the SVG. innerHTML preserves the inline <style>
  // block carrying @keyframes; v-once on the host div tells Vue not to
  // touch the injected content.
  try {
    const res = await fetch(withBase('/zarr-hero.svg'))
    if (res.ok) {
      host.innerHTML = await res.text()
    }
  } catch {
    // Network failure — leave the host empty. The wrapper's aria-label
    // still describes what should be here for screen readers.
    return
  }

  const set = (chunk: Element) => {
    if (!visualRankBuilt) buildVisualRank(host)
    if (currentChunk && currentChunk !== chunk) {
      currentChunk.classList.remove('is-hovered')
    }
    currentChunk = chunk
    chunk.classList.add('is-hovered')
    hovered.value = {
      index: visualRank.get(chunk) ?? 0,
      rect: chunk.getBoundingClientRect(),
    }
  }
  const clear = () => {
    if (currentChunk) {
      currentChunk.classList.remove('is-hovered')
      currentChunk = null
    }
    hovered.value = null
  }

  const onOver = (e: PointerEvent) => {
    const target = e.target as Element | null
    const chunk = target?.closest?.('.c')
    if (chunk && host.contains(chunk)) set(chunk)
  }
  const onOut = (e: PointerEvent) => {
    const related = e.relatedTarget as Element | null
    if (related && root.contains(related)) return
    clear()
  }
  const onClick = (e: Event) => {
    const target = e.target as Element | null
    const chunk = target?.closest?.('.c')
    if (chunk && host.contains(chunk)) set(chunk)
    else clear()
  }

  // Listeners attach on the SVG host (where the chunks now live), not
  // the wrapper, so the popup itself doesn't intercept hover events.
  host.addEventListener('pointerover', onOver)
  host.addEventListener('pointerout', onOut)
  host.addEventListener('click', onClick)
  cleanup = () => {
    host.removeEventListener('pointerover', onOver)
    host.removeEventListener('pointerout', onOut)
    host.removeEventListener('click', onClick)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div
    ref="wrap"
    class="zarr-hero"
    :class="{ 'has-hover': hovered }"
    aria-label="Zarr animated chunked cube"
  >
    <div ref="svgHost" class="zarr-hero__svg" v-once />
    <Transition name="callout">
      <div v-if="hovered" class="zarr-callout" :style="calloutStyle">
        <div class="zarr-callout__addr">chunk[{{ coords }}]</div>
        <dl class="zarr-callout__meta">
          <div>
            <dt>shape</dt>
            <dd>(4, 4, 4) · 64 elements</dd>
          </div>
          <div>
            <dt>codec</dt>
            <dd>zstd</dd>
          </div>
        </dl>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.zarr-hero {
  position: relative;
  /* Light-theme palette — strong value contrast across the three iso
     faces so the cube reads as 3D. Top = rose blush; right = rose;
     front = wine. On-brand but calmer than saturated brand magenta. */
  --zarr-coral-1: #f5c5d0;
  --zarr-coral-2: #d4709a;
  --zarr-coral-3: #8a2c6a;
  --zarr-stroke: #1a1a1a;
  --zarr-grid: rgba(0, 0, 0, 0.08);
  --zarr-glow: rgba(212, 112, 154, 0.65);
}

/* Dark theme — VitePress toggles `.dark` on <html>. */
:global(.dark) .zarr-hero {
  --zarr-coral-1: #f5d2dc;
  --zarr-coral-2: #e89bb8;
  --zarr-coral-3: #c25e92;
  --zarr-stroke: #faf7f2;
  --zarr-grid: rgba(255, 255, 255, 0.12);
  --zarr-glow: rgba(232, 155, 184, 0.7);
}

.zarr-hero__svg {
  /* Reserve space so layout doesn't shift while the SVG fetches in. */
  aspect-ratio: 560 / 480;
  width: 100%;
}
.zarr-hero :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}

.zarr-hero :deep(.c) {
  cursor: pointer;
  transition: opacity 200ms ease, filter 200ms ease;
}

.zarr-hero.has-hover :deep(.c:not(.is-hovered)) {
  opacity: 0.32 !important;
}

.zarr-hero :deep(.c.is-hovered) {
  filter: drop-shadow(0 0 6px var(--zarr-glow))
          drop-shadow(0 0 14px var(--zarr-glow));
}

.zarr-callout {
  position: absolute;
  z-index: 10;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 14px;
  box-shadow: 0 6px 22px -6px rgba(0, 0, 0, 0.18);
  pointer-events: none;
  min-width: 180px;
}
.zarr-callout__addr {
  font-family: ui-monospace, SFMono-Regular, 'JetBrains Mono', Consolas, monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
  letter-spacing: 0.02em;
}
.zarr-callout__meta {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.zarr-callout__meta > div {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.zarr-callout__meta dt {
  font-size: 9.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--vp-c-text-3);
}
.zarr-callout__meta dd {
  margin: 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.callout-enter-active,
.callout-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}
.callout-enter-from,
.callout-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .zarr-hero :deep(.c) {
    animation: none !important;
    opacity: 1;
  }
  .callout-enter-active,
  .callout-leave-active {
    transition: opacity 120ms ease;
  }
  .callout-enter-from,
  .callout-leave-to {
    transform: none;
  }
}
</style>
