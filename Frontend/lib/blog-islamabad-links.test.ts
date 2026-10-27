import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlesDir = join(root, "content/articles")

const ISLAMABAD = "/service/home-cinema-installation-islamabad"

const PLAN = [
  {
    file: "how-home-theatres-are-becoming-part-of-modern-living-in-pakistan.md",
    after:
      "Desert Sound designs each room to the walls you have, not a catalogue layout. We plan [home cinemas in Islamabad](/service/home-cinema-installation-islamabad) the same way.",
  },
  {
    file: "customizing-home-theaters-for-apartments-vs-villas-in-pakistan.md",
    after:
      "Karachi apartments and Lahore houses fail for the same reason when they skip that step: gear chosen for a showroom, then forced into the room. [Home theatre installation in Islamabad](/service/home-cinema-installation-islamabad) starts with the same survey.",
  },
  {
    file: "home-cinema-power-protection-load-shedding-pakistan.md",
    after:
      "Visits run across Pakistan, including [Islamabad home cinema installs](/service/home-cinema-installation-islamabad).",
  },
  {
    file: "how-to-plan-home-theater-installation-for-any-room.md",
    after:
      "We do this sequence on apartments and villas so the builder, the painter, and the rack show up in the right order. It is the same order we follow for an [Islamabad home theatre installation](/service/home-cinema-installation-islamabad).",
  },
] as const

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

function plannedAnchor(after: string) {
  const escaped = ISLAMABAD.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = after.match(new RegExp(`\\[([^\\]]+)\\]\\(${escaped}\\)`))
  assert.ok(match, `planned sentence must contain slashless link to ${ISLAMABAD}`)
  return match[1]
}

test("each planned post has the locked Islamabad sentence and exactly one slashless service link", () => {
  const anchors = new Set<string>()
  for (const item of PLAN) {
    const body = articleBody(item.file)
    assert.ok(body.includes(item.after), `${item.file} is missing its locked sentence`)

    const links = markdownLinks(body)
    const planned = links.filter((link) => link.href === ISLAMABAD)
    assert.equal(planned.length, 1, `${item.file} must have exactly one link to ${ISLAMABAD}`)
    assert.equal(
      links.filter((link) => link.href === `${ISLAMABAD}/`).length,
      0,
      `${item.file} must not use a trailing slash on ${ISLAMABAD}`,
    )

    const anchor = plannedAnchor(item.after)
    const key = anchor.toLowerCase()
    assert.equal(anchors.has(key), false, `duplicate Islamabad anchor "${anchor}"`)
    anchors.add(key)

    for (const pattern of BANNED) {
      assert.doesNotMatch(body, pattern, `${item.file} body matched ${pattern}`)
    }
  }
  assert.equal(anchors.size, PLAN.length)
})
