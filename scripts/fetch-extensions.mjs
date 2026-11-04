#!/usr/bin/env node
// scripts/fetch-extensions.mjs
//
// Imports the Zarr extensions registry (github.com/zarr-developers/zarr-extensions)
// into the site under /extensions/. The registry stays the normative source;
// everything written here is generated and gitignored.
//
//   <repo>/README.md               → extensions/index.md
//   <repo>/<point>/README.md       → extensions/<point>/index.md
//   <repo>/<point>/<name>/README.md → extensions/<point>/<name>/index.md
//   any other file                 → extensions/<path> and public/extensions/<path>
//
// Non-markdown files are copied next to the pages (so Vite can resolve images
// referenced from the markdown) and into public/ (so schema.json, sample data
// etc. are served verbatim, e.g. /extensions/codecs/jpeg/schema.json).
//
// Environment:
//   ZARR_EXTENSIONS_DIR  use a local checkout instead of cloning
//   ZARR_EXTENSIONS_REF  branch or tag to clone (default: main)

import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { cp, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

const REPO = 'zarr-developers/zarr-extensions'
const REPO_URL = `https://github.com/${REPO}`

const root = process.cwd()
const outPages = path.join(root, 'extensions')
const outPublic = path.join(root, 'public', 'extensions')

const ref = process.env.ZARR_EXTENSIONS_REF || 'main'
let src = process.env.ZARR_EXTENSIONS_DIR
let tmp
if (src) {
  src = path.resolve(src)
} else {
  tmp = await mkdtemp(path.join(os.tmpdir(), 'zarr-extensions-'))
  src = path.join(tmp, 'zarr-extensions')
  execFileSync('git', ['clone', '--quiet', '--depth', '1', '--branch', ref, `${REPO_URL}.git`, src], {
    stdio: 'inherit',
  })
}
const sha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: src, encoding: 'utf8' }).trim()

await rm(outPages, { recursive: true, force: true })
await rm(outPublic, { recursive: true, force: true })

const SKIP = new Set(['.git', '.github', 'node_modules'])

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(p)
    else if (entry.isFile()) yield p
  }
}

const toPosix = (p) => p.split(path.sep).join('/')
const githubUrl = (repoPath, isDir) =>
  `${REPO_URL}/${isDir ? 'tree' : 'blob'}/${sha}/${repoPath}`.replace(/\/$/, '')

// Rewrites one relative link target found in `fromRepoPath` (a README.md).
// - links to a README.md or to a directory with a README.md → page link
// - links to other files → left as-is (they are copied alongside the page)
// - links to directories without a page, or to missing paths → GitHub URL
function rewriteTarget(target, fromRepoPath) {
  if (/^([a-z][a-z0-9+.-]*:|#|\/)/i.test(target)) return target
  const [, pathPart, suffix = ''] = target.match(/^([^#?]*)(.*)$/)
  if (!pathPart) return target
  const fromDir = path.posix.dirname(fromRepoPath)
  const resolved = path.posix.normalize(path.posix.join(fromDir, decodeURI(pathPart)))
  if (resolved.startsWith('..')) return target
  const abs = path.join(src, resolved)
  if (!existsSync(abs)) return githubUrl(resolved, false) + suffix
  if (statSync(abs).isDirectory()) {
    if (existsSync(path.join(abs, 'README.md'))) {
      return pathPart.replace(/\/?$/, '/') + suffix
    }
    return githubUrl(resolved, true) + suffix
  }
  if (path.posix.basename(resolved) === 'README.md') {
    return pathPart.replace(/README\.md$/, '') + suffix
  }
  return target
}

// Inline links `[text](target "title")` and reference definitions
// `[label]: target`. Fenced code blocks are left untouched.
function rewriteLinks(md, fromRepoPath) {
  const parts = md.split(/(^```[\s\S]*?^```)/m)
  return parts
    .map((part, i) => {
      if (i % 2 === 1) return part
      return part
        .replace(/(\]\()(<[^>]+>|[^\s)]+)/g, (_, open, t) => {
          const bare = t.startsWith('<') ? t.slice(1, -1) : t
          return open + rewriteTarget(bare, fromRepoPath)
        })
        .replace(/^(\s{0,3}\[[^\]]+\]:\s*)(\S+)/gm, (_, open, t) => open + rewriteTarget(t, fromRepoPath))
    })
    .join('')
}

let pages = 0
let assets = 0
for await (const file of walk(src)) {
  const repoPath = toPosix(path.relative(src, file))
  if (path.posix.basename(repoPath) === 'README.md') {
    const md = await readFile(file, 'utf8')
    const outRel = repoPath.replace(/README\.md$/, 'index.md')
    const title = md.match(/^#\s+(.+)$/m)?.[1].trim()
    const frontmatter = [
      '---',
      ...(title ? [`title: ${JSON.stringify(title)}`] : []),
      `editUrl: ${REPO_URL}/edit/main/${repoPath}`,
      'lastUpdated: false',
      '---',
      '',
      // The registry is plain GitHub markdown, not a Vue template: render
      // `{{ }}` and friends literally.
      '<div v-pre>',
      '',
      '',
    ].join('\n')
    const footer = [
      '',
      '</div>',
      '',
      '<p class="extensions-source">',
      `Rendered from <a href="${githubUrl(repoPath, false)}">${REPO}/${repoPath}</a>`,
      `at <a href="${REPO_URL}/commit/${sha}"><code>${sha.slice(0, 7)}</code></a>.`,
      '</p>',
      '',
    ].join('\n')
    const dest = path.join(outPages, outRel)
    await mkdir(path.dirname(dest), { recursive: true })
    await writeFile(dest, frontmatter + rewriteLinks(md, repoPath) + footer)
    pages++
  } else {
    for (const base of [outPages, outPublic]) {
      const dest = path.join(base, repoPath)
      await mkdir(path.dirname(dest), { recursive: true })
      await cp(file, dest)
    }
    assets++
  }
}

if (tmp) await rm(tmp, { recursive: true, force: true })
console.log(`✓ imported ${pages} pages and ${assets} files from ${REPO}@${sha.slice(0, 7)}`)
