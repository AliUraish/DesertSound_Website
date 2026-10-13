import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import {
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
const copy = `${punjabServicePage.body}\n${punjabServicePage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")}`

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
  assert.match(punjabServicePage.body, /We have a team in Lahore/)
  const lahoreBlock = punjabServicePage.body.split("#### Lahore")[1]?.split("####")[0] ?? ""
  assert.ok(lahoreBlock.startsWith("\n\nWe have a team in Lahore."))
  const withoutLahoreTeam = copy.replace(/We have a team in Lahore/g, "")
  assert.doesNotMatch(withoutLahoreTeam, /team in (?:Lahore|Faisalabad|Multan|Sialkot|Bahawalpur)/i)
  assert.doesNotMatch(copy, /our (?:Faisalabad|Multan|Sialkot|Bahawalpur|Punjab) (?:office|HQ|showroom|team|branch)/i)
  assert.doesNotMatch(copy, /Digital Sound/)
  assert.doesNotMatch(copy, /\bbest\b/i)
  assert.doesNotMatch(copy, /#1/)
  assert.doesNotMatch(copy, /\bprices\b/i)
  assert.doesNotMatch(copy, /Clifton/)
  assert.doesNotMatch(copy.replace(/DHA Multan/g, "").replace(/DHA Bahawalpur/g, ""), /\bDHA\b/)
  assert.doesNotMatch(copy, /\bUS\b|\bUK\b|United States|United Kingdom/)
  assert.doesNotMatch(copy, /Rawalpindi|Gujranwala/)
  assert.doesNotMatch(copy, /22-C\/II/)
  assert.doesNotMatch(copy, /Zamzama/)
  assert.doesNotMatch(copy, /\+92/)
  assert.doesNotMatch(copy, /info@desertsound/)
  assert.doesNotMatch(copy, /headquarters/i)
  assert.doesNotMatch(homepage, /home-cinema-installation-punjab/)
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
  assert.match(theatreLive, /\/service\/home-cinema-installation-lahore/)
  assert.equal(theatreLive.split("/service/home-cinema-installation-lahore").length - 1, 1)
  assert.equal(article33.split("/service/home-cinema-installation-punjab").length - 1, 1)
  assert.doesNotMatch(article33, /\/service\/home-cinema-installation-punjab\//)
})
