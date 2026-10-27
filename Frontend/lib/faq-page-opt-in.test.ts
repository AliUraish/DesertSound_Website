import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { shouldEmitFaqPageJsonLd } from "./faq-page-opt-in.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const rankingPage = readFileSync(join(root, "components/ranking-seo-page.tsx"), "utf8")
const rankingTypes = readFileSync(join(root, "lib/ranking-seo-types.ts"), "utf8")
const rankingCatalog = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const accordion = readFileSync(join(root, "components/ranking-faq-accordion.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const lahoreRoute = readFileSync(
  join(root, "app/service/home-cinema-installation-lahore/page.tsx"),
  "utf8",
)
const smartHomeRoute = readFileSync(join(root, "app/service/smart-home-automation/page.tsx"), "utf8")

test("FAQPage JSON-LD stays off for /service/ pages unless they opt in", () => {
  assert.equal(
    shouldEmitFaqPageJsonLd({ slug: "/service/example", faqs: [{ q: "Q", a: "A" }] }),
    false,
  )
  assert.equal(
    shouldEmitFaqPageJsonLd({
      slug: "/service/example",
      faqs: [{ q: "Q", a: "A" }],
      emitFaqPageJsonLd: false,
    }),
    false,
  )
  assert.equal(
    shouldEmitFaqPageJsonLd({
      slug: "/service/example",
      faqs: [],
      emitFaqPageJsonLd: true,
    }),
    false,
  )
})

test("opt-in emits FAQPage JSON-LD from the same faqs array", () => {
  assert.equal(
    shouldEmitFaqPageJsonLd({
      slug: "/service/example",
      faqs: [{ q: "Q", a: "A" }],
      emitFaqPageJsonLd: true,
    }),
    true,
  )
  assert.equal(
    shouldEmitFaqPageJsonLd({
      slug: "/a-blog-article",
      faqs: [{ q: "Q", a: "A" }],
    }),
    true,
  )
  assert.equal(shouldEmitFaqPageJsonLd({ slug: "/a-blog-article", faqs: [] }), false)
})

test("ranking template wires the opt-in to FAQPage JSON-LD and the accordion", () => {
  assert.match(rankingTypes, /emitFaqPageJsonLd\?: boolean/)
  assert.match(rankingPage, /shouldEmitFaqPageJsonLd\(page\)/)
  assert.match(rankingPage, /page\.faqs\.map\(\(faq\) => \(\{ question: faq\.q, answer: faq\.a \}\)\)/)
  assert.match(rankingPage, /page\.emitFaqPageJsonLd \? \(/)
  assert.match(rankingPage, /RankingFaqAccordion/)
  assert.match(accordion, /FaqCollapsePanel/)
  assert.match(accordion, /\{faq\.answer\}/)
  assert.doesNotMatch(accordion, /isOpen && \(/)
})

test("no ranking /service/ page sets emitFaqPageJsonLd", () => {
  assert.doesNotMatch(rankingCatalog, /emitFaqPageJsonLd:\s*true/)
  assert.doesNotMatch(smartHomeRoute, /emitFaqPageJsonLd/)
  assert.match(theatreRoute, /faqPageJsonLd\(theatreServiceFaqs\)/)
  assert.match(lahoreRoute, /faqPageJsonLd/)
  assert.doesNotMatch(lahoreRoute, /emitFaqPageJsonLd/)
})
