import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlesDir = join(root, "content/articles")

const GUIDE = "/private-home-cinema-karachi"

const PLAN = [
  {
    file: "how-to-choose-a-home-theater-setup-for-your-karachi-home.md",
    after:
      "We survey Karachi rooms, write the layout to that space, and install so the first film is the calibrated one, not the one you undo later. That survey-first order is how you [plan a private home cinema in Karachi](/private-home-cinema-karachi).",
  },
  {
    file: "diy-or-professional-home-theater-installation-which-is-better.md",
    after:
      "The same path is how you [install a private cinema in Karachi](/private-home-cinema-karachi).",
  },
] as const

const BANNED = [
  /\bClifton\b/,
  /\bDHA\b/,
  /\bZamzama\b/,
  /\bBahria\b/,
  /\bPhase\b/,
  /\bbest\b/i,
  /#1/,
  /Digital Sound/,
  /\bEmerald\b/,
  /\bResidency\b/,
  /\bPlatinum\b/,
  /\bVellari\b/,
  /\bStanley\b/,
]

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

function plannedAnchor(after: string) {
  const escaped = GUIDE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = after.match(new RegExp(`\\[([^\\]]+)\\]\\(${escaped}\\)`))
  assert.ok(match, `planned sentence must contain slashless link to ${GUIDE}`)
  return match[1]
}

test("each planned post has the locked private-cinema sentence and exactly one slashless guide link", () => {
  const anchors = new Set<string>()
  for (const item of PLAN) {
    const body = articleBody(item.file)
    assert.ok(body.includes(item.after), `${item.file} is missing its locked sentence`)

    const links = markdownLinks(body)
    const planned = links.filter((link) => link.href === GUIDE)
    assert.equal(planned.length, 1, `${item.file} must have exactly one link to ${GUIDE}`)
    assert.equal(
      links.filter((link) => link.href === `${GUIDE}/`).length,
      0,
      `${item.file} must not use a trailing slash on ${GUIDE}`,
    )

    const anchor = plannedAnchor(item.after)
    assert.equal(anchors.has(anchor), false, `duplicate private-cinema anchor "${anchor}"`)
    anchors.add(anchor)

    for (const pattern of BANNED) {
      assert.doesNotMatch(item.after, pattern)
    }
  }
  assert.equal(anchors.size, PLAN.length)
})
