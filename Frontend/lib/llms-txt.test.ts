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
  "/service/home-cinema-installation-islamabad",
  "/service/home-cinema-installation-lahore",
  "/service/home-cinema-installation-multan",
  "/service/home-cinema-installation-faisalabad",
  "/service/home-cinema-installation-sialkot",
  "/service/home-cinema-installation-bahawalpur",
  "/service/home-cinema-installation-punjab",
  "/contact-us",
  "/about-us",
  "/blogs",
  "/home-theatre-system-cost-pakistan",
  "/projects",
  "/projects/residential",
  "/projects/commercial",
  "/projects/residential/project-platinum",
  "/projects/residential/residency",
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

  const keyProjects = llmsTxt.split("## Key projects")[1]?.split("## ")[0] ?? ""
  assert.match(
    keyProjects,
    /Project Platinum: https:\/\/www\.desertsound\.com\.pk\/projects\/residential\/project-platinum/,
  )
  assert.match(
    keyProjects,
    /Residency Private Cinema: https:\/\/www\.desertsound\.com\.pk\/projects\/residential\/residency/,
  )
})

test("agents.md is a short sibling that points at llms.txt", () => {
  assert.match(agentsMd, /https:\/\/www\.desertsound\.com\.pk\/llms\.txt/)
  assert.match(agentsMd, /https:\/\/www\.desertsound\.com\.pk/)
})
