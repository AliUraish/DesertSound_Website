import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlePath = join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md")
const article = readFileSync(articlePath, "utf8")
const rankingPage = readFileSync(join(root, "components/ranking-seo-page.tsx"), "utf8")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const theatreRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const theatreLive = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const rankingCatalog = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function wordCount(text: string) {
  return text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length
}

const { meta, body } = parseFrontmatter(article)
const banned = [
  /\bbest\b/i,
  /#1/,
  /Digital Sound/,
  /Daraz/i,
  /\bCinematics\b/,
  /\bNashco\b/,
  /United States/,
  /United Kingdom/,
  /\bUSA\b/,
  /\bU\.K\.\b/,
]

test("#33 keeps cinema-installer H1 intent and drops duplicate Desert Sound title suffix", () => {
  assert.equal(meta.h1, "Home Cinema in Pakistan: What a Cinema Installer Actually Does")
  assert.equal(meta.title, "Home Cinema in Pakistan: A Cinema Installer from Design to Calibration")
  assert.match(meta.title, /Cinema/)
  assert.match(meta.title, /Installer/)
  assert.match(meta.title, /Pakistan/)
  assert.doesNotMatch(meta.title, /Desert Sound/)
  assert.doesNotMatch(meta.title, /\bbest\b/i)
  assert.doesNotMatch(meta.h1, /Karachi/)
})

test("#33 ships 3–5 fact-locked FAQs with FAQPage schema lockstep", () => {
  assert.ok(Array.isArray(meta.faqs))
  assert.ok(meta.faqs.length >= 3 && meta.faqs.length <= 5)
  assert.match(rankingPage, /faqPageJsonLd/)
  assert.match(rankingPage, /page\.faqs\.map\(\(faq\) => \(\{ question: faq\.q, answer: faq\.a \}\)\)/)
  assert.doesNotMatch(rankingPage, /"@type": "Review"/)
  assert.doesNotMatch(rankingPage, /"@type": "Offer"/)
  assert.match(seo, /"@type": "FAQPage"/)

  for (const faq of meta.faqs) {
    assert.ok(faq.q.length > 0)
    assert.ok(faq.a.length > 0)
    const words = wordCount(faq.a)
    assert.ok(words >= 40 && words <= 70, `"${faq.q}" answer is ${words} words; want 40–70`)
    for (const pattern of banned) {
      assert.doesNotMatch(faq.q, pattern)
      assert.doesNotMatch(faq.a, pattern)
    }
    assert.doesNotMatch(faq.a, /PKR|Rs\.?\s*\d/)
    assert.doesNotMatch(faq.a, /\b\d+\s*(days?|weeks?|months?)\b/i)
  }
})

test("#33 FAQ themes cover installer process, boxed vs install, Karachi visit, hiring questions, existing rooms", () => {
  const questions = meta.faqs.map((faq: { q: string }) => faq.q).join("\n")
  const answers = meta.faqs.map((faq: { a: string }) => faq.a).join("\n")
  assert.match(questions, /cinema installer in Pakistan/i)
  assert.match(questions, /boxed home theatre system/i)
  assert.match(questions, /Karachi site visit/i)
  assert.match(questions, /before hiring/i)
  assert.match(questions, /existing finished room/i)
  assert.match(answers, /design.*conceal.*calibrat/i)
  assert.match(answers, /product selection/)
  assert.match(answers, /Home cinema installation in Karachi/)
  assert.match(answers, /room survey first/i)
  assert.match(answers, /new build is not required/i)
})

test("#33 lean copy keeps installer / Karachi AEO without stuffing H1", () => {
  assert.match(body, /What to expect on a Karachi site visit/)
  assert.match(body, /boxed .+home theatre system.+ is product selection/)
  assert.match(body, /Home cinema installation in Karachi/)
  assert.match(body, /full home cinema design-and-install scope/)
  assert.match(body, /\+92 21 111 570 111/)
  assert.match(body, /Zamzama DHA/)
  assert.doesNotMatch(body, /click here/i)
  for (const pattern of banned) {
    assert.doesNotMatch(body, pattern)
    assert.doesNotMatch(meta.title, pattern)
    assert.doesNotMatch(meta.h1, pattern)
    assert.doesNotMatch(meta.description, pattern)
  }
})

test("#33 continue-exploring mesh uses descriptive anchors into theatre and #36 cases", () => {
  const required = [
    { href: "/service/home-theatre-design-and-installation/", label: /design-and-install scope/i },
    { href: "/projects/residential/project-platinum", label: /Project Platinum.*Karachi/i },
    { href: "/projects/residential/residency", label: /Residency.*Karachi/i },
    { href: "/projects/residential/studio-vellari", label: /Studio Vellari.*Karachi/i },
    { href: "/projects/residential/stanley-seats", label: /Stanley Seats.*Karachi/i },
  ]
  for (const link of required) {
    const found = meta.links.find((item: { href: string; label: string }) => item.href === link.href)
    assert.ok(found, `missing continue-exploring link ${link.href}`)
    assert.match(found.label, link.label)
    assert.doesNotMatch(found.label, /click here/i)
    assert.doesNotMatch(found.label, /\bbest\b/i)
  }
})

test("theatre SERP title/meta and homepage stay untouched", () => {
  assert.match(theatreRoute, /serviceRouteMetadata\(slug\)/)
  assert.match(seo, /Home Theater Installation in Pakistan \| Design and Install/)
  assert.match(
    rankingCatalog,
    /"title": "Home Theater Installation in Pakistan \| Design and Install"/,
  )
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.match(theatreLive, /cinema installer process/)
  assert.match(theatreLive, /\/home-cinema-and-cinema-installer-pakistan/)
})
