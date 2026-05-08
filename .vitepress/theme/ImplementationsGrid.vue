<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { implementations } from '../data/implementations'

const props = withDefaults(
  defineProps<{
    /** Compact = home (smaller cards); full = /implementations/. */
    compact?: boolean
  }>(),
  { compact: false },
)

// Map each language to a logo path under /implementations/logos/.
const slugFor = (language: string): string => {
  const m: Record<string, string> = {
    'C++': 'cplusplus',
    'JavaScript': 'javascript',
  }
  return m[language] ?? language.toLowerCase()
}

// Stable order: language priority first, then alphabetical within
// each language. Keeps consecutive same-language cards adjacent so
// the eye still groups them, without forcing a per-language container.
const ordered = computed(() => {
  const langOrder = ['Python', 'Rust', 'C++', 'C', 'JavaScript', 'Java', 'Julia', 'R', 'OCaml', 'Elixir']
  const langIdx = (l: string) => {
    const i = langOrder.indexOf(l)
    return i === -1 ? langOrder.length : i
  }
  return [...implementations].sort(
    (a, b) => langIdx(a.language) - langIdx(b.language) || a.name.localeCompare(b.name),
  )
})

// Live search — matches language OR impl name, case-insensitive.
const query = ref('')
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return ordered.value
  return ordered.value.filter(
    (i) =>
      i.language.toLowerCase().includes(q) ||
      i.name.toLowerCase().includes(q),
  )
})
</script>

<template>
  <section class="zarr-impls zarr-section" aria-label="Implementations">
    <div class="zarr-impls__top">
      <h2 class="zarr-impls__heading">Implementations</h2>
      <div class="zarr-impls__search-wrap">
        <input
          v-model="query"
          type="search"
          class="zarr-impls__search"
          placeholder="Search by language or name (e.g. python, tensorstore)"
          aria-label="Search implementations"
        />
      </div>
    </div>
    <p v-if="!filtered.length" class="zarr-impls__empty">
      No matches for <strong>"{{ query }}"</strong>. Try a language name like <em>python</em>, <em>rust</em>, or <em>java</em>.
    </p>
    <div v-else class="zarr-impls__grid" :class="{ 'is-compact': compact }">
      <article
        v-for="i in filtered"
        :key="i.name"
        class="zarr-impls__card"
      >
        <header class="zarr-impls__card-h">
          <span class="zarr-impls__chip">
            <img
              class="zarr-impls__chip-icon"
              :src="withBase(`/implementations/logos/${slugFor(i.language)}.svg`)"
              :alt="''"
              onerror="this.style.display='none'"
            />
            {{ i.language }}
          </span>
        </header>
        <a
          class="zarr-impls__name"
          :href="i.href"
          rel="noopener"
          target="_blank"
        >{{ i.name }}</a>
        <div class="zarr-impls__pills">
          <span v-if="i.v2" class="zarr-impls__badge zarr-impls__badge--v2">v2</span>
          <span v-if="i.v3" class="zarr-impls__badge zarr-impls__badge--v3">v3</span>
        </div>
        <img
          v-if="i.activity"
          class="zarr-impls__activity"
          :src="i.activity"
          :alt="`${i.name} activity`"
          loading="lazy"
          referrerpolicy="no-referrer"
        />
      </article>
    </div>
  </section>
</template>

<style scoped>
.zarr-impls__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 0 18px;
}
.zarr-impls__heading {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
  margin: 0;
}
.zarr-impls__search-wrap {
  flex: 1 1 320px;
  max-width: 420px;
}
.zarr-impls__search {
  width: 100%;
  font-size: 14px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  transition: border-color 0.15s ease, background-color 0.15s ease;
  /* Hide native search clear icon styling drift across browsers. */
  -webkit-appearance: none;
}
.zarr-impls__search::placeholder {
  color: var(--vp-c-text-3);
}
.zarr-impls__search:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}
.zarr-impls__empty {
  font-size: 14px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 18px 20px;
  margin: 0;
}
.zarr-impls__empty em {
  font-style: normal;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 1px 6px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 12.5px;
}
.zarr-impls__grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
.zarr-impls__grid.is-compact {
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
}

.zarr-impls__card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 14px 16px 12px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  /* All cards equal height — flex pushes activity badge to bottom. */
  min-height: 120px;
}
.zarr-impls__card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.zarr-impls__card-h {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}
.zarr-impls__chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}
.zarr-impls__chip-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  filter: invert(0.45);
}
.dark .zarr-impls__chip-icon {
  filter: invert(1) opacity(0.85);
}
.zarr-impls__name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  line-height: 1.3;
  margin-top: 2px;
}
.zarr-impls__name:hover {
  color: var(--vp-c-brand-1);
}

.zarr-impls__pills {
  display: flex;
  gap: 6px;
  margin-top: auto;
}
.zarr-impls__badge {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 999px;
  letter-spacing: 0.04em;
}
.zarr-impls__badge--v3 {
  color: #fff;
  background: var(--vp-c-brand-1);
}
.zarr-impls__badge--v2 {
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.zarr-impls__activity {
  height: 18px;
  width: auto;
  align-self: flex-start;
  margin-top: 2px;
}
</style>
