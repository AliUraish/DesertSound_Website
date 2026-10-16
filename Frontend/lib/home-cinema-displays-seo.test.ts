import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { blogTitleSegment } from "./load-blog-articles.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const siteName = "Desert Sound"

const displaysTitle = "4K vs 8K vs Projector for Your Home Cinema"
const displaysH1 = "Home Cinema Displays Made Simple: 4K, 8K, or Projector"
const displaysDescription =
  "4K, 8K or a projector for your home cinema? In most Karachi apartments, 4K or a well-planned projector beats 8K. Choose by room size, daylight and seating."

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function renderedFromTemplate(segment: string) {
  return `${segment} | ${siteName}`
}

const article = readFileSync(
  join(root, "content/articles/home-cinema-displays-made-simple-4k-8k-or-projector.md"),
  "utf8",
)
const { meta, body } = parseFrontmatter(article)
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const slugPage = readFileSync(join(root, "app/[slug]/page.tsx"), "utf8")

test("home cinema displays keeps on-page H1 and locks title + meta", () => {
  assert.equal(meta.title, displaysTitle)
  assert.equal(meta.h1, displaysH1)
  assert.equal(meta.description, displaysDescription)
  assert.equal(meta.slug, "/home-cinema-displays-made-simple-4k-8k-or-projector")
  assert.ok(meta.description.length <= 155)
  assert.doesNotMatch(meta.title, /Desert Sound/)
  assert.match(body, /A big panel is not a home cinema/)
})

test("home cinema displays rendered title is single-branded", () => {
  assert.match(layout, /template:\s*`%s \| \$\{siteName\}`/)
  assert.match(slugPage, /blogTitleSegment\(page\.title\)/)
  assert.match(slugPage, /description: page\.description/)

  const rendered = renderedFromTemplate(blogTitleSegment(meta.title))
  assert.equal(rendered, `${displaysTitle} | ${siteName}`)
  assert.doesNotMatch(rendered, /Desert Sound \| Desert Sound/)
  assert.doesNotMatch(rendered, / - Desert Sound \|/)
  assert.match(rendered, / \| Desert Sound$/)
  assert.equal(displaysTitle.length, 42)
  assert.equal(displaysDescription.length, 155)
})
