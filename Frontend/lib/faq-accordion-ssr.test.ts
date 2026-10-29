import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { smartHomeServiceFaqs } from "./smart-home-service-faqs.ts"
import { theatreServiceFaqs } from "./theatre-service-faqs.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const homepageAccordion = readFileSync(join(root, "components/contact-section.tsx"), "utf8")
const collapsePanel = readFileSync(join(root, "components/faq-collapse-panel.tsx"), "utf8")
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const smartHomeLive = readFileSync(join(root, "app/services/smart-home-automation/page.tsx"), "utf8")
const smartHomeRoute = readFileSync(join(root, "app/service/smart-home-automation/page.tsx"), "utf8")
const smartHomeLayout = readFileSync(
  join(root, "app/services/smart-home-automation/layout.tsx"),
  "utf8",
)
const rankingPage = readFileSync(join(root, "components/ranking-seo-page.tsx"), "utf8")
const rankingCatalog = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")

const servicePagesThatAlreadyEmitFaqPage = new Set([
  "home-theatre-design-and-installation",
  "home-cinema-installation-bahawalpur",
  "home-cinema-installation-faisalabad",
  "home-cinema-installation-islamabad",
  "home-cinema-installation-karachi",
  "home-cinema-installation-lahore",
  "home-cinema-installation-multan",
  "home-cinema-installation-punjab",
  "home-cinema-installation-sialkot",
  "smart-home-automation",
])

function htmlOutsideScripts(html: string) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
}

function faqAnswerPlainText(answer: string) {
  return answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
}

function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerPlainText(faq.answer),
      },
    })),
  }
}

function parseExportedFaqArray(source: string, exportName: string) {
  const marker = `export const ${exportName}`
  const start = source.indexOf(marker)
  assert.ok(start >= 0, `missing ${exportName}`)
  const fromArray = source.slice(source.indexOf("= [", start) + 2)
  let depth = 0
  let end = -1
  for (let i = 0; i < fromArray.length; i++) {
    if (fromArray[i] === "[") depth++
    else if (fromArray[i] === "]") {
      depth--
      if (depth === 0) {
        end = i + 1
        break
      }
    }
  }
  assert.ok(end > 0, `unterminated ${exportName}`)
  return new Function(`return (${fromArray.slice(0, end)})`)() as {
    question: string
    answer: string
  }[]
}

/**
 * Server HTML for a page that emits FAQPage JSON-LD plus the always-rendered
 * accordion paragraphs (`{faq.answer}` inside FaqCollapsePanel).
 */
function serverRenderedFaqHtml(faqs: { question: string; answer: string }[]) {
  const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(faqPageJsonLd(faqs))}</script>`
  const accordion = faqs
    .map((faq) => `<div><h3>${faq.question}</h3><p>${faq.answer}</p></div>`)
    .join("")
  return `${jsonLdScript}${accordion}`
}

function assertAccordionAlwaysRendersAnswers(source: string, label: string) {
  assert.match(source, /FaqCollapsePanel/, `${label} must use the shared collapse panel`)
  assert.match(source, /\{faq\.answer\}/, `${label} must render faq.answer in the tree`)
  assert.doesNotMatch(
    source,
    /isOpen && \([\s\S]*\{faq\.answer\}/,
    `${label} must not mount the answer on click`,
  )
}

function assertAnswersInVisibleHtml(
  faqs: { question: string; answer: string }[],
  label: string,
) {
  const jsonLd = faqPageJsonLd(faqs)
  const answers = jsonLd.mainEntity.map((entity) => entity.acceptedAnswer.text)
  assert.equal(answers.length, faqs.length)
  for (const [index, faq] of faqs.entries()) {
    assert.equal(answers[index], faq.answer)
  }

  const visible = htmlOutsideScripts(serverRenderedFaqHtml(faqs))
  for (const text of answers) {
    assert.ok(visible.includes(text), `${label} visible HTML missing: ${text}`)
  }
}

const homepageInstallFaqs = parseExportedFaqArray(seo, "homepageInstallFaqs")

test("shared FAQ collapse panel keeps children in the DOM", () => {
  assert.match(collapsePanel, /\{children\}/)
  assert.doesNotMatch(collapsePanel, /isOpen &&/)
  assert.match(collapsePanel, /height: isOpen \? "auto" : 0/)
  assert.match(collapsePanel, /aria-hidden=\{!isOpen\}/)
  assert.match(seo, /"@type": "FAQPage"/)
  assert.match(seo, /text: faqAnswerPlainText\(faq\.answer\)/)
})

test("homepage FAQPage acceptedAnswer text appears in server HTML outside script tags", () => {
  assert.equal(homepageInstallFaqs.length, 6)
  assert.match(homepage, /faqPageJsonLd\(homepageInstallFaqs\)/)
  assert.match(homepage, /<ContactSection showFaq/)
  assert.match(homepageAccordion, /homepageInstallFaqs/)
  assertAccordionAlwaysRendersAnswers(homepageAccordion, "homepage accordion")
  assertAnswersInVisibleHtml(homepageInstallFaqs, "homepage")
})

test("theatre FAQPage acceptedAnswer text appears in server HTML outside script tags", () => {
  assert.equal(theatreServiceFaqs.length, 5)
  assert.match(theatreRoute, /faqPageJsonLd\(theatreServiceFaqs\)/)
  assert.match(theatreLive, /theatreServiceFaqs/)
  assertAccordionAlwaysRendersAnswers(theatreLive, "theatre accordion")
  assertAnswersInVisibleHtml(theatreServiceFaqs, "theatre")
})

test("smart-home FAQPage acceptedAnswer text appears in server HTML outside script tags", () => {
  assert.equal(smartHomeServiceFaqs.length, 5)
  assert.match(smartHomeRoute, /faqPageJsonLd\(smartHomeServiceFaqs\)/)
  assert.equal((smartHomeRoute.match(/faqPageJsonLd\(/g) || []).length, 1)
  assert.equal((smartHomeRoute.match(/type="application\/ld\+json"/g) || []).length, 1)
  assert.doesNotMatch(smartHomeLive, /faqPageJsonLd/)
  assert.doesNotMatch(smartHomeLayout, /FAQPage|faqPageJsonLd/)
  assert.match(smartHomeLive, /smartHomeServiceFaqs/)
  assertAccordionAlwaysRendersAnswers(smartHomeLive, "smart-home accordion")
  assertAnswersInVisibleHtml(smartHomeServiceFaqs, "smart-home")
})

test("no other /service/ page gains FAQPage JSON-LD", () => {
  assert.doesNotMatch(rankingCatalog, /emitFaqPageJsonLd:\s*true/)
  assert.match(rankingPage, /shouldEmitFaqPageJsonLd\(page\)/)

  const serviceDir = join(root, "app/service")
  for (const entry of readdirSync(serviceDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const page = readFileSync(join(serviceDir, entry.name, "page.tsx"), "utf8")
    if (servicePagesThatAlreadyEmitFaqPage.has(entry.name)) {
      assert.match(page, /faqPageJsonLd/, `${entry.name} should keep its FAQPage`)
    } else {
      assert.doesNotMatch(page, /faqPageJsonLd/, `${entry.name} must not gain FAQPage`)
    }
  }
})
