import assert from "node:assert/strict"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { loadBlogArticles } from "./load-blog-articles.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlesDir = join(root, "content/articles")
const filename = "home-theatre-system-cost-pakistan.md"
const slug = "/home-theatre-system-cost-pakistan"
const articlePath = join(articlesDir, filename)

const TITLE = "What Drives Home Theatre System Cost in Pakistan"
const DESCRIPTION =
  "What drives home theater system cost in Pakistan: room size, screen or projector, speakers, acoustics, seating, wiring and power, and why we survey first."
const H1 = "Home Theatre System Cost in Pakistan: What Actually Drives the Price"
const ANSWER_BLOCK =
  "A home theatre system in Pakistan is priced by the room it goes into, not by a box off a shelf. Room size and use, screen or projector, the speaker layout, acoustic treatment, seating, wiring, power protection and calibration each move the total, so a fair figure only comes after the room has been surveyed."
const ENTITY =
  "Desert Sound designs and installs home cinemas, home theatres and smart homes across Pakistan, with a showroom in Karachi."
const CTA_SENTENCE = "Fill in the form and we will contact you."
const LAHORE_SENTENCE = "We have a team in Lahore."
const COST_FAQ_Q = "How much does a home theatre cost in Pakistan?"

const H2S = [
  "Room Size and Room Type Set Everything Else",
  "A Large Screen or a Projector",
  "Speaker Layout: 5.1, 7.1 and Atmos in Plain Terms",
  "How Much Acoustic Treatment the Room Needs",
  "How Many Seats, and How Many Rows",
  "Wiring and Conduit: New Build vs a Finished Room",
  "Power Protection for Load-Shedding",
  "Calibration at Handover",
  "Why We Quote After a Site Survey",
]

const TABLE_LINKS = [
  {
    label: "how we design and fit a complete theatre room",
    href: "/service/home-theatre-design-and-installation",
  },
  {
    label: "everything an installer handles between survey and handover",
    href: "/home-cinema-and-cinema-installer-pakistan",
  },
  {
    label: "planning a dedicated cinema room in Karachi",
    href: "/private-home-cinema-karachi",
  },
  {
    label: "what a stabilizer, UPS and surge protector each do for the room",
    href: "/home-cinema-power-protection-load-shedding-pakistan",
  },
  { label: "Book a Consultation", href: "/contact-us" },
] as const

const BODY_LINK_ORDER = [
  TABLE_LINKS[3],
  TABLE_LINKS[1],
  TABLE_LINKS[0],
  TABLE_LINKS[2],
  TABLE_LINKS[4],
]

function parseFrontmatter(raw: string, name = filename) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, `${name} must have JSON frontmatter`)
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function markdownLinks(text: string) {
  return [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => ({
    label: match[1],
    href: match[2],
  }))
}

function wordCount(text: string) {
  return text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length
}

function wordList(text: string) {
  return text.toLowerCase().match(/[a-z0-9']+/g) ?? []
}

function eightGrams(text: string) {
  const words = wordList(text)
  const grams = new Set<string>()
  for (let i = 0; i <= words.length - 8; i++) {
    grams.add(words.slice(i, i + 8).join(" "))
  }
  return grams
}

function headingText(source: string) {
  return [...source.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map((match) =>
    match[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/&apos;/g, "'")
      .replace(/\s+/g, " ")
      .trim(),
  )
}

function readArticle(name: string) {
  return parseFrontmatter(readFileSync(join(articlesDir, name), "utf8"), name)
}

const { meta, body } = parseFrontmatter(readFileSync(articlePath, "utf8"))
const copy = [body, meta.title, meta.h1, meta.description].join("\n")
const h2s = [...body.matchAll(/^## (.+)$/gm)].map((match) => match[1])
const anchors = markdownLinks(body)
const rankingPage = readFileSync(join(root, "components/ranking-seo-page.tsx"), "utf8")
const rankingCatalog = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const llmsTxt = readFileSync(join(root, "public/llms.txt"), "utf8")

test("T1 banned words stay out of the cost post", () => {
  const patterns = [
    /\bbest\b/i,
    /\bcheap(est)?\b/i,
    /\baffordable\b/i,
    /budget[- ]friendly/i,
    /\bleading\b/i,
    /number one/i,
    /(?<![-\w])free\b/i,
    /complimentary|no[- ]charge|no[- ]obligation/i,
    /\bUS\b/,
    /\bUSA\b/,
    /\bUK\b/,
    /America|Britain|England/i,
    /Digital Sound/i,
    /Cinematics|Integrated Kontrols|Orient AV|\bTriad\b|Nashco|Resco|MTronic|Smartinn|Okasha/i,
    /\bDHA\b|Clifton|Bahria|Zamzama|Gulberg|Defence|PECHS|Gulshan|\bphase\b|\bsectors?\b/i,
    /\b(Sony|Epson|BenQ|JVC|Samsung|LG|Yamaha|Denon|Marantz|Onkyo|KEF|Klipsch|Bose|JBL|Sonos|Bowers|Control4|Crestron|HDL)\b/,
    /where to spend first|in stages|simple sequence/i,
  ]
  for (const pattern of patterns) {
    assert.doesNotMatch(copy, pattern, `${pattern} matched cost-post copy`)
  }
  assert.equal(body.includes("#1"), false)
  assert.doesNotMatch(body, /\btop\s+(rated|brands?|picks?|\d+|ten|five)\b/i)
  for (const field of [meta.title, meta.h1, meta.description, ...h2s, ...anchors.map((link) => link.label)]) {
    assert.doesNotMatch(field, /\btop\b/i, `"${field}" must not use top as a ranking`)
  }
  assert.doesNotMatch("hands-free", /(?<![-\w])free\b/i)
})

test("T2 no prices in the cost post", () => {
  assert.doesNotMatch(copy, /\b(PKR|Rs\.?|rupees?|lakh|lac|crore)\b/i)
  assert.doesNotMatch(copy, /\b(thousand|million|hundred)\b/i)
  assert.doesNotMatch(copy, /starting (at|from)/i)
  assert.doesNotMatch(copy, /\b(?!(?:4|8)K\b)\d+\s?k\b/i)
  assert.doesNotMatch(copy, /\bfrom\s+[\d.,]+\S*\s+to\s+[\d.,]+/i)
})

test("T3 digit tokens are only speaker layouts or 4K/8K", () => {
  const tokens = body.match(/[0-9][0-9A-Za-z.]*/g) ?? []
  assert.ok(tokens.length > 0, "body should use allowlisted 4K/8K or layout tokens")
  for (const token of tokens) {
    const pieces = token.replace(/\.$/, "").split("/")
    for (const piece of pieces) {
      assert.match(piece, /^(?:\d\.\d(?:\.\d)?|[48]K)$/, `unexpected digit token ${token}`)
    }
  }
})

test("T4 answer block is locked and shares no 8-word run", () => {
  const first = body.trim().split(/\n\n+/)[0]?.trim() ?? ""
  assert.equal(first, ANSWER_BLOCK)
  const words = wordCount(ANSWER_BLOCK)
  assert.ok(words >= 40 && words <= 60, `answer block is ${words} words; want 40–60`)
  assert.doesNotMatch(ANSWER_BLOCK, /\]\(/)

  const ours = eightGrams(ANSWER_BLOCK)
  const others = readdirSync(articlesDir)
    .filter((name) => name.endsWith(".md") && name !== filename)
    .map((name) => ({ name, text: readArticle(name).body }))
  const extra = [
    join(root, "lib/theatre-service-faqs.ts"),
    join(root, "lib/theatre-service-depth.ts"),
    join(root, "app/services/home-theatre-systems/page.tsx"),
  ]
  for (const path of extra) {
    if (existsSync(path)) others.push({ name: path, text: readFileSync(path, "utf8") })
  }
  for (const item of others) {
    for (const gram of eightGrams(item.text)) {
      assert.equal(ours.has(gram), false, `8-word run "${gram}" also in ${item.name}`)
    }
  }
})

test("T5 body has exactly the five slashless links, Continue exploring stays empty", () => {
  assert.deepEqual(anchors, BODY_LINK_ORDER)
  assert.equal(anchors.length, 5)
  for (const expected of TABLE_LINKS) {
    assert.ok(
      anchors.some((link) => link.label === expected.label && link.href === expected.href),
      `missing ${expected.label}`,
    )
  }
  for (const link of anchors) {
    assert.ok(link.href.startsWith("/"))
    assert.doesNotMatch(link.href, /\/$/)
    assert.notEqual(link.href, "/service/home-cinema-installation-karachi")
  }
  assert.deepEqual(meta.links, [])
})

test("T6 cost-post anchors are unique against articles and target titles", () => {
  const used = new Set<string>()
  for (const name of readdirSync(articlesDir).filter((item) => item.endsWith(".md") && item !== filename)) {
    const other = readArticle(name)
    for (const link of markdownLinks(other.body)) used.add(link.label.toLowerCase().trim())
    for (const link of other.meta.links ?? []) used.add(String(link.label).toLowerCase().trim())
  }

  const pages = loadBlogArticles()
  const catalogTitles = new Map<string, { title: string; h1: string }>()
  for (const page of pages) catalogTitles.set(page.slug, { title: page.title, h1: page.h1 })
  for (const match of rankingCatalog.matchAll(/"slug": "([^"]+)"[\s\S]*?"title": "([^"]+)"[\s\S]*?"h1": "([^"]+)"/g)) {
    catalogTitles.set(match[1], { title: match[2], h1: match[3] })
  }

  for (const link of TABLE_LINKS) {
    const key = link.label.toLowerCase().trim()
    assert.equal(used.has(key), false, `anchor "${link.label}" is already used`)
    assert.notEqual(key, "book a survey")
    assert.notEqual(key, "book a site survey")
    const target = catalogTitles.get(link.href)
    assert.ok(target, `missing title/H1 for ${link.href}`)
    assert.notEqual(key, target.title.toLowerCase())
    assert.notEqual(key, target.h1.toLowerCase())
  }
})

test("T7 meta locks title, description, H1 and slug", () => {
  assert.equal(meta.title, TITLE)
  assert.equal(meta.description, DESCRIPTION)
  assert.equal(meta.h1, H1)
  assert.equal(meta.slug, slug)
  assert.ok(meta.title.length <= 60)
  assert.ok(meta.description.length >= 120 && meta.description.length <= 160)
  assert.doesNotMatch(meta.title, /Karachi|Lahore|Islamabad/)
  assert.doesNotMatch(meta.h1, /Karachi|Lahore|Islamabad/)
})

test("T8 schema is Article + Breadcrumb only, no FAQPage or HowTo", () => {
  assert.ok(Array.isArray(meta.faqs))
  assert.equal(meta.faqs.length, 0)
  assert.match(rankingPage, /page\.faqs\.length > 0/)
  assert.doesNotMatch(rankingPage, /HowTo/)
  assert.doesNotMatch(body, /"@type"/)
})

test("T9 headings, entity sentence, spelling and length", () => {
  assert.deepEqual(h2s, H2S)
  assert.ok(h2s.filter((heading) => heading.endsWith("?")).length <= 3)
  assert.equal(body.split(ENTITY).length - 1, 1)
  assert.equal((body.match(/home theater system/gi) ?? []).length, 1)
  assert.equal(body.split(CTA_SENTENCE).length - 1, 1)
  assert.ok((body.match(/CEDIA/g) ?? []).length <= 1)
  assert.doesNotMatch(body.split(LAHORE_SENTENCE).join(""), /Lahore/)
  const words = wordCount(body)
  assert.ok(words >= 1100 && words <= 1500, `body is ${words} words; want 1,100–1,500`)

  const otherHeadings = new Set<string>()
  for (const name of readdirSync(articlesDir).filter((item) => item.endsWith(".md") && item !== filename)) {
    const other = readArticle(name)
    for (const heading of other.body.matchAll(/^#{1,6} (.+)$/gm)) {
      otherHeadings.add(heading[1].toLowerCase().trim())
    }
    for (const faq of other.meta.faqs ?? []) otherHeadings.add(String(faq.q).toLowerCase().trim())
  }
  const theatreLive = join(root, "app/services/home-theatre-systems/page.tsx")
  if (existsSync(theatreLive)) {
    const source = readFileSync(theatreLive, "utf8")
    for (const heading of headingText(source)) otherHeadings.add(heading.toLowerCase())
  }
  for (const heading of h2s) {
    assert.equal(otherHeadings.has(heading.toLowerCase()), false, `H2 "${heading}" collides`)
  }
})

test("T10 PR 1 FAQ guard", (t) => {
  const faqPath = join(root, "lib/theatre-service-faqs.ts")
  if (!existsSync(faqPath) || !readFileSync(faqPath, "utf8").includes(COST_FAQ_Q)) {
    t.skip("PR 1 FAQ not on main yet")
    return
  }
  const faqSource = readFileSync(faqPath, "utf8")
  const answerMatch = faqSource.match(
    /question:\s*"How much does a home theatre cost in Pakistan\?",\s*answer:\s*"([\s\S]*?)"/,
  )
  assert.ok(answerMatch, "PR 1 cost FAQ must have an answer string")
  const ours = eightGrams(ANSWER_BLOCK)
  for (const gram of eightGrams(answerMatch[1])) {
    assert.equal(ours.has(gram), false, `8-word run "${gram}" also in PR 1 FAQ answer`)
  }
  const slugHits = faqSource.match(/\/home-theatre-system-cost-pakistan/g) ?? []
  assert.ok(slugHits.length <= 1)
  assert.doesNotMatch(faqSource, /\/home-theatre-system-cost-pakistan\//)
})

test("T11 sitemap catalog and llms.txt Guides list the cost post", () => {
  assert.match(rankingCatalog, /export const rankingSeoPages/)
  assert.match(rankingCatalog, /loadBlogArticles\(\)/)
  assert.ok(
    loadBlogArticles().some((page) => page.slug === slug),
    "rankingSeoPages loads the cost post via loadBlogArticles",
  )
  const guides = llmsTxt.split("## Guides")[1]?.split("## ")[0] ?? ""
  assert.match(
    guides,
    /What drives home theatre system cost in Pakistan: https:\/\/www\.desertsound\.com\.pk\/home-theatre-system-cost-pakistan/,
  )
  assert.doesNotMatch(guides, /home-theatre-system-cost-pakistan\//)
})
