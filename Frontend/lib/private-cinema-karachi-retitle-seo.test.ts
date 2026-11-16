import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { blogTitleSegment } from "./load-blog-articles.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const TITLE = "Private Cinema in Karachi: Planning One at Home"
const H1 = "Planning a Private Home Cinema in Karachi"
const SLUG = "/private-home-cinema-karachi"
const DESCRIPTION =
  "Planning a private cinema at home in Karachi? Compare a dedicated room with a shared lounge, then plan seating, screen, sound, wiring and the site survey."
const BANNED_TITLE = /\b(best|top|leading|trusted)\b|#1/i
const BANNED_FREE = /(?<![-\w])free\b/i

const articlePath = join(root, "content/articles/private-home-cinema-karachi.md")
const article = readFileSync(articlePath, "utf8")
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const slugPage = readFileSync(join(root, "app/[slug]/page.tsx"), "utf8")

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

const { meta } = parseFrontmatter(article)

test("private cinema Karachi retitle keeps H1, slug, and meta; title is single-branded", () => {
  assert.equal(meta.slug, SLUG)
  assert.equal(meta.title, TITLE)
  assert.equal(meta.h1, H1)
  assert.equal(meta.description, DESCRIPTION)
  assert.doesNotMatch(meta.title, BANNED_TITLE)
  assert.doesNotMatch(meta.title, BANNED_FREE)
  assert.doesNotMatch(meta.title, /Desert Sound/)
  assert.equal(blogTitleSegment(meta.title), meta.title)

  assert.match(slugPage, /blogTitleSegment\(page\.title\)/)
  assert.match(layout, /template:\s*`%s \| \$\{siteName\}`/)

  const rendered = `${blogTitleSegment(meta.title)} | Desert Sound`
  assert.equal(rendered, `${TITLE} | Desert Sound`)
  assert.equal(rendered.split("Desert Sound").length - 1, 1)
  assert.doesNotMatch(rendered, /Desert Sound \| Desert Sound/)
  assert.match(rendered, / \| Desert Sound$/)
})
