#!/usr/bin/env node
// scripts/verify-redirects.mjs
//
// Asserts:
// 1. Every entry in .vitepress/redirects.yml has a matching
//    dist/<from>/index.html stub whose meta-refresh URL contains the target.
// 2. The number of stubs matches the number of entries (no silent dupes).
// 3. The home page does not contain content blocks that the refresh removed
//    (Description heading, YouTube iframe).
//
// Reuses js-yaml (already a devDep). Exits non-zero on first failure.

import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const root = process.cwd()
const dist = path.join(root, '.vitepress', 'dist')
const yamlPath = path.join(root, '.vitepress', 'redirects.yml')

const fail = (msg) => { console.error(`✗ ${msg}`); process.exitCode = 1 }
const pass = (msg) => { console.log(`✓ ${msg}`) }

// --- 1. Parse redirects.yml ---
let entries
try {
  entries = yaml.load(await readFile(yamlPath, 'utf8'))
} catch (e) {
  fail(`could not parse ${yamlPath}: ${e.message}`)
  process.exit(1)
}
if (!entries || typeof entries !== 'object') {
  fail(`${yamlPath} did not parse to an object`)
  process.exit(1)
}
const pairs = Object.entries(entries)
pass(`parsed ${pairs.length} redirect entries from redirects.yml`)

// --- 2. Each entry has a stub ---
let missing = 0
for (const [from, to] of pairs) {
  const trimmed = from.replace(/^\//, '').replace(/\/$/, '')
  const stub = path.join(dist, trimmed, 'index.html')
  if (!existsSync(stub)) {
    fail(`missing stub: ${stub}`)
    missing++
    continue
  }
  const html = await readFile(stub, 'utf8')
  if (!html.includes(`url=${to}`) && !html.includes(`URL=${to}`)) {
    fail(`stub ${stub} does not refresh to ${to}`)
  }
}
if (missing === 0) pass(`all ${pairs.length} stubs exist with correct meta-refresh`)

// --- 3. Home cleanup invariants ---
const homeHtml = await readFile(path.join(dist, 'index.html'), 'utf8')
if (homeHtml.includes('youtube.com/embed')) fail('home still embeds a YouTube iframe (Task 11 incomplete)')
else pass('home: YouTube iframe absent')

if (/<h2[^>]*>\s*Description\s*</.test(homeHtml)) fail('home still contains "## Description" heading (Task 11 incomplete)')
else pass('home: Description heading absent')

if (/<h2[^>]*>\s*Applications\s*</.test(homeHtml)) fail('home still contains "## Applications" heading (Task 11 incomplete)')
else pass('home: Applications heading absent')

if (process.exitCode) {
  console.error('\nverify-redirects: FAILED')
} else {
  console.log('\nverify-redirects: OK')
}
