import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { getProject } from "./projects-data.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const siteName = "Desert Sound"

const affordableTitle = "Affordable Home Theatre Installation: Where to Spend First"
const affordableH1 = "Affordable Home Theatre Installation Ideas"
const affordableDescription =
  "Room, screen, sound, seating, light and cables: where to spend first on an affordable home theatre, what to build in stages and what not to cheap out on."

const emeraldSeoTitle = "Emerald Private Cinema | Home Theater Installation in Karachi"
const emeraldDescription =
  "A dedicated private cinema in Karachi with acoustic detailing, hidden wiring, and picture and sound calibrated to the seats. See how Desert Sound built it."

const residencySeoTitle = "Residency Private Cinema | Home Theater Installation in Karachi"
const residencyDescription =
  "A private cinema in Karachi built as a shared media room: recliners, a sofa, a large-format screen and acoustic walls, surveyed, designed and installed."

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function projectSerpDescription(project: NonNullable<ReturnType<typeof getProject>>) {
  return (
    project.seoDescription ??
    `${project.description} View this ${project.category.toLowerCase()} project by Desert Sound in ${project.location}.`
  )
}

function renderedFromTemplate(segment: string) {
  return `${segment} | ${siteName}`
}

const article = readFileSync(
  join(root, "content/articles/affordable-home-theatre-installation-ideas.md"),
  "utf8",
)
const { meta, body } = parseFrontmatter(article)
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const slugPage = readFileSync(join(root, "app/[slug]/page.tsx"), "utf8")
const rankingPage = readFileSync(join(root, "components/ranking-seo-page.tsx"), "utf8")
const rankingCatalog = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")

test("affordable ideas keeps on-page H1 and changes only title + meta", () => {
  assert.equal(meta.title, affordableTitle)
  assert.equal(meta.h1, affordableH1)
  assert.equal(meta.description, affordableDescription)
  assert.equal(meta.slug, "/affordable-home-theatre-installation-ideas")
  assert.doesNotMatch(meta.title, /Desert Sound/)
  assert.match(rankingPage, /\{page\.h1\}/)
  assert.match(rankingCatalog, /title: page\.h1/)
  assert.match(body, /A usable \[home theatre\]\(\/blogs\) does not start with the most expensive TV/)
})

test("affordable ideas rendered title is single-branded and OG/Twitter mirror title/meta", () => {
  assert.match(layout, /template:\s*`%s \| \$\{siteName\}`/)
  assert.match(slugPage, /createMetadata\(/)
  assert.match(slugPage, /description: page\.description/)
  assert.match(seo, /openGraph: \{\s*title: socialTitle,\s*description,/)
  assert.match(seo, /twitter: \{\s*card: "summary_large_image",\s*title: socialTitle,\s*description,/)

  const rendered = renderedFromTemplate(meta.title)
  assert.equal(rendered, `${affordableTitle} | ${siteName}`)
  assert.doesNotMatch(rendered, /Desert Sound \| Desert Sound/)
  assert.doesNotMatch(rendered, / - Desert Sound \|/)
  assert.match(rendered, / \| Desert Sound$/)
  assert.equal(affordableTitle.length, 58)
  assert.equal(affordableDescription.length, 153)
})

test("Emerald and Residency seoTitles stay locked; SERP descriptions are the Desk AFTER text", () => {
  const emerald = getProject("residential", "new-theatre")
  const residency = getProject("residential", "residency")
  assert.ok(emerald && residency)

  assert.equal(emerald.seoTitle, emeraldSeoTitle)
  assert.equal(residency.seoTitle, residencySeoTitle)
  assert.equal(emerald.title, "Emerald Private Cinema")
  assert.equal(residency.title, "Residency Private Cinema")
  assert.equal(
    emerald.description,
    "Dedicated home theater installation in Karachi with acoustic detailing, hidden wiring, and calibrated picture and sound.",
  )
  assert.equal(
    residency.description,
    "Karachi home theater installation for immersive viewing, refined comfort, and discreet lighting, sound, and display integration.",
  )

  assert.equal(projectSerpDescription(emerald), emeraldDescription)
  assert.equal(projectSerpDescription(residency), residencyDescription)
  assert.equal(emeraldDescription.length, 155)
  assert.equal(residencyDescription.length, 152)

  assert.match(seo, /project\.seoDescription \?\?/)
  assert.match(seo, /openGraph: \{\s*title: socialTitle,\s*description,/)
  assert.match(seo, /twitter: \{\s*card: "summary_large_image",\s*title: socialTitle,\s*description,/)

  const emeraldTitle = renderedFromTemplate(emerald.seoTitle ?? emerald.title)
  const residencyTitle = renderedFromTemplate(residency.seoTitle ?? residency.title)
  assert.doesNotMatch(emeraldTitle, /Desert Sound \| Desert Sound/)
  assert.doesNotMatch(emeraldTitle, / - Desert Sound \|/)
  assert.doesNotMatch(residencyTitle, /Desert Sound \| Desert Sound/)
  assert.doesNotMatch(residencyTitle, / - Desert Sound \|/)
})
