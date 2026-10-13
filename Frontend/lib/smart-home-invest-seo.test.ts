import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { blogTitleSegment } from "./load-blog-articles.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const siteName = "Desert Sound"

const investTitle = "Is Smart Home Automation Worth It in Pakistan?"
const investH1 = "Smart Home Automation: Why Should You Invest in It for Your Home?"
const investDescription =
  "Is home automation in Pakistan worth it? One app for lights, AC, security and your home cinema. See what's worth automating first in your home."
const pakistanSentence =
  "For homes in Pakistan, the same plan can link lights, AC, security and the home cinema so they run from one control."

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function renderedFromTemplate(segment: string) {
  return `${segment} | ${siteName}`
}

const article = readFileSync(
  join(root, "content/articles/smart-home-automation-why-should-you-invest-in-it-for-your-home.md"),
  "utf8",
)
const { meta, body } = parseFrontmatter(article)
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8")
const slugPage = readFileSync(join(root, "app/[slug]/page.tsx"), "utf8")

test("smart-home invest keeps on-page H1 and locks title + meta", () => {
  assert.equal(meta.title, investTitle)
  assert.equal(meta.h1, investH1)
  assert.equal(meta.description, investDescription)
  assert.equal(meta.slug, "/smart-home-automation-why-should-you-invest-in-it-for-your-home")
  assert.doesNotMatch(meta.title, /Desert Sound/)
  assert.match(body, /AC/)
  assert.match(body, /security/i)
})

test("smart-home invest rendered title is single-branded", () => {
  assert.match(layout, /template:\s*`%s \| \$\{siteName\}`/)
  assert.match(slugPage, /blogTitleSegment\(page\.title\)/)
  assert.match(slugPage, /description: page\.description/)

  const rendered = renderedFromTemplate(blogTitleSegment(meta.title))
  assert.equal(rendered, `${investTitle} | ${siteName}`)
  assert.doesNotMatch(rendered, /Desert Sound \| Desert Sound/)
  assert.doesNotMatch(rendered, / - Desert Sound \|/)
  assert.match(rendered, / \| Desert Sound$/)
  assert.equal(investTitle.length, 46)
  assert.equal(investDescription.length, 143)
})

test("smart-home invest body keeps the Pakistan one-control sentence", () => {
  assert.match(body, pakistanSentence)
  assert.doesNotMatch(pakistanSentence, /\bUPS\b/i)
  assert.doesNotMatch(pakistanSentence, /backup power/i)
  assert.doesNotMatch(pakistanSentence, /PKR|Rs\.?\s*\d/)
  assert.doesNotMatch(pakistanSentence, /\+92/)
  assert.doesNotMatch(pakistanSentence, /@/)
})
