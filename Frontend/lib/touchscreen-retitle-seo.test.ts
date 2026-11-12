import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const TITLE = "Touchscreen Panels vs. Mobile Apps for Smart Home Control"
const SLUG = "/touchscreen-panels-vs-mobile-apps-which-is-best"
const EXPLORING_HREFS = [
  "/how-to-choose-a-home-automation-system-pakistan",
  "/one-touch-smart-controls-for-lighting-sound-and-cinema-screens",
  "/the-role-of-networking-solutions-in-a-smart-home-setup",
] as const

const articlePath = join(
  root,
  "content/articles/touchscreen-panels-vs-mobile-apps-which-is-best.md",
)
const oneTouchPath = join(
  root,
  "content/articles/one-touch-smart-controls-for-lighting-sound-and-cinema-screens.md",
)
const article = readFileSync(articlePath, "utf8")
const oneTouch = readFileSync(oneTouchPath, "utf8")

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function count(haystack: string, needle: string) {
  return haystack.split(needle).length - 1
}

const { meta, body } = parseFrontmatter(article)

test("touchscreen post keeps slug and drops Which Is Best from title and H1", () => {
  assert.equal(meta.slug, SLUG)
  assert.equal(meta.title, TITLE)
  assert.equal(meta.h1, TITLE)
  assert.doesNotMatch(meta.title, /best/i)
  assert.doesNotMatch(meta.h1, /best/i)
  assert.ok(body.includes("We plan the network and backup around outages."))
  assert.doesNotMatch(article, /(?<![-\w])free\b/i)

  for (const href of EXPLORING_HREFS) {
    assert.equal(count(body, `](${href})`), 1, `${href} must appear once without a trailing slash`)
    assert.equal(count(body, `](${href}/)`), 0, `${href} must not use a trailing slash`)
  }
})

test("one-touch post links to the touchscreen comparison once", () => {
  assert.equal(count(oneTouch, "](/touchscreen-panels-vs-mobile-apps-which-is-best)"), 1)
})
