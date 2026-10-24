import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import {
  punjabCityCards,
  punjabCityCopy,
  punjabLanderTownNames,
  punjabOtherTowns,
  punjabOtherTownsHeading,
  punjabOtherTownsSection,
  punjabTownAbout,
  punjabTownContact,
  punjabFaqJsonLdItems,
  punjabServiceDescription,
  punjabServiceH1,
  punjabServicePage,
  punjabServicePath,
  punjabServiceTitle,
} from "./punjab-service-content.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/home-cinema-installation-punjab/page.tsx"),
  "utf8",
)
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const schema = readFileSync(join(root, "lib/punjab-service-schema.ts"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const htmlSitemap = readFileSync(join(root, "app/sitemap/page.tsx"), "utf8")
const article33 = readFileSync(
  join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md"),
  "utf8",
)
const copy = `${punjabServicePage.body}\n${punjabCityCopy}\n${punjabServicePage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")}`

const cityHrefs = [
  "/service/home-cinema-installation-lahore",
  "/service/home-cinema-installation-faisalabad",
  "/service/home-cinema-installation-multan",
  "/service/home-cinema-installation-sialkot",
  "/service/home-cinema-installation-bahawalpur",
]

test("Punjab hub uses locked slug, title, H1, meta, and the single-brand title template", () => {
  assert.equal(punjabServicePath, "/service/home-cinema-installation-punjab")
  assert.doesNotMatch(punjabServicePath, /\/$/)
  assert.equal(punjabServiceTitle, "Home Cinema Installation in Punjab")
  assert.equal(punjabServiceTitle.length, 34)
  assert.doesNotMatch(punjabServiceTitle, /Desert Sound/)
  assert.equal(punjabServiceH1, "Home Cinema Installation in Punjab")
  assert.equal(
    punjabServiceDescription,
    "Home cinema installation in Punjab from Desert Sound. Lahore, Faisalabad, Multan, Sialkot and Bahawalpur: survey, design, install and calibrate on site.",
  )
  assert.equal(punjabServiceDescription.length, 152)
  assert.equal(punjabServicePage.slug, punjabServicePath)
  assert.equal(punjabServicePage.title, punjabServiceTitle)
  assert.equal(punjabServicePage.h1, punjabServiceH1)
  assert.match(layout, /template: `%s \| \$\{siteName\}`/)
  assert.match(serviceRoute, /serviceRouteMetadata\(punjabServicePath\)/)
  assert.doesNotMatch(serviceRoute, /title: \{ absolute/)
  assert.doesNotMatch(serviceRoute, /index:\s*false/)
  assert.doesNotMatch(punjabServicePath, /\/services\//)
  assert.match(ranking, /!path\.startsWith\("\/service\/"\)/)
})

test("Punjab ranking catalog and Service JSON-LD stay in lockstep", () => {
  assert.match(ranking, /punjabServicePage/)
  const catalogSlice = seo.split('path: "/service/home-cinema-installation-punjab"')[1]
  assert.ok(catalogSlice)
  assert.match(catalogSlice.slice(0, 800), /Home Cinema Installation in Punjab/)
  assert.doesNotMatch(catalogSlice.slice(0, 400), /Home Cinema Installation in Punjab \| Desert Sound/)
  assert.match(
    catalogSlice.slice(0, 900),
    /Home cinema installation in Punjab from Desert Sound\. Lahore, Faisalabad, Multan, Sialkot and Bahawalpur/,
  )
  assert.match(schema, /@type": "AdministrativeArea"/)
  assert.match(schema, /name: "Punjab"/)
  assert.match(schema, /@type": "City"/)
  assert.match(schema, /name: "Lahore"/)
  assert.match(schema, /name: "Faisalabad"/)
  assert.match(schema, /name: "Multan"/)
  assert.match(schema, /name: "Sialkot"/)
  assert.match(schema, /name: "Bahawalpur"/)
  assert.match(schema, /serviceType: "Home cinema installation"/)
  assert.match(schema, /serviceJsonLd\(service\)/)
  assert.match(seo, /@id": `\$\{siteUrl\}\/#localbusiness`/)
  assert.doesNotMatch(schema, /streetAddress/)
  assert.doesNotMatch(schema, /telephone/)
  assert.match(serviceRoute, /punjabServiceJsonLd/)
  assert.match(serviceRoute, /faqPageJsonLd\(punjabFaqJsonLdItems\(\)\)/)
  assert.equal(punjabFaqJsonLdItems().length, 5)
  assert.equal(punjabServicePage.faqs.length, 5)
  for (const [index, faq] of punjabServicePage.faqs.entries()) {
    const jsonLd = punjabFaqJsonLdItems()[index]
    const stripped = faq.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
    assert.equal(jsonLd.question, faq.q)
    assert.equal(jsonLd.answer, stripped)
  }
  assert.equal(punjabFaqJsonLdItems()[4].answer, "Send your city, area and room through our contact page. We will confirm the visit date.")
})

test("Punjab hub copy links each destination once, slashless, with booking only on /contact-us", () => {
  for (const href of cityHrefs) {
    assert.equal(copy.split(href).length - 1, 1, href)
    assert.doesNotMatch(copy, new RegExp(`${href}/`))
  }
  assert.equal(copy.split("/service/home-theatre-design-and-installation").length - 1, 1)
  assert.equal(copy.split("/home-cinema-and-cinema-installer-pakistan").length - 1, 1)
  assert.equal(copy.split("/projects/residential)").length - 1, 1)
  assert.doesNotMatch(copy, /\/projects\/residential\//)
  assert.equal(copy.split("](/contact-us)").length - 1, 3)
  assert.doesNotMatch(copy, /\]\(\/contact(?:\/)?\)/)
  assert.doesNotMatch(copy, /\]\(\/contact-us\/\)/)
  assert.doesNotMatch(copy, /\]\(\/[^)\s]+\/\)/)
  for (const link of punjabServicePage.links) {
    assert.doesNotMatch(link.href, /\/$/)
  }
  assert.equal(punjabServicePage.faqs[0].q, "Do you install home cinemas in Punjab?")
  assert.equal(punjabServicePage.faqs[1].q, "Does Desert Sound have an office in Punjab?")
  assert.equal(punjabServicePage.faqs[2].q, "Which Punjab cities do you cover?")
  assert.equal(punjabServicePage.faqs[3].q, "What happens on a Punjab site visit?")
  assert.equal(punjabServicePage.faqs[4].q, "How do I book a survey in Punjab?")
})

test("Punjab hub stays fact-locked: Lahore team line only, no invented local presence or banned terms", () => {
  assert.match(punjabCityCopy, /We have a team in Lahore/)
  const lahoreCard = punjabCityCards.find((city) => city.key === "Lahore")
  assert.equal(lahoreCard?.note, "We have a team in Lahore.")
  assert.match(punjabCityCopy, /\[Lahore\]\(\/service\/home-cinema-installation-lahore\)\n[^\n]+ We have a team in Lahore\. You can contact us\./)
  for (const card of punjabCityCards.filter((city) => city.key !== "Lahore")) {
    assert.equal(card.note, "", card.name)
  }
  const withoutLahoreTeam = copy.replace(/We have a team in Lahore/g, "")
  assert.doesNotMatch(withoutLahoreTeam, /team in (?:Lahore|Faisalabad|Multan|Sialkot|Bahawalpur)/i)
  assert.doesNotMatch(copy, /our (?:Faisalabad|Multan|Sialkot|Bahawalpur|Punjab) (?:office|HQ|showroom|team|branch)/i)
  assert.doesNotMatch(copy, /Digital Sound/)
  assert.doesNotMatch(copy, /\bbest\b/i)
  assert.doesNotMatch(copy, /#1/)
  assert.doesNotMatch(copy, /\bprices\b/i)
  assert.doesNotMatch(copy, /\bDHA\b/i)
  assert.doesNotMatch(copy, /Clifton/i)
  assert.doesNotMatch(copy, /Bahria/i)
  assert.doesNotMatch(copy, /Gulgasht/i)
  assert.doesNotMatch(copy, /Model Town/i)
  assert.doesNotMatch(copy, /Madina/i)
  assert.doesNotMatch(copy, /Wapda/i)
  assert.doesNotMatch(copy, /Citi Housing/i)
  assert.doesNotMatch(copy.replace(punjabOtherTownsSection, ""), /\bCantt\b/i)
  assert.doesNotMatch(copy, /\bPhase\b/i)
  assert.doesNotMatch(copy, /\bColony\b/i)
  assert.doesNotMatch(copy, /\bTown\b/i)
  assert.doesNotMatch(copy, /Satellite/i)
  assert.doesNotMatch(copy, /Civil Lines/i)
  assert.doesNotMatch(copy, /Peoples Colony/i)
  assert.doesNotMatch(copy.replace(punjabOtherTownsSection, ""), /Ghazi/i)
  assert.doesNotMatch(copy, /\bUS\b|\bUK\b|United States|United Kingdom/)
  assert.doesNotMatch(copy.replace(punjabOtherTownsSection, ""), /Rawalpindi|Gujranwala/)
  assert.doesNotMatch(copy, /22-C\/II/)
  assert.doesNotMatch(copy, /Zamzama/)
  assert.doesNotMatch(copy, /\+92/)
  assert.doesNotMatch(copy, /info@desertsound/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.doesNotMatch(homepage, /home-cinema-installation-punjab/)
})

test("Punjab hub shows the city write-ups inside the map, not in the page body", () => {
  assert.doesNotMatch(punjabServicePage.body, /Punjab cities we cover/)
  assert.doesNotMatch(punjabServicePage.body, /####/)
  assert.match(punjabServicePage.body, /Pick your city on the map for the local detail/)
  assert.match(serviceRoute, /PunjabCityMap/)
  assert.match(serviceRoute, /beforeBody=\{<PunjabCityMap/)
  const map = readFileSync(join(root, "components/punjab-city-map.tsx"), "utf8")
  for (const href of cityHrefs) {
    assert.equal(map.split(href).length - 1, 0, href)
    assert.equal(punjabCityCards.filter((city) => city.href === href).length, 1, href)
  }
  assert.match(map, /punjabCityCards/)
  assert.doesNotMatch(map, /@keyframes|animation:|transition:/)
  assert.doesNotMatch(map, /home-cinema-installation-islamabad/)
  assert.doesNotMatch(map, /home-cinema-installation-punjab/)
  assert.equal(copy.split("/service/home-cinema-installation-lahore").length - 1, 1)
})

test("Punjab hub lists every non-lander town in a visible Other Punjab towns section", () => {
  assert.equal(punjabOtherTownsHeading, "Other Punjab towns we visit")
  assert.match(punjabServicePage.body, /### Other Punjab towns we visit/)
  assert.match(punjabServicePage.body, punjabOtherTownsSection)
  // This page has no ## heading, so ### Other Punjab towns we visit renders as an H2.
  assert.doesNotMatch(punjabServicePage.body, /(^|\n)## [^#]/)
  assert.doesNotMatch(punjabOtherTownsSection, /display:\s*none|opacity:\s*0|visually-hidden|sr-only/)

  const headingAt = punjabServicePage.body.indexOf(punjabOtherTownsHeading)
  assert.ok(headingAt >= 0, "section heading renders in the body")
  const nextHeading = punjabServicePage.body.indexOf("\n### ", headingAt)
  const section =
    nextHeading === -1
      ? punjabServicePage.body.slice(headingAt)
      : punjabServicePage.body.slice(headingAt, nextHeading)

  const geometry = readFileSync(join(root, "lib/punjab-map-geometry.ts"), "utf8")
  const mapTowns = [...geometry.matchAll(/"name":"([^"]+)"/g)].map((match) => match[1])
  assert.deepEqual(
    punjabOtherTowns.map((town) => town.name).sort(),
    [...mapTowns].sort(),
  )
  assert.deepEqual(
    punjabOtherTowns.map((town) => town.name).sort(),
    Object.keys(punjabTownAbout).sort(),
  )

  for (const name of punjabLanderTownNames) {
    assert.equal(
      punjabOtherTowns.some((town) => town.name === name),
      false,
      `${name} has a lander and must not be listed again`,
    )
    assert.doesNotMatch(section, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  }

  assert.ok(punjabOtherTowns.length >= 25)
  for (const town of punjabOtherTowns) {
    assert.equal(town.about, punjabTownAbout[town.name], town.name)
    assert.match(section, new RegExp(`\\*\\*${town.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.\\*\\*`))
    assert.match(section, town.about)
  }

  const map = readFileSync(join(root, "components/punjab-city-map.tsx"), "utf8")
  assert.match(map, /punjabTownAbout\[town\.name\]/)

  assert.doesNotMatch(section, /\+92/)
  assert.doesNotMatch(section, /111\s*570/)
  assert.doesNotMatch(section, /Digital Sound/)
  assert.doesNotMatch(section, /\bDHA\b/)
  assert.doesNotMatch(section, /Clifton/)
  assert.doesNotMatch(section, /Bahria/)
  assert.doesNotMatch(section, /Zamzama/)
  assert.doesNotMatch(section, /\bPhase\b/)
})

test("Punjab map cards: page cities link by name and offer contact; towns only offer contact", () => {
  const geometry = readFileSync(join(root, "lib/punjab-map-geometry.ts"), "utf8")
  const towns = [...geometry.matchAll(/"name":"([^"]+)"/g)].map((match) => match[1])
  assert.ok(towns.length >= 25)
  const mainCities = punjabCityCards.map((city) => city.name)
  for (const name of towns) {
    assert.ok(!mainCities.includes(name), `${name} already has a page`)
    const about = punjabTownAbout[name]
    assert.ok(about, `${name} has a line about what we do`)
    assert.ok(about.length <= 120, `${name} line is short`)
    assert.doesNotMatch(about, /team|office|showroom|branch|headquarters|Karachi|\bbest\b|prices|#1|don't have a page/i)
  }
  assert.deepEqual(Object.keys(punjabTownAbout).sort(), [...towns].sort())
  for (const card of punjabCityCards) {
    assert.ok(card.about.length > 40 && card.about.length <= 130, card.name)
    assert.doesNotMatch(card.about, /team|office|showroom|branch|Karachi/i, card.name)
  }
  assert.deepEqual(punjabTownContact, { text: "Contact us", href: "/contact-us" })
  for (const card of punjabCityCards) {
    assert.match(punjabCityCopy, new RegExp(`\\[${card.name}\\]\\(${card.href.replace(/\//g, "\\/")}\\)`))
  }
  assert.equal(punjabCityCopy.split("You can contact us.").length - 1, punjabCityCards.length)
  assert.doesNotMatch(punjabCityCopy, /don't have a page/)
  const map = readFileSync(join(root, "components/punjab-city-map.tsx"), "utf8")
  const scene = readFileSync(join(root, "components/punjab-map-scene.tsx"), "utf8")
  assert.match(map, /punjabMapTowns/)
  assert.match(map, /punjabTownContact/)
  assert.match(scene, /You can\{" "\}/)
  assert.match(scene, />\s*Contact us\s*</)
  assert.doesNotMatch(scene + map, /don't have a page/)
})

test("Punjab map is a still Three.js scene with equal pins", () => {
  const map = readFileSync(join(root, "components/punjab-city-map.tsx"), "utf8")
  const scene = readFileSync(join(root, "components/punjab-map-scene.tsx"), "utf8")
  assert.doesNotMatch(map, /team in Karachi/)
  assert.match(map, /<figcaption/)
  assert.match(scene, /^"use client"/)
  assert.match(scene, /await import\("three"\)/)
  // The map holds still: no intro, no orbiting dash, no pointer tilt.
  assert.doesNotMatch(scene, /dashOffset|pointermove|performance\.now|animationDelay/)
  assert.match(scene, /WebGLRenderer/)
  // One pin geometry for every place: no per-city sizes.
  assert.equal(scene.split("new THREE.SphereGeometry").length - 1, 1)
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"))
  assert.ok(pkg.dependencies.three)
})

test("sitemap and llms listings include the Punjab hub URL slashless", () => {
  assert.match(sitemap, /rankingSeoPages/)
  assert.match(htmlSitemap, /\/service\/home-cinema-installation-punjab/)
  assert.doesNotMatch(htmlSitemap, /\/service\/home-cinema-installation-punjab\//)
  assert.match(
    readFileSync(join(root, "public/llms.txt"), "utf8"),
    /https:\/\/www\.desertsound\.com\.pk\/service\/home-cinema-installation-punjab/,
  )
})

test("inbound mesh is one hub link from each Punjab city, the installer city line, and the theatre city line", () => {
  const cityFiles = [
    "lib/lahore-city-lander.ts",
    "lib/faisalabad-service-content.ts",
    "lib/multan-service-content.ts",
    "lib/sialkot-service-content.ts",
    "lib/bahawalpur-service-content.ts",
  ]
  for (const file of cityFiles) {
    const source = readFileSync(join(root, file), "utf8")
    assert.equal(source.split("/service/home-cinema-installation-punjab").length - 1, 1, file)
    assert.doesNotMatch(source, /\/service\/home-cinema-installation-punjab\//)
  }
  const islamabad = readFileSync(join(root, "lib/islamabad-service-content.ts"), "utf8")
  assert.doesNotMatch(islamabad, /home-cinema-installation-punjab/)
  assert.match(theatreLive, /Site visits nationwide from Karachi include/)
  assert.match(theatreLive, /home cinema installation in Punjab/)
  assert.equal(theatreLive.split("/service/home-cinema-installation-punjab").length - 1, 1)
  assert.doesNotMatch(theatreLive, /\/service\/home-cinema-installation-punjab\//)
  const nationwide = theatreLive.split("Site visits nationwide from Karachi include")[1]?.split("</p>")[0] ?? ""
  assert.match(nationwide, /home-cinema-installation-multan/)
  assert.match(nationwide, /home-cinema-installation-faisalabad/)
  assert.match(nationwide, /home-cinema-installation-sialkot/)
  assert.match(nationwide, /home-cinema-installation-bahawalpur/)
  assert.match(nationwide, /home-cinema-installation-punjab/)
  assert.doesNotMatch(nationwide, /home-cinema-installation-lahore/)
  assert.doesNotMatch(nationwide, /home-cinema-installation-islamabad/)
  assert.match(theatreLive, /We have a team in Lahore for/)
  assert.match(theatreLive, /\/service\/home-cinema-installation-lahore/)
  assert.equal(theatreLive.split("/service/home-cinema-installation-lahore").length - 1, 1)
  assert.doesNotMatch(theatreLive, /\/service\/home-cinema-installation-lahore\//)
  assert.match(
    article33,
    /\[home theatre design and installation\]\(\/service\/home-theatre-design-and-installation\) work follows one sequence/,
  )
  assert.equal(article33.split("/service/home-cinema-installation-punjab").length - 1, 1)
  assert.doesNotMatch(article33, /\/service\/home-cinema-installation-punjab\//)
})
