import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import {
  islamabadFaqJsonLdItems,
  islamabadServiceDescription,
  islamabadServiceH1,
  islamabadServicePage,
  islamabadServicePath,
  islamabadServiceTitle,
} from "./islamabad-service-content.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/home-cinema-installation-islamabad/page.tsx"),
  "utf8",
)
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const schema = readFileSync(join(root, "lib/islamabad-service-schema.ts"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const htmlSitemap = readFileSync(join(root, "app/sitemap/page.tsx"), "utf8")
const rankingTypes = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const article33 = readFileSync(
  join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md"),
  "utf8",
)
const copy = `${islamabadServicePage.body}\n${islamabadServicePage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")}`

function wordCount(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_]/g, " ")
    .split(/\s+/)
    .filter((word) => /[A-Za-z]{2,}/.test(word)).length
}

test("Islamabad lander uses slug A, locked title/H1/meta, and is not a blog", () => {
  assert.equal(islamabadServicePath, "/service/home-cinema-installation-islamabad")
  assert.equal(islamabadServiceTitle, "Home Cinema Installation in Islamabad | Desert Sound")
  assert.equal(islamabadServiceH1, "Home Cinema Installation in Islamabad")
  assert.equal(
    islamabadServiceDescription,
    "Home cinema installation in Islamabad from Desert Sound's Karachi team. Design, install, and calibrate on a site visit — cinema rooms across Pakistan.",
  )
  assert.ok(islamabadServiceDescription.length >= 150 && islamabadServiceDescription.length <= 160)
  assert.equal(islamabadServicePage.slug, islamabadServicePath)
  assert.equal(islamabadServicePage.title, islamabadServiceTitle)
  assert.equal(islamabadServicePage.h1, islamabadServiceH1)
  assert.match(rankingTypes, /!path\.startsWith\("\/service\/"\)/)
  assert.match(serviceRoute, /title: \{ absolute: islamabadServiceTitle \}/)
  assert.doesNotMatch(islamabadServicePath, /\/services\//)
})

test("Islamabad ranking catalog and Service JSON-LD stay in lockstep", () => {
  assert.match(ranking, /islamabadServicePage/)
  const catalogSlice = seo.split('path: "/service/home-cinema-installation-islamabad"')[1]
  assert.ok(catalogSlice)
  assert.match(catalogSlice.slice(0, 800), /Home Cinema Installation in Islamabad \| Desert Sound/)
  assert.match(
    catalogSlice.slice(0, 900),
    /Home cinema installation in Islamabad from Desert Sound's Karachi team/,
  )
  assert.match(schema, /@type": "Country"/)
  assert.match(schema, /@type": "City"/)
  assert.match(schema, /name: "Islamabad"/)
  assert.match(schema, /serviceType: "Home cinema installation"/)
  assert.match(schema, /serviceJsonLd\(service\)/)
  assert.match(serviceRoute, /islamabadServiceJsonLd/)
  assert.match(serviceRoute, /faqPageJsonLd\(islamabadFaqJsonLdItems\(\)\)/)
  assert.equal(islamabadFaqJsonLdItems().length, 4)
  assert.equal(islamabadServicePage.faqs.length, 4)
})

test("Islamabad copy is install-led, 600–900 words, with required mesh links", () => {
  const words = wordCount(copy)
  assert.ok(words >= 600 && words <= 900, `copy is ${words} words; want 600–900`)
  assert.match(islamabadServicePage.body, /What home cinema installation in Islamabad means/)
  assert.match(islamabadServicePage.body, /Site visits from Karachi: how we work in Islamabad/)
  assert.match(islamabadServicePage.body, /### Rooms we've finished\n/)
  assert.doesNotMatch(islamabadServicePage.body, /Karachi proof, honest geography/)
  assert.match(
    islamabadServicePage.body,
    /\[finished residential theatres\]\(\/projects\/residential\)/,
  )
  assert.match(islamabadServicePage.body, /What installation includes/)
  assert.match(islamabadServicePage.body, /home theatre installation in Islamabad/i)
  assert.match(copy, /\/service\/home-theatre-design-and-installation/)
  assert.match(copy, /\/home-cinema-and-cinema-installer-pakistan/)
  assert.match(copy, /\/projects\/residential\/project-platinum/)
  assert.match(copy, /\/projects\/residential\/residency/)
  assert.match(copy, /\/projects\/residential\/studio-vellari/)
  assert.match(copy, /\/projects\/residential\/stanley-seats/)
  assert.match(copy, /22-C\/II, 2nd Zamzama Commercial Lane, Phase V, DHA Karachi/)
  assert.match(copy, /\+92 21 111 570 111/)
  assert.match(islamabadServicePage.faqs[0].q, /install home cinemas in Islamabad/)
  assert.match(islamabadServicePage.faqs[1].q, /based in Islamabad/)
  assert.match(islamabadServicePage.faqs[2].q, /site visit/)
  assert.match(islamabadServicePage.faqs[3].q, /professional home theater installation/)
})

test("Islamabad lander does not invent local proof, superlatives, or sister brands", () => {
  const heroAndMeta = `${islamabadServiceTitle}\n${islamabadServiceH1}\n${islamabadServiceDescription}\n${islamabadServicePage.body.split("###")[0]}`
  assert.doesNotMatch(heroAndMeta, /\bbest\b/i)
  assert.doesNotMatch(heroAndMeta, /#1/)
  assert.doesNotMatch(copy, /Digital Sound/)
  assert.doesNotMatch(copy, /Daraz/)
  assert.doesNotMatch(copy, /Cinematics/)
  assert.doesNotMatch(copy, /Nashco/)
  assert.doesNotMatch(copy, /our Islamabad (office|HQ|showroom)/i)
  assert.doesNotMatch(copy, /Islamabad office/i)
  assert.match(copy, /do not keep a same-day Islamabad showroom/)
  assert.match(copy, /not a second headquarters/)
  assert.doesNotMatch(copy, /Blue Area|F-7|F-8|F-sectors/i)
  assert.doesNotMatch(copy, /including Lahore, Islamabad/i)
  assert.doesNotMatch(copy, /\bUS\b|UK ranking|United States|United Kingdom/)
  assert.match(copy, /These are not Islamabad case studies/)
  assert.match(copy, /finished residential theatres/)
  assert.doesNotMatch(copy, /Karachi residential theatres/)
})

test("sitemap and llms listings include the Islamabad service URL", () => {
  assert.match(sitemap, /rankingSeoPages/)
  assert.match(htmlSitemap, /\/service\/home-cinema-installation-islamabad/)
  assert.match(
    readFileSync(join(root, "public/llms.txt"), "utf8"),
    /https:\/\/www\.desertsound\.com\.pk\/service\/home-cinema-installation-islamabad/,
  )
})

test("theatre inbound is one Islamabad line without remaking locked SERP title", () => {
  assert.match(theatreLive, /home cinema installation in Islamabad/)
  assert.match(theatreLive, /\/service\/home-cinema-installation-islamabad/)
  assert.equal(theatreLive.split("/service/home-cinema-installation-islamabad").length - 1, 1)
  const rankingTheatre = ranking.split('"slug": "/service/home-theatre-design-and-installation"')[1]
  assert.match(rankingTheatre.slice(0, 500), /Home Theater Installation in Pakistan \| Design and Install/)
  assert.match(theatreRoute, /serviceRouteMetadata\(slug\)/)
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
})

test("#33 upgrades existing Islamabad mentions to the city lander", () => {
  assert.match(
    article33,
    /\[Lahore\]\(\/service\/home-cinema-installation-lahore\), \[Islamabad\]\(\/service\/home-cinema-installation-islamabad\), \[Multan\]\(\/service\/home-cinema-installation-multan\), \[Faisalabad\]\(\/service\/home-cinema-installation-faisalabad\), and other cities/,
  )
  assert.match(
    article33,
    /\[Home cinema installation in Islamabad\]\(\/service\/home-cinema-installation-islamabad\) has the same problem in villas with glass and stone/,
  )
  assert.equal(article33.split("/service/home-cinema-installation-islamabad").length - 1, 2)
})
