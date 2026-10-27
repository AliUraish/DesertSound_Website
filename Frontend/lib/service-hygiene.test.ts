import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, extname, join, relative } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const frontendRoot = join(dirname(fileURLToPath(import.meta.url)), "..")
const repoRoot = join(frontendRoot, "..")

const SKIP_DIRS = new Set([
  ".git",
  ".next",
  ".next-build",
  ".next-dev",
  "dist",
  "node_modules",
])

const SOURCE_EXT = new Set([".cjs", ".css", ".html", ".js", ".json", ".jsx", ".md", ".mjs", ".ts", ".tsx"])

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

const sourceFiles = walk(repoRoot)
const truncatedTel = ["tel:", "+922111", "570111"].join("")
const correctTel = "tel:+9221111570111"

test("no source file contains the truncated showroom tel href", () => {
  const hits = sourceFiles.filter((file) => readFileSync(file, "utf8").includes(truncatedTel))
  assert.deepEqual(
    hits.map((file) => relative(repoRoot, file)),
    [],
  )
})

test("every tel: link equals tel:+9221111570111", () => {
  const telHref = /(?:href\s*=\s*["'`]|href:\s*["'`])(tel:[^"'`]+)/g
  const wrong: string[] = []
  for (const file of sourceFiles) {
    const text = readFileSync(file, "utf8")
    for (const match of text.matchAll(telHref)) {
      if (match[1] !== correctTel) {
        wrong.push(`${relative(repoRoot, file)}: ${match[1]}`)
      }
    }
  }
  assert.deepEqual(wrong, [])
})

test("home-networking title drops leading Best; schema name matches", () => {
  const ranking = readFileSync(join(frontendRoot, "lib/ranking-seo-content.ts"), "utf8")
  const seo = readFileSync(join(frontendRoot, "lib/seo.ts"), "utf8")
  const rankingBlock = ranking.split('"slug": "/service/home-networking-and-wi-fi"')[1]
  const catalogBlock = seo.split('path: "/service/home-networking-and-wi-fi"')[1]
  assert.ok(rankingBlock)
  assert.ok(catalogBlock)
  assert.match(rankingBlock.slice(0, 400), /"title": "Home Networking & Wi-Fi Service in Karachi"/)
  assert.match(catalogBlock.slice(0, 400), /title: "Home Networking & Wi-Fi Service in Karachi"/)
  assert.doesNotMatch(rankingBlock.slice(0, 400), /"title": "Best Home Networking/)
  assert.doesNotMatch(catalogBlock.slice(0, 400), /title: "Best Home Networking/)
})

function isPageComponentOrLib(file: string) {
  const rel = relative(repoRoot, file).replaceAll("\\", "/")
  return /(^|\/)(app|components|lib)\//.test(rel)
}

const FREE_PROMISE = /(?<![-\w])free (consultation|survey|site survey|site visit|visit|quote|inspection|estimate)/i

test("page sources do not promise a free consultation, survey, site survey, site visit, visit, quote, inspection, or estimate", () => {
  const hits: string[] = []
  for (const file of sourceFiles) {
    if (file.endsWith(".test.ts")) continue
    if (!isPageComponentOrLib(file)) continue
    const text = readFileSync(file, "utf8")
    if (FREE_PROMISE.test(text)) hits.push(relative(frontendRoot, file))
  }
  assert.deepEqual(hits, [])
})

const AWARD_IDENTIFIERS = [
  "Best Home Theater and Smart Home Solutions Company in Pakistan",
  "Best Home Theater Company in Pakistan",
  "Best Home Theater Company",
]

function maskNonCopyBestIdentifiers(text: string) {
  let masked = text.replace(/\/\*[\s\S]*?\*\//g, " ")
  masked = masked.replace(/(^|[^:"'])\/\/.*$/gm, "$1")
  masked = masked.replace(/\]\((\/[^)]+)\)/g, "]()")
  masked = masked.replace(/(?:href|src|slug|path|to|file)\s*[:=]\s*["'`][^"'`]+["'`]/g, "")
  masked = masked.replace(/["'`]\/[^"'`]+["'`]/g, "''")
  masked = masked.replace(/\b[\w./-]*best[\w./-]*\.(md|ts|tsx|js|mjs)/gi, "")
  for (const award of AWARD_IDENTIFIERS) {
    masked = masked.split(award).join("")
  }
  return masked
}

test("networking title, meta, and headings contain no Best", () => {
  const ranking = readFileSync(join(frontendRoot, "lib/ranking-seo-content.ts"), "utf8")
  const seo = readFileSync(join(frontendRoot, "lib/seo.ts"), "utf8")
  const rankingBlock = ranking.split('"slug": "/service/home-networking-and-wi-fi"')[1] ?? ""
  const catalogBlock = seo.split('path: "/service/home-networking-and-wi-fi"')[1] ?? ""
  const rankingPage = rankingBlock.split('"slug":')[0]
  const catalogPage = catalogBlock.split("path:")[0]
  const bestWord = /\bBest\b/i
  assert.doesNotMatch(rankingPage, bestWord)
  assert.doesNotMatch(catalogPage, bestWord)
  const title = rankingPage.match(/"title":\s*"([^"]+)"/)?.[1] ?? ""
  const description = rankingPage.match(/"description":\s*"([^"]+)"/)?.[1] ?? ""
  const h1 = rankingPage.match(/"h1":\s*"([^"]+)"/)?.[1] ?? ""
  const headings = [...rankingPage.matchAll(/###[^\n\\]+/g)].map((match) => match[0])
  for (const text of [title, description, h1, ...headings]) {
    assert.doesNotMatch(text, bestWord)
  }
  assert.doesNotMatch(catalogPage.match(/title:\s*"([^"]+)"/)?.[1] ?? "", bestWord)
  assert.doesNotMatch(catalogPage.match(/description:\s*\n?\s*"([^"]+)"/)?.[1] ?? "", bestWord)
})

test("page, component, and lib visible copy does not use the word best", () => {
  const banned = /\bbest\b/i
  const hits: string[] = []
  for (const file of sourceFiles) {
    if (file.endsWith(".test.ts")) continue
    if (!isPageComponentOrLib(file)) continue
    const rel = relative(repoRoot, file).replaceAll("\\", "/")
    if (rel.endsWith("components/testimonials.tsx")) continue // customer quotes are verbatim
    if (rel.endsWith("lib/theatre-service-howto.ts")) continue // deleted by PR #75
    const text = maskNonCopyBestIdentifiers(readFileSync(file, "utf8"))
    if (banned.test(text)) hits.push(rel)
  }
  assert.deepEqual(hits, [])
})

test("page, component, and lib sources do not claim systems work without internet", () => {
  const banned = /without internet|continue without/i
  const hits: string[] = []
  for (const file of sourceFiles) {
    if (file.endsWith(".test.ts")) continue
    if (!isPageComponentOrLib(file)) continue
    const text = readFileSync(file, "utf8")
    if (banned.test(text)) hits.push(relative(repoRoot, file).replaceAll("\\", "/"))
  }
  assert.deepEqual(hits, [])
})

test("homepage Smart Home Automation heading is a crawlable service link", () => {
  const section = readFileSync(join(frontendRoot, "components/services-section.tsx"), "utf8")
  assert.match(
    section,
    /title === "Smart Home Automation" && link \?[\s\S]*?<a href=\{link\} className="text-inherit no-underline">[\s\S]*?\{title\}/,
  )
  assert.match(section, /link: "\/service\/smart-home-automation"/)
  assert.equal((section.match(/<a href=\{link\} className="text-inherit no-underline">/g) ?? []).length, 2)
})
