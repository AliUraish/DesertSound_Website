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
  assert.equal(islamabadFaqJsonLdItems().length, 5)
  assert.equal(islamabadServicePage.faqs.length, 5)
  for (const [index, faq] of islamabadServicePage.faqs.entries()) {
    const jsonLd = islamabadFaqJsonLdItems()[index]
    const stripped = faq.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
    assert.equal(jsonLd.question, faq.q)
    assert.equal(jsonLd.answer, stripped)
    assert.doesNotMatch(jsonLd.answer, /\[[^\]]+\]\([^)]+\)/)
  }
  assert.equal(
    islamabadFaqJsonLdItems()[1].answer,
    "No. Desert Sound is based in Karachi. We travel for Islamabad surveys and installs, and we do not claim an Islamabad office or showroom.",
  )
  assert.equal(
    islamabadFaqJsonLdItems()[4].answer,
    "It depends on the room and what goes into it. A site-visit survey of your Islamabad home measures the room and plans seats, screen, speakers, concealment and power, and that survey sets the scope for your room. Book the survey through our contact page.",
  )
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
  assert.match(copy, /\/service\/home-cinema-installation-lahore/)
  assert.match(copy, /\/service\/home-cinema-installation-multan/)
  assert.match(copy, /\/service\/home-cinema-installation-faisalabad/)
  assert.match(copy, /\/service\/home-cinema-installation-sialkot/)
  assert.equal(copy.split("/service/home-cinema-installation-lahore").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-multan").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-faisalabad").length - 1, 1)
  assert.equal(copy.split("/service/home-cinema-installation-sialkot").length - 1, 1)
  assert.match(copy, /\/service\/home-cinema-installation-bahawalpur/)
  assert.equal(copy.split("/service/home-cinema-installation-bahawalpur").length - 1, 1)
  assert.doesNotMatch(copy, /home-cinema-installation-punjab/)
  assert.doesNotMatch(copy, /22-C\/II/)
  assert.doesNotMatch(copy, /Zamzama/)
  assert.doesNotMatch(copy, /\+92 21/)
  assert.doesNotMatch(copy, /info@desertsound/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.match(copy, /\[Book an Islamabad site-visit survey\]\(\/contact-us\)/)
  assert.match(copy, /our \[contact page\]\(\/contact-us\)/)
  assert.equal(copy.split("](/contact-us)").length - 1, 3)
  assert.doesNotMatch(copy, /\]\(\/contact(?:\/)?\)/)
  assert.doesNotMatch(copy, /\]\(\/contact-us\/\)/)
  assert.doesNotMatch(copy, /\]\(\/[^)\s]+\/\)/)
  assert.match(islamabadServicePage.faqs[0].q, /install home cinemas in Islamabad/)
  assert.match(islamabadServicePage.faqs[1].q, /based in Islamabad/)
  assert.equal(
    islamabadServicePage.faqs[1].a,
    "No. Desert Sound is based in Karachi. We travel for Islamabad surveys and installs, and we do not claim an Islamabad office or showroom.",
  )
  assert.match(islamabadServicePage.faqs[2].q, /site visit/)
  assert.match(islamabadServicePage.faqs[3].q, /professional home theater installation/)
  assert.equal(islamabadServicePage.faqs[4].q, "How much does home cinema installation in Islamabad cost?")
  assert.equal(
    islamabadServicePage.faqs[4].a,
    "It depends on the room and what goes into it. A site-visit survey of your Islamabad home measures the room and plans seats, screen, speakers, concealment and power, and that survey sets the scope for your room. Book the survey through our [contact page](/contact-us).",
  )
})

test("Islamabad lander does not invent local proof, superlatives, or sister brands", () => {
  const heroAndMeta = `${islamabadServiceTitle}\n${islamabadServiceH1}\n${islamabadServiceDescription}\n${islamabadServicePage.body.split("###")[0]}`
  assert.doesNotMatch(copy, /\bbest\b/i)
  assert.doesNotMatch(copy, /#1/)
  assert.doesNotMatch(heroAndMeta, /\bbest\b/i)
  assert.doesNotMatch(heroAndMeta, /#1/)
  assert.doesNotMatch(copy, /Digital Sound/)
  assert.doesNotMatch(copy, /Daraz/)
  assert.doesNotMatch(copy, /Cinematics/)
  assert.doesNotMatch(copy, /Nashco/)
  assert.doesNotMatch(copy, /\bprices?\b/i)
  assert.doesNotMatch(copy, /PKR|Rs\.?\s*\d|lakh|crore/i)
  assert.doesNotMatch(copy, /our Islamabad (office|HQ|showroom|team|branch|staff)/i)
  assert.doesNotMatch(copy, /local (Islamabad )?(team|office|branch)/i)
  assert.doesNotMatch(copy, /local Islamabad showroom/i)
  assert.doesNotMatch(copy, /Islamabad-based (team|office|showroom|staff|branch)/i)
  assert.doesNotMatch(copy, /we (have|keep|staff|run) (an? )?(Islamabad|local) (office|showroom|team|branch)/i)
  assert.match(copy, /do not keep a same-day Islamabad showroom/)
  assert.match(copy, /do not claim an office or showroom there/)
  assert.match(copy, /do not keep an office or showroom there/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.doesNotMatch(
    copy,
    /Blue Area|F-7|F-8|F-6|F-10|F-11|F-sectors|G-6|G-8|G-9|G-10|G-11|E-11|I-8|I-9|DHA Islamabad|Bahria|Diplomatic Enclave|Margalla|Centaurus/i,
  )
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
    /\[Lahore\]\(\/service\/home-cinema-installation-lahore\), \[Islamabad\]\(\/service\/home-cinema-installation-islamabad\), \[Multan\]\(\/service\/home-cinema-installation-multan\), \[Faisalabad\]\(\/service\/home-cinema-installation-faisalabad\), \[Sialkot\]\(\/service\/home-cinema-installation-sialkot\), \[Bahawalpur\]\(\/service\/home-cinema-installation-bahawalpur\), and other cities/,
  )
  assert.match(
    article33,
    /\[Home cinema installation in Islamabad\]\(\/service\/home-cinema-installation-islamabad\) has the same problem in villas with glass and stone/,
  )
  assert.equal(article33.split("/service/home-cinema-installation-islamabad").length - 1, 2)
})
