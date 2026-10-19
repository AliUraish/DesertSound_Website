import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const siteName = "Desert Sound"

const aboutTitle = "About Us: Karachi Home Theatre & Smart Homes"
const aboutDescription =
  "Desert Sound is a Karachi-based home theatre, AV and smart home company and CEDIA member. Turn-key rooms across Pakistan. Visit our Karachi showroom."
const banned = /Zamzama|DHA|Clifton|Bahria|best|#1|Digital Sound/i

function catalogStringField(source: string, slug: string, field: string) {
  const slice = source.split(`"slug": "${slug}"`)[1]
  assert.ok(slice, `missing catalog entry ${slug}`)
  const match = slice.match(new RegExp(`"${field}": "((?:\\\\.|[^"\\\\])*)"`))
  assert.ok(match, `missing ${field} on ${slug}`)
  return JSON.parse(`"${match[1]}"`) as string
}

function renderedFromTemplate(segment: string) {
  return `${segment} | ${siteName}`
}

const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)

test("about-us locks Pakistan SERP title and meta without doubling the brand", () => {
  const title = catalogStringField(ranking, "/about-us", "title")
  const description = catalogStringField(ranking, "/about-us", "description")

  assert.equal(title, aboutTitle)
  assert.equal(description, aboutDescription)
  assert.ok(description.length <= 155, `description is ${description.length} chars; want <= 155`)
  assert.doesNotMatch(title, banned)
  assert.doesNotMatch(description, banned)
  assert.doesNotMatch(title, /Desert Sound/)

  assert.match(layout, /template:\s*`%s \| \$\{siteName\}`/)
  const rendered = renderedFromTemplate(title)
  assert.equal(rendered, `${aboutTitle} | ${siteName}`)
  assert.ok(rendered.length <= 60, `rendered title is ${rendered.length} chars; want <= 60`)
  assert.equal(rendered.split("Desert Sound").length - 1, 1)
  assert.doesNotMatch(rendered, /Desert Sound \| Desert Sound/)
  assert.match(rendered, / \| Desert Sound$/)
})

test("about-us H1, homepage, and theatre titles stay untouched", () => {
  assert.equal(catalogStringField(ranking, "/about-us", "h1"), "About Desert Sound")
  assert.match(
    ranking.split('"slug": "/about-us"')[1]?.slice(0, 2500) ?? "",
    /Desert Sound is a Karachi-based home theatre, high-end audio-video, and smart home company/,
  )
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.match(theatreRoute, /serviceRouteMetadata\(slug\)/)
  assert.match(
    ranking.split('"slug": "/service/home-theatre-design-and-installation"')[1]?.slice(0, 500) ?? "",
    /Home Theater Installation in Pakistan \| Design and Install/,
  )
})
