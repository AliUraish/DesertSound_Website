import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { blogTitleSegment } from "./load-blog-articles.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlesDir = join(root, "content/articles")
const slugPage = readFileSync(join(root, "app/[slug]/page.tsx"), "utf8")
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const installer = readFileSync(
  join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md"),
  "utf8",
)

function articleTitles() {
  return readdirSync(articlesDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const raw = readFileSync(join(articlesDir, name), "utf8")
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
      assert.ok(match, `${name} must have JSON frontmatter`)
      const title = JSON.parse(match[1]).title
      assert.equal(typeof title, "string", `${name} must have a title`)
      return title as string
    })
}

function renderedBlogTitle(title: string) {
  return `${blogTitleSegment(title)} | Desert Sound`
}

test("blog generateMetadata strips the brand suffix for the layout title template", () => {
  assert.match(slugPage, /blogTitleSegment\(page\.title\)/)
  assert.match(layout, /template:\s*`%s \| \$\{siteName\}`/)
})

test("no rendered blog title contains Desert Sound | Desert Sound", () => {
  const titles = articleTitles()
  assert.ok(titles.length > 0)
  for (const title of titles) {
    const rendered = renderedBlogTitle(title)
    assert.doesNotMatch(rendered, /Desert Sound \| Desert Sound/)
    assert.doesNotMatch(rendered, /- Desert Sound \|/)
    assert.match(rendered, / \| Desert Sound$/)
  }
})

test("locked homepage, theatre, and installer titles stay untouched", () => {
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.match(theatreRoute, /serviceRouteMetadata\(slug\)/)
  assert.match(installer, /"title": "Home Cinema in Pakistan: A Cinema Installer from Design to Calibration"/)
})
