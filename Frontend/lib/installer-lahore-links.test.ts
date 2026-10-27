import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlesDir = join(root, "content/articles")

const FILE = "home-cinema-and-cinema-installer-pakistan.md"
const LAHORE = "/service/home-cinema-installation-lahore"
const SENTENCE =
  "Outside Karachi, we have a team in Lahore for [home cinema installation in Lahore](/service/home-cinema-installation-lahore)."

const BANNED = [/\bDHA\b/, /\bClifton\b/, /\bBahria\b/, /\bZamzama\b/, /\bPhase\b/, /Digital Sound/]

function markdownLinks(body: string) {
  return [...body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => ({
    label: match[1],
    href: match[2],
  }))
}

function articleBody(filename: string) {
  const raw = readFileSync(join(articlesDir, filename), "utf8")
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, `${filename} must have JSON frontmatter`)
  return match[1]
}

test("installer article has the locked Lahore sentence and exactly one slashless Lahore service link", () => {
  const body = articleBody(FILE)
  assert.ok(body.includes(SENTENCE), `${FILE} is missing its locked sentence`)
  assert.match(body, /we have a team in Lahore/)

  const links = markdownLinks(body)
  const planned = links.filter(
    (link) => link.href === LAHORE && link.label === "home cinema installation in Lahore",
  )
  assert.equal(planned.length, 1, `${FILE} must have exactly one link to ${LAHORE}`)
  assert.equal(
    links.filter((link) => link.href === `${LAHORE}/`).length,
    0,
    `${FILE} must not use a trailing slash on ${LAHORE}`,
  )

  for (const pattern of BANNED) {
    assert.doesNotMatch(SENTENCE, pattern, `${FILE} matched ${pattern}`)
  }
})
