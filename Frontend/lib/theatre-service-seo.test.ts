import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { theatreFaqJsonLdItems, theatreServiceFaqs } from "./theatre-service-faqs.ts"
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
  assert.match(serviceRoute, /faqPageJsonLd\(theatreFaqJsonLdItems\(\)\)/)
  assert.doesNotMatch(serviceRoute, /faqPageJsonLd\(theatreServiceFaqs\)/)
})

test("FAQPage JSON-LD uses the same five visible accordion Q&As", () => {
  assert.equal(theatreServiceFaqs.length, 5)
  assert.equal(theatreFaqJsonLdItems().length, 5)
  assert.match(livePage, /theatreServiceFaqs/)
  assert.match(livePage, /faqAnswerNodes/)
  assert.equal((serviceRoute.match(/faqPageJsonLd\(/g) || []).length, 1)
  assert.doesNotMatch(serviceRoute, /"@type": "FAQPage"/)
  for (const faq of theatreServiceFaqs) {
    assert.ok(faq.question.length > 0)
    assert.ok(faq.answer.length > 0)
  }
  const jsonLd = theatreFaqJsonLdItems()
  for (let i = 0; i < theatreServiceFaqs.length; i++) {
    assert.equal(jsonLd[i].question, theatreServiceFaqs[i].question)
    assert.equal(
      jsonLd[i].answer,
      theatreServiceFaqs[i].answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, ""),
    )
    assert.doesNotMatch(jsonLd[i].answer, /\[[^\]]+\]\([^)]+\)/)
  }
})

test("theatre FAQ copy is lean Karachi-installer with locked case links", () => {
  const faqs = theatreServiceFaqs
  const answers = faqs.map((faq) => faq.answer).join("\n")
  const questions = faqs.map((faq) => faq.question).join("\n")
  const q1 = faqs[0]
  const q2 = faqs[1]
  const q3 = faqs[2]
  const q5 = faqs[4]

  assert.equal(q1.question, "What's included in home theater installation in Pakistan?")
  assert.equal(q2.question, "Do you offer home cinema installation in Karachi?")
  assert.equal(q3.question, "Can a small space or apartment be a home theater?")
  assert.equal(faqs[3].question, "Can smart home control be integrated with the cinema?")
  assert.equal(q5.question, "How does the cinema installer process fit this service?")

  assert.match(q1.answer, /\[Project Platinum, a finished private cinema\]\(\/projects\/residential\/project-platinum\)/)
  assert.match(q2.answer, /Other cities get the same method on a site visit from Karachi\.$/)
  assert.match(q3.answer, /Karachi apartments/)
  assert.match(q3.answer, /\[Residency Private Cinema, a livable media room\]\(\/projects\/residential\/residency\)/)
  assert.match(
    q5.answer,
    /\[cinema installer process behind those rooms\]\(\/home-cinema-and-cinema-installer-pakistan\)/,
  )
  assert.match(q5.answer, /\[Studio Vellari, a flagship private cinema\]\(\/projects\/residential\/studio-vellari\)/)
  assert.match(
    q5.answer,
    /\[Stanley Seats, cinema seating inside a viewing room\]\(\/projects\/residential\/stanley-seats\)/,
  )

  for (const href of [
    "/projects/residential/project-platinum",
    "/projects/residential/residency",
    "/home-cinema-and-cinema-installer-pakistan",
    "/projects/residential/studio-vellari",
    "/projects/residential/stanley-seats",
  ]) {
    assert.equal(answers.split(href).length - 1, 1)
  }

  assert.doesNotMatch(q2.answer, /22-C/)
  assert.doesNotMatch(q2.answer, /Zamzama/)
  assert.doesNotMatch(q2.answer, /\+92/)
  assert.doesNotMatch(q2.answer, /111 570 111/)
  assert.doesNotMatch(questions + "\n" + answers, /Digital Sound/i)
  assert.doesNotMatch(questions + "\n" + answers, /\bbest\b/i)
  assert.doesNotMatch(questions + "\n" + answers, /#1/)
  assert.doesNotMatch(q1.answer, /Karachi/)
  assert.doesNotMatch(q5.answer, /Karachi/)
  assert.doesNotMatch(q1.answer, /finished Karachi cinema/)
  assert.doesNotMatch(q3.answer, /livable Karachi media room/)
  assert.doesNotMatch(q5.answer, /flagship Karachi cinema/)
})

test("theatre SERP copy is Pakistan-first from Karachi, with no HQ branding", () => {
  assert.match(title, /^Home Theater Installation in Pakistan/)
  assert.match(description, /from Karachi/)
  assert.doesNotMatch(description, /including Karachi/i)
  assert.doesNotMatch(description, /\bHQ\b/i)
  assert.doesNotMatch(title, /\bHQ\b/i)
  assert.doesNotMatch(ranking, /including Karachi/)
  assert.doesNotMatch(seo, /including Karachi/)
  assert.doesNotMatch(schema, /\bHQ\b/)
  assert.doesNotMatch(seo, /\bHQ\b/)
  assert.doesNotMatch(ranking, /\bHQ\b/)
  assert.doesNotMatch(livePage, /including Karachi/)
  assert.match(livePage, /Explore Solutions/)
  assert.match(livePage, /Get Free Consultation/)
})

test("theatre finished-rooms strip is present without remaking locked SERP title", () => {
  assert.match(livePage, /Karachi home cinema installations we&apos;ve finished/)
  assert.match(livePage, /cinema installer process/)
  assert.equal(title, "Home Theater Installation in Pakistan | Design and Install")
})

test("homepage Theater title lock is untouched", () => {
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.doesNotMatch(homepage, /Home Theater Installation in Pakistan \| Design and Install/)
})
