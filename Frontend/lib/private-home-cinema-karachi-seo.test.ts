import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { blogTitleSegment } from "./load-blog-articles.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlePath = join(root, "content/articles/private-home-cinema-karachi.md")
const article = readFileSync(articlePath, "utf8")
const rankingPage = readFileSync(join(root, "components/ranking-seo-page.tsx"), "utf8")
const slugPage = readFileSync(join(root, "app/[slug]/page.tsx"), "utf8")
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const llmsTxt = readFileSync(join(root, "public/llms.txt"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")

const casePages = [
  join(root, "app/projects/residential/new-theatre/page.tsx"),
  join(root, "app/projects/residential/residency/page.tsx"),
  join(root, "app/projects/residential/project-platinum/page.tsx"),
] as const

const requiredHrefs = [
  "/projects/residential/new-theatre",
  "/projects/residential/residency",
  "/get-a-media-room-instead-of-a-dedicated-home-cinema",
  "/projects/residential/project-platinum",
  "/service/home-theatre-design-and-installation",
  "/home-cinema-and-cinema-installer-pakistan",
  "/contact-us",
] as const

const bannedBody = [
  /\bClifton\b/,
  /\bDHA\b/,
  /\bBahria\b/,
  /\bPhase\b/,
  /Digital Sound/,
  /\bbest\b/i,
  /#1/,
  /\bRs\b/,
  /\bPKR\b/,
  /\bprice\b/i,
  /\bweeks\b/i,
  /\bdays\b/i,
  /\+92/,
  /\b\d{2,}\s\d{3}\s\d{3}\b/,
  /Zamzama/,
  /22-C/,
  /Commercial Lane/,
]

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function wordCount(text: string) {
  return text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length
}

function markdownHrefs(text: string) {
  return [...text.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1])
}

function faqAnswerPlainText(answer: string) {
  return answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
}

const { meta, body } = parseFrontmatter(article)
const pageCopy = `${body}\n${meta.faqs.map((faq: { q: string; a: string }) => `${faq.q} ${faq.a}`).join("\n")}`

test("private cinema Karachi guide locks title, H1, and meta without doubling the brand", () => {
  assert.equal(meta.slug, "/private-home-cinema-karachi")
  assert.equal(meta.title, "Private Home Cinema in Karachi: How to Plan One")
  assert.equal(meta.h1, "Planning a Private Home Cinema in Karachi")
  assert.equal(
    meta.description,
    "Planning a private cinema at home in Karachi? Compare a dedicated room with a shared lounge, then plan seating, screen, sound, wiring and the site survey.",
  )
  assert.ok(meta.description.length >= 140 && meta.description.length <= 155)
  assert.doesNotMatch(meta.title, /Desert Sound/)
  assert.equal(blogTitleSegment(meta.title), meta.title)
  assert.equal(
    `${blogTitleSegment(meta.title)} | Desert Sound`,
    "Private Home Cinema in Karachi: How to Plan One | Desert Sound",
  )
  assert.match(slugPage, /blogTitleSegment\(page\.title\)/)
  assert.match(layout, /template:\s*`%s \| \$\{siteName\}`/)
  assert.match(layout, /index:\s*true/)
  assert.match(layout, /follow:\s*true/)
  assert.match(slugPage, /createMetadata/)
  assert.doesNotMatch(slugPage, /index:\s*false/)
  for (const field of [meta.title, meta.h1, meta.description] as string[]) {
    assert.doesNotMatch(field, /installer/i)
    assert.doesNotMatch(field, /installation/i)
  }
})

test("private cinema Karachi guide has each of seven internal links exactly once, none with a trailing slash", () => {
  const hrefs = [
    ...markdownHrefs(body),
    ...meta.faqs.flatMap((faq: { q: string; a: string }) => markdownHrefs(`${faq.q} ${faq.a}`)),
    ...meta.links.map((link: { href: string }) => link.href),
  ]
  assert.equal(hrefs.length, 7)
  assert.equal(meta.links.length, 0)
  for (const href of requiredHrefs) {
    const count = hrefs.filter((item) => item === href).length
    assert.equal(count, 1, `${href} appears ${count} times; want 1`)
    assert.doesNotMatch(href, /\/$/)
  }
  for (const href of hrefs) {
    assert.ok(href.startsWith("/"))
    assert.doesNotMatch(href, /\/$/)
    assert.equal(pageCopy.split(href).length - 1, 1, `${href} must appear once in page copy`)
  }
})

test("private cinema Karachi guide ships four 40–60 word FAQs whose schema equals visible text", () => {
  assert.ok(Array.isArray(meta.faqs))
  assert.equal(meta.faqs.length, 4)
  assert.match(rankingPage, /faqPageJsonLd/)
  assert.match(rankingPage, /page\.faqs\.map\(\(faq\) => \(\{ question: faq\.q, answer: faq\.a \}\)\)/)
  assert.match(rankingPage, /articleJsonLd/)
  assert.match(rankingPage, /breadcrumbListJsonLd/)
  assert.match(seo, /"@type": "Article"/)
  assert.match(seo, /"@type": "BreadcrumbList"/)
  assert.match(seo, /"@type": "FAQPage"/)
  assert.match(seo, /faqAnswerPlainText\(faq\.answer\)/)

  for (const faq of meta.faqs) {
    assert.ok(faq.q.length > 0)
    assert.ok(faq.a.length > 0)
    const words = wordCount(faq.a)
    assert.ok(words >= 40 && words <= 60, `"${faq.q}" answer is ${words} words; want 40–60`)
    assert.equal(faqAnswerPlainText(faq.a), faq.a)
  }
})

test("private cinema Karachi Article schema has no Place or address beyond publisher", () => {
  const articleFn = seo.split("export function articleJsonLd")[1]?.split("export function breadcrumbListJsonLd")[0] ?? ""
  assert.match(articleFn, /"@type": "Article"/)
  assert.match(articleFn, /publisher:/)
  assert.doesNotMatch(articleFn, /Place/)
  assert.doesNotMatch(articleFn, /PostalAddress/)
  assert.doesNotMatch(articleFn, /streetAddress/)
  assert.doesNotMatch(articleFn, /addressLocality/)
})

test("private cinema Karachi body keeps the apartment sentence and drops banned terms", () => {
  assert.match(
    body,
    /A private cinema works in both Karachi apartments and bungalows; the survey plans around the space you have\./,
  )
  for (const pattern of bannedBody) {
    assert.doesNotMatch(body, pattern)
  }
})

test("private cinema Karachi URL is on the sitemap and listed under Guides in llms.txt", () => {
  assert.match(sitemap, /rankingSeoPages/)
  assert.match(sitemap, /canonicalizePath/)
  const guides = llmsTxt.split("## Guides")[1]?.split("## ")[0] ?? ""
  assert.match(
    guides,
    /Private home cinema in Karachi: https:\/\/www\.desertsound\.com\.pk\/private-home-cinema-karachi/,
  )
  assert.doesNotMatch(guides, /private-home-cinema-karachi\//)
})

test("Emerald, Residency, and Platinum each link the private cinema Karachi guide exactly once", () => {
  for (const file of casePages) {
    const source = readFileSync(file, "utf8")
    assert.equal(
      source.split("/private-home-cinema-karachi").length - 1,
      1,
      `${file} should link /private-home-cinema-karachi once`,
    )
    assert.doesNotMatch(source, /\/private-home-cinema-karachi\//)
    assert.match(source, /Explore more/)
  }
})
