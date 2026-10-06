import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import {
  sialkotFaqJsonLdItems,
  sialkotServiceDescription,
  sialkotServiceH1,
  sialkotServicePage,
  sialkotServicePath,
  sialkotServiceTitle,
} from "./sialkot-service-content.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/home-cinema-installation-sialkot/page.tsx"),
  "utf8",
)
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const schema = readFileSync(join(root, "lib/sialkot-service-schema.ts"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const htmlSitemap = readFileSync(join(root, "app/sitemap/page.tsx"), "utf8")
const article33 = readFileSync(
  join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md"),
  "utf8",
)
const copy = `${sialkotServicePage.body}\n${sialkotServicePage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")}`

function wordCount(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_]/g, " ")
    .split(/\s+/)
    .filter((word) => /[A-Za-z]{2,}/.test(word)).length
}

test("Sialkot lander uses slug A, locked title/H1/meta, and is not a blog", () => {
  assert.equal(sialkotServicePath, "/service/home-cinema-installation-sialkot")
  assert.equal(sialkotServiceTitle, "Home Cinema Installation in Sialkot | Desert Sound")
  assert.equal(sialkotServiceH1, "Home Cinema Installation in Sialkot")
  assert.equal(
    sialkotServiceDescription,
    "Home cinema installation in Sialkot from Desert Sound's Karachi team. Design, install, and calibrate on a planned site visit — cinema rooms across Pakistan.",
  )
  assert.ok(sialkotServiceDescription.length >= 150 && sialkotServiceDescription.length <= 160)
  assert.equal(sialkotServicePage.slug, sialkotServicePath)
  assert.equal(sialkotServicePage.title, sialkotServiceTitle)
  assert.equal(sialkotServicePage.h1, sialkotServiceH1)
  assert.match(ranking, /!path\.startsWith\("\/service\/"\)/)
  assert.match(serviceRoute, /title: \{ absolute: sialkotServiceTitle \}/)
  assert.doesNotMatch(sialkotServicePath, /\/services\//)
})

test("Sialkot ranking catalog and Service JSON-LD stay in lockstep", () => {
  assert.match(ranking, /sialkotServicePage/)
  const catalogSlice = seo.split('path: "/service/home-cinema-installation-sialkot"')[1]
  assert.ok(catalogSlice)
  assert.match(catalogSlice.slice(0, 800), /Home Cinema Installation in Sialkot \| Desert Sound/)
  assert.match(
    catalogSlice.slice(0, 900),
    /Home cinema installation in Sialkot from Desert Sound's Karachi team/,
  )
  assert.match(schema, /@type": "Country"/)
  assert.match(schema, /@type": "City"/)
  assert.match(schema, /name: "Sialkot"/)
  assert.match(schema, /serviceType: "Home cinema installation"/)
  assert.match(schema, /serviceJsonLd\(service\)/)
  assert.match(serviceRoute, /sialkotServiceJsonLd/)
  assert.match(serviceRoute, /faqPageJsonLd\(sialkotFaqJsonLdItems\(\)\)/)
  assert.equal(sialkotFaqJsonLdItems().length, 4)
  assert.equal(sialkotServicePage.faqs.length, 4)
})

test("Sialkot copy is install-led, 450–700 words, with required mesh links", () => {
  const words = wordCount(copy)
  assert.ok(words >= 450 && words <= 700, `copy is ${words} words; want 450–700`)
  assert.match(sialkotServicePage.body, /What home cinema installation in Sialkot means/)
  assert.match(sialkotServicePage.body, /Site visits from Karachi: how we work in Sialkot/)
  assert.match(sialkotServicePage.body, /### Rooms we've finished\n/)
  assert.doesNotMatch(sialkotServicePage.body, /Karachi proof/)
  assert.match(
    sialkotServicePage.body,
    /\[finished residential theatres\]\(\/projects\/residential\)/,
  )
  assert.match(sialkotServicePage.body, /What installation includes/)
  assert.match(sialkotServicePage.body, /home theater installation in Sialkot/i)
  assert.match(sialkotServicePage.body, /home cinema installer in Sialkot/i)
  assert.match(sialkotServicePage.body, /Home theatre installation in Sialkot/)
  assert.match(sialkotServicePage.body, /export and industrial city/)
  assert.match(sialkotServicePage.body, /family compounds/)
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
  assert.equal(copy.split("/service/home-cinema-installation-islamabad").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-lahore").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-multan").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-faisalabad").length - 1, 1)
  assert.doesNotMatch(copy, /home-cinema-installation-bahawalpur|home-cinema-installation-punjab/)
  assert.match(copy, /22-C\/II, 2nd Zamzama Commercial Lane, Phase V, DHA Karachi/)
  assert.match(copy, /\+92 21 111 570 111/)
  assert.match(sialkotServicePage.faqs[0].q, /install home cinemas in Sialkot/)
  assert.match(sialkotServicePage.faqs[1].q, /based in Sialkot/)
  assert.match(sialkotServicePage.faqs[2].q, /site visit/)
  assert.match(sialkotServicePage.faqs[3].q, /professional home theater installation include/)
})

test("Sialkot lander does not invent local proof, superlatives, or sister brands", () => {
  const heroAndMeta = `${sialkotServiceTitle}\n${sialkotServiceH1}\n${sialkotServiceDescription}\n${sialkotServicePage.body.split("###")[0]}`
  assert.doesNotMatch(heroAndMeta, /\bbest\b/i)
  assert.doesNotMatch(heroAndMeta, /#1/)
  assert.doesNotMatch(copy, /Digital Sound/)
  assert.doesNotMatch(copy, /Daraz/)
  assert.doesNotMatch(copy, /Cinematics/)
  assert.doesNotMatch(copy, /Nashco/)
  assert.doesNotMatch(copy, /our Sialkot (office|HQ|showroom)/i)
  assert.doesNotMatch(copy, /Sialkot office/i)
  assert.match(copy, /do not keep a Sialkot address/)
  assert.match(copy, /not staff a second headquarters/)
  assert.doesNotMatch(copy, /Sialkot Cantt|Sambrial|Ugoki|Defence Sialkot|Model Town Sialkot/i)
  assert.doesNotMatch(copy, /including Lahore, Islamabad/i)
  assert.doesNotMatch(copy, /\bUS\b|UK ranking|United States|United Kingdom/)
  assert.match(copy, /These are not Sialkot case studies/)
  assert.match(copy, /finished residential theatres/)
  assert.doesNotMatch(copy, /Karachi proof/)
  assert.doesNotMatch(sialkotServiceTitle, /Site Visits from Karachi/i)
  assert.match(sialkotServiceDescription, /site visit/)
  assert.match(sialkotServiceDescription, /Karachi/)
})

test("sitemap and llms listings include the Sialkot service URL", () => {
  assert.match(sitemap, /rankingSeoPages/)
  assert.match(htmlSitemap, /\/service\/home-cinema-installation-sialkot/)
  assert.match(
    readFileSync(join(root, "public/llms.txt"), "utf8"),
    /https:\/\/www\.desertsound\.com\.pk\/service\/home-cinema-installation-sialkot/,
  )
})

test("theatre inbound is one Sialkot nationwide-strip line without remaking locked SERP title", () => {
  assert.match(theatreLive, /Site visits nationwide from Karachi include/)
  assert.match(theatreLive, /home cinema installation in Sialkot/)
  assert.match(theatreLive, /\/service\/home-cinema-installation-sialkot/)
  assert.equal(theatreLive.split("/service/home-cinema-installation-sialkot").length - 1, 1)
  const rankingTheatre = ranking.split('"slug": "/service/home-theatre-design-and-installation"')[1]
  assert.match(rankingTheatre.slice(0, 500), /Home Theater Installation in Pakistan \| Design and Install/)
  assert.match(
    rankingTheatre.slice(0, 800),
    /Home theater installation across Pakistan from Karachi. We design, install, and calibrate cinema rooms — site visits nationwide./,
  )
  assert.match(theatreRoute, /serviceRouteMetadata\(slug\)/)
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.doesNotMatch(homepage, /home-cinema-installation-sialkot/)
})

test("#33 names Sialkot once as a lean inbound to the city lander", () => {
  assert.match(
    article33,
    /\[Lahore\]\(\/service\/home-cinema-installation-lahore\), \[Islamabad\]\(\/service\/home-cinema-installation-islamabad\), \[Multan\]\(\/service\/home-cinema-installation-multan\), \[Faisalabad\]\(\/service\/home-cinema-installation-faisalabad\), \[Sialkot\]\(\/service\/home-cinema-installation-sialkot\), and other cities/,
  )
  assert.equal(article33.split("/service/home-cinema-installation-sialkot").length - 1, 1)
})
