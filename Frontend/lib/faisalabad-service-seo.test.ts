import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import {
  faisalabadFaqJsonLdItems,
  faisalabadServiceDescription,
  faisalabadServiceH1,
  faisalabadServicePage,
  faisalabadServicePath,
  faisalabadServiceTitle,
} from "./faisalabad-service-content.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/home-cinema-installation-faisalabad/page.tsx"),
  "utf8",
)
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const schema = readFileSync(join(root, "lib/faisalabad-service-schema.ts"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const htmlSitemap = readFileSync(join(root, "app/sitemap/page.tsx"), "utf8")
const article33 = readFileSync(
  join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md"),
  "utf8",
)
const copy = `${faisalabadServicePage.body}\n${faisalabadServicePage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")}`

function wordCount(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_]/g, " ")
    .split(/\s+/)
    .filter((word) => /[A-Za-z]{2,}/.test(word)).length
}

test("Faisalabad lander uses slug A, locked title/H1/meta, and is not a blog", () => {
  assert.equal(faisalabadServicePath, "/service/home-cinema-installation-faisalabad")
  assert.equal(faisalabadServiceTitle, "Home Cinema Installation in Faisalabad | Desert Sound")
  assert.equal(faisalabadServiceH1, "Home Cinema Installation in Faisalabad")
  assert.equal(
    faisalabadServiceDescription,
    "Home cinema installation in Faisalabad from Desert Sound's Karachi team. Design, install, and calibrate on a site visit — cinema rooms across Pakistan.",
  )
  assert.ok(faisalabadServiceDescription.length >= 150 && faisalabadServiceDescription.length <= 160)
  assert.equal(faisalabadServicePage.slug, faisalabadServicePath)
  assert.equal(faisalabadServicePage.title, faisalabadServiceTitle)
  assert.equal(faisalabadServicePage.h1, faisalabadServiceH1)
  assert.match(ranking, /!path\.startsWith\("\/service\/"\)/)
  assert.match(serviceRoute, /title: \{ absolute: faisalabadServiceTitle \}/)
  assert.doesNotMatch(faisalabadServicePath, /\/services\//)
})

test("Faisalabad ranking catalog and Service JSON-LD stay in lockstep", () => {
  assert.match(ranking, /faisalabadServicePage/)
  const catalogSlice = seo.split('path: "/service/home-cinema-installation-faisalabad"')[1]
  assert.ok(catalogSlice)
  assert.match(catalogSlice.slice(0, 800), /Home Cinema Installation in Faisalabad \| Desert Sound/)
  assert.match(
    catalogSlice.slice(0, 900),
    /Home cinema installation in Faisalabad from Desert Sound's Karachi team/,
  )
  assert.match(schema, /@type": "Country"/)
  assert.match(schema, /@type": "City"/)
  assert.match(schema, /name: "Faisalabad"/)
  assert.match(schema, /serviceType: "Home cinema installation"/)
  assert.match(schema, /serviceJsonLd\(service\)/)
  assert.match(serviceRoute, /faisalabadServiceJsonLd/)
  assert.match(serviceRoute, /faqPageJsonLd\(faisalabadFaqJsonLdItems\(\)\)/)
  assert.equal(faisalabadFaqJsonLdItems().length, 6)
  assert.equal(faisalabadServicePage.faqs.length, 6)
  for (const [index, faq] of faisalabadServicePage.faqs.entries()) {
    const jsonLd = faisalabadFaqJsonLdItems()[index]
    const stripped = faq.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
    assert.equal(jsonLd.question, faq.q)
    assert.equal(jsonLd.answer, stripped)
  }
})

test("Faisalabad copy is install-led, 800–1100 words, with required mesh links", () => {
  const words = wordCount(copy)
  assert.ok(words >= 800 && words <= 1100, `copy is ${words} words; want 800–1100`)
  assert.match(faisalabadServicePage.body, /What home cinema installation in Faisalabad means/)
  assert.match(faisalabadServicePage.body, /Site visits from Karachi: how we work in Faisalabad/)
  assert.match(faisalabadServicePage.body, /### Homes we visit in Faisalabad\n/)
  assert.match(faisalabadServicePage.body, /### Rooms we've finished\n/)
  assert.doesNotMatch(faisalabadServicePage.body, /Karachi proof/)
  assert.match(
    faisalabadServicePage.body,
    /\[finished residential theatres\]\(\/projects\/residential\)/,
  )
  assert.match(faisalabadServicePage.body, /Planning for Faisalabad's mill-city heat and dust/)
  assert.doesNotMatch(faisalabadServicePage.body, /What installation includes/)
  assert.match(
    faisalabadServicePage.body,
    /Power backup for outages is discussed on the site visit/,
  )
  assert.equal(
    faisalabadServicePage.body.split("/service/home-theatre-design-and-installation").length - 1,
    1,
  )
  assert.equal(
    faisalabadServicePage.body.split("/home-cinema-and-cinema-installer-pakistan").length - 1,
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
  assert.match(copy, /\/service\/home-cinema-installation-sialkot/)
  assert.equal(copy.split("/service/home-cinema-installation-islamabad").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-lahore").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-multan").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-sialkot").length - 1, 1)
  assert.match(copy, /through \[contact\]\(\/contact\)/)
  assert.ok(copy.split("](/contact)").length - 1 >= 2)
  assert.doesNotMatch(copy, /22-C\/II/)
  assert.doesNotMatch(copy, /Zamzama/)
  assert.doesNotMatch(copy, /\+92 21/)
  assert.doesNotMatch(copy, /info@desertsound/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.doesNotMatch(copy, /home-cinema-installation-bahawalpur|home-cinema-installation-punjab/)
  assert.match(faisalabadServicePage.faqs[0].q, /install home cinemas in Faisalabad/)
  assert.match(faisalabadServicePage.faqs[1].q, /based in Faisalabad/)
  assert.match(faisalabadServicePage.faqs[2].q, /site visit/)
  assert.match(faisalabadServicePage.faqs[3].q, /professional home theater installation include/)
  assert.equal(
    faisalabadServicePage.faqs[4].q,
    "How do you plan a home cinema for Faisalabad's mill-city heat and dust?",
  )
  assert.equal(faisalabadServicePage.faqs[5].q, "Which areas of Faisalabad do you visit?")
})

test("Faisalabad lander does not invent local proof, superlatives, or sister brands", () => {
  const heroAndMeta = `${faisalabadServiceTitle}\n${faisalabadServiceH1}\n${faisalabadServiceDescription}\n${faisalabadServicePage.body.split("###")[0]}`
  assert.doesNotMatch(heroAndMeta, /\bbest\b/i)
  assert.doesNotMatch(heroAndMeta, /#1/)
  assert.doesNotMatch(copy, /Digital Sound/)
  assert.doesNotMatch(copy, /Daraz/)
  assert.doesNotMatch(copy, /Cinematics/)
  assert.doesNotMatch(copy, /Nashco/)
  assert.doesNotMatch(copy, /our Faisalabad (office|HQ|showroom)/i)
  assert.match(copy, /No Faisalabad office or showroom exists to visit/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.match(copy, /Madina Town, Wapda City, Peoples Colony and Civil Lines/)
  assert.match(copy, /Madina Town, Wapda City, Peoples Colony, Civil Lines/)
  assert.doesNotMatch(copy, /Susan Road|Canal Garden|DHA Faisalabad/i)
  assert.doesNotMatch(copy, /including Lahore, Islamabad/i)
  assert.doesNotMatch(copy, /\bUS\b|UK ranking|United States|United Kingdom/)
  assert.match(copy, /never present those Karachi rooms as Faisalabad work/)
  assert.match(copy, /finished residential theatres/)
  assert.doesNotMatch(copy, /Karachi proof/)
  assert.doesNotMatch(faisalabadServiceTitle, /Site Visits from Karachi/i)
  assert.match(faisalabadServiceDescription, /site visit/)
  assert.match(faisalabadServiceDescription, /Karachi/)
})

test("sitemap and llms listings include the Faisalabad service URL", () => {
  assert.match(sitemap, /rankingSeoPages/)
  assert.match(htmlSitemap, /\/service\/home-cinema-installation-faisalabad/)
  assert.match(
    readFileSync(join(root, "public/llms.txt"), "utf8"),
    /https:\/\/www\.desertsound\.com\.pk\/service\/home-cinema-installation-faisalabad/,
  )
})

test("theatre inbound is one Faisalabad nationwide-strip line without remaking locked SERP title", () => {
  assert.match(theatreLive, /Site visits nationwide from Karachi include/)
  assert.match(theatreLive, /home cinema installation in Faisalabad/)
  assert.match(theatreLive, /\/service\/home-cinema-installation-faisalabad/)
  assert.equal(theatreLive.split("/service/home-cinema-installation-faisalabad").length - 1, 1)
  const rankingTheatre = ranking.split('"slug": "/service/home-theatre-design-and-installation"')[1]
  assert.match(rankingTheatre.slice(0, 500), /Home Theater Installation in Pakistan \| Design and Install/)
  assert.match(
    rankingTheatre.slice(0, 800),
    /Home theater installation across Pakistan from Karachi. We design, install, and calibrate cinema rooms — site visits nationwide./,
  )
  assert.match(theatreRoute, /serviceRouteMetadata\(slug\)/)
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.doesNotMatch(homepage, /home-cinema-installation-faisalabad/)
})

test("#33 names Faisalabad once as a lean inbound to the city lander", () => {
  assert.match(
    article33,
    /\[Lahore\]\(\/service\/home-cinema-installation-lahore\), \[Islamabad\]\(\/service\/home-cinema-installation-islamabad\), \[Multan\]\(\/service\/home-cinema-installation-multan\), \[Faisalabad\]\(\/service\/home-cinema-installation-faisalabad\), \[Sialkot\]\(\/service\/home-cinema-installation-sialkot\), and other cities/,
  )
  assert.equal(article33.split("/service/home-cinema-installation-faisalabad").length - 1, 1)
})
