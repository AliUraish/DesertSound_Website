import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { smartHomeServiceFaqs } from "./smart-home-service-faqs.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const networkingLive = readFileSync(join(root, "app/services/home-networking-and-wi-fi/page.tsx"), "utf8")
const networkingRoute = readFileSync(join(root, "app/service/home-networking-and-wi-fi/page.tsx"), "utf8")

const faq4Answer =
  "A strong home network is essential for responsive app control, streaming, and connected devices. We plan the network and backup around outages. During the survey, we check how your home handles load-shedding and internet drops, and plan the system around them."

test("smart-home FAQ 4 is locked outage wording without Wi-Fi or Remote access", () => {
  const faq4 = smartHomeServiceFaqs[2]
  assert.equal(faq4.question, "Does home automation require strong Wi-Fi and internet access?")
  assert.equal(faq4.answer, faq4Answer)
  assert.doesNotMatch(faq4.answer, /Wi-Fi/)
  assert.doesNotMatch(faq4.answer, /Remote access/)
  assert.doesNotMatch(networkingLive, /may pause until the internet/)
  assert.doesNotMatch(networkingRoute, /may pause until the internet/)
})
