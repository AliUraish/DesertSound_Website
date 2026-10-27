import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlesDir = join(root, "content/articles")

const WORTH_IT = "/smart-home-automation-why-should-you-invest-in-it-for-your-home"
const WORTH_IT_FILE = "smart-home-automation-why-should-you-invest-in-it-for-your-home.md"
const REASONS_FILE = "what-are-5-reasons-for-a-smart-home.md"

const WORTH_IT_TITLE = "Is Smart Home Automation Worth It in Pakistan?"
const WORTH_IT_DESCRIPTION =
  "Is home automation in Pakistan worth it? One app for lights, AC, security and your home cinema. See what's worth automating first in your home."
const REASONS_TITLE = "What Are 5 Reasons for a Smart Home?"
const REASONS_DESCRIPTION =
  "Five reasons for a smart home: convenience, security, energy use, simpler entertainment, and daily comfort — if the devices are actually integrated."

const ANSWER_BLOCK =
  "It is worth it when it removes daily friction: one scene for the lights, AC and home cinema, and rooms that shut down when nobody is in them. In Pakistan, load-shedding and internet drops are part of daily life, so we plan the network and backup around outages before any gadgets."

const LOAD_SHEDDING_PARAGRAPH =
  "Only if it is planned for. Load-shedding and internet drops are part of daily life in Pakistan, so we plan the network and backup around outages. During the survey, we check how your home handles both and plan the system around them."

const INBOUND =
  "If you are still deciding, read [how we judge what a house actually needs automated](/smart-home-automation-why-should-you-invest-in-it-for-your-home)."

const BANNED = [/\bDHA\b/, /\bClifton\b/, /\bBahria\b/, /\bZamzama\b/, /\bPhase\b/, /Digital Sound/]

const OUTAGE_CLAIM_BAN =
  /keep(s)? working|without internet|still run|still works?|WAN is down|cloud-only|locally|offline|continue/i

/** Template heading is not article prose; strip it so `continue` in the ban can stay. */
function bodyProse(text: string) {
  return text.replaceAll("Continue exploring", "")
}

function parseFrontmatter(raw: string, filename: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, `${filename} must have JSON frontmatter`)
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function markdownLinks(body: string) {
  return [...body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => ({
    label: match[1],
    href: match[2],
  }))
}

function readArticle(filename: string) {
  const raw = readFileSync(join(articlesDir, filename), "utf8")
  return parseFrontmatter(raw, filename)
}

const worthIt = readArticle(WORTH_IT_FILE)
const reasons = readArticle(REASONS_FILE)
const rankingPage = readFileSync(join(root, "components/ranking-seo-page.tsx"), "utf8")

test("both smart-home posts lock title and meta and ban neighbourhood names in content text", () => {
  assert.equal(worthIt.meta.title, WORTH_IT_TITLE)
  assert.equal(worthIt.meta.description, WORTH_IT_DESCRIPTION)
  assert.equal(worthIt.meta.slug, WORTH_IT)
  assert.equal(worthIt.meta.h1, WORTH_IT_TITLE)

  assert.equal(reasons.meta.title, REASONS_TITLE)
  assert.equal(reasons.meta.description, REASONS_DESCRIPTION)
  assert.equal(reasons.meta.slug, "/what-are-5-reasons-for-a-smart-home")
  assert.equal(reasons.meta.h1, REASONS_TITLE)

  for (const [name, body] of [
    [WORTH_IT_FILE, worthIt.body],
    [REASONS_FILE, reasons.body],
  ] as const) {
    for (const pattern of BANNED) {
      assert.doesNotMatch(body, pattern, `${name} content matched ${pattern}`)
    }
  }
})

test("5-reasons has exactly one slashless href to the worth-it post with a non-title anchor", () => {
  assert.ok(reasons.body.includes(INBOUND), "5-reasons is missing its inbound sentence")

  const links = markdownLinks(reasons.body)
  const planned = links.filter((link) => link.href === WORTH_IT)
  assert.equal(planned.length, 1, "5-reasons must have exactly one link to the worth-it post")
  assert.equal(
    links.filter((link) => link.href === `${WORTH_IT}/`).length,
    0,
    "5-reasons must not use a trailing slash on the worth-it href",
  )
  assert.equal(planned[0].label, "how we judge what a house actually needs automated")
  assert.notEqual(planned[0].label, WORTH_IT_TITLE)
  assert.notEqual(planned[0].label, worthIt.meta.title)
  assert.doesNotMatch(reasons.body, /worth it/i)
  assert.doesNotMatch(reasons.meta.title, /worth it/i)
  assert.doesNotMatch(reasons.meta.h1, /worth it/i)
  assert.doesNotMatch(reasons.meta.description, /worth it/i)
})

test("worth-it answer block has no link and schema stays Article/Breadcrumb without FAQ or HowTo", () => {
  assert.ok(worthIt.body.includes(ANSWER_BLOCK), "worth-it post is missing the answer block")
  assert.equal(markdownLinks(ANSWER_BLOCK).length, 0)
  assert.doesNotMatch(ANSWER_BLOCK, /\]\(/)

  assert.match(rankingPage, /headline: page\.h1/)
  assert.match(rankingPage, /\{ name: page\.h1, path: page\.slug \}/)
  assert.ok(Array.isArray(worthIt.meta.faqs))
  assert.equal(worthIt.meta.faqs.length, 0)
  assert.match(rankingPage, /page\.faqs\.length > 0/)
  assert.doesNotMatch(rankingPage, /HowTo/)
  assert.doesNotMatch(rankingPage, /howToJsonLd/)
  assert.doesNotMatch(worthIt.body, /"@type": "FAQPage"/)
  assert.doesNotMatch(worthIt.body, /"@type": "HowTo"/)
  assert.doesNotMatch(worthIt.body, /\bUPS\b/)
  assert.match(rankingPage, /Continue exploring/)
  assert.doesNotMatch(bodyProse(worthIt.body), OUTAGE_CLAIM_BAN)
  assert.doesNotMatch(bodyProse(JSON.stringify(worthIt.meta)), OUTAGE_CLAIM_BAN)
  assert.ok(
    worthIt.body.includes(LOAD_SHEDDING_PARAGRAPH),
    "worth-it post is missing the load-shedding paragraph",
  )
})
