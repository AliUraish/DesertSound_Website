import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { cutoverRedirects, withTrailingSlashRedirects } from "../cutover-redirects.mjs"
import { canonicalizePath, isCanonicalInternalHref, stripTrailingSlash } from "./canonical-path.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const nextConfig = readFileSync(join(root, "next.config.mjs"), "utf8")
const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const homepage = readFileSync(join(root, "app/page.tsx"), "utf8")

test("GSC leftover /services/ path remaps to live /service/ URL", () => {
  assert.equal(
    canonicalizePath("/services/smart-home-automation"),
    "/service/smart-home-automation",
  )
  assert.equal(
    canonicalizePath("/services/smart-home-automation/"),
    "/service/smart-home-automation",
  )
})

test("GSC leftover trailing-slash blog URLs collapse to slashless canonicals", () => {
  assert.equal(
    canonicalizePath("/how-to-optimize-your-room-for-the-best-home-cinema-experience/"),
    "/how-to-optimize-your-room-for-the-best-home-cinema-experience",
  )
  assert.equal(
    canonicalizePath("/affordable-home-theatre-installation-ideas/"),
    "/affordable-home-theatre-installation-ideas",
  )
  assert.equal(
    canonicalizePath("/affordable-home-theatre-installation-ideas"),
    "/affordable-home-theatre-installation-ideas",
  )
})

test("canonical helpers keep homepage and hashes intact", () => {
  assert.equal(stripTrailingSlash("/"), "/")
  assert.equal(canonicalizePath("/"), "/")
  assert.equal(canonicalizePath("/#services"), "/#services")
  assert.equal(canonicalizePath("/contact-us/"), "/contact-us")
  assert.equal(isCanonicalInternalHref("/service/smart-home-automation"), true)
  assert.equal(isCanonicalInternalHref("/services/smart-home-automation"), false)
  assert.equal(isCanonicalInternalHref("/contact-us/"), false)
})

test("redirect table owns /services/ leftovers and slash catch-all", () => {
  const rules = withTrailingSlashRedirects(cutoverRedirects)
  assert.ok(
    rules.some(
      (rule) =>
        rule.source === "/services/smart-home-automation" &&
        rule.destination === "/service/smart-home-automation" &&
        rule.permanent === true,
    ),
  )
  assert.ok(
    rules.some(
      (rule) =>
        rule.source === "/services/smart-home-automation/" &&
        rule.destination === "/service/smart-home-automation" &&
        rule.permanent === true,
    ),
  )
  assert.ok(rules.some((rule) => rule.source === "/:path+/" && rule.destination === "/:path+"))
  assert.match(nextConfig, /trailingSlash:\s*false/)
  assert.match(nextConfig, /skipTrailingSlashRedirect:\s*true/)
  assert.match(sitemap, /canonicalizePath/)
})

test("homepage Theater title lock is untouched", () => {
  assert.match(homepage, /Home Cinema Service in Pakistan \| Home Theater Installation/)
  assert.doesNotMatch(homepage, /Home Theater Installation in Pakistan \| Design and Install/)
})
