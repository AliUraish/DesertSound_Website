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

test("page sources do not promise a free consultation, survey, site survey, site visit, visit, quote, inspection, or estimate", () => {
  const banned = new RegExp(
    `free (${["consultation", "survey", "site survey", "site visit", "visit", "quote", "inspection", "estimate"].join("|")})`,
    "i",
  )
  const hits: string[] = []
  for (const file of sourceFiles) {
    if (file.endsWith(".test.ts")) continue
    if (!file.startsWith(frontendRoot + "/") && !file.startsWith(frontendRoot + "\\")) continue
    const text = readFileSync(file, "utf8")
    if (banned.test(text)) hits.push(relative(frontendRoot, file))
  }
  assert.deepEqual(hits, [])
})

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

test("page, component, and lib sources do not claim systems work without internet", () => {
  const banned = /without internet|continue without/i
  const hits: string[] = []
  for (const file of sourceFiles) {
    if (file.endsWith(".test.ts")) continue
    const rel = relative(repoRoot, file).replaceAll("\\", "/")
    if (!/(^|\/)(app|components|lib)\//.test(rel)) continue
    const text = readFileSync(file, "utf8")
    if (banned.test(text)) hits.push(rel)
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
