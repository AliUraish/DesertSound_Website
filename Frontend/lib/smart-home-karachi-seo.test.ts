import assert from "node:assert/strict"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { canonicalizePath } from "./canonical-path.ts"
import { positions } from "./careers-data.ts"
import { karachiAreasSentence } from "./karachi-service-content.ts"
import { projectLibraries } from "./projects-data.ts"
import {
  smartHomeKarachiDescription,
  smartHomeKarachiFaqJsonLdItems,
  smartHomeKarachiH1,
  smartHomeKarachiPage,
  smartHomeKarachiPath,
  smartHomeKarachiTitle,
} from "./smart-home-karachi-content.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/smart-home-automation-karachi/page.tsx"),
  "utf8",
)
const rankingView = readFileSync(join(root, "components/ranking-seo-page.tsx"), "utf8")
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const schema = readFileSync(join(root, "lib/smart-home-karachi-schema.ts"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const htmlSitemap = readFileSync(join(root, "app/sitemap/page.tsx"), "utf8")
const llmsTxt = readFileSync(join(root, "public/llms.txt"), "utf8")
const copy = `${smartHomeKarachiPage.body}\n${smartHomeKarachiPage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")}`
const headings = [...smartHomeKarachiPage.body.matchAll(/^#{1,6}\s+.+$/gm)].map((match) => match[0])
const answerBlock = smartHomeKarachiPage.body.split("###")[0].trim()
const OUTAGE_LINE = "We plan the network and backup around outages."
const lockedAreasSentence =
  "We work across Karachi, covering areas such as DHA, Clifton, PECHS and Gulshan-e-Iqbal."
const REQUIRED_LINKS = [
  ["/service/smart-home-automation", "home automation systems we install across Pakistan"],
  ["/service/home-networking-and-wi-fi", "home networking and Wi-Fi"],
  ["/service/home-cinema-installation-karachi", "home cinema installation in Karachi"],
  ["/service/control-systems", "control systems"],
  ["/how-to-choose-a-home-automation-system-pakistan", "choosing home automation for a Pakistani home"],
  ["/contact-us", "Contact our Karachi team"],
] as const

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
    "/service/home-cinema-installation-karachi",
    smartHomeKarachiPath,
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

test("Karachi smart-home lander pins the exact title, meta and H1", () => {
  assert.equal(smartHomeKarachiPath, "/service/smart-home-automation-karachi")
  assert.doesNotMatch(smartHomeKarachiPath, /\/$/)
  assert.doesNotMatch(smartHomeKarachiPath, /\/services\//)
  assert.equal(smartHomeKarachiTitle, "Smart Home Automation in Karachi")
  assert.equal(smartHomeKarachiH1, "Smart Home Automation in Karachi")
  assert.equal(smartHomeKarachiTitle, smartHomeKarachiH1)
  assert.doesNotMatch(smartHomeKarachiTitle, /Desert Sound/)
  assert.equal(
    smartHomeKarachiDescription,
    "Smart home automation in Karachi: lighting, AC, curtains, security and home cinema on one app, planned after a survey of your apartment or bungalow.",
  )
  assert.equal(smartHomeKarachiDescription.length, 148)
  assert.ok(smartHomeKarachiDescription.length >= 140 && smartHomeKarachiDescription.length <= 155)
  assert.equal(smartHomeKarachiPage.slug, smartHomeKarachiPath)
  assert.equal(smartHomeKarachiPage.title, smartHomeKarachiTitle)
  assert.equal(smartHomeKarachiPage.h1, smartHomeKarachiH1)
  assert.equal(smartHomeKarachiPage.description, smartHomeKarachiDescription)
  assert.match(layout, /template: `%s \| \$\{siteName\}`/)
  const renderedTitle = `${smartHomeKarachiTitle} | Desert Sound`
  assert.equal(renderedTitle, "Smart Home Automation in Karachi | Desert Sound")
  assert.ok(renderedTitle.length <= 65)
  assert.equal(renderedTitle.length, 47)
  assert.match(serviceRoute, /serviceRouteMetadata\(smartHomeKarachiPath\)/)
  assert.doesNotMatch(serviceRoute, /title: \{ absolute/)
  assert.doesNotMatch(serviceRoute, /index:\s*false/)
})

test("canonical points at the page itself with no trailing slash", () => {
  const canonical = `https://www.desertsound.com.pk${smartHomeKarachiPath}`
  assert.equal(canonical, "https://www.desertsound.com.pk/service/smart-home-automation-karachi")
  assert.doesNotMatch(canonical, /\/$/)
  assert.equal(canonicalizePath(smartHomeKarachiPath), smartHomeKarachiPath)
  assert.match(serviceRoute, /serviceRouteMetadata\(smartHomeKarachiPath\)/)
  assert.match(seo, /canonical: url/)
  assert.match(seo, /function absoluteUrl\(/)
  assert.match(seo, /canonicalizePath\(normalized\)/)
})

test("Karachi smart-home ranking catalog and Service JSON-LD stay in lockstep", () => {
  assert.match(ranking, /smartHomeKarachiPage/)
  const catalogSlice = seo.split('path: "/service/smart-home-automation-karachi"')[1]
  assert.ok(catalogSlice)
  assert.match(catalogSlice.slice(0, 800), /Smart Home Automation in Karachi/)
  assert.doesNotMatch(catalogSlice.slice(0, 400), /Smart Home Automation in Karachi \| Desert Sound/)
  assert.match(
    catalogSlice.slice(0, 900),
    /Smart home automation in Karachi: lighting, AC, curtains, security and home cinema on one app/,
  )
  assert.match(schema, /@type": "Country"/)
  assert.match(schema, /@type": "City"/)
  assert.match(schema, /name: "Karachi"/)
  assert.match(schema, /serviceType: "Home automation"/)
  assert.match(schema, /serviceJsonLd\(service\)/)
  assert.match(serviceRoute, /smartHomeKarachiServiceJsonLd/)
  assert.match(serviceRoute, /faqPageJsonLd\(smartHomeKarachiFaqJsonLdItems\(\)\)/)
})

test("page reuses RankingSeoPageView with breadcrumb and FAQPage from the visible FAQ list", () => {
  assert.match(serviceRoute, /RankingSeoPageView/)
  assert.equal(existsSync(join(root, "app/service/smart-home-automation-karachi/layout.tsx")), false)
  assert.match(rankingView, /<Link href="\/" className="hover:text-black">\s*Home\s*<\/Link>/)
  assert.match(rankingView, /Service/)
  assert.doesNotMatch(serviceRoute, /HowTo/)
  assert.doesNotMatch(schema, /HowTo/)
  assert.doesNotMatch(serviceRoute, /"@type": "HowTo"/)
  assert.doesNotMatch(schema, /"@type": "LocalBusiness"/)
  assert.doesNotMatch(schema, /streetAddress/)
  assert.doesNotMatch(schema, /PostalAddress/)
  assert.doesNotMatch(serviceRoute, /LocalBusiness/)
  assert.doesNotMatch(serviceRoute, /streetAddress/)
  assert.equal(smartHomeKarachiFaqJsonLdItems().length, 6)
  assert.equal(smartHomeKarachiPage.faqs.length, 6)
  for (const [index, faq] of smartHomeKarachiPage.faqs.entries()) {
    const jsonLd = smartHomeKarachiFaqJsonLdItems()[index]
    const stripped = faq.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
    assert.equal(jsonLd.question, faq.q)
    assert.equal(jsonLd.answer, stripped)
    assert.doesNotMatch(jsonLd.answer, /\]\(|href/)
    const words = wordCount(faq.a)
    assert.ok(words >= 40 && words <= 60, `FAQ ${index + 1} is ${words} words; want 40–60`)
  }
  assert.equal(
    smartHomeKarachiPage.faqs[2].q,
    "Can you automate a finished apartment or house in Karachi?",
  )
  assert.equal(
    smartHomeKarachiPage.faqs[2].a,
    "Yes, in most homes. The survey checks which switch boxes can take a smart switch, which walls and ceilings can be opened, and what the building allows. Where a new cable is hard to run, wireless devices can cover lighting, curtains and AC. Distribution board changes are carried out with a qualified electrician.",
  )
})

test("answer block, sections and required slashless links match the brief", () => {
  const words = wordCount(answerBlock)
  assert.ok(words >= 40 && words <= 60, `answer block is ${words} words; want 40–60`)
  assert.doesNotMatch(answerBlock, /\]\(|href/)
  assert.equal(
    answerBlock,
    "Desert Sound designs and installs smart home automation in Karachi from our showroom in the city. We survey the apartment or bungalow first, then link lighting, air conditioning, curtains, security, the gate and the home cinema to one app, wall panel or voice command. Each home is programmed around how the family uses it.",
  )
  assert.match(smartHomeKarachiPage.body, /### What we automate in Karachi homes/)
  assert.match(smartHomeKarachiPage.body, /### The systems we use/)
  assert.match(smartHomeKarachiPage.body, /### Apartments and bungalows/)
  assert.match(smartHomeKarachiPage.body, /### How a Karachi project runs/)
  assert.match(smartHomeKarachiPage.body, /### Talk to our Karachi team/)
  for (const [href, anchor] of REQUIRED_LINKS) {
    const markdown = `[${anchor}](${href})`
    assert.equal(copy.split(markdown).length - 1, 1, markdown)
    assert.equal(copy.split(href).length - 1, 1, href)
  }
  assert.doesNotMatch(copy, /\]\(\/contact(?:\/)?\)/)
  assert.doesNotMatch(copy, /\]\(\/contact-us\/\)/)
  assert.doesNotMatch(copy, /\]\(\/[^)\s]+\/\)/)
})

test("the locked area sentence appears exactly once, only in Apartments and bungalows", () => {
  assert.equal(karachiAreasSentence, lockedAreasSentence)
  assert.equal(smartHomeKarachiPage.body.split(lockedAreasSentence).length - 1, 1)
  assert.match(
    smartHomeKarachiPage.body,
    /### Apartments and bungalows\n\nWe work across Karachi, covering areas such as/,
  )

  const bodyWithoutAreas = smartHomeKarachiPage.body.split(lockedAreasSentence).join("")
  const offLimits = [
    smartHomeKarachiTitle,
    smartHomeKarachiH1,
    smartHomeKarachiDescription,
    headings.join("\n"),
    smartHomeKarachiPage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n"),
    schema,
    smartHomeKarachiPath,
    smartHomeKarachiPage.imageAlt ?? "",
    bodyWithoutAreas,
  ].join("\n")

  for (const pattern of [/\bDHA\b/, /\bClifton\b/, /\bPECHS\b/, /\bGulshan/]) {
    assert.doesNotMatch(offLimits, pattern)
  }
})

test("hard bans: Matter, free, best, timing promises, outage lock, CEDIA, brands", () => {
  const chromeAndCopy = `${smartHomeKarachiTitle}\n${smartHomeKarachiH1}\n${smartHomeKarachiDescription}\n${copy}`
  assert.doesNotMatch(chromeAndCopy, /\bMatter\b/)
  assert.doesNotMatch(chromeAndCopy, /\bmatter\b/i)
  assert.doesNotMatch(chromeAndCopy, /Z-?Wave/i)
  assert.doesNotMatch(chromeAndCopy, /(?<![-\w])free\b/)
  assert.doesNotMatch(chromeAndCopy, /\bbest\b/i)
  assert.doesNotMatch(chromeAndCopy, /#1/)
  assert.doesNotMatch(chromeAndCopy, /\bleading\b/i)
  assert.doesNotMatch(chromeAndCopy, /\btrusted\b/i)
  assert.doesNotMatch(chromeAndCopy, /\d/)
  assert.doesNotMatch(chromeAndCopy, /PKR|Rs\.?\s*\d|\blakh\b|\bcrore\b/i)
  assert.doesNotMatch(chromeAndCopy, /\bUPS\b/)
  assert.doesNotMatch(chromeAndCopy, /\bwithin\b/i)
  assert.doesNotMatch(chromeAndCopy, /\bsame day\b/i)
  assert.doesNotMatch(chromeAndCopy, /\b24 hours?\b/i)
  assert.doesNotMatch(chromeAndCopy, /\bin\s+\d+\s+(hours?|days?|weeks?|months?)\b/i)
  assert.doesNotMatch(chromeAndCopy, /\b\d+\s+(hours?|days?|weeks?|months?)\b/i)
  assert.doesNotMatch(chromeAndCopy, /\bturnaround\b/i)
  assert.match(copy, /work hours/)
  assert.match(copy, /every day/)
  assert.equal(copy.split(OUTAGE_LINE).length - 1, 1)
  assert.doesNotMatch(
    copy,
    /mains returns|power returns|set during programming|without (the )?internet|\bruns? locally|works locally|still works|still run|keeps? working|offline|local control|continue to work|WAN is down|built for/i,
  )
  assert.equal((copy.match(/CEDIA/g) || []).length, 1)
  assert.doesNotMatch(copy, /Digital Sound/)
  assert.doesNotMatch(copy, /\bLahore\b/)
  assert.doesNotMatch(copy, /Daraz|Cinematics|Nashco|Resco|Mux Life|\bAPES\b|\bIK\b/)
  assert.doesNotMatch(copy, /Control4|Lutron|Crestron|Savant|\bAlexa\b|\bGoogle Assistant\b/)
})

test("sitemap listings include the Karachi smart-home URL slashless", () => {
  assert.equal(sitemapUrlCount(), 129)
  assert.ok(sitemapUrlCount() >= 129)
  assert.match(sitemap, /rankingSeoPages/)
  assert.match(ranking, /smartHomeKarachiPage/)
  assert.match(htmlSitemap, /\/service\/smart-home-automation-karachi/)
  assert.match(htmlSitemap, /Smart home automation in Karachi/)
  assert.doesNotMatch(htmlSitemap, /\/service\/smart-home-automation-karachi\//)
  assert.match(
    llmsTxt,
    /https:\/\/www\.desertsound\.com\.pk\/service\/smart-home-automation-karachi/,
  )
  assert.doesNotMatch(llmsTxt, /smart-home-automation-karachi\//)
})
