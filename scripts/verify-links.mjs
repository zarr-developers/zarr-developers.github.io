#!/usr/bin/env node
// scripts/verify-links.mjs
//
// Walks dist/**/*.html, extracts internal hrefs (starting with "/"), and
// asserts each target resolves to a file in dist.
//
// Internal hrefs are filtered: external (http(s)://), anchors (#...), and
// hrefs that match a `from:` key in redirects.yml are skipped — those are
// covered by verify-redirects.mjs.

import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const root = process.cwd()
const dist = path.join(root, '.vitepress', 'dist')
const yamlPath = path.join(root, '.vitepress', 'redirects.yml')

const fail = (msg) => { console.error(`✗ ${msg}`); process.exitCode = 1 }
const pass = (msg) => { console.log(`✓ ${msg}`) }

const redirectFroms = new Set(
  Object.keys(yaml.load(await readFile(yamlPath, 'utf8')) ?? {}).map((k) =>
    k.replace(/\/$/, '').replace(/^\//, ''),
  ),
)

async function* walkHtml(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walkHtml(p)
    else if (entry.isFile() && p.endsWith('.html')) yield p
  }
}

// VitePress's base path; falls back to '/' for normal builds.
const base = (process.env.READTHEDOCS_CANONICAL_URL
  ? new URL(process.env.READTHEDOCS_CANONICAL_URL).pathname
  : '/').replace(/\/$/, '')

const internalHrefRe = /href="([^"#?]+)(?:[#?][^"]*)?"/g

let checked = 0
let badCount = 0
for await (const file of walkHtml(dist)) {
  const html = await readFile(file, 'utf8')
  for (const m of html.matchAll(internalHrefRe)) {
    const href = m[1]
    if (!href.startsWith('/')) continue          // external or relative
    if (href.startsWith('//')) continue          // protocol-relative
    let rel = href
    if (base && rel.startsWith(base + '/')) rel = rel.slice(base.length)

    const trimmed = rel.replace(/\/$/, '').replace(/^\//, '')
    if (redirectFroms.has(trimmed)) continue     // covered by verify-redirects

    // Resolve to file in dist:
    //   /foo/         → dist/foo/index.html
    //   /foo          → dist/foo.html OR dist/foo/index.html
    //   /assets/x.js  → dist/assets/x.js
    const candidates = []
    if (rel.endsWith('/')) {
      candidates.push(path.join(dist, rel, 'index.html'))
    } else if (path.extname(rel)) {
      candidates.push(path.join(dist, rel))
    } else {
      candidates.push(path.join(dist, `${rel}.html`))
      candidates.push(path.join(dist, rel, 'index.html'))
    }
    if (!candidates.some(existsSync)) {
      fail(`broken internal link in ${path.relative(dist, file)}: ${href}`)
      badCount++
    }
    checked++
  }
}

if (badCount === 0) pass(`checked ${checked} internal links across dist; all resolve`)
if (process.exitCode) console.error('\nverify-links: FAILED')
else console.log('\nverify-links: OK')
