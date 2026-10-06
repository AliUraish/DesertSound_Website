import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { getProject } from "./projects-data.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

const flagshipPages = [
  {
    slug: "new-theatre",
    file: "app/projects/residential/new-theatre/page.tsx",
    seoTitle: "Emerald Private Cinema | Home Theater Installation in Karachi",
    description:
      "Dedicated home theater installation in Karachi with acoustic detailing, hidden wiring, and calibrated picture and sound.",
    category: "Residential Cinema",
  },
  {
    slug: "project-platinum",
    file: "app/projects/residential/project-platinum/page.tsx",
    seoTitle: "Project Platinum | Home Theater Installation in Karachi",
    description:
      "Karachi home theater installation with discreet equipment placement, refined detailing, and a calibrated cinema room.",
    category: "Residential Cinema",
  },
  {
    slug: "residency",
    file: "app/projects/residential/residency/page.tsx",
    seoTitle: "Residency Private Cinema | Home Theater Installation in Karachi",
    description:
      "Karachi home theater installation for immersive viewing, refined comfort, and discreet lighting, sound, and display integration.",
    category: "Residential Cinema",
  },
  {
    slug: "studio-vellari",
    file: "app/projects/residential/studio-vellari/page.tsx",
    seoTitle: "Studio Vellari | Home Theater Installation in Karachi",
    description:
      "Flagship Karachi cinema with Studio Vellari Stanley recliners and daybed — seating, acoustics, hidden wiring, and calibration.",
    category: "Residential Cinema",
  },
  {
    slug: "stanley-seats",
    file: "app/projects/residential/stanley-seats/page.tsx",
    seoTitle: "Stanley Seats | Home Theater Installation in Karachi",
    description:
      "Karachi home cinema seating installation built around Stanley recliners, tailored comfort, and a calibrated viewing room.",
    category: "Residential Cinema Seating",
  },
] as const

test("flagship residential case studies yield install-intent SERP metadata", () => {
  const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
  assert.match(seo, /project\.seoTitle \?\? project\.title/)

  for (const page of flagshipPages) {
    const project = getProject("residential", page.slug)
    assert.ok(project, `missing project ${page.slug}`)
    assert.equal(project.seoTitle, page.seoTitle)
    assert.equal(project.description, page.description)
    assert.equal(project.category, page.category)
    assert.equal(project.location, "Karachi, Pakistan")
    assert.match(page.seoTitle, /Home Theater Installation in Karachi/)
    assert.doesNotMatch(page.seoTitle, /including Karachi/i)
    assert.doesNotMatch(page.description, /including Karachi/i)
    assert.doesNotMatch(page.seoTitle, /\bHQ\b/)
    assert.doesNotMatch(page.description, /\bHQ\b/)
  }
})

test("flagship residential pages deepen copy and link the theatre install service once", () => {
  for (const page of flagshipPages) {
    const source = readFileSync(join(root, page.file), "utf8")
    assert.match(source, /TheatreInstallLink/)
    assert.equal(source.split("<TheatreInstallLink").length - 1, 1)
    assert.doesNotMatch(source, /including Karachi/i)
    assert.doesNotMatch(source, /Karachi HQ/i)
    assert.doesNotMatch(source, /DHA HQ/i)
    assert.doesNotMatch(source, /7\.2\.4|Dolby Atmos channel/i)
    assert.match(source, /galleryImageAlts/)
    const paragraphCount = source.split("description={[")[1]?.split("]}")[0]?.split("\n").filter((line) => {
      const trimmed = line.trim()
      return trimmed.startsWith('"') || trimmed.startsWith("<>")
    }).length
    assert.ok(paragraphCount && paragraphCount >= 3, `${page.slug} should have at least 3 body paragraphs`)
  }
})

const meshPages = [
  {
    slug: "project-platinum",
    file: "app/projects/residential/project-platinum/page.tsx",
    lead: "Karachi home theater / home cinema installation — finished residential room.",
    theatreAnchor: "home cinema installation in Karachi",
    articleAnchor: "home cinema installer process for Karachi rooms",
    siblingHref: "/projects/residential/residency",
  },
  {
    slug: "residency",
    file: "app/projects/residential/residency/page.tsx",
    lead: "Karachi home theater / home cinema installation — finished residential room.",
    theatreAnchor: "home theater installation in Karachi",
    articleAnchor: "cinema installer process for a Karachi media room",
    siblingHref: "/projects/residential/project-platinum",
  },
  {
    slug: "studio-vellari",
    file: "app/projects/residential/studio-vellari/page.tsx",
    lead: "Karachi home theater / home cinema installation — finished residential room.",
    theatreAnchor: "home cinema installation in Karachi",
    articleAnchor: "what a cinema installer in Pakistan actually does",
    siblingHref: "/projects/residential/stanley-seats",
  },
  {
    slug: "stanley-seats",
    file: "app/projects/residential/stanley-seats/page.tsx",
    lead: "Cinema seating install in a Karachi viewing room — part of a full design-and-install, not a furniture catalog.",
    theatreAnchor: "full home theatre design-and-install",
    articleAnchor: "what a cinema installer in Pakistan actually does",
    siblingHref: "/projects/residential/studio-vellari",
  },
] as const

function meshWordCount(source: string) {
  const lead = source.match(/description=\{\[\s*"([^"]+)"/)?.[1] ?? ""
  let sectionSrc = source.split("sections={[")[1]?.split("breadcrumb=")[0] ?? ""
  const skip = new Set([
    "What this room needed",
    "How the install shows up",
    "Survey → design → install on this room",
    "Explore more",
  ])
  const quoted = [...sectionSrc.matchAll(/"([^"]*)"/g)]
    .map((match) => match[1])
    .filter((value) => value.trim() && !skip.has(value) && !value.startsWith("/"))
  sectionSrc = sectionSrc.replace(/"([^"]*)"/g, " ").replace(/<[^>]+>/g, " ").replace(/\{[^}]*\}/g, " ")
  const rest = sectionSrc.replace(/heading:|paragraphs:/g, " ")
  return `${lead} ${quoted.join(" ")} ${rest}`
    .split(/\s+/)
    .filter((word) => /[A-Za-z]{2,}/.test(word)).length
}

test("Karachi case mesh deepens four rooms with unique H2s and required links", () => {
  const headings = ["What this room needed", "How the install shows up", "Explore more"]
  const articleHrefs = new Set<string>()
  const theatreAnchors = new Set<string>()

  for (const page of meshPages) {
    const source = readFileSync(join(root, page.file), "utf8")
    assert.match(source, new RegExp(page.lead.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    for (const heading of headings) {
      assert.match(source, new RegExp(heading))
    }
    assert.equal(headings.filter((heading) => source.includes(`heading: "${heading}"`)).length, 3)
    assert.match(source, new RegExp(page.theatreAnchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    assert.match(source, /cinemaInstallerArticleHref/)
    assert.match(source, new RegExp(page.articleAnchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    assert.match(source, new RegExp(page.siblingHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    assert.doesNotMatch(source, /\bbest\b/i)
    assert.doesNotMatch(source, /Digital Sound/)
    assert.doesNotMatch(source, /new-theatre|Emerald/)

    const words = meshWordCount(source)
    assert.ok(words >= 120 && words <= 220, `${page.slug} extra copy is ${words} words; want 120–220`)

    theatreAnchors.add(page.theatreAnchor)
    articleHrefs.add(page.articleAnchor)
  }

  assert.ok(theatreAnchors.has("home cinema installation in Karachi"))
  assert.ok(theatreAnchors.has("home theater installation in Karachi"))
  assert.equal(meshPages.filter((page) => /Karachi/.test(page.articleAnchor)).length, 2)
  assert.ok(articleHrefs.has("what a cinema installer in Pakistan actually does"))
})

test("Project Platinum adds survey-design-install proof between install-shows-up and Explore more", () => {
  const source = readFileSync(join(root, "app/projects/residential/project-platinum/page.tsx"), "utf8")
  const installIdx = source.indexOf('heading: "How the install shows up"')
  const surveyIdx = source.indexOf('heading: "Survey → design → install on this room"')
  const exploreIdx = source.indexOf('heading: "Explore more"')
  assert.ok(installIdx !== -1 && surveyIdx !== -1 && exploreIdx !== -1)
  assert.ok(installIdx < surveyIdx && surveyIdx < exploreIdx)
  assert.doesNotMatch(source, /FAQPage/)
})

test("Stanley Seats stays seating-scoped and does not primary-target Karachi cinema install", () => {
  const source = readFileSync(join(root, "app/projects/residential/stanley-seats/page.tsx"), "utf8")
  assert.doesNotMatch(source, /home cinema installation in Karachi/)
  assert.doesNotMatch(source, /home theater installation in Karachi/)
  assert.match(source, /full home theatre design-and-install/)
  assert.match(source, /studio-vellari/)
})

test("theatre service finished-rooms strip links the four Karachi cases and installer process", () => {
  const livePage = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
  assert.match(livePage, /Karachi home cinema installations we&apos;ve finished/)
  assert.match(livePage, /\/projects\/residential\/project-platinum/)
  assert.match(livePage, /\/projects\/residential\/residency/)
  assert.match(livePage, /\/projects\/residential\/studio-vellari/)
  assert.match(livePage, /\/projects\/residential\/stanley-seats/)
  assert.match(livePage, /cinema installer process/)
  assert.match(livePage, /\/home-cinema-and-cinema-installer-pakistan/)
  assert.doesNotMatch(livePage, /new-theatre/)
})

test("#33 case links use Karachi-room anchors", () => {
  const article = readFileSync(
    join(root, "content/articles/home-cinema-and-cinema-installer-pakistan.md"),
    "utf8",
  )
  const cases = [
    { href: "/projects/residential/project-platinum", needle: /\[Project Platinum[^\]]*Karachi[^\]]*\]/ },
    { href: "/projects/residential/residency", needle: /\[Residency Private Cinema[^\]]*Karachi[^\]]*\]/ },
    { href: "/projects/residential/studio-vellari", needle: /\[Studio Vellari[^\]]*Karachi[^\]]*\]/ },
    { href: "/projects/residential/stanley-seats", needle: /\[Stanley Seats[^\]]*Karachi[^\]]*\]/ },
  ]
  for (const page of cases) {
    assert.match(article, page.needle)
    assert.match(article, new RegExp(`\\]\\(${page.href}\\)`))
  }
})
