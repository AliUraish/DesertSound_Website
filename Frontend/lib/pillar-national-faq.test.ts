import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlePath = join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md")
const article = readFileSync(articlePath, "utf8")
const rankingPage = readFileSync(join(root, "components/ranking-seo-page.tsx"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")

const NATIONAL_Q = "Do you install home theatres across Pakistan?"
const NATIONAL_A =
  "Yes. Desert Sound designs and installs home theatres and private cinemas across Pakistan, in apartments and bungalows. Each room is surveyed, designed, wired out of sight and calibrated to its seats. We have a team in Lahore. Our showroom is in Karachi. We are a CEDIA member. Fill in the form and we will contact you."

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function wordCount(text: string) {
  return text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length
}

function faqAnswerPlainText(answer: string) {
  return answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
}

const { meta } = parseFrontmatter(article)
const faqs = meta.faqs as { q: string; a: string }[]
const national = faqs[0]

test("pillar faqs[0] is the national install FAQ, word for word", () => {
  assert.equal(national.q, NATIONAL_Q)
  assert.equal(national.a, NATIONAL_A)
  assert.ok(national.a.startsWith("Yes."))
  const words = wordCount(national.a)
  assert.ok(words >= 40 && words <= 60, `national FAQ answer is ${words} words; want 40–60`)
})

test("pillar article file contains CEDIA exactly once", () => {
  assert.equal((article.match(/CEDIA/g) || []).length, 1)
})

test("national FAQ answer bans free, digits, Matter, and best", () => {
  assert.doesNotMatch(national.a, /(?<![-\w])free\b/i)
  assert.doesNotMatch(national.a, /\d/)
  assert.doesNotMatch(national.a, /Matter/)
  assert.doesNotMatch(national.a, /best/)
})

test("visible accordion and FAQPage JSON-LD stay in lockstep from page.faqs", () => {
  assert.match(rankingPage, /shouldEmitFaqPageJsonLd\(page\)/)
  assert.match(
    rankingPage,
    /faqPageJsonLd\(page\.faqs\.map\(\(faq\) => \(\{ question: faq\.q, answer: faq\.a \}\)\)\)/,
  )
  assert.match(rankingPage, /RankingFaqAccordion/)
  assert.match(
    rankingPage,
    /items=\{page\.faqs\.map\(\(faq\) => \(\{\s*question: faq\.q,\s*answer: renderInline\(faq\.a\),/,
  )
  assert.match(rankingPage, /page\.faqs\.map\(\(faq\) => \(/)
  assert.match(rankingPage, /\{faq\.q\}/)
  assert.match(rankingPage, /renderInline\(faq\.a\)/)
  assert.match(seo, /"@type": "FAQPage"/)
  assert.match(seo, /text: faqAnswerPlainText\(faq\.answer\)/)
  assert.equal(faqAnswerPlainText(national.a), national.a)
})
