import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { loadBlogArticles } from "./load-blog-articles.ts"
import { smartHomeServiceFaqs } from "./smart-home-service-faqs.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const articlesDir = join(root, "content/articles")
const articleFile = "how-to-choose-a-home-automation-system-pakistan.md"
const slug = "/how-to-choose-a-home-automation-system-pakistan"

const TITLE = "How to Choose Home Automation in Pakistan"
const DESCRIPTION =
  "Choosing home automation devices for a Pakistani home: wired or wireless, local or cloud control, power cuts and internet drops, and what each room needs."
const ANSWER =
  "Choose a home automation system for a Pakistani home by how it behaves on a bad day, not by how the app looks. Decide which parts are wired and which are wireless, ask how it behaves during a power or internet cut, plan the controller and network together, then match devices to what each room is used for."
const ENTITY =
  "Desert Sound designs and installs home cinemas, home theatres and smart homes across Pakistan, with a showroom in Karachi."

const H2S = [
  "What Is a Home Automation System?",
  "Wired, Wireless or a Mix",
  "Local Control or Cloud Control",
  "Power Cuts, Voltage Swings and Internet Drops",
  "What Each Room Needs",
  "How Installation Usually Works",
  "Choosing Without Regret",
]
const H3S = [
  "Living Room",
  "Cinema or TV Room",
  "Bedrooms",
  "Kitchen and Utility Areas",
  "Entrance, Gate and Outdoors",
  "The Equipment Rack",
]

const LINKS = [
  {
    label: "whether automating pays off in your home",
    href: "/smart-home-automation-why-should-you-invest-in-it-for-your-home",
  },
  {
    label: "planning the home network around power cuts",
    href: "/service/home-networking-and-wi-fi",
  },
  {
    label: "the everyday reasons families automate",
    href: "/what-are-5-reasons-for-a-smart-home",
  },
  {
    label: "how we design and install control for the whole house",
    href: "/service/smart-home-automation",
  },
  {
    label: "book a consultation about your wiring and network",
    href: "/contact-us",
  },
]

const RESERVED_ANCHORS = [
  "choosing between wired, wireless and local control",
  "what's worth automating first, and what can wait",
]

const BRANDS =
  /\b(Control4|Crestron|Lutron|Philips Hue|Nest|Ecobee|Alexa|Siri|Google Assistant|Google Home|HomeKit|SmartThings|Sonoff|Tuya|HDL|Savant|Xiaomi|Aqara|Schneider|Legrand)\b/
const STANDARDS = /Wi-?Fi|Zigbee|KNX|\bMatter\b/
const STANDARD_JUDGEMENT =
  /better|worse|more reliable|less reliable|superior|compatible|works with|certified|future-proof/i
const WE_OUR_US = /\b(we|our|us)\b|Desert Sound/i

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return { meta: JSON.parse(match[1]), body: match[2] }
}

function markdownLinks(text: string) {
  return [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => ({
    label: match[1],
    href: match[2],
  }))
}

function wordCount(text: string) {
  return text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length
}

function visibleProse(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
}

function headingLines(body: string) {
  return body.split(/\n/).filter((line) => /^#{2,3} /.test(line))
}

function headingText(line: string) {
  return line.replace(/^#{2,3} /, "").trim()
}

function surfacesOf(meta: { title: string; h1: string; description: string }, body: string) {
  const headings = headingLines(body).map(headingText)
  const anchors = markdownLinks(body).map((link) => link.label)
  return [meta.title, meta.h1, meta.description, ...headings, ...anchors]
}

function tokens(text: string) {
  return text.toLowerCase().match(/[a-z0-9']+/g) ?? []
}

function eightWordRuns(text: string) {
  const words = tokens(text)
  const runs = new Set<string>()
  for (let i = 0; i <= words.length - 8; i += 1) {
    runs.add(words.slice(i, i + 8).join(" "))
  }
  return runs
}

function firstOverlap(left: Set<string>, right: Set<string>) {
  for (const run of left) {
    if (right.has(run)) return run
  }
  return null
}

const article = readFileSync(join(articlesDir, articleFile), "utf8")
const { meta, body } = parseFrontmatter(article)
const surfaces = surfacesOf(meta, body)
const surfaceText = surfaces.join("\n")
const pageCopy = `${body}\n${surfaceText}`
const rankingPage = readFileSync(join(root, "components/ranking-seo-page.tsx"), "utf8")
const rankingCatalog = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const llmsTxt = readFileSync(join(root, "public/llms.txt"), "utf8")
const smartHomeLive = readFileSync(join(root, "app/services/smart-home-automation/page.tsx"), "utf8")
const smartHomeFaqsText = smartHomeServiceFaqs.map((faq) => `${faq.question} ${faq.answer}`).join("\n")

function rankingEntrySlice(href: string) {
  const needle = `"slug": "${href}"`
  const start = rankingCatalog.indexOf(needle)
  assert.ok(start >= 0, `missing ranking entry ${href}`)
  const next = rankingCatalog.indexOf('"slug": "', start + needle.length)
  return rankingCatalog.slice(start, next === -1 ? undefined : next)
}

function rankingTitleH1(href: string) {
  const blog = loadBlogArticles().find((page) => page.slug === href)
  if (blog) return { title: blog.title, h1: blog.h1 }
  const slice = rankingEntrySlice(href)
  const title = slice.match(/"title": "([^"]+)"/)?.[1]
  const h1 = slice.match(/"h1": "([^"]+)"/)?.[1]
  assert.ok(title && h1, `missing title/h1 for ${href}`)
  return { title, h1 }
}

const relatedSmartHomeText = [
  ["smart-home service entry", rankingEntrySlice("/service/smart-home-automation")],
  ["smart-home live page", smartHomeLive],
  ["smart-home service FAQs", smartHomeFaqsText],
] as const

test("1. meta locks slug, title, description and h1", () => {
  assert.equal(meta.slug, slug)
  assert.equal(meta.title, TITLE)
  assert.equal(meta.description, DESCRIPTION)
  assert.equal(meta.h1, TITLE)
  assert.equal(meta.title, meta.h1)
  assert.ok(meta.title.length <= 60, `title is ${meta.title.length} chars`)
  assert.ok(
    meta.description.length >= 120 && meta.description.length <= 160,
    `description is ${meta.description.length} chars`,
  )
  assert.equal(meta.image, "/smart-home-control-room-futuristic.jpg")
  assert.equal(meta.imageAlt, "Wall-mounted smart home control panel showing lighting scenes")
  for (const field of [meta.title, meta.h1] as string[]) {
    assert.doesNotMatch(
      field,
      /Karachi|Lahore|Islamabad|Rawalpindi|Multan|Faisalabad|Sialkot|Bahawalpur|Peshawar|Quetta/i,
    )
  }
})

test("2. answer block is exact, 40–60 words, and unique on eight-word runs", () => {
  const firstPara = body.replace(/^\r?\n/, "").split(/\n\n/)[0]
  assert.equal(firstPara, ANSWER)
  const words = wordCount(ANSWER)
  assert.ok(words >= 40 && words <= 60, `answer is ${words} words`)
  assert.doesNotMatch(ANSWER, /\]\(/)

  const answerRuns = eightWordRuns(ANSWER)
  const files = readdirSync(articlesDir).filter((name) => name.endsWith(".md") && name !== articleFile)
  for (const filename of files) {
    const other = parseFrontmatter(readFileSync(join(articlesDir, filename), "utf8"))
    const overlap = firstOverlap(answerRuns, eightWordRuns(visibleProse(other.body)))
    assert.equal(overlap, null, `answer shares "${overlap}" with ${filename}`)
  }
  for (const [name, text] of relatedSmartHomeText) {
    const overlap = firstOverlap(answerRuns, eightWordRuns(text))
    assert.equal(overlap, null, `answer shares "${overlap}" with ${name}`)
  }
})

test("3. banned solution and uptime phrases stay out of body and surfaces", () => {
  for (const pattern of [
    /home automation solution/i,
    /smart home solution/i,
    /home automation systems? in pakistan/i,
    /\bsolutions?\b/i,
    /keeps? working|keeps? running|works? without (the )?internet|runs? without (the )?internet|never goes down|guarantee/i,
  ]) {
    assert.doesNotMatch(pageCopy, pattern)
  }
})

test("4. free, ranking and sales words stay out", () => {
  assert.doesNotMatch(pageCopy, /(?<![-\w])free\b/i)
  assert.doesNotMatch("hands-free", /(?<![-\w])free\b/i)
  assert.doesNotMatch(pageCopy, /complimentary|no[- ]charge|no[- ]obligation/i)
  assert.doesNotMatch(pageCopy, /\bbest\b/i)
  assert.doesNotMatch(pageCopy, /\bcheap(est)?\b/i)
  assert.doesNotMatch(pageCopy, /\baffordable\b/i)
  assert.doesNotMatch(pageCopy, /\bleading\b/i)
  assert.doesNotMatch(pageCopy, /#1/)
  assert.doesNotMatch(body, /\btop\s+(rated|brands?|picks?|\d+|ten|five)\b/i)
  assert.doesNotMatch(surfaceText, /\btop\b/i)
})

test("5. US/UK stay out; contact us is allowed", () => {
  assert.doesNotMatch(pageCopy, /\bUS\b/)
  assert.doesNotMatch(pageCopy, /\bUSA\b/)
  assert.doesNotMatch(pageCopy, /\bUK\b/)
  assert.doesNotMatch(pageCopy, /America|Britain|England/i)
  assert.doesNotMatch("contact us", /\bUS\b/)
  assert.doesNotMatch("contact us", /\bUSA\b/)
  assert.doesNotMatch("contact us", /\bUK\b/)
})

test("6. body prose has no digits or prices", () => {
  assert.doesNotMatch(visibleProse(body), /\d/)
  assert.doesNotMatch(pageCopy, /\b(PKR|Rs\.?|rupees?|lakh|lac|crore|thousand|million|hundred)\b/i)
})

test("7. brands, competitors and neighbourhoods stay out", () => {
  assert.doesNotMatch(pageCopy, BRANDS)
  assert.doesNotMatch(pageCopy, /Digital Sound/i)
  assert.doesNotMatch(
    pageCopy,
    /Cinematics|Integrated Kontrols|Orient AV|\bTriad\b|Nashco|Resco|MTronic|Smartinn|Okasha/i,
  )
  assert.doesNotMatch(
    pageCopy,
    /\bDHA\b|Clifton|Bahria|Zamzama|Gulberg|Defence|PECHS|Gulshan|\bphase\b|\bsectors?\b/i,
  )
  const lahore = [...body.matchAll(/Lahore/g)]
  for (const match of lahore) {
    const index = match.index ?? 0
    const window = body.slice(Math.max(0, index - 20), index + "Lahore".length + 1)
    assert.match(window, /We have a team in Lahore\./)
  }
})

test("8. standards appear as neutral body categories only", () => {
  assert.match(body, STANDARDS)
  assert.doesNotMatch(surfaceText, STANDARDS)
  const sentences = body.split(/(?<=[.!?])\s+/)
  for (const sentence of sentences) {
    if (!STANDARDS.test(sentence)) continue
    assert.doesNotMatch(sentence, WE_OUR_US)
    assert.doesNotMatch(sentence, STANDARD_JUDGEMENT)
  }
})

test("9. body has exactly five slashless links from the brief, separate from meta.links", () => {
  const links = markdownLinks(body)
  assert.equal(links.length, 5)
  assert.deepEqual(links, LINKS)
  assert.deepEqual(meta.links, [])
  for (const link of links) {
    assert.ok(link.href.startsWith("/"))
    assert.doesNotMatch(link.href, /\/$/)
    assert.notEqual(link.href, "/home-cinema-power-protection-load-shedding-pakistan")
  }
})

test("10. anchors are unique against other articles, target titles and reserved phrases", () => {
  const ours = markdownLinks(body).map((link) => link.label.toLowerCase())
  const files = readdirSync(articlesDir).filter((name) => name.endsWith(".md") && name !== articleFile)
  const otherLabels = new Set<string>()
  for (const filename of files) {
    const other = parseFrontmatter(readFileSync(join(articlesDir, filename), "utf8"))
    for (const link of markdownLinks(other.body)) {
      otherLabels.add(link.label.toLowerCase())
    }
    for (const link of other.meta.links ?? []) {
      otherLabels.add(String(link.label).toLowerCase())
    }
  }
  for (const label of ours) {
    assert.equal(otherLabels.has(label), false, `anchor "${label}" collides with another article`)
    assert.equal(
      RESERVED_ANCHORS.some((item) => item.toLowerCase() === label),
      false,
      `anchor "${label}" is reserved`,
    )
  }
  for (const link of markdownLinks(body)) {
    const target = rankingTitleH1(link.href)
    assert.notEqual(link.label.toLowerCase(), target.title.toLowerCase())
    assert.notEqual(link.label.toLowerCase(), target.h1.toLowerCase())
  }
})

test("11. body shares no eight-word run with related smart-home pages", () => {
  const compareBody = visibleProse(body.replace(ENTITY, "").replace("We plan the network and backup around outages.", ""))
  const ours = eightWordRuns(compareBody)
  const related = [
    "smart-home-automation-why-should-you-invest-in-it-for-your-home.md",
    "what-are-5-reasons-for-a-smart-home.md",
    "beginners-guide-to-smart-home-automation.md",
    "what-are-must-have-smart-home-devices-an-overview.md",
  ]
  for (const filename of related) {
    const other = parseFrontmatter(readFileSync(join(articlesDir, filename), "utf8"))
    const overlap = firstOverlap(ours, eightWordRuns(visibleProse(other.body)))
    assert.equal(overlap, null, `body shares "${overlap}" with ${filename}`)
  }
  for (const [name, text] of relatedSmartHomeText) {
    const overlap = firstOverlap(ours, eightWordRuns(text))
    assert.equal(overlap, null, `body shares "${overlap}" with ${name}`)
  }
  assert.match(body, /We plan the network and backup around outages\./)
  assert.doesNotMatch(body, /continue without internet access/i)
  assert.doesNotMatch(body, /strong home network is essential/i)
})

test("12. headings, schema, close, word count, sitemap and llms.txt", () => {
  const h2 = headingLines(body)
    .filter((line) => line.startsWith("## ") && !line.startsWith("### "))
    .map(headingText)
  const h3 = headingLines(body)
    .filter((line) => line.startsWith("### "))
    .map(headingText)
  assert.deepEqual(h2, H2S)
  assert.deepEqual(h3, H3S)
  assert.ok(h2.filter((heading) => heading.endsWith("?")).length <= 3)

  const ours = new Set([...h2, ...h3].map((heading) => heading.toLowerCase()))
  const files = readdirSync(articlesDir).filter((name) => name.endsWith(".md") && name !== articleFile)
  for (const filename of files) {
    const other = parseFrontmatter(readFileSync(join(articlesDir, filename), "utf8"))
    for (const line of headingLines(other.body)) {
      const heading = headingText(line).toLowerCase()
      assert.equal(ours.has(heading), false, `heading "${heading}" collides with ${filename}`)
    }
    for (const faq of other.meta.faqs ?? []) {
      assert.equal(ours.has(String(faq.q).toLowerCase()), false, `heading collides with FAQ "${faq.q}"`)
    }
  }
  for (const match of rankingCatalog.matchAll(/#{2,3} ([^\n"\\]+)/g)) {
    assert.equal(
      ours.has(match[1].trim().toLowerCase()),
      false,
      `heading "${match[1]}" collides with ranking-seo-content.ts`,
    )
  }
  for (const match of rankingCatalog.matchAll(/"q": "([^"]+)"/g)) {
    assert.equal(ours.has(match[1].toLowerCase()), false, `heading collides with FAQ "${match[1]}"`)
  }

  assert.deepEqual(meta.faqs, [])
  assert.match(rankingPage, /page\.faqs\.length > 0/)
  assert.doesNotMatch(rankingPage, /HowTo/)

  assert.equal(body.split(ENTITY).length - 1, 1)
  assert.equal((body.match(/fill in the form and we will contact you/gi) ?? []).length, 1)
  assert.ok((body.match(/CEDIA/g) ?? []).length <= 1)

  const words = wordCount(body)
  assert.ok(words >= 1100 && words <= 1450, `body is ${words} words`)

  assert.ok(loadBlogArticles().some((page) => page.slug === slug))
  assert.match(rankingCatalog, /loadBlogArticles/)
  assert.match(readFileSync(join(root, "app/sitemap.ts"), "utf8"), /rankingSeoPages/)
  const guides = llmsTxt.split("## Guides")[1]?.split("## ")[0] ?? ""
  assert.match(
    guides,
    /How to choose a home automation system: https:\/\/www\.desertsound\.com\.pk\/how-to-choose-a-home-automation-system-pakistan/,
  )
  assert.doesNotMatch(guides, /how-to-choose-a-home-automation-system-pakistan\//)
})

test("13. body does not claim local, offline, or leftover internet-need wording", () => {
  assert.doesNotMatch(body, /still need the internet|works? locally|\boffline\b|power returns|mains returns|last state|come back off/i)
})
