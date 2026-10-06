import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import {
  multanFaqJsonLdItems,
  multanServiceDescription,
  multanServiceH1,
  multanServicePage,
  multanServicePath,
  multanServiceTitle,
} from "./multan-service-content.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/home-cinema-installation-multan/page.tsx"),
  "utf8",
)
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const schema = readFileSync(join(root, "lib/multan-service-schema.ts"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const htmlSitemap = readFileSync(join(root, "app/sitemap/page.tsx"), "utf8")
const rankingTypes = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const article33 = readFileSync(
  join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md"),
  "utf8",
)
const copy = `${multanServicePage.body}\n${multanServicePage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")}`

function wordCount(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_]/g, " ")
    .split(/\s+/)
    .filter((word) => /[A-Za-z]{2,}/.test(word)).length
}

test("Multan lander uses slug A, locked title/H1/meta, and is not a blog", () => {
  assert.equal(multanServicePath, "/service/home-cinema-installation-multan")
  assert.equal(multanServiceTitle, "Home Cinema Installation in Multan | Desert Sound")
  assert.equal(multanServiceH1, "Home Cinema Installation in Multan")
  assert.equal(
    multanServiceDescription,
    "Home cinema installation in Multan from Desert Sound's Karachi team. Design, install, and calibrate on a site visit — home cinema rooms across Pakistan.",
  )
  assert.ok(multanServiceDescription.length >= 150 && multanServiceDescription.length <= 160)
  assert.equal(multanServicePage.slug, multanServicePath)
  assert.equal(multanServicePage.title, multanServiceTitle)
  assert.equal(multanServicePage.h1, multanServiceH1)
  assert.match(rankingTypes, /!path\.startsWith\("\/service\/"\)/)
  assert.match(serviceRoute, /title: \{ absolute: multanServiceTitle \}/)
  assert.doesNotMatch(multanServicePath, /\/services\//)
})

test("Multan ranking catalog and Service JSON-LD stay in lockstep", () => {
  assert.match(ranking, /multanServicePage/)
  const catalogSlice = seo.split('path: "/service/home-cinema-installation-multan"')[1]
  assert.ok(catalogSlice)
  assert.match(catalogSlice.slice(0, 800), /Home Cinema Installation in Multan \| Desert Sound/)
  assert.match(
    catalogSlice.slice(0, 900),
    /Home cinema installation in Multan from Desert Sound's Karachi team/,
  )
  assert.match(schema, /@type": "Country"/)
  assert.match(schema, /@type": "City"/)
  assert.match(schema, /name: "Multan"/)
  assert.match(schema, /serviceType: "Home cinema installation"/)
  assert.match(schema, /serviceJsonLd\(service\)/)
  assert.match(serviceRoute, /multanServiceJsonLd/)
  assert.match(serviceRoute, /faqPageJsonLd\(multanFaqJsonLdItems\(\)\)/)
  assert.equal(multanFaqJsonLdItems().length, 6)
  assert.equal(multanServicePage.faqs.length, 6)
  for (const [index, faq] of multanServicePage.faqs.entries()) {
    const jsonLd = multanFaqJsonLdItems()[index]
    const stripped = faq.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
    assert.equal(jsonLd.question, faq.q)
    assert.equal(jsonLd.answer, stripped)
  }
})

test("Multan copy is install-led, 600–900 words, with required mesh links", () => {
  const words = wordCount(copy)
  assert.ok(words >= 600 && words <= 900, `copy is ${words} words; want 600–900`)
  assert.match(multanServicePage.body, /What home cinema installation in Multan means/)
  assert.match(multanServicePage.body, /Site visits from Karachi: how we work in Multan/)
  assert.match(multanServicePage.body, /### Homes we visit in Multan\n/)
  assert.match(multanServicePage.body, /### Rooms we've finished\n/)
  assert.match(multanServicePage.body, /Karachi proof/)
  assert.match(
    multanServicePage.body,
    /\[finished residential theatres\]\(\/projects\/residential\)/,
  )
  assert.match(multanServicePage.body, /Planning for Multan's heat, dust and power/)
  assert.doesNotMatch(multanServicePage.body, /What installation includes/)
  assert.match(
    multanServicePage.body,
    /Power backup for load-shedding is discussed on the site visit/,
  )
  assert.doesNotMatch(copy, /UPS|protected circuit/i)
  assert.match(copy, /\/service\/home-theatre-design-and-installation/)
  assert.match(copy, /\/home-cinema-and-cinema-installer-pakistan/)
  assert.match(copy, /\/projects\/residential\/project-platinum/)
  assert.match(copy, /\/projects\/residential\/residency/)
  assert.match(copy, /\/projects\/residential\/studio-vellari/)
  assert.match(copy, /\/projects\/residential\/stanley-seats/)
  assert.match(copy, /\/service\/home-cinema-installation-islamabad/)
  assert.equal(copy.split("/service/home-cinema-installation-islamabad").length - 1, 1)
  assert.match(copy, /\[contact\]\(\/contact\)/)
  assert.ok(copy.split("](/contact)").length - 1 >= 2)
  assert.doesNotMatch(copy, /22-C\/II/)
  assert.doesNotMatch(copy, /Zamzama/)
  assert.doesNotMatch(copy, /\+92 21/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.match(multanServicePage.faqs[0].q, /install home cinemas in Multan/)
  assert.match(multanServicePage.faqs[1].q, /based in Multan/)
  assert.match(multanServicePage.faqs[2].q, /site visit/)
  assert.match(multanServicePage.faqs[3].q, /professional home theater installation include/)
  assert.equal(multanServicePage.faqs[4].q, "Can a home cinema in Multan handle the summer heat and dust?")
  assert.equal(multanServicePage.faqs[5].q, "Which areas of Multan do you visit?")
})

test("Multan lander does not invent local proof, superlatives, or sister brands", () => {
  const heroAndMeta = `${multanServiceTitle}\n${multanServiceH1}\n${multanServiceDescription}\n${multanServicePage.body.split("###")[0]}`
  assert.doesNotMatch(heroAndMeta, /\bbest\b/i)
  assert.doesNotMatch(heroAndMeta, /#1/)
  assert.doesNotMatch(copy, /Digital Sound/)
  assert.doesNotMatch(copy, /Daraz/)
  assert.doesNotMatch(copy, /Cinematics/)
  assert.doesNotMatch(copy, /Nashco/)
  assert.doesNotMatch(copy, /our Multan (office|HQ|showroom)/i)
  assert.doesNotMatch(copy, /Multan office/i)
  assert.match(copy, /There is no Multan showroom/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.match(copy, /DHA Multan, Multan Cantt, Gulgasht Colony and Wapda Town/)
  assert.match(copy, /DHA Multan, Multan Cantt, Gulgasht Colony, Wapda Town/)
  assert.doesNotMatch(copy, /Bosan|Model Town|Royal Orchard|DHA [0-9]|Phase [0-9]/i)
  assert.doesNotMatch(copy, /including Lahore, Islamabad/i)
  assert.doesNotMatch(copy, /\bUS\b|UK ranking|United States|United Kingdom/)
  assert.match(copy, /Karachi proof, not Multan case studies/)
  assert.match(copy, /finished residential theatres/)
  assert.doesNotMatch(copy, /Karachi residential theatres/)
  assert.doesNotMatch(multanServiceTitle, /Site Visits from Karachi/i)
  assert.match(multanServiceDescription, /site visit/)
  assert.match(multanServiceDescription, /Karachi/)
})

test("sitemap and llms listings include the Multan service URL", () => {
  assert.match(sitemap, /rankingSeoPages/)
  assert.match(htmlSitemap, /\/service\/home-cinema-installation-multan/)
  assert.match(
    readFileSync(join(root, "public/llms.txt"), "utf8"),
    /https:\/\/www\.desertsound\.com\.pk\/service\/home-cinema-installation-multan/,
  )
})

test("theatre inbound is one Multan nationwide-strip line without remaking locked SERP title", () => {
  assert.match(theatreLive, /Site visits nationwide from Karachi include/)
  assert.match(theatreLive, /home cinema installation in Multan/)
  assert.match(theatreLive, /\/service\/home-cinema-installation-multan/)
  assert.equal(theatreLive.split("/service/home-cinema-installation-multan").length - 1, 1)
  const rankingTheatre = ranking.split('"slug": "/service/home-theatre-design-and-installation"')[1]
  assert.match(rankingTheatre.slice(0, 500), /Home Theater Installation in Pakistan \| Design and Install/)
  assert.match(
    rankingTheatre.slice(0, 800),
    /Home theater installation across Pakistan from Karachi. We design, install, and calibrate cinema rooms — site visits nationwide./,
  )
  assert.match(theatreRoute, /serviceRouteMetadata\(slug\)/)
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.doesNotMatch(homepage, /home-cinema-installation-multan/)
})

test("#33 names Multan once as a lean inbound to the city lander", () => {
  assert.match(
    article33,
    /\[Lahore\]\(\/service\/home-cinema-installation-lahore\), \[Islamabad\]\(\/service\/home-cinema-installation-islamabad\), \[Multan\]\(\/service\/home-cinema-installation-multan\), \[Faisalabad\]\(\/service\/home-cinema-installation-faisalabad\), \[Sialkot\]\(\/service\/home-cinema-installation-sialkot\), and other cities/,
  )
  assert.equal(article33.split("/service/home-cinema-installation-multan").length - 1, 1)
})
