import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { blogTitleSegment } from "./load-blog-articles.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const siteName = "Desert Sound"

const planTitle = "Plan or Renovate a Home Theater Room in Pakistan"
const planH1 = "How to Plan or Renovate a Home Theater Room in Pakistan"
const planDescription =
  "Planning or renovating a home theater room in Pakistan? Size, light, seating, wiring and power set the plan, and a site survey shapes the budget."
const planIntro =
  "Planning or renovating a home theater room in Pakistan starts with the room, not the gear. Seating, light, wiring, acoustics and power decide the work, and a site survey shapes the budget before anything is bought."
const planSlug = "/how-to-plan-home-theater-installation-for-any-room"
const freePattern = /(?<![-\w])free\b/i

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function renderedFromTemplate(segment: string) {
  return `${segment} | ${siteName}`
}

const article = readFileSync(
  join(root, "content/articles/how-to-plan-home-theater-installation-for-any-room.md"),
  "utf8",
)
const { meta, body } = parseFrontmatter(article)
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const slugPage = readFileSync(join(root, "app/[slug]/page.tsx"), "utf8")
const firstParagraph = body.trim().split(/\n\n+/)[0]?.trim() ?? ""

test("planning guide locks renovation title, meta, H1 and slug", () => {
  assert.equal(meta.title, planTitle)
  assert.equal(meta.h1, planH1)
  assert.equal(meta.description, planDescription)
  assert.equal(meta.slug, planSlug)
  assert.doesNotMatch(meta.title, /Desert Sound/)
  assert.match(meta.title, /renovat/i)
  assert.match(meta.description, /renovat/i)
  assert.doesNotMatch(meta.title, /cost/i)
  assert.doesNotMatch(meta.description, /cost/i)
  assert.doesNotMatch(meta.description, /\d/)
})

test("planning guide rendered title and meta stay in SERP length", () => {
  assert.match(layout, /template:\s*`%s \| \$\{siteName\}`/)
  assert.match(slugPage, /blogTitleSegment\(page\.title\)/)
  assert.match(slugPage, /description: page\.description/)

  const rendered = renderedFromTemplate(blogTitleSegment(meta.title))
  assert.equal(rendered, `${planTitle} | ${siteName}`)
  assert.ok(rendered.length <= 65, `rendered title is ${rendered.length} chars; want <= 65`)
  assert.ok(
    meta.description.length >= 140 && meta.description.length <= 155,
    `meta is ${meta.description.length} chars; want 140–155`,
  )
  assert.doesNotMatch(rendered, /Desert Sound \| Desert Sound/)
  assert.doesNotMatch(rendered, / - Desert Sound \|/)
  assert.match(rendered, / \| Desert Sound$/)
})

test("planning guide intro leads the body and stays free of cost/free claims", () => {
  assert.equal(firstParagraph, planIntro)
  assert.match(
    body,
    /Plan the room before you buy the display\. Size, light, and seating decide the gear — not the other way around\./,
  )
  assert.doesNotMatch(meta.title, freePattern)
  assert.doesNotMatch(meta.description, freePattern)
  assert.doesNotMatch(planIntro, freePattern)
})

test("planning guide points once to the cost post without trailing slashes", () => {
  const costHrefs = [...body.matchAll(/\]\(([^)]+)\)/g)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/home-theatre-system-cost-pakistan"))
  assert.equal(costHrefs.length, 1)
  assert.equal(costHrefs[0], "/home-theatre-system-cost-pakistan")
  assert.doesNotMatch(body, /\/home-theatre-system-cost-pakistan\//)
  assert.doesNotMatch(article, /\/service\/home-theatre-design-and-installation\//)
  assert.doesNotMatch(meta.title, /cost/i)
  assert.doesNotMatch(meta.description, /cost/i)
})

test("planning guide redo-a-room cost section sits after budget and stays claim-free", () => {
  const heading = "### What Drives the Cost of Renovating or Redoing a Home Theater Room"
  assert.equal(body.split(heading).length - 1, 1)

  const headingIndex = body.indexOf(heading)
  const costHrefs = [...body.matchAll(/\]\(([^)]+)\)/g)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/home-theatre-system-cost-pakistan"))
  assert.equal(costHrefs.length, 1)
  assert.equal(costHrefs[0], "/home-theatre-system-cost-pakistan")
  assert.ok(body.indexOf("/home-theatre-system-cost-pakistan") > headingIndex)

  assert.equal(body.split("](/contact-us)").length - 1, 1)
  assert.doesNotMatch(body, /\]\(\/contact-us\/\)/)

  const section = body.slice(headingIndex, body.indexOf("### DIY vs Professional"))
  assert.doesNotMatch(section, /\d/)
  assert.doesNotMatch(section, /(?<![-\w])free\b|\bbest\b|#1|\bleading\b|\btop\b/i)
})
