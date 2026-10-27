import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import {
  bahawalpurFaqJsonLdItems,
  bahawalpurServiceDescription,
  bahawalpurServiceH1,
  bahawalpurServicePage,
  bahawalpurServicePath,
  bahawalpurServiceTitle,
} from "./bahawalpur-service-content.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/home-cinema-installation-bahawalpur/page.tsx"),
  "utf8",
)
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const schema = readFileSync(join(root, "lib/bahawalpur-service-schema.ts"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const htmlSitemap = readFileSync(join(root, "app/sitemap/page.tsx"), "utf8")
const article33 = readFileSync(
  join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md"),
  "utf8",
)
const copy = `${bahawalpurServicePage.body}\n${bahawalpurServicePage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")}`
const BAHAWALPUR_AREA_SENTENCE =
  "We work across Bahawalpur, covering areas such as DHA Bahawalpur, Model Town and Satellite Town."
const BAHAWALPUR_VISIT_FAQ_ANSWER =
  "Yes. We work across the city. Book a survey and we will confirm the visit date."

function wordCount(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_]/g, " ")
    .split(/\s+/)
    .filter((word) => /[A-Za-z]{2,}/.test(word)).length
}

test("Bahawalpur lander uses slug A, locked title/H1/meta, and is not a blog", () => {
  assert.equal(bahawalpurServicePath, "/service/home-cinema-installation-bahawalpur")
  assert.equal(bahawalpurServiceTitle, "Home Cinema Installation in Bahawalpur | Desert Sound")
  assert.equal(bahawalpurServiceH1, "Home Cinema Installation in Bahawalpur")
  assert.equal(
    bahawalpurServiceDescription,
    "Home cinema installation in Bahawalpur from Desert Sound's Karachi team. Design, install, and calibrate on a site visit — cinema rooms across Pakistan.",
  )
  assert.ok(bahawalpurServiceDescription.length >= 150 && bahawalpurServiceDescription.length <= 160)
  assert.equal(bahawalpurServicePage.slug, bahawalpurServicePath)
  assert.equal(bahawalpurServicePage.title, bahawalpurServiceTitle)
  assert.equal(bahawalpurServicePage.h1, bahawalpurServiceH1)
  assert.match(ranking, /!path\.startsWith\("\/service\/"\)/)
  assert.match(serviceRoute, /title: \{ absolute: bahawalpurServiceTitle \}/)
  assert.match(serviceRoute, /serviceRouteMetadata\(bahawalpurServicePath\)/)
  assert.doesNotMatch(serviceRoute, /index:\s*false/)
  assert.doesNotMatch(bahawalpurServicePath, /\/services\//)
})

test("Bahawalpur ranking catalog and Service JSON-LD stay in lockstep", () => {
  assert.match(ranking, /bahawalpurServicePage/)
  const catalogSlice = seo.split('path: "/service/home-cinema-installation-bahawalpur"')[1]
  assert.ok(catalogSlice)
  assert.match(catalogSlice.slice(0, 800), /Home Cinema Installation in Bahawalpur \| Desert Sound/)
  assert.match(
    catalogSlice.slice(0, 900),
    /Home cinema installation in Bahawalpur from Desert Sound's Karachi team/,
  )
  assert.match(schema, /@type": "Country"/)
  assert.match(schema, /@type": "City"/)
  assert.match(schema, /name: "Bahawalpur"/)
  assert.match(schema, /serviceType: "Home cinema installation"/)
  assert.match(schema, /serviceJsonLd\(service\)/)
  assert.match(serviceRoute, /bahawalpurServiceJsonLd/)
  assert.match(serviceRoute, /faqPageJsonLd\(bahawalpurFaqJsonLdItems\(\)\)/)
  assert.equal(bahawalpurFaqJsonLdItems().length, 6)
  assert.equal(bahawalpurServicePage.faqs.length, 6)
  for (const [index, faq] of bahawalpurServicePage.faqs.entries()) {
    const jsonLd = bahawalpurFaqJsonLdItems()[index]
    const stripped = faq.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
    assert.equal(jsonLd.question, faq.q)
    assert.equal(jsonLd.answer, stripped)
  }
})

test("Bahawalpur copy is install-led, 800–1100 words, with required mesh links", () => {
  const words = wordCount(copy)
  assert.ok(words >= 800 && words <= 1100, `copy is ${words} words; want 800–1100`)
  assert.match(bahawalpurServicePage.body, /What home cinema installation in Bahawalpur means/)
  assert.match(bahawalpurServicePage.body, /Site visits from Karachi: how we work in Bahawalpur/)
  assert.match(bahawalpurServicePage.body, /### Homes we visit in Bahawalpur\n/)
  assert.match(bahawalpurServicePage.body, /### Rooms we've finished\n/)
  assert.doesNotMatch(bahawalpurServicePage.body, /Karachi proof/)
  assert.match(
    bahawalpurServicePage.body,
    /\[finished residential theatres\]\(\/projects\/residential\)/,
  )
  assert.match(bahawalpurServicePage.body, /Planning for Cholistan sun, sand and heat/)
  assert.doesNotMatch(bahawalpurServicePage.body, /What installation includes/)
  assert.match(bahawalpurServicePage.body, /Backup supply is talked through during the walk-through/)
  assert.doesNotMatch(copy, /load-shedding/i)
  assert.equal(
    bahawalpurServicePage.body.split("/service/home-theatre-design-and-installation").length - 1,
    1,
  )
  assert.equal(
    bahawalpurServicePage.body.split("/home-cinema-and-cinema-installer-pakistan").length - 1,
    1,
  )
  assert.match(copy, /\/service\/home-theatre-design-and-installation/)
  assert.match(copy, /\/home-cinema-and-cinema-installer-pakistan/)
  assert.match(copy, /\/projects\/residential\/project-platinum/)
  assert.match(copy, /\/projects\/residential\/residency/)
  assert.match(copy, /\/projects\/residential\/studio-vellari/)
  assert.match(copy, /\/projects\/residential\/stanley-seats/)
  assert.match(copy, /\/service\/home-cinema-installation-islamabad/)
  assert.match(copy, /\/service\/home-cinema-installation-lahore/)
  assert.match(copy, /\/service\/home-cinema-installation-multan/)
  assert.match(copy, /\/service\/home-cinema-installation-faisalabad/)
  assert.match(copy, /\/service\/home-cinema-installation-sialkot/)
  assert.equal(copy.split("/service/home-cinema-installation-islamabad").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-lahore").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-multan").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-faisalabad").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-sialkot").length - 1, 1)
  assert.match(copy, /We have teams in Lahore and Karachi/)
  assert.match(copy, /\[Book a Bahawalpur site-visit survey\]\(\/contact-us\)/)
  assert.doesNotMatch(copy, /through \[contact\]|via \[contact\]|Use \[contact\]/)
  assert.equal(copy.split("](/contact-us)").length - 1, 3)
  assert.doesNotMatch(copy, /\]\(\/contact(?:\/)?\)/)
  assert.doesNotMatch(copy, /\]\(\/contact-us\/\)/)
  assert.doesNotMatch(copy, /\]\(\/[^)\s]+\/\)/)
  assert.doesNotMatch(copy, /22-C\/II/)
  assert.doesNotMatch(copy, /Zamzama/)
  assert.doesNotMatch(copy, /\+92 21/)
  assert.doesNotMatch(copy, /info@desertsound/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.equal(copy.split("/service/home-cinema-installation-punjab").length - 1, 1)
  assert.doesNotMatch(copy, /\/service\/home-cinema-installation-punjab\//)
  assert.match(bahawalpurServicePage.faqs[0].q, /install home cinemas in Bahawalpur/)
  assert.match(bahawalpurServicePage.faqs[1].q, /based in Bahawalpur/)
  assert.match(bahawalpurServicePage.faqs[2].q, /site visit/)
  assert.match(bahawalpurServicePage.faqs[3].q, /professional home theater installation include/)
  assert.equal(
    bahawalpurServicePage.faqs[4].q,
    "How do you keep desert dust and strong sunlight out of a Bahawalpur cinema?",
  )
  assert.equal(bahawalpurServicePage.faqs[5].q, "Do you work across Bahawalpur?")
  assert.equal(bahawalpurServicePage.faqs[5].a, BAHAWALPUR_VISIT_FAQ_ANSWER)
  assert.equal(bahawalpurFaqJsonLdItems()[5].answer, BAHAWALPUR_VISIT_FAQ_ANSWER)
})

test("Bahawalpur lander does not invent local proof, superlatives, or sister brands", () => {
  const heroAndMeta = `${bahawalpurServiceTitle}\n${bahawalpurServiceH1}\n${bahawalpurServiceDescription}\n${bahawalpurServicePage.body.split("###")[0]}`
  assert.doesNotMatch(heroAndMeta, /\bbest\b/i)
  assert.doesNotMatch(heroAndMeta, /#1/)
  assert.doesNotMatch(copy, /Digital Sound/)
  assert.doesNotMatch(copy, /Daraz/)
  assert.doesNotMatch(copy, /Cinematics/)
  assert.doesNotMatch(copy, /Nashco/)
  assert.doesNotMatch(copy, /our Bahawalpur (office|HQ|showroom|team)/i)
  assert.match(copy, /there is no Bahawalpur showroom/)
  assert.match(copy, /There is no Bahawalpur showroom/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.equal(copy.split(BAHAWALPUR_AREA_SENTENCE).length - 1, 1)
  assert.equal(bahawalpurServicePage.body.split(BAHAWALPUR_AREA_SENTENCE).length - 1, 1)
  assert.equal(copy.split("DHA Bahawalpur").length - 1, 1)
  assert.equal(copy.split("Model Town").length - 1, 1)
  assert.equal(copy.split("Satellite Town").length - 1, 1)
  const outsideAreas = copy.replace(BAHAWALPUR_AREA_SENTENCE, "")
  assert.doesNotMatch(outsideAreas, /DHA Bahawalpur|Model Town|Satellite Town/)
  assert.doesNotMatch(copy, /\bCantt\b/)
  const chrome = [
    bahawalpurServiceTitle,
    bahawalpurServiceH1,
    bahawalpurServiceDescription,
    bahawalpurServicePath,
    schema,
  ].join("\n")
  assert.doesNotMatch(chrome, /DHA|Model Town|Satellite Town|Cantt/)
  const faqText = bahawalpurServicePage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")
  assert.doesNotMatch(faqText, /DHA|Model Town|Satellite Town|Cantt/)
  assert.doesNotMatch(copy, /Hashmi Garden|Bhawalpur/i)
  assert.doesNotMatch(copy, /including Lahore, Islamabad/i)
  assert.doesNotMatch(copy, /\bUS\b|UK ranking|United States|United Kingdom/)
  assert.match(copy, /they stay labelled Karachi/)
  assert.match(copy, /finished residential theatres/)
  assert.doesNotMatch(copy, /Karachi proof/)
  assert.doesNotMatch(bahawalpurServiceTitle, /Site Visits from Karachi/i)
  assert.match(bahawalpurServiceDescription, /site visit/)
  assert.match(bahawalpurServiceDescription, /Karachi/)
})

test("sitemap and llms listings include the Bahawalpur service URL", () => {
  assert.match(sitemap, /rankingSeoPages/)
  assert.match(htmlSitemap, /\/service\/home-cinema-installation-bahawalpur/)
  assert.doesNotMatch(htmlSitemap, /\/service\/home-cinema-installation-bahawalpur\//)
  assert.match(
    readFileSync(join(root, "public/llms.txt"), "utf8"),
    /https:\/\/www\.desertsound\.com\.pk\/service\/home-cinema-installation-bahawalpur/,
  )
})

test("theatre inbound is one Bahawalpur nationwide-strip line without remaking locked SERP title", () => {
  assert.match(theatreLive, /Site visits nationwide from Karachi include/)
  assert.match(theatreLive, /home cinema installation in Bahawalpur/)
  assert.match(theatreLive, /\/service\/home-cinema-installation-bahawalpur/)
  assert.equal(theatreLive.split("/service/home-cinema-installation-bahawalpur").length - 1, 1)
  assert.doesNotMatch(theatreLive, /\/service\/home-cinema-installation-bahawalpur\//)
  const rankingTheatre = ranking.split('"slug": "/service/home-theatre-design-and-installation"')[1]
  assert.match(rankingTheatre.slice(0, 500), /Home Theater Installation in Pakistan"/)
  assert.match(
    rankingTheatre.slice(0, 800),
    /Home theatre installation in Karachi and across Pakistan: a site survey, a design for your room, hidden wiring, and sound calibrated to your seats./,
  )
  assert.match(theatreRoute, /serviceRouteMetadata\(slug\)/)
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.doesNotMatch(homepage, /home-cinema-installation-bahawalpur/)
})

test("#33 names Bahawalpur once as a lean inbound to the city lander", () => {
  assert.match(
    article33,
    /\[Lahore\]\(\/service\/home-cinema-installation-lahore\), \[Islamabad\]\(\/service\/home-cinema-installation-islamabad\), \[Multan\]\(\/service\/home-cinema-installation-multan\), \[Faisalabad\]\(\/service\/home-cinema-installation-faisalabad\), \[Sialkot\]\(\/service\/home-cinema-installation-sialkot\), \[Bahawalpur\]\(\/service\/home-cinema-installation-bahawalpur\), and other cities/,
  )
  assert.equal(article33.split("/service/home-cinema-installation-bahawalpur").length - 1, 1)
  assert.doesNotMatch(article33, /\/service\/home-cinema-installation-bahawalpur\//)
})

test("added Bahawalpur mesh links are slashless on sibling city pages", () => {
  const cityFiles = [
    "lib/islamabad-service-content.ts",
    "lib/lahore-city-lander.ts",
    "lib/multan-service-content.ts",
    "lib/faisalabad-service-content.ts",
    "lib/sialkot-service-content.ts",
  ]
  for (const file of cityFiles) {
    const source = readFileSync(join(root, file), "utf8")
    assert.equal(source.split("/service/home-cinema-installation-bahawalpur").length - 1, 1, file)
    assert.doesNotMatch(source, /\/service\/home-cinema-installation-bahawalpur\//)
  }
})
