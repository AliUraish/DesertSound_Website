import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { getRankingSeoPage } from "./ranking-seo-content.ts"
import { catalogServicePages } from "./seo.ts"
import { theatreServiceFaqs } from "./theatre-service-faqs.ts"
import {
  theatreInstallHowToJsonLd,
  theatreInstallHowToSteps,
  theatreServiceJsonLd,
} from "./theatre-service-schema.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const livePage = readFileSync(join(root, "app/services/home-theatre-systems/page.tsx"), "utf8")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const serviceRoute = readFileSync(
  join(root, "app/service/home-theatre-design-and-installation/page.tsx"),
  "utf8",
)

const path = "/service/home-theatre-design-and-installation"
const title = "Home Theater Installation in Pakistan | Design and Install"
const description =
  "Home theater installation across Pakistan from our Karachi HQ in DHA. We design, install, and calibrate cinema rooms — site visits in DHA, Clifton, and nationwide."

test("theatre service ranking meta matches catalog SERP strings", () => {
  const ranking = getRankingSeoPage(path)
  const catalog = catalogServicePages.find((page) => page.path === path)
  assert.equal(ranking?.title, title)
  assert.equal(ranking?.description, description)
  assert.equal(catalog?.title, title)
  assert.equal(catalog?.description, description)
})

test("theatre service HowTo and Service JSON-LD stay lockstep with visible copy", () => {
  for (const step of theatreInstallHowToSteps) {
    if (step.name !== "Plan around the room") {
      assert.match(livePage, new RegExp(step.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    }
  }
  assert.match(livePage, /We plan home theater installation in Karachi and across Pakistan around the room/)
  assert.match(livePage, /Home theater installation starts with the room/)
  assert.match(livePage, /Professional Home Cinema Design/)
  assert.match(livePage, /Immersive Audio & Visual Experience/)
  assert.match(livePage, /Smart Control & Integration/)
  assert.match(livePage, /Calibration & optimisation/)

  const howTo = theatreInstallHowToJsonLd()
  assert.equal(howTo["@type"], "HowTo")
  assert.equal(howTo.name, "Home Theater Installation")
  assert.equal(howTo.step.length, 4)

  const service = theatreServiceJsonLd()
  assert.equal(service["@type"], "Service")
  assert.equal(service.name, title)
  assert.equal(service.description, description)
  assert.deepEqual(service.areaServed, [
    { "@type": "Country", name: "Pakistan" },
    { "@type": "City", name: "Karachi" },
  ])
})

test("FAQPage JSON-LD uses the same five visible accordion Q&As", () => {
  assert.equal(theatreServiceFaqs.length, 5)
  assert.match(livePage, /theatreServiceFaqs/)
  assert.match(serviceRoute, /faqPageJsonLd\(theatreServiceFaqs\)/)
  for (const faq of theatreServiceFaqs) {
    assert.equal(typeof faq.question, "string")
    assert.equal(typeof faq.answer, "string")
    assert.ok(faq.question.length > 0)
    assert.ok(faq.answer.length > 0)
  }
})

test("theatre SERP copy is Pakistan-first and never says including Karachi", () => {
  assert.doesNotMatch(title, /including Karachi/i)
  assert.doesNotMatch(description, /including Karachi/i)
  assert.match(title, /^Home Theater Installation in Pakistan/)
  assert.match(description, /Karachi HQ in DHA/)
})

test("homepage Theater title lock is untouched", () => {
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.doesNotMatch(homepage, /Home Theater Installation in Pakistan \| Design and Install/)
})
