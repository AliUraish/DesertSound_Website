import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { theatreServiceFaqs } from "./theatre-service-faqs.ts"
import { theatreInstallHowToSteps } from "./theatre-service-howto.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const livePage = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)
const ranking = readFileSync(join(root, "lib/ranking-seo-content.ts"), "utf8")
const seo = readFileSync(join(root, "lib/seo.ts"), "utf8")
const schema = readFileSync(join(root, "lib/theatre-service-schema.ts"), "utf8")

const title = "Home Theater Installation in Pakistan | Design and Install"
const description =
  "Home theater installation across Pakistan from Karachi. We design, install, and calibrate cinema rooms — site visits nationwide."

test("theatre service ranking meta matches catalog SERP strings", () => {
  const rankingTheatre = ranking.split('"slug": "/service/home-theatre-design-and-installation"')[1]
  const catalogTheatre = seo.split('path: "/service/home-theatre-design-and-installation"')[1]
  assert.ok(rankingTheatre)
  assert.ok(catalogTheatre)
  assert.match(rankingTheatre.slice(0, 500), new RegExp(title.replace(/[|]/g, "\\|")))
  assert.match(rankingTheatre.slice(0, 800), new RegExp(description.replace(/[|]/g, "\\|")))
  assert.match(catalogTheatre.slice(0, 500), new RegExp(title.replace(/[|]/g, "\\|")))
  assert.match(catalogTheatre.slice(0, 800), new RegExp(description.replace(/[|]/g, "\\|")))
})

test("theatre service HowTo stays lockstep with visible copy", () => {
  assert.equal(theatreInstallHowToSteps.length, 4)
  for (const step of theatreInstallHowToSteps) {
    if (step.name !== "Plan around the room") {
      assert.match(livePage, new RegExp(step.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    }
  }
  assert.match(livePage, /We plan home theater installation in Karachi and across Pakistan around the room/)
  assert.match(livePage, /starts with the room/)
  assert.match(livePage, /Professional Home Cinema Design/)
  assert.match(livePage, /Immersive Audio & Visual Experience/)
  assert.match(livePage, /Smart Control & Integration/)
  assert.match(livePage, /Calibration & optimisation/)
  assert.match(schema, /@type": "HowTo"/)
  assert.match(schema, /theatreServiceJsonLd/)
  assert.match(serviceRoute, /theatreServiceJsonLd/)
  assert.match(serviceRoute, /theatreInstallHowToJsonLd/)
  assert.match(serviceRoute, /faqPageJsonLd\(theatreServiceFaqs\)/)
})

test("FAQPage JSON-LD uses the same five visible accordion Q&As", () => {
  assert.equal(theatreServiceFaqs.length, 5)
  assert.match(livePage, /theatreServiceFaqs/)
  for (const faq of theatreServiceFaqs) {
    assert.ok(faq.question.length > 0)
    assert.ok(faq.answer.length > 0)
  }
})

test("theatre SERP copy is Pakistan-first and never says including Karachi", () => {
  assert.doesNotMatch(title, /including Karachi/i)
  assert.doesNotMatch(description, /including Karachi/i)
  assert.match(title, /^Home Theater Installation in Pakistan/)
  assert.match(description, /from Karachi/)
  assert.doesNotMatch(description, /Karachi HQ/)
  assert.doesNotMatch(ranking, /including Karachi/)
  assert.doesNotMatch(livePage, /including Karachi/)
})

test("homepage Theater title lock is untouched", () => {
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.doesNotMatch(homepage, /Home Theater Installation in Pakistan \| Design and Install/)
})
