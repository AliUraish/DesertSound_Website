import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const llmsTxt = readFileSync(join(root, "public/llms.txt"), "utf8")
const agentsMd = readFileSync(join(root, "public/agents.md"), "utf8")

const requiredPaths = [
  "/",
  "/service/home-theatre-design-and-installation",
  "/contact-us",
  "/about-us",
  "/blogs",
  "/projects",
  "/projects/residential",
  "/projects/commercial",
  "/projects/residential/studio-vellari",
  "/projects/commercial/xanders",
]

test("llms.txt is plain text with canonical URL, locked NAP, and existing paths", () => {
  assert.match(llmsTxt, /Desert Sound/)
  assert.match(llmsTxt, /https:\/\/www\.desertsound\.com\.pk/)
  assert.match(llmsTxt, /\+92 21 111 570 111/)
  assert.match(llmsTxt, /22-C\/II, 2nd Zamzama Commercial Lane, Phase V, D\.H\.A/)
  assert.match(llmsTxt, /Karachi/)
  assert.match(llmsTxt, /Sindh/)

  for (const path of requiredPaths) {
    const url = path === "/" ? "https://www.desertsound.com.pk/" : `https://www.desertsound.com.pk${path}`
    assert.match(llmsTxt, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  }
})

test("agents.md is a short sibling that points at llms.txt", () => {
  assert.match(agentsMd, /https:\/\/www\.desertsound\.com\.pk\/llms\.txt/)
  assert.match(agentsMd, /https:\/\/www\.desertsound\.com\.pk/)
})
