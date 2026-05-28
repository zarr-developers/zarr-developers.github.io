<script setup lang="ts">
/**
 * Leaderboard — stacked card layout with sort controls.
 * No horizontal scroll; each entry is a self-contained card
 * with rank badge, size/chunk bar, tech pill, and metadata.
 */
import { computed, ref } from 'vue'
import type { LeaderboardEntry, LeaderboardTech } from '../data/types'

const props = withDefaults(
  defineProps<{
    entries: LeaderboardEntry[]
    /** Cap the visible rows when collapsed. 0 = show all. */
    limit?: number
  }>(),
  { limit: 0 },
)

const expanded = ref(false)

// ── sorting ───────────────────────────────────────────────
type SortKey = 'size_bytes' | 'total_chunks'
const sortKey = ref<SortKey>('size_bytes')
const sortAsc = ref(false)

function toggleSort(key: SortKey) {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else { sortKey.value = key; sortAsc.value = false }
}
function arrow(key: SortKey) {
  return sortKey.value !== key ? '' : sortAsc.value ? ' \u25B2' : ' \u25BC'
}
function isActive(key: SortKey) {
  return sortKey.value === key
}

const TECH: Record<LeaderboardTech, string> = {
  'native-zarr-v2': 'Zarr v2',
  'native-zarr-v3': 'Zarr v3',
  icechunk: 'Icechunk',
  'virtual-icechunk': 'Virtual Icechunk',
  virtualizarr: 'VirtualiZarr',
}
const MEDAL = ['\u{1F947}', '\u{1F948}', '\u{1F949}']

const sorted = computed(() => {
  const dir = sortAsc.value ? 1 : -1
  return [...props.entries].sort((a, b) =>
    dir * (a[sortKey.value] - b[sortKey.value]),
  )
})

const rows = computed(() => {
  if (props.limit > 0 && !expanded.value) return sorted.value.slice(0, props.limit)
  return sorted.value
})

const hasMore = computed(() =>
  props.limit > 0 && sorted.value.length > props.limit,
)

const maxBarValue = computed(() =>
  Math.max(...props.entries.map((e) => e[sortKey.value]), 1),
)

function fmtSize(b: number) {
  if (b >= 1e15) return `${(b / 1e15).toFixed(1)} PB`
  if (b >= 1e12) return `${(b / 1e12).toFixed(0)} TB`
  if (b >= 1e9) return `${(b / 1e9).toFixed(0)} GB`
  return `${b} B`
}
function fmtChunks(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`
  return String(n)
}
function barPct(entry: LeaderboardEntry) {
  const val = entry[sortKey.value]
  return `${Math.max((val / maxBarValue.value) * 100, 6)}%`
}
function barLabel(entry: LeaderboardEntry) {
  return sortKey.value === 'size_bytes'
    ? fmtSize(entry.size_bytes)
    : fmtChunks(entry.total_chunks)
}

// ── tooltip copy ──────────────────────────────────────────
const copiedIdx = ref<number | null>(null)
function copyStore(link: string, idx: number) {
  navigator.clipboard.writeText(link)
  copiedIdx.value = idx
  setTimeout(() => { if (copiedIdx.value === idx) copiedIdx.value = null }, 1500)
}
</script>

<template>
  <div class="lb">
    <p class="lb__intro">
      Tracking the largest public Zarr stores in the wild. All entries must be publicly accessible.
    </p>

    <!-- empty state -->
    <div v-if="!entries.length" class="lb__empty">
      <p class="lb__empty-text">No stores submitted yet. Be the first to claim the top spot!</p>
      <p class="lb__empty-sub">
        Add an entry to
        <a href="https://github.com/zarr-developers/zarr-developers.github.io/blob/main/.vitepress/data/leaderboard.ts" target="_blank" rel="noopener"><code>.vitepress/data/leaderboard.ts</code></a>
        and open a PR:
      </p>
      <pre class="lb__empty-code">{
  nickname: 'My Big Store',
  store_link: 's3://my-bucket/my-store.zarr',
  size_bytes: 1_000_000_000_000,
  total_chunks: 50_000_000,
  tech: 'native-zarr-v3',
  submitted_by: 'your-github-handle',
  last_verified: '2026-05-28',
}</pre>
    </div>

    <!-- populated state -->
    <template v-else>
      <!-- sort controls -->
      <div class="lb__sorts">
        <span class="lb__sorts-label">Sort by</span>
        <button
          class="lb__sort-btn" :class="{ active: isActive('size_bytes') }"
          @click="toggleSort('size_bytes')"
        >Size{{ arrow('size_bytes') }}</button>
        <button
          class="lb__sort-btn" :class="{ active: isActive('total_chunks') }"
          @click="toggleSort('total_chunks')"
        >Chunks{{ arrow('total_chunks') }}</button>
      </div>

      <!-- stacked cards -->
      <ol class="lb__list">
        <li
          v-for="(r, i) in rows"
          :key="r.store_link"
          class="lb__card"
          :class="{
            'lb__card--first': i === 0 && !sortAsc,
            'lb__card--second': i === 1 && !sortAsc,
            'lb__card--third': i === 2 && !sortAsc,
          }"
        >
          <!-- rank + nickname + tech -->
          <div class="lb__top">
            <span
              class="lb__rank"
              :class="{ 'lb__rank--podium': i < 3 && !sortAsc }"
            >
              <template v-if="i < 3 && !sortAsc">{{ MEDAL[i] }}</template>
              <template v-else>{{ i + 1 }}</template>
            </span>
            <div class="lb__top-right">
              <span class="lb__nickname-wrap">
                <span class="lb__nickname">{{ r.nickname }}</span>
                <span class="lb__tooltip" @click.stop="copyStore(r.store_link, i)">
                  <code class="lb__tooltip-code">{{ r.store_link }}</code>
                  <span class="lb__tooltip-hint">{{ copiedIdx === i ? 'Copied!' : 'Click to copy' }}</span>
                </span>
              </span>
              <span class="lb__pill">{{ TECH[r.tech] }}</span>
            </div>
          </div>

          <!-- bar (adapts to sort key) -->
          <div class="lb__bar-row">
            <div class="lb__bar-track">
              <div
                class="lb__bar-fill"
                :style="{ width: barPct(r) }"
              />
            </div>
            <span class="lb__size">{{ barLabel(r) }}</span>
          </div>

          <!-- meta row -->
          <div class="lb__meta">
            <span class="lb__stat">
              {{ sortKey === 'size_bytes' ? fmtChunks(r.total_chunks) + ' chunks' : fmtSize(r.size_bytes) }}
            </span>
            <span class="lb__sep" aria-hidden="true">&middot;</span>
            <a
              :href="`https://github.com/${r.submitted_by}`"
              class="lb__gh"
              target="_blank"
              rel="noopener"
            >@{{ r.submitted_by }}</a>
            <template v-if="r.docs_url">
              <span class="lb__sep" aria-hidden="true">&middot;</span>
              <a :href="r.docs_url" class="lb__docs" target="_blank" rel="noopener">docs</a>
            </template>
          </div>
        </li>
      </ol>

      <!-- expand / collapse toggle -->
      <button v-if="hasMore" class="lb__expand" @click="expanded = !expanded">
        {{ expanded ? 'Show top ' + limit + ' only' : 'Show all ' + entries.length + ' stores' }}
        <span class="lb__expand-chevron" :class="{ 'is-open': expanded }">&#8250;</span>
      </button>

      <p class="lb__cta">
        Think your store belongs here?
        <a href="https://github.com/zarr-developers/zarr-developers.github.io/" target="_blank" rel="noopener">Open a PR</a>
      </p>
    </template>
  </div>
</template>

<style scoped>
/* ── intro ──────────────────────────────────────────────── */
.lb__intro {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 20px;
}

/* ── empty state ────────────────────────────────────────── */
.lb__empty {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 32px 28px;
  text-align: center;
}
.lb__empty-text {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}
.lb__empty-sub {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
}
.lb__empty-sub a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}
.lb__empty-sub a:hover { text-decoration: underline; }
.lb__empty-code {
  display: inline-block;
  text-align: left;
  font-size: 13px;
  line-height: 1.6;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px 20px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  color: var(--vp-c-text-1);
  overflow-x: auto;
}

/* ── sort controls ──────────────────────────────────────── */
.lb__sorts {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.lb__sorts-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  margin-right: 4px;
}
.lb__sort-btn {
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 5px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}
.lb__sort-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.lb__sort-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

/* ── card list ──────────────────────────────────────────── */
.lb__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lb__card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 16px 18px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.lb__card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.lb__card--first {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-soft);
}
.lb__card--second { border-color: var(--vp-c-brand-2); }
.lb__card--third { border-color: var(--vp-c-brand-3); }

/* ── top row: rank + nickname + tech ────────────────────── */
.lb__top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.lb__rank {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 800;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  line-height: 1;
}
.lb__rank--podium {
  font-size: 18px;
  border-color: transparent;
  background: transparent;
}
.lb__top-right {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* ── nickname with hover tooltip ────────────────────────── */
.lb__nickname-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.lb__nickname {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  cursor: default;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.lb__tooltip {
  display: none;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 10;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  min-width: 280px;
  max-width: min(480px, 90vw);
  width: max-content;
}
.lb__nickname-wrap:hover .lb__tooltip {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.lb__tooltip-code {
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 6px 10px;
  border-radius: 6px;
  word-break: break-all;
  white-space: normal;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}
.lb__tooltip-hint {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.lb__pill {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  color: #fff;
  background: var(--vp-c-brand-1);
  white-space: nowrap;
}

/* ── bar (zarr gradient) ────────────────────────────────── */
.lb__bar-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lb__bar-track {
  flex: 1;
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 99px;
  overflow: hidden;
}
.lb__bar-fill {
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, #f1a8c8, #c93d80);
  transition: width 0.4s ease;
}
.lb__size {
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
  min-width: 56px;
  text-align: right;
}

/* ── meta row ───────────────────────────────────────────── */
.lb__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.lb__stat {
  font-variant-numeric: tabular-nums;
}
.lb__sep { color: var(--vp-c-text-3); }
.lb__gh {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-weight: 500;
}
.lb__gh:hover { color: var(--vp-c-brand-1); }
.lb__docs {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}
.lb__docs:hover { text-decoration: underline; }

/* ── expand / collapse ───────────────────────────────────── */
.lb__expand {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 14px 0 0;
  padding: 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: none;
  border: none;
  cursor: pointer;
}
.lb__expand:hover { text-decoration: underline; }
.lb__expand-chevron {
  font-size: 18px;
  transform: rotate(90deg);
  transition: transform 0.2s ease;
}
.lb__expand-chevron.is-open {
  transform: rotate(-90deg);
}

/* ── CTA ────────────────────────────────────────────────── */
.lb__cta {
  margin: 18px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.lb__cta a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}
.lb__cta a:hover { text-decoration: underline; }
</style>
