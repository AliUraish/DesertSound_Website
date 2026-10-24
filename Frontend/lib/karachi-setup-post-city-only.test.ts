import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlePath = join(
  root,
  "content/articles/how-to-choose-a-home-theater-setup-for-your-karachi-home.md",
)
const article = readFileSync(articlePath, "utf8")

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

const { body } = parseFrontmatter(article)

const neighbourhoods = [/\bDHA\b/, /\bClifton\b/, /\bBahria\b/, /\bZamzama\b/, /\bPhase\b/]

test("Karachi setup post body is city-only (no neighbourhood names)", () => {
  assert.match(
    body,
    /They rarely make a bright Karachi lounge into a cinema without a proper blackout plan\./,
  )
  assert.match(
    body,
    /In a finished Karachi apartment, plan surface trunking, furniture routing, or a survey that says what you can hide without opening marble\./,
  )

  for (const pattern of neighbourhoods) {
    assert.doesNotMatch(body, pattern)
  }
})
