import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { loadBlogArticles } from "./load-blog-articles.ts"
import { smartHomeServiceFaqs } from "./smart-home-service-faqs.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const page = readFileSync(join(root, "app/services/smart-home-automation/page.tsx"), "utf8")
const route = readFileSync(join(root, "app/service/smart-home-automation/page.tsx"), "utf8")
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")

const FAQS = smartHomeServiceFaqs
const META =
  "Home automation system design and installation for homes across Pakistan: lights, AC, curtains, security and cinema on one app, planned around outages."
const ANSWER_BLOCK =
  "A home automation system in Pakistan links lighting, air conditioning, curtains, security and the home cinema so they run from one app, touch panel or voice command. Desert Sound designs and installs it from Karachi and surveys the home before quoting. We plan the network and backup around outages."
const FAQ4_ANSWER =
  "A strong home network is essential for responsive app control, streaming, and connected devices. We plan the network and backup around outages. During the survey, we check how your home handles load-shedding and internet drops, and plan the system around them."
const BLOG_ANCHOR = "choosing between wired, wireless and local control"
const WHERE_WE_WORK =
  "Desert Sound designs and installs home cinemas, home theatres and smart homes, with a showroom in Karachi, and is a member of CEDIA. We work with homes across Pakistan. We have a team in Lahore. Fill in the form and we will contact you."
const SHOWROOM_PHRASE = "with a showroom in Karachi"

function quotedJsonField(block: string, field: string) {
  const match = block.match(new RegExp(`"${field}":\\s*"((?:\\\\.|[^"\\\\])*)"`))
  assert.ok(match, `missing ${field}`)
  return JSON.parse(`"${match[1]}"`) as string
}

function quotedField(source: string, field: string) {
  const match = source.match(new RegExp(`${field}:\\s*"((?:\\\\.|[^"\\\\])*)"`))
  assert.ok(match, `missing ${field}`)
  return JSON.parse(`"${match[1]}"`) as string
}

function count(haystack: string, needle: string | RegExp) {
  if (typeof needle === "string") return haystack.split(needle).length - 1
  return (haystack.match(needle) ?? []).length
}

function h1Text(source: string) {
  const match = source.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)
  assert.ok(match, "missing h1")
  return match[1]
    .replace(/\{\s*" "\s*\}/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

const rankingSmartHome = ranking.split('"slug": "/service/smart-home-automation"')[1]
const catalogSmartHome = seo.split('path: "/service/smart-home-automation"')[1]
assert.ok(rankingSmartHome, "missing ranking smart-home entry")
assert.ok(catalogSmartHome, "missing catalog smart-home entry")

const rankingPage = {
  title: quotedJsonField(rankingSmartHome, "title"),
  description: quotedJsonField(rankingSmartHome, "description"),
  h1: quotedJsonField(rankingSmartHome, "h1"),
}
const catalog = {
  title: quotedField(catalogSmartHome, "title"),
  description: quotedField(catalogSmartHome, "description"),
}
const renderedH1Text = h1Text(page)
const copy = [page, FAQS.map((faq) => `${faq.question} ${faq.answer}`).join("\n"), rankingPage.title, rankingPage.description].join(
  "\n",
)
const copyForBans = copy
  .replace(/className="[^"]*"/g, "")
  .replace(/\["\d+%",\s*"\d+%"\]/g, "")

test("smart-home service title, meta and H1 match the locked rewrite", () => {
  assert.equal(rankingPage.title, "Home Automation System in Pakistan")
  assert.equal(`${rankingPage.title} | Desert Sound`.length, 49)
  assert.equal(rankingPage.description, META)
  assert.equal(META.length, 151)
  assert.equal(catalog.title, rankingPage.title)
  assert.equal(catalog.description, rankingPage.description)
  assert.doesNotMatch(rankingPage.title, /Desert Sound/)
  assert.doesNotMatch(renderedH1Text, /HomeControl/)
  assert.equal(renderedH1Text, "Smart Home Automation System in Pakistan")
  assert.equal(rankingPage.h1, renderedH1Text)
})

test("smart-home answer block sits in the first p after the H1 with no link", () => {
  assert.ok(page.includes(ANSWER_BLOCK))
  const afterH1 = page.slice(page.indexOf("</h1>") + 5)
  const firstP = afterH1.match(/<p\b[^>]*>([\s\S]*?)<\/p>/)
  assert.ok(firstP)
  assert.ok(firstP[1].includes(ANSWER_BLOCK))
  assert.doesNotMatch(firstP[1], /href/)
})

test("smart-home service FAQs are the locked six in brief order", () => {
  assert.equal(FAQS.length, 6)
  assert.deepEqual(
    FAQS.map((faq) => faq.question),
    [
      "What does a smart home automation system mean?",
      "Can home automation be added to an existing home?",
      "Does home automation require strong Wi-Fi and internet access?",
      "Is voice control a good idea in Pakistan?",
      "Can entertainment systems be included in the automation?",
      "Can the system be expanded later?",
    ],
  )
  assert.equal(FAQS[2].answer, FAQ4_ANSWER)
  assert.ok(!FAQS.some((faq) => /load-shedding\?$/.test(faq.question)))
  for (const faq of FAQS) assert.doesNotMatch(faq.answer, /\]\(|href/)
})

test("smart-home rewrite links, CTA, schema and outage locks", () => {
  assert.ok(loadBlogArticles().some((article) => article.slug === "/how-to-choose-a-home-automation-system-pakistan"))
  assert.doesNotMatch(page, /\{isOpen && \(/)
  assert.doesNotMatch(route + page, /HowTo/)
  for (const href of [
    "/service/home-networking-and-wi-fi",
    "/smart-home-automation-why-should-you-invest-in-it-for-your-home",
    "/service/home-theatre-design-and-installation",
    "/service/control-systems",
    "/contact-us",
    "/how-to-choose-a-home-automation-system-pakistan",
  ]) {
    assert.equal(count(page, `href="${href}"`), 1, `href ${href} should appear once`)
  }
  assert.doesNotMatch(page, /href="\/#contact"/)
  assert.match(page, />\s*Book a Consultation\s*</)
  assert.ok(page.includes(WHERE_WE_WORK))
  assert.equal(count(page, "Fill in the form and we will contact you."), 2)
  assert.equal(count(copy, /CEDIA/g), 1)
  assert.match(page, /We have a team in Lahore\./)
  assert.doesNotMatch(page, /travels from Karachi/)
  const pageOutsideShowroom = page.split(SHOWROOM_PHRASE).join("").split(ANSWER_BLOCK).join("")
  assert.doesNotMatch(pageOutsideShowroom, /from Karachi/)
  assert.doesNotMatch(copyForBans, /(?<![-\w])free\b|complimentary|no[- ](charge|obligation)/i)
  assert.equal(count(page, BLOG_ANCHOR), 1)
  const copyNoAnchors = copyForBans.split(BLOG_ANCHOR).join("")
  assert.doesNotMatch(
    copyNoAnchors,
    /mains returns|power returns|set during programming|without (the )?internet|\bruns? locally|works locally|still works|still run|keeps? working|offline|local control|continue to work|WAN is down/i,
  )
  assert.doesNotMatch(copyForBans, /\bbest\b|#1|number one|leading|trusted|Digital Sound|\bUPS\b|Z-?Wave/i)
  assert.doesNotMatch(copyForBans, /\bPKR\b|\bRs\.?\s?\d|\blakh\b|\d+\s?%/i)
  assert.doesNotMatch(copyForBans, /\b\d+\s?(day|days|week|weeks|month|months|hours?)\b/i)
  assert.doesNotMatch(copyForBans, /DHA|Clifton|Gulberg|Bahria|Zamzama|\bPhase\b|\bUS\b|\bUK\b/)
})
