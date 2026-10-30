import assert from "node:assert/strict"
import { existsSync, readFileSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const contact = readFileSync(join(root, "components/contact-section.tsx"), "utf8")
const staticMap = join(root, "public/showroom-map.webp")

test("homepage contact map does not render a Google Maps iframe unconditionally", () => {
  assert.match(homepage, /<ContactSection showFaq/)
  assert.match(contact, /from "next\/image"/)
  assert.match(contact, /src="\/showroom-map\.webp"/)
  assert.match(contact, /alt="Map showing Desert Sound's showroom location in DHA Karachi"/)
  assert.match(contact, /width=\{1184\}/)
  assert.match(contact, /height=\{420\}/)
  assert.match(contact, /loading="lazy"/)
  assert.match(contact, /<button[\s\S]*Load interactive map/)
  assert.match(contact, /Open in Google Maps/)
  assert.match(contact, /target="_blank"/)
  assert.match(contact, /rel="noopener"/)
  assert.match(contact, /SHOWROOM_MAP_EMBED_SRC/)
  assert.match(contact, /google\.com\/maps\/embed/)

  assert.match(contact, /const \[mapLoaded, setMapLoaded\] = useState\(false\)/)
  assert.match(contact, /mapLoaded \? \(/)

  const iframeIndex = contact.indexOf("<iframe")
  assert.ok(iframeIndex > 0, "interactive iframe should still exist for after-click")
  const beforeIframe = contact.slice(0, iframeIndex)
  assert.match(beforeIframe, /mapLoaded \? \(/)

  // The previous always-on embed was a direct child of the rounded map frame.
  assert.doesNotMatch(
    contact,
    /overflow-hidden rounded-2xl[\s\S]{0,220}<iframe[\s\S]{0,400}google\.com\/maps/,
    "Maps iframe must not render as an unconditional child of the contact map frame",
  )

  assert.ok(existsSync(staticMap), "static map image must exist in public/")
  const size = statSync(staticMap).size
  assert.ok(size > 0, "static map image must not be empty")
  assert.ok(size < 60 * 1024, `static map image should stay under 60 KB, got ${size} bytes`)
})
