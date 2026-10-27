import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { theatreServiceFaqs } from "./theatre-service-faqs.ts"
import { theatreServiceSerpDescription, theatreServiceSerpTitle } from "./theatre-service-serp.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const livePage = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const schema = readFileSync(join(root, "lib/theatre-service-schema.ts"), "utf8")

const title = theatreServiceSerpTitle
const description = theatreServiceSerpDescription

const depthStart = livePage.indexOf("How we quote a home theatre installation")
const depthEnd = livePage.indexOf("Smart Control & Integration")
const depthCopy = livePage.slice(depthStart, depthEnd)
const faqText = theatreServiceFaqs.map((faq) => `${faq.question} ${faq.answer}`).join(" ")

function lock(value: string) {
  return new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
}

function quotedField(source: string, field: string) {
  const match = source.match(new RegExp(`${field}:\\s*"((?:\\\\.|[^"\\\\])*)"`))
  assert.ok(match, `missing ${field}`)
  return JSON.parse(`"${match[1]}"`) as string
}

test("theatre service ranking meta matches catalog SERP strings", () => {
  const rankingTheatre = ranking.split('"slug": "/service/home-theatre-design-and-installation"')[1]
  const catalogTheatre = seo.split('path: "/service/home-theatre-design-and-installation"')[1]
  assert.ok(rankingTheatre)
  assert.ok(catalogTheatre)
  assert.match(rankingTheatre.slice(0, 500), lock(title))
  assert.match(rankingTheatre.slice(0, 800), lock(description))
  assert.match(catalogTheatre.slice(0, 500), lock(title))
  assert.match(catalogTheatre.slice(0, 800), lock(description))
  assert.equal(quotedField(catalogTheatre, "title"), theatreServiceSerpTitle)
  assert.equal(quotedField(catalogTheatre, "description"), theatreServiceSerpDescription)
  assert.equal(quotedField(rankingTheatre, '"title"'), theatreServiceSerpTitle)
  assert.equal(quotedField(rankingTheatre, '"description"'), theatreServiceSerpDescription)
  assert.equal(description.length, 147)
})

test("theatre service keeps Service and FAQPage schema with visible copy", () => {
  assert.match(livePage, /We plan home theater installation in Karachi and across Pakistan around the room/)
  assert.match(livePage, /starts with the room/)
  assert.match(livePage, /Professional Home Cinema Design/)
  assert.match(livePage, /Immersive Audio & Visual Experience/)
  assert.match(livePage, /Smart Control & Integration/)
  assert.match(livePage, /Calibration & optimisation/)
  assert.match(schema, /theatreServiceJsonLd/)
  assert.match(serviceRoute, /theatreServiceJsonLd/)
  assert.match(serviceRoute, /faqPageJsonLd\(theatreServiceFaqs\)/)
})

test("theatre JSON-LD contains no HowTo type", () => {
  assert.doesNotMatch(schema, /"HowTo"/)
  assert.doesNotMatch(serviceRoute, /HowTo/)
  assert.doesNotMatch(livePage, /"@type": "HowTo"/)
})

test("FAQPage JSON-LD uses the same six visible Q&As", () => {
  assert.equal(theatreServiceFaqs.length, 6)
  assert.deepEqual(
    theatreServiceFaqs.map((faq) => faq.question),
    [
      "What's included in home theater installation in Pakistan?",
      "How much does a home theatre cost in Pakistan?",
      "Should I build a dedicated cinema room or a living-room system?",
      "Can you install a home theatre in a house that is already finished?",
      "Can one remote dim the lights and close the curtains for a film?",
      "Do you provide multi-room audio solutions?",
    ],
  )
  assert.match(livePage, /theatreServiceFaqs/)
  assert.match(serviceRoute, /faqPageJsonLd\(theatreServiceFaqs\)/)
  for (const faq of theatreServiceFaqs) {
    assert.ok(faq.question.length > 0)
    assert.ok(faq.answer.length > 0)
    assert.doesNotMatch(faq.answer, /\[|\<a |href=/)
  }
})

test("theatre SERP copy is Pakistan-first and names Karachi, with no HQ branding", () => {
  assert.equal(title, theatreServiceSerpTitle)
  assert.match(description, /\bKarachi\b/)
  assert.match(description, /across Pakistan/)
  assert.doesNotMatch(description, /including Karachi/i)
  assert.doesNotMatch(description, /\bHQ\b/i)
  assert.doesNotMatch(title, /\bHQ\b/i)
  assert.doesNotMatch(ranking, /including Karachi/)
  assert.doesNotMatch(seo, /including Karachi/)
  assert.doesNotMatch(schema, /\bHQ\b/)
  assert.doesNotMatch(seo, /\bHQ\b/)
  assert.doesNotMatch(ranking, /\bHQ\b/)
  assert.doesNotMatch(livePage, /including Karachi/)
  assert.match(livePage, /Explore Solutions/)
  assert.match(livePage, /Book a Consultation/)
  assert.doesNotMatch(livePage, /(?<![-\w])free\b/i)
  assert.match(livePage, /href="\/contact-us"/)
  assert.doesNotMatch(livePage, /\/#contact/)
})

test("theatre finished-rooms strip is present without remaking locked SERP title", () => {
  assert.match(livePage, /Karachi home cinema installations we&apos;ve finished/)
  assert.match(livePage, /cinema installer process/)
  assert.equal(title, theatreServiceSerpTitle)
})

test("homepage Theater title lock is untouched", () => {
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.doesNotMatch(homepage, lock(theatreServiceSerpTitle))
})

test("theatre depth sections sit between Immersive and Smart Control", () => {
  const immersive = livePage.indexOf("Immersive Audio & Visual Experience")
  const cost = livePage.indexOf("How we quote a home theatre installation")
  const dedicated = livePage.indexOf("Dedicated cinema room or living-room system")
  const build = livePage.indexOf("Home theatre in a new build or an existing home")
  const lighting = livePage.indexOf("Lighting, curtains and one-remote movie scenes")
  const smart = livePage.indexOf("Smart Control & Integration")
  assert.ok(immersive > 0 && cost > immersive)
  assert.ok(dedicated > cost && build > dedicated && lighting > build && smart > lighting)
  assert.match(depthCopy, /href="\/service\/smart-home-automation"/)
  assert.doesNotMatch(depthCopy, /home-theatre-system-cost-pakistan/)
  assert.match(livePage, /\{\/\* TODO cost-post link after Desk clear \*\/\}/)
})

test("theatre FAQs and depth copy carry no prices, durations, superlatives or UPS", () => {
  assert.ok(depthStart > 0 && depthEnd > depthStart)
  const depthParagraphs = [...depthCopy.matchAll(/<p className="[^"]+">([\s\S]*?)<\/p>/g)]
    .map((match) => match[1].replace(/<[^>]+>/g, " "))
    .join(" ")
  assert.match(depthParagraphs, /no fixed price/)
  for (const text of [faqText, depthParagraphs]) {
    assert.doesNotMatch(text, /\bPKR\b|\bRs\.?\s?\d|\blakh\b|\d+\s?%/i)
    assert.doesNotMatch(text, /\b\d+\s?(day|days|week|weeks|month|months)\b|timelines? vary/i)
    assert.doesNotMatch(text, /\bbest\b|#1|number one|Digital Sound|\bUPS\b/i)
  }
  assert.doesNotMatch(livePage, /href="#"/)
  assert.doesNotMatch(livePage, /home-theatre-system-cost-pakistan/)
})

test("theatre page source strings name no neighbourhoods or Digital Sound", () => {
  for (const text of [faqText, livePage, title, description]) {
    assert.doesNotMatch(
      text,
      /\bDHA\b|\bClifton\b|\bBahria\b|\bZamzama\b|\bPECHS\b|\bGulshan\b|\bPhase\b|Digital Sound/,
    )
  }
})
