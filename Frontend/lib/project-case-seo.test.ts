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
