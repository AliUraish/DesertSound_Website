import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, extname, join, relative } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const frontendRoot = join(dirname(fileURLToPath(import.meta.url)), "..")

const SKIP_DIRS = new Set([".git", ".next", ".next-build", ".next-dev", "dist", "node_modules"])
const SOURCE_EXT = new Set([".ts", ".tsx", ".md"])

function walk(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      walk(path, files)
      continue
    }
    if (SOURCE_EXT.has(extname(name))) files.push(path)
  }
  return files
}

const SCAN_DIRS = ["app", "lib", "content"].map((folder) => join(frontendRoot, folder))
const scannedFiles = SCAN_DIRS.flatMap((dir) => walk(dir))

const FREE_WORD = /(?<![-\w])free\b/i

/** Non-offer technical uses. Offer/promo "free" is still banned. */
const ALLOWED_FREE = [
  {
    file: "content/articles/how-to-choose-between-hidden-in-wall-speakers-and-floor-standing-systems.md",
    excerpt: "free the floor",
  },
  {
    file: "content/articles/how-to-make-your-home-theater-kid-friendly-in-pakistani-homes.md",
    excerpt: "keeps the main system free",
  },
  {
    file: "content/articles/how-to-set-up-the-best-audio-distribution-system-for-your-home.md",
    excerpt: "free-standing",
  },
  {
    file: "content/articles/the-benefits-of-a-professionally-installed-home-theatre-system.md",
    excerpt: "the wall you happened to have free",
  },
  {
    file: "content/articles/the-unseen-benefits-of-underfloor-audio.md",
    excerpt: "stay free for furniture",
  },
] as const

function maskAllowedFree(rel: string, text: string) {
  let masked = text
  for (const item of ALLOWED_FREE) {
    if (rel.replaceAll("\\", "/") === item.file) {
      masked = masked.split(item.excerpt).join(" ")
    }
  }
  return masked
}

test("app, lib, and content sources do not use free as an offer word", () => {
  assert.doesNotMatch("hands-free", FREE_WORD)
  const hits: string[] = []
  for (const file of scannedFiles) {
    if (file.endsWith(".test.ts")) continue
    const rel = relative(frontendRoot, file).replaceAll("\\", "/")
    const text = maskAllowedFree(rel, readFileSync(file, "utf8"))
    if (FREE_WORD.test(text)) hits.push(rel)
  }
  assert.deepEqual(hits, [])
})

test("app, lib, and content sources do not promise 24-hour or same-day replies", () => {
  const hits: string[] = []
  for (const file of scannedFiles) {
    if (file.endsWith(".test.ts")) continue
    const rel = relative(frontendRoot, file).replaceAll("\\", "/")
    const text = readFileSync(file, "utf8")
    if (/within 24 hours/i.test(text) || /same day/i.test(text)) hits.push(rel)
  }
  assert.deepEqual(hits, [])

  const contactSection = readFileSync(join(frontendRoot, "components/contact-section.tsx"), "utf8")
  const maintenance = readFileSync(
    join(frontendRoot, "components/service-pages/maintenance-and-support-page.tsx"),
    "utf8",
  )
  assert.doesNotMatch(contactSection, /within 24 hours/i)
  assert.match(contactSection, /Fill in the form and we will contact you\./)
  assert.doesNotMatch(maintenance, /same day/i)
  assert.doesNotMatch(maintenance, /Remote diagnostics usually start the same day/)
  assert.match(
    maintenance,
    /We start with remote diagnostics where possible, then arrange a visit if needed\./,
  )
})
