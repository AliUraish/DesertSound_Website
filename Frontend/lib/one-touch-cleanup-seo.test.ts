import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUTAGE_LINE = "We plan the network and backup around outages."
const TOUCHSCREEN_HREF = "/touchscreen-panels-vs-mobile-apps-which-is-best"
const SLASHLESS_HREFS = [
  "/service/smart-home-automation",
  "/service/audio-distribution",
  "/essential-checklist-for-building-a-custom-home-cinema",
] as const

const articlePath = join(
  root,
  "content/articles/one-touch-smart-controls-for-lighting-sound-and-cinema-screens.md",
)
const article = readFileSync(articlePath, "utf8")

function count(haystack: string, needle: string) {
  return haystack.split(needle).length - 1
}

test("one-touch post locks the outage line and drops UPS copy", () => {
  assert.equal(count(article, OUTAGE_LINE), 1)
  assert.doesNotMatch(article, /\bUPS\b/)
  assert.doesNotMatch(article, /wipe the config/i)
  assert.doesNotMatch(article, /still works/i)
  assert.doesNotMatch(article, /keeps working/i)
  assert.doesNotMatch(article, /\boffline\b/i)
  assert.doesNotMatch(article, /works locally/i)
  assert.doesNotMatch(article, /(?<![-\w])free\b/i)
})

test("one-touch post uses slashless internal hrefs", () => {
  assert.doesNotMatch(article, /\]\(\/[^)]*\/\)/)
  assert.doesNotMatch(article, /"href": "\/[^"]*\/"/)
  for (const href of SLASHLESS_HREFS) {
    assert.ok(count(article, href) >= 1, `${href} must appear at least once`)
  }
  assert.equal(count(article, `](${TOUCHSCREEN_HREF})`), 1)
})
