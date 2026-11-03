import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const siteName = "Desert Sound"

const title = "Multi-Room Audio Distribution in Pakistan"
const description =
  "One system for music in every room. We plan the speakers, wiring and control for homes in Karachi and across Pakistan. Fill in the form and we will contact you."

const banned = /\bfree\b|\bbest\b|#1|\bPKR\b|\bRs\.?\s?\d|\blakh\b|\d+\s?%|\b\d+\s?(day|days|week|weeks|month|months)\b/i

function catalogStringField(source: string, slug: string, field: string) {
  const slice = source.split(`"slug": "${slug}"`)[1]
  assert.ok(slice, `missing catalog entry ${slug}`)
  const match = slice.match(new RegExp(`"${field}": "((?:\\\\.|[^"\\\\])*)"`))
  assert.ok(match, `missing ${field} on ${slug}`)
  return JSON.parse(`"${match[1]}"`) as string
}

function catalogServiceField(source: string, path: string, field: "title" | "description") {
  const slice = source.split(`path: "${path}"`)[1]
  assert.ok(slice, `missing catalogServicePages entry ${path}`)
  if (field === "title") {
    const match = slice.match(/title:\s*"((?:\\.|[^"\\])*)"/)
    assert.ok(match, `missing title on ${path}`)
    return JSON.parse(`"${match[1]}"`) as string
  }
  const match = slice.match(/description:\s*\n?\s*"((?:\\.|[^"\\])*)"/)
  assert.ok(match, `missing description on ${path}`)
  return JSON.parse(`"${match[1]}"`) as string
}

function renderedFromTemplate(segment: string) {
  return `${segment} | ${siteName}`
}

const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const livePage = readFileSync(join(root, "app/services/audio-systems/page.tsx"), "utf8")
const serviceRoute = readFileSync(join(root, "app/service/audio-distribution/page.tsx"), "utf8")

test("audio-distribution locks title and meta without doubling the brand", () => {
  const rankingTitle = catalogStringField(ranking, "/service/audio-distribution", "title")
  const rankingDescription = catalogStringField(ranking, "/service/audio-distribution", "description")
  const catalogTitle = catalogServiceField(seo, "/service/audio-distribution", "title")
  const catalogDescription = catalogServiceField(seo, "/service/audio-distribution", "description")

  assert.equal(rankingTitle, title)
  assert.equal(rankingDescription, description)
  assert.equal(catalogTitle, title)
  assert.equal(catalogDescription, description)
  assert.doesNotMatch(rankingTitle, /Desert Sound/)
  assert.doesNotMatch(catalogTitle, /Desert Sound/)

  assert.match(layout, /template:\s*`%s \| \$\{siteName\}`/)
  assert.match(serviceRoute, /serviceRouteMetadata\(slug\)/)
  assert.doesNotMatch(serviceRoute, /title: \{ absolute/)

  const rendered = renderedFromTemplate(rankingTitle)
  assert.equal(rendered, "Multi-Room Audio Distribution in Pakistan | Desert Sound")
  assert.equal(rendered.split("Desert Sound").length - 1, 1)
  assert.doesNotMatch(rendered, /Desert Sound \| Desert Sound/)
  assert.match(rendered, / \| Desert Sound$/)

  for (const text of [rankingTitle, rankingDescription, catalogTitle, catalogDescription]) {
    assert.doesNotMatch(text, banned)
  }
})

test("audio-distribution OG/Twitter follow title/meta; live H1 is not driven by this data", () => {
  assert.match(seo, /openGraph: \{\s*title: socialTitle,\s*description,/)
  assert.match(seo, /twitter: \{\s*card: "summary_large_image",\s*title: socialTitle,\s*description,/)
  assert.match(seo, /function brandedSocialTitle\(title: string\) \{\s*return title\.includes\(siteName\) \? title : `\$\{title\} \| \$\{siteName\}`/)

  assert.equal(
    catalogStringField(ranking, "/service/audio-distribution", "h1"),
    "Audio Distribution Installation in Pakistan",
  )
  assert.match(livePage, /<h1[\s\S]*?>[\s\S]*?Audio Systems[\s\S]*?& Distribution/)
})
