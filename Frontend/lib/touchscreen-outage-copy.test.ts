import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlePath = join(
  root,
  "content/articles/touchscreen-panels-vs-mobile-apps-which-is-best.md",
)
const article = readFileSync(articlePath, "utf8")

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

const { body } = parseFrontmatter(article)

test("touchscreen post uses the site outage-planning line", () => {
  assert.ok(body.includes("We plan the network and backup around outages."))
  assert.doesNotMatch(article, /works if the internet is down/i)
  assert.doesNotMatch(article, /failover/i)
  assert.doesNotMatch(article, /fails? when Wi-?Fi fails/i)
})
