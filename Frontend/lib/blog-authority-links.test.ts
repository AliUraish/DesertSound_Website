import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlesDir = join(root, "content/articles")

const INSTALLER = "/home-cinema-and-cinema-installer-pakistan"
const THEATRE = "/service/home-theatre-design-and-installation"

const PLAN = [
  {
    file: "buy-jvc-projector-in-pakistan.md",
    href: INSTALLER,
    after:
      "Desert Sound supplies and installs JVC projectors in Pakistan as part of a [complete cinema install](/home-cinema-and-cinema-installer-pakistan).",
  },
  {
    file: "home-cinema-displays-made-simple-4k-8k-or-projector.md",
    href: INSTALLER,
    after:
      "Measure first, the way [a cinema installer surveys the room](/home-cinema-and-cinema-installer-pakistan).",
  },
  {
    file: "how-to-achieve-the-best-picture-quality-for-your-home-theater-projector-setup.md",
    href: INSTALLER,
    after:
      "Use a cinema mode, then tune on a film you know; [calibration at the main seat](/home-cinema-and-cinema-installer-pakistan) is the finish.",
  },
  {
    file: "how-to-choose-a-home-theater-setup-for-your-karachi-home.md",
    href: INSTALLER,
    after:
      "You choose by the room, the household, and what [a cinema installer](/home-cinema-and-cinema-installer-pakistan) can hide, power, and calibrate in that space.",
  },
  {
    file: "how-to-choose-between-hidden-in-wall-speakers-and-floor-standing-systems.md",
    href: INSTALLER,
    after:
      "That's a construction job, planned into [a home cinema install](/home-cinema-and-cinema-installer-pakistan) before the walls close.",
  },
  {
    file: "how-to-make-your-home-theater-kid-friendly-in-pakistani-homes.md",
    href: INSTALLER,
    after:
      "A new theatre and young kids in the same room is a short story if [the installer's plan](/home-cinema-and-cinema-installer-pakistan) ignores them.",
  },
  {
    file: "how-to-optimize-your-room-for-the-best-home-cinema-experience.md",
    href: INSTALLER,
    after:
      "The room decides more than the TV, which is why [installers survey it first](/home-cinema-and-cinema-installer-pakistan).",
  },
  {
    file: "how-to-plan-home-theater-installation-for-any-room.md",
    href: INSTALLER,
    after:
      "On [a Pakistan home cinema install](/home-cinema-and-cinema-installer-pakistan), also plan power and heat on day one.",
  },
  {
    file: "how-to-prevent-home-theater-system-overheating-problems.md",
    href: INSTALLER,
    after:
      "If that heat stays in a closed cabinet, films freeze, sound thins, and boards fail, which is why [a cinema installer plans that airflow](/home-cinema-and-cinema-installer-pakistan).",
  },
  {
    file: "how-to-make-your-media-room-design-more-versatile.md",
    href: THEATRE,
    after:
      "That's [a theatre layout and control plan](/service/home-theatre-design-and-installation), not themed wallpaper.",
  },
  {
    file: "top-mistakes-to-avoid-when-setting-up-your-home-theater-projector-and-screen.md",
    href: THEATRE,
    after:
      "Blackout and dimming are part of [the home theater installation](/service/home-theatre-design-and-installation).",
  },
  {
    file: "what-screen-size-works-best-for-home-theater-design.md",
    href: THEATRE,
    after:
      "That's the rule we use on [Pakistani home theatre jobs](/service/home-theatre-design-and-installation) when we need a first number before we fine-tune for the room.",
  },
] as const

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

function plannedAnchor(after: string, href: string) {
  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = after.match(new RegExp(`\\[([^\\]]+)\\]\\(${escaped}\\)`))
  assert.ok(match, `planned sentence must contain slashless link to ${href}`)
  return match[1]
}

function installerHrefs(links: { href: string }[]) {
  return links.filter((link) => link.href === INSTALLER || link.href === `${INSTALLER}/`)
}

test("each planned post has exactly one slashless authority link and the locked sentence", () => {
  const anchors = new Set<string>()
  for (const item of PLAN) {
    const body = articleBody(item.file)
    assert.ok(body.includes(item.after), `${item.file} is missing its locked sentence`)

    const links = markdownLinks(body)
    const planned = links.filter((link) => link.href === item.href)
    assert.equal(planned.length, 1, `${item.file} must have exactly one link to ${item.href}`)
    assert.equal(
      links.filter((link) => link.href === `${item.href}/`).length,
      0,
      `${item.file} must not use a trailing slash on ${item.href}`,
    )

    const installerLinks = installerHrefs(links)
    assert.ok(
      installerLinks.length <= 1,
      `${item.file} has ${installerLinks.length} installer authority links; at most one allowed`,
    )
    if (item.href === THEATRE) {
      assert.equal(installerLinks.length, 0, `${item.file} should not also link the installer page`)
    }

    const anchor = plannedAnchor(item.after, item.href)
    const words = anchor.split(/\s+/).filter(Boolean)
    assert.ok(words.length >= 2 && words.length <= 6, `"${anchor}" should be 2–6 words`)
    assert.equal(anchors.has(anchor), false, `duplicate authority anchor "${anchor}"`)
    anchors.add(anchor)

    assert.doesNotMatch(item.after, /Digital Sound/)
    assert.doesNotMatch(item.after, /\+92/)
    assert.doesNotMatch(item.after, /@/)
    assert.doesNotMatch(item.after, /\b(DHA|Clifton|Bahria|Model Town)\b/i)
  }
  assert.equal(anchors.size, PLAN.length)
})

test("no blog body has more than one installer authority link", () => {
  const files = readdirSync(articlesDir).filter((name) => name.endsWith(".md"))
  assert.ok(files.length > 0)
  for (const filename of files) {
    const body = articleBody(filename)
    const installerLinks = installerHrefs(markdownLinks(body))
    assert.ok(
      installerLinks.length <= 1,
      `${filename} has ${installerLinks.length} body links to ${INSTALLER}`,
    )
  }
})
