import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { faqPageJsonLd, homepageInstallFaqs } from "./seo.ts"
import { theatreServiceFaqs } from "./theatre-service-faqs.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const homepageAccordion = readFileSync(join(root, "components/contact-section.tsx"), "utf8")
const collapsePanel = readFileSync(join(root, "components/faq-collapse-panel.tsx"), "utf8")
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)

function htmlOutsideScripts(html: string) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
}

function acceptedAnswerTexts(faqs: { question: string; answer: string }[]) {
  const jsonLd = faqPageJsonLd(faqs)
  return jsonLd.mainEntity.map((entity) => {
    assert.equal(entity["@type"], "Question")
    assert.ok(entity.acceptedAnswer?.text)
    return entity.acceptedAnswer.text as string
  })
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
  assert.doesNotMatch(source, /display:\s*none/, `${label} must not hide answers with display:none`)
}

test("shared FAQ collapse panel keeps children in the DOM", () => {
  assert.match(collapsePanel, /\{children\}/)
  assert.doesNotMatch(collapsePanel, /isOpen &&/)
  assert.doesNotMatch(collapsePanel, /display:\s*none/)
  assert.match(collapsePanel, /height: isOpen \? "auto" : 0/)
})

test("homepage FAQPage acceptedAnswer text appears in server HTML outside script tags", () => {
  assert.equal(homepageInstallFaqs.length, 6)
  assert.match(homepage, /faqPageJsonLd\(homepageInstallFaqs\)/)
  assert.match(homepage, /<ContactSection showFaq/)
  assert.match(homepageAccordion, /homepageInstallFaqs/)
  assertAccordionAlwaysRendersAnswers(homepageAccordion, "homepage accordion")

  const answers = acceptedAnswerTexts(homepageInstallFaqs)
  assert.equal(answers.length, 6)
  for (const [index, faq] of homepageInstallFaqs.entries()) {
    assert.equal(answers[index], faq.answer)
  }

  const visible = htmlOutsideScripts(serverRenderedFaqHtml(homepageInstallFaqs))
  for (const text of answers) {
    assert.ok(visible.includes(text), `homepage visible HTML missing: ${text}`)
    assert.doesNotMatch(
      visible,
      new RegExp(`<script[^>]*>[\\s\\S]*${text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
    )
  }
})

test("theatre FAQPage acceptedAnswer text appears in server HTML outside script tags", () => {
  assert.equal(theatreServiceFaqs.length, 5)
  assert.match(theatreRoute, /faqPageJsonLd\(theatreServiceFaqs\)/)
  assert.match(theatreLive, /theatreServiceFaqs/)
  assertAccordionAlwaysRendersAnswers(theatreLive, "theatre accordion")

  const answers = acceptedAnswerTexts(theatreServiceFaqs)
  assert.equal(answers.length, 5)
  for (const [index, faq] of theatreServiceFaqs.entries()) {
    assert.equal(answers[index], faq.answer)
  }

  const visible = htmlOutsideScripts(serverRenderedFaqHtml(theatreServiceFaqs))
  for (const text of answers) {
    assert.ok(visible.includes(text), `theatre visible HTML missing: ${text}`)
    assert.doesNotMatch(
      visible,
      new RegExp(`<script[^>]*>[\\s\\S]*${text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
    )
  }
})
