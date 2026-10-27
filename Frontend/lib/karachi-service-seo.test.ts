import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { canonicalizePath } from "./canonical-path.ts"
import { positions } from "./careers-data.ts"
import {
  karachiAreasSentence,
  karachiFaqJsonLdItems,
  karachiServiceDescription,
  karachiServiceH1,
  karachiServicePage,
  karachiServicePath,
  karachiServiceTitle,
} from "./karachi-service-content.ts"
import { projectLibraries } from "./projects-data.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/home-cinema-installation-karachi/page.tsx"),
  "utf8",
)
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const schema = readFileSync(join(root, "lib/karachi-service-schema.ts"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const htmlSitemap = readFileSync(join(root, "app/sitemap/page.tsx"), "utf8")
const article33 = readFileSync(
  join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md"),
  "utf8",
)
const privateCinema = readFileSync(
  join(root, "content/articles/private-home-cinema-karachi.md"),
  "utf8",
)
const setupPost = readFileSync(
  join(root, "content/articles/how-to-choose-a-home-theater-setup-for-your-karachi-home.md"),
  "utf8",
)
const copy = `${karachiServicePage.body}\n${karachiServicePage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")}`
const headings = [...karachiServicePage.body.matchAll(/^#{1,6}\s+.+$/gm)].map((match) => match[0])

const lockedAreasSentence =
  "We work across Karachi, covering areas such as DHA, Clifton, PECHS and Gulshan-e-Iqbal."

function wordCount(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_]/g, " ")
    .split(/\s+/)
    .filter((word) => /[A-Za-z]{2,}/.test(word)).length
}

function sitemapUrlCount() {
  const staticRoutes = ["/", "/projects", "/projects/residential", "/projects/commercial", "/careers"]
  const residentialProjectRoutes = projectLibraries.residential.map(
    (project) => `/projects/residential/${project.slug}`,
  )
  const commercialProjectRoutes = projectLibraries.commercial.map(
    (project) => `/projects/commercial/${project.slug}`,
  )
  const careerRoutes = positions.map((position) => `/careers/${position.slug}`)
  const inlineRankingRoutes = [...ranking.matchAll(/"slug": "([^"]+)"/g)].map((match) => match[1])
  const importedLanderRoutes = [
    karachiServicePath,
    "/service/home-cinema-installation-islamabad",
    "/service/home-cinema-installation-lahore",
    "/service/home-cinema-installation-multan",
    "/service/home-cinema-installation-faisalabad",
    "/service/home-cinema-installation-sialkot",
    "/service/home-cinema-installation-bahawalpur",
    "/service/home-cinema-installation-punjab",
  ]
  const articleRoutes = readdirSync(join(root, "content/articles"))
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const raw = readFileSync(join(root, "content/articles", name), "utf8")
      const match = raw.match(/"slug": "([^"]+)"/)
      assert.ok(match, `${name} must declare a slug`)
      return match[1]
    })
  return new Set(
    [
      ...staticRoutes,
      ...residentialProjectRoutes,
      ...commercialProjectRoutes,
      ...careerRoutes,
      ...inlineRankingRoutes,
      ...importedLanderRoutes,
      ...articleRoutes,
    ].map((route) => canonicalizePath(route)),
  ).size
}

test("Karachi lander uses slug A, locked title/H1/meta, and the single-brand title template", () => {
  assert.equal(karachiServicePath, "/service/home-cinema-installation-karachi")
  assert.doesNotMatch(karachiServicePath, /\/$/)
  assert.equal(karachiServiceTitle, "Home Cinema Installation in Karachi")
  assert.doesNotMatch(karachiServiceTitle, /Desert Sound/)
  assert.equal(karachiServiceH1, "Home Cinema Installation in Karachi")
  assert.equal(
    karachiServiceDescription,
    "Home cinema and home theatre installation in Karachi starts with a site survey. We then design, install and calibrate the room after that visit.",
  )
  assert.ok(karachiServiceDescription.length >= 140 && karachiServiceDescription.length <= 155)
  assert.equal(karachiServicePage.slug, karachiServicePath)
  assert.equal(karachiServicePage.title, karachiServiceTitle)
  assert.equal(karachiServicePage.h1, karachiServiceH1)
  assert.match(layout, /template: `%s \| \$\{siteName\}`/)
  assert.match(ranking, /!path\.startsWith\("\/service\/"\)/)
  assert.match(serviceRoute, /serviceRouteMetadata\(karachiServicePath\)/)
  assert.doesNotMatch(serviceRoute, /title: \{ absolute/)
  assert.doesNotMatch(serviceRoute, /index:\s*false/)
  assert.doesNotMatch(karachiServicePath, /\/services\//)
})

test("Karachi ranking catalog and Service JSON-LD stay in lockstep", () => {
  assert.match(ranking, /karachiServicePage/)
  const catalogSlice = seo.split('path: "/service/home-cinema-installation-karachi"')[1]
  assert.ok(catalogSlice)
  assert.match(catalogSlice.slice(0, 800), /Home Cinema Installation in Karachi/)
  assert.doesNotMatch(catalogSlice.slice(0, 400), /Home Cinema Installation in Karachi \| Desert Sound/)
  assert.match(
    catalogSlice.slice(0, 900),
    /Home cinema and home theatre installation in Karachi starts with a site survey/,
  )
  assert.match(schema, /@type": "Country"/)
  assert.match(schema, /@type": "City"/)
  assert.match(schema, /name: "Karachi"/)
  assert.match(schema, /serviceType: "Home cinema installation"/)
  assert.match(schema, /serviceJsonLd\(service\)/)
  assert.match(serviceRoute, /karachiServiceJsonLd/)
  assert.match(serviceRoute, /faqPageJsonLd\(karachiFaqJsonLdItems\(\)\)/)
  assert.equal(karachiFaqJsonLdItems().length, 6)
  assert.equal(karachiServicePage.faqs.length, 6)
  for (const [index, faq] of karachiServicePage.faqs.entries()) {
    const jsonLd = karachiFaqJsonLdItems()[index]
    const stripped = faq.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
    assert.equal(jsonLd.question, faq.q)
    assert.equal(jsonLd.answer, stripped)
  }
})

test("Karachi copy is install-led, 900–1100 body words, with required mesh links", () => {
  const words = wordCount(karachiServicePage.body)
  assert.ok(words >= 900 && words <= 1100, `body is ${words} words; want 900–1100`)
  assert.match(karachiServicePage.body, /What home cinema installation in Karachi means/)
  assert.match(karachiServicePage.body, /### Homes we work in\n/)
  assert.match(karachiServicePage.body, /### Rooms we've finished\n/)
  assert.match(karachiServicePage.body, /Planning for humidity, sea air, light and power/)
  assert.match(karachiServicePage.body, /After the site survey/)
  assert.match(karachiServicePage.body, /our Karachi showroom/)
  assert.match(karachiServicePage.body, /we have a team in Lahore/)
  assert.match(
    karachiServicePage.body,
    /we have a team in Lahore for \[home cinema installation in Lahore\]\(\/service\/home-cinema-installation-lahore\)/,
  )
  assert.equal(karachiServicePage.body.split("/service/home-theatre-design-and-installation").length - 1, 1)
  assert.equal(karachiServicePage.body.split("/home-cinema-and-cinema-installer-pakistan").length - 1, 1)
  assert.equal(karachiServicePage.body.split("/private-home-cinema-karachi").length - 1, 1)
  assert.equal(karachiServicePage.body.split("/service/home-cinema-installation-lahore").length - 1, 1)
  assert.equal(karachiServicePage.body.split("/service/home-cinema-installation-punjab").length - 1, 1)
  assert.match(copy, /\/projects\/residential\/project-platinum/)
  assert.match(copy, /\/projects\/residential\/residency/)
  assert.doesNotMatch(copy, /studio-vellari/)
  assert.doesNotMatch(copy, /stanley-seats/)
  assert.match(copy, /\[Book a Karachi site-visit survey\]\(\/contact-us\)/)
  assert.equal(copy.split("](/contact-us)").length - 1, 2)
  assert.doesNotMatch(copy, /\]\(\/contact(?:\/)?\)/)
  assert.doesNotMatch(copy, /\]\(\/contact-us\/\)/)
  assert.doesNotMatch(copy, /\]\(\/[^)\s]+\/\)/)
  assert.match(karachiServicePage.faqs[0].q, /site survey/)
  assert.match(karachiServicePage.faqs[1].q, /Karachi flat/)
  assert.match(karachiServicePage.faqs[2].q, /humidity and salty sea air/)
  assert.match(karachiServicePage.faqs[3].q, /How long does home cinema installation in Karachi take/)
  assert.match(karachiServicePage.faqs[4].q, /power cuts and backup/)
  assert.match(karachiServicePage.faqs[5].q, /What drives the cost/)
})

test("Karachi areas sentence appears once and only in the where-we-work body", () => {
  assert.equal(karachiAreasSentence, lockedAreasSentence)
  assert.equal(karachiServicePage.body.split(lockedAreasSentence).length - 1, 1)
  assert.match(karachiServicePage.body, /### Homes we work in\n\nWe work across Karachi, covering areas such as/)

  const bodyWithoutAreas = karachiServicePage.body.split(lockedAreasSentence).join("")
  const offLimits = [
    karachiServiceTitle,
    karachiServiceH1,
    karachiServiceDescription,
    headings.join("\n"),
    karachiServicePage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n"),
    schema,
    karachiServicePath,
    karachiServicePage.imageAlt ?? "",
    bodyWithoutAreas,
  ].join("\n")

  for (const pattern of [/\bDHA\b/, /\bClifton\b/, /\bPECHS\b/, /\bGulshan/]) {
    assert.doesNotMatch(offLimits, pattern)
  }
})

test("Karachi lander does not invent local proof, superlatives, or sister brands", () => {
  const heroAndMeta = `${karachiServiceTitle}\n${karachiServiceH1}\n${karachiServiceDescription}\n${karachiServicePage.body.split("###")[0]}`
  assert.doesNotMatch(heroAndMeta, /\bbest\b/i)
  assert.doesNotMatch(heroAndMeta, /#1/)
  assert.doesNotMatch(copy, /Digital Sound/)
  assert.doesNotMatch(copy, /Daraz/)
  assert.doesNotMatch(copy, /Cinematics/)
  assert.doesNotMatch(copy, /Nashco/)
  assert.doesNotMatch(copy, /\bBahria\b/)
  assert.doesNotMatch(copy, /\bZamzama\b/)
  assert.doesNotMatch(copy, /\bPhase\b/)
  assert.doesNotMatch(copy, /22-C\/II/)
  assert.doesNotMatch(copy, /Commercial Lane/)
  assert.doesNotMatch(copy, /\+92 21/)
  assert.doesNotMatch(copy, /info@desertsound/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.doesNotMatch(copy, /\bUS\b|UK ranking|United States|United Kingdom/)
  assert.doesNotMatch(copy, /\b\d+\s*(days?|weeks?|months?)\b/i)
  assert.doesNotMatch(copy, /PKR|Rs\.?\s*\d/)
  assert.doesNotMatch(copy, /display:\s*none|opacity:\s*0|aria-hidden/i)
  assert.doesNotMatch(karachiServiceTitle, /Site Visits from Karachi/i)
  assert.match(karachiServiceDescription, /site survey/)
  assert.match(karachiServiceDescription, /[Hh]ome cinema/)
  assert.match(karachiServiceDescription, /[Hh]ome theatre/)
})

test("sitemap count is 126 and listings include the Karachi service URL slashless", () => {
  assert.equal(sitemapUrlCount(), 126)
  assert.match(sitemap, /rankingSeoPages/)
  assert.match(htmlSitemap, /\/service\/home-cinema-installation-karachi/)
  assert.doesNotMatch(htmlSitemap, /\/service\/home-cinema-installation-karachi\//)
  assert.match(
    readFileSync(join(root, "public/llms.txt"), "utf8"),
    /https:\/\/www\.desertsound\.com\.pk\/service\/home-cinema-installation-karachi/,
  )
})

test("theatre inbound is one Karachi line without remaking locked SERP title", () => {
  assert.match(theatreLive, /home cinema installation in Karachi/)
  assert.match(theatreLive, /\/service\/home-cinema-installation-karachi/)
  assert.equal(theatreLive.split("/service/home-cinema-installation-karachi").length - 1, 1)
  assert.doesNotMatch(theatreLive, /\/service\/home-cinema-installation-karachi\//)
  const rankingTheatre = ranking.split('"slug": "/service/home-theatre-design-and-installation"')[1]
  assert.match(rankingTheatre.slice(0, 500), /Home Theater Installation in Pakistan \| Design and Install/)
  assert.match(
    rankingTheatre.slice(0, 800),
    /Home theater installation across Pakistan from Karachi. We design, install, and calibrate cinema rooms — site visits nationwide./,
  )
  assert.match(theatreRoute, /serviceRouteMetadata\(slug\)/)
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.doesNotMatch(homepage, /home-cinema-installation-karachi/)
})

test("inbound sources each link the Karachi lander exactly once, slashless", () => {
  const inbound = [
    ["lib/islamabad-service-content.ts", readFileSync(join(root, "lib/islamabad-service-content.ts"), "utf8")],
    ["lib/lahore-city-lander.ts", readFileSync(join(root, "lib/lahore-city-lander.ts"), "utf8")],
    ["lib/multan-service-content.ts", readFileSync(join(root, "lib/multan-service-content.ts"), "utf8")],
    ["lib/faisalabad-service-content.ts", readFileSync(join(root, "lib/faisalabad-service-content.ts"), "utf8")],
    ["lib/sialkot-service-content.ts", readFileSync(join(root, "lib/sialkot-service-content.ts"), "utf8")],
    ["lib/bahawalpur-service-content.ts", readFileSync(join(root, "lib/bahawalpur-service-content.ts"), "utf8")],
    ["installer article", article33],
    ["private cinema guide", privateCinema],
    ["Karachi setup post", setupPost],
    ["theatre live", theatreLive],
  ] as const

  for (const [file, source] of inbound) {
    assert.equal(source.split("/service/home-cinema-installation-karachi").length - 1, 1, file)
    assert.doesNotMatch(source, /\/service\/home-cinema-installation-karachi\//)
  }

  assert.match(
    article33,
    /\[home theatre in Karachi\]\(\/service\/home-cinema-installation-karachi\)/,
  )
  assert.match(
    privateCinema,
    /\[home cinema installation in Karachi\]\(\/service\/home-cinema-installation-karachi\)/,
  )
  assert.match(
    setupPost,
    /\[home cinema installation in Karachi\]\(\/service\/home-cinema-installation-karachi\)/,
  )
})
