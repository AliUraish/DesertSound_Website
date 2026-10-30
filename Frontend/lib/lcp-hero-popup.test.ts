import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const hero = readFileSync(join(root, "components/hero-section.tsx"), "utf8")
const smartHome = readFileSync(join(root, "app/services/smart-home-automation/page.tsx"), "utf8")
const popup = readFileSync(join(root, "components/newsletter-prompt.tsx"), "utf8")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")
const brands = readFileSync(join(root, "components/our-brands.tsx"), "utf8")

test("homepage hero first slide uses next/image priority for LCP", () => {
  assert.match(hero, /priority=\{isFirstSlide\}/)
  assert.match(hero, /fetchPriority=\{isFirstSlide \? "high" : "low"\}/)
  assert.match(hero, /loading="eager"/)
  assert.doesNotMatch(hero, /loading=\{isFirstSlide \? "eager" : "lazy"\}/)
  assert.doesNotMatch(hero, /loading="lazy"/)
  assert.match(hero, /heroSlides\[\(currentSlide \+ 1\) % heroSlides\.length\]/)
  assert.match(hero, /fetchPriority="low"/)
})

test("smart-home service hero is eager with fetchpriority high", () => {
  const marker = 'alt="Smart home automation living room"'
  const idx = smartHome.indexOf(marker)
  assert.ok(idx >= 0, "missing smart-home living room hero image")
  const snippet = smartHome.slice(Math.max(0, idx - 500), idx + 400)
  assert.match(snippet, /\bpriority\b/)
  assert.match(snippet, /fetchPriority="high"/)
  assert.doesNotMatch(snippet, /loading="lazy"/)
})

test("newsletter popup is not sticky or fixed under the header", () => {
  assert.doesNotMatch(popup, /fixed inset-x-0 top-\[5\.75rem\]/)
  assert.doesNotMatch(popup, /\bsticky\b/)
  assert.match(popup, /absolute inset-x-0 top-\[5\.75rem\]/)
  assert.match(homepage, /<main className="relative min-h-screen bg-background">/)
})

test("homepage awards use display-sized WebP with next/image", () => {
  assert.match(brands, /\/Awards\/global_2025\.webp/)
  assert.match(brands, /\/Awards\/IE_2025\.webp/)
  assert.doesNotMatch(brands, /\/Awards\/[^\n"]+\.png/)
  assert.match(brands, /alt=\{item\.name\}/)
  assert.match(brands, /<StaticLogoRow title="Awards" items=\{awards\} fitDisplayedSize \/>/)
  assert.match(brands, /\(min-width: 1024px\) 202px, \(min-width: 640px\) 172px, 142px/)
})
