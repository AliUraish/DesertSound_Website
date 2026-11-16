import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const KARACHI_HREF = "/service/smart-home-automation-karachi"
const SMART_HOME_HREF = "/service/smart-home-automation"
const ONE_TOUCH_SENTENCE =
  "If you're in Karachi, see our [smart home automation in Karachi](/service/smart-home-automation-karachi) page."
const NETWORKING_SENTENCE =
  "For homes in Karachi, see our [smart home automation in Karachi](/service/smart-home-automation-karachi) page."

const oneTouchPath = join(
  root,
  "content/articles/one-touch-smart-controls-for-lighting-sound-and-cinema-screens.md",
)
const networkingPath = join(
  root,
  "content/articles/the-role-of-networking-solutions-in-a-smart-home-setup.md",
)
const oneTouch = readFileSync(oneTouchPath, "utf8")
const networking = readFileSync(networkingPath, "utf8")

function count(haystack: string, needle: string) {
  return haystack.split(needle).length - 1
}

function body(raw: string) {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/)
  assert.ok(match, "article must have JSON frontmatter")
  return match[1]
}

test("one-touch and networking posts lock the Karachi smart-home sentence once", () => {
  assert.equal(count(body(oneTouch), ONE_TOUCH_SENTENCE), 1)
  assert.equal(count(body(networking), NETWORKING_SENTENCE), 1)
  assert.equal(count(oneTouch, KARACHI_HREF), 1)
  assert.equal(count(networking, KARACHI_HREF), 1)
  assert.doesNotMatch(oneTouch, /\/service\/smart-home-automation-karachi\//)
  assert.doesNotMatch(networking, /\/service\/smart-home-automation-karachi\//)
  assert.ok(oneTouch.includes(`](${SMART_HOME_HREF})`))
  assert.ok(oneTouch.includes(`"href": "${SMART_HOME_HREF}"`))
  assert.doesNotMatch(oneTouch, /(?<![-\w])free\b/i)
  assert.doesNotMatch(networking, /(?<![-\w])free\b/i)
})
