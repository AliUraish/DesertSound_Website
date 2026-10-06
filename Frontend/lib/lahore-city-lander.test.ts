import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import {
  lahoreCityLanderDescription,
  lahoreCityLanderH1,
  lahoreCityLanderPage,
  lahoreCityLanderSlug,
  lahoreCityLanderTitle,
} from "./lahore-city-lander.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const route = readFileSync(
  join(root, "app/service/home-cinema-installation-lahore/page.tsx"),
  "utf8",
)
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const article = readFileSync(
  join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md"),
  "utf8",
)
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")

function visibleText(page: typeof lahoreCityLanderPage) {
  const body = page.body
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*]/g, " ")
  const faqs = page.faqs.map((faq) => `${faq.q} ${faq.a}`).join(" ")
  return `${page.h1} ${body} ${faqs}`
}

function wordCount(text: string) {
  return text.split(/\s+/).filter((word) => /[A-Za-z]{2,}/.test(word)).length
}

test("Lahore lander uses locked slug, title, H1, and meta", () => {
  assert.equal(lahoreCityLanderSlug, "/service/home-cinema-installation-lahore")
  assert.equal(lahoreCityLanderTitle, "Home Cinema Installation in Lahore | Desert Sound")
  assert.equal(lahoreCityLanderH1, "Home Cinema Installation in Lahore")
  assert.equal(
    lahoreCityLanderDescription,
    "Home cinema installation in Lahore from Desert Sound’s team in Lahore. We design, install, and calibrate on the ground — cinema rooms across Pakistan.",
  )
  assert.ok(lahoreCityLanderDescription.length >= 145)
  assert.ok(lahoreCityLanderDescription.length <= 165)
  assert.match(route, /title: \{ absolute: page\.title \}/)
  assert.match(route, /serviceJsonLd/)
  assert.match(route, /faqPageJsonLd/)
  assert.doesNotMatch(route, /app\/services\//)
})

test("Lahore lander is a ranking service page on the sitemap, not a blog", () => {
  assert.match(ranking, /lahoreCityLanderPage/)
  assert.match(sitemap, /rankingSeoPages/)
  assert.equal(lahoreCityLanderPage.slug.startsWith("/service/"), true)
  assert.doesNotMatch(lahoreCityLanderSlug, /\/services\//)
})

test("Lahore copy stays in the 450–700 word band with required mesh links", () => {
  const text = visibleText(lahoreCityLanderPage)
  const words = wordCount(text)
  assert.ok(words >= 450 && words <= 700, `word count is ${words}`)
  assert.match(lahoreCityLanderPage.body, /home theater installation in Lahore/i)
  assert.match(lahoreCityLanderPage.body, /home cinema installer in Lahore/i)
  assert.match(lahoreCityLanderPage.body, /Home theatre installation in Lahore/)
  assert.match(lahoreCityLanderPage.body, /We have a team in Lahore/)
  assert.match(
    lahoreCityLanderPage.body,
    /\[home theater \/ home cinema design and installation in Pakistan\]\(\/service\/home-theatre-design-and-installation\)/,
  )
  assert.match(
    lahoreCityLanderPage.body,
    /\[what a cinema installer in Pakistan actually does\]\(\/home-cinema-and-cinema-installer-pakistan\)/,
  )
  assert.match(lahoreCityLanderPage.body, /\/projects\/residential\/project-platinum/)
  assert.match(lahoreCityLanderPage.body, /\/projects\/residential\/residency/)
  assert.match(lahoreCityLanderPage.body, /\/projects\/residential\/studio-vellari/)
  assert.match(lahoreCityLanderPage.body, /\/projects\/residential\/stanley-seats/)
  assert.match(lahoreCityLanderPage.body, /\/service\/home-cinema-installation-islamabad/)
  assert.match(lahoreCityLanderPage.body, /\/service\/home-cinema-installation-multan/)
  assert.match(lahoreCityLanderPage.body, /\/service\/home-cinema-installation-faisalabad/)
  assert.match(lahoreCityLanderPage.body, /\/service\/home-cinema-installation-sialkot/)
  assert.equal(lahoreCityLanderPage.body.split("/service/home-cinema-installation-islamabad").length - 1, 1)
  assert.equal(lahoreCityLanderPage.body.split("/service/home-cinema-installation-multan").length - 1, 1)
  assert.equal(lahoreCityLanderPage.body.split("/service/home-cinema-installation-faisalabad").length - 1, 1)
  assert.equal(lahoreCityLanderPage.body.split("/service/home-cinema-installation-sialkot").length - 1, 1)
  assert.doesNotMatch(
    lahoreCityLanderPage.body,
    /home-cinema-installation-bahawalpur|home-cinema-installation-punjab/,
  )
  assert.equal(lahoreCityLanderPage.faqs.length, 4)
})

test("Lahore lander is sister-safe, Karachi NAP only, and fact-locked", () => {
  const haystack = [
    lahoreCityLanderPage.body,
    lahoreCityLanderPage.faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n"),
    route,
  ].join("\n")
  assert.doesNotMatch(haystack, /Digital Sound/)
  assert.doesNotMatch(haystack, /\bbest\b/i)
  assert.doesNotMatch(haystack, /#1/)
  assert.doesNotMatch(haystack, /Daraz/)
  assert.doesNotMatch(haystack, /\bUS\b|\bUK\b|United States|United Kingdom/)
  assert.doesNotMatch(haystack, /our Lahore (office|showroom|address|HQ)/i)
  assert.doesNotMatch(lahoreCityLanderPage.body, /based in Lahore/i)
  assert.doesNotMatch(
    lahoreCityLanderPage.faqs.map((faq) => faq.a).join("\n"),
    /based in Lahore/i,
  )
  assert.match(haystack, /Not a Lahore showroom/)
  assert.match(haystack, /22-C\/II, 2nd Zamzama Commercial Lane, Phase V, DHA Karachi/)
  assert.match(haystack, /\+92 21 111 570 111/)
  assert.match(haystack, /We have a team in Lahore/)
  assert.doesNotMatch(lahoreCityLanderPage.body, /Karachi proof/)
  assert.doesNotMatch(lahoreCityLanderPage.body, /do not invent Lahore case studies/i)
  assert.doesNotMatch(lahoreCityLanderPage.body, /Karachi cinema install|Karachi livable|Karachi flagship|Karachi room/)
  for (const link of lahoreCityLanderPage.links) {
    if (link.href.startsWith("/projects/residential/")) {
      assert.doesNotMatch(link.label, /Karachi/i)
    }
  }
  assert.match(
    lahoreCityLanderPage.body,
    /The same site-visit work covers \[home cinema installation in Islamabad\]\(\/service\/home-cinema-installation-islamabad\)/,
  )
})

test("theatre inbound is one nationwide line; SERP title and meta stay locked", () => {
  assert.match(theatreLive, /We have a team in Lahore for/)
  assert.match(theatreLive, /\/service\/home-cinema-installation-lahore/)
  assert.match(theatreLive, /home cinema installation in Lahore/)
  assert.equal(
    (theatreLive.match(/home-cinema-installation-lahore/g) || []).length,
    1,
  )
  assert.match(theatreRoute, /serviceRouteMetadata\(slug\)/)
  assert.match(theatreRoute, /const slug = "\/service\/home-theatre-design-and-installation"/)
  const rankingTheatre = ranking.split('"slug": "/service/home-theatre-design-and-installation"')[1]
  const catalogTheatre = seo.split('path: "/service/home-theatre-design-and-installation"')[1]
  assert.match(rankingTheatre.slice(0, 500), /Home Theater Installation in Pakistan \| Design and Install/)
  assert.match(
    rankingTheatre.slice(0, 800),
    /Home theater installation across Pakistan from Karachi\. We design, install, and calibrate cinema rooms — site visits nationwide\./,
  )
  assert.match(catalogTheatre.slice(0, 500), /Home Theater Installation in Pakistan \| Design and Install/)
})

test("#33 upgrades existing Lahore mentions to the city lander", () => {
  assert.match(
    article,
    /\[Lahore\]\(\/service\/home-cinema-installation-lahore\), \[Islamabad\]\(\/service\/home-cinema-installation-islamabad\), \[Multan\]\(\/service\/home-cinema-installation-multan\), \[Faisalabad\]\(\/service\/home-cinema-installation-faisalabad\), \[Sialkot\]\(\/service\/home-cinema-installation-sialkot\), and other cities/,
  )
  assert.match(
    article,
    /Karachi apartments and \[Lahore\]\(\/service\/home-cinema-installation-lahore\) houses/,
  )
  assert.match(
    article,
    /title": "Home Cinema in Pakistan: A Cinema Installer from Design to Calibration"/,
  )
})

test("homepage is untouched by the Lahore lander", () => {
  assert.doesNotMatch(homepage, /home-cinema-installation-lahore/)
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
})
