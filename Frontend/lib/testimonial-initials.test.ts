import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { testimonialInitials } from "./testimonial-initials.ts"

const frontendRoot = join(dirname(fileURLToPath(import.meta.url)), "..")

test("testimonial initials use the first two name parts", () => {
  assert.equal(testimonialInitials("Imran Ahmed"), "IA")
  assert.equal(testimonialInitials("MA Siddiqi"), "MS")
  assert.equal(testimonialInitials("Zainab Q"), "ZQ")
  assert.equal(testimonialInitials("Sarah"), "S")
})

test("homepage title stays Theater-locked", () => {
  const src = readFileSync(join(frontendRoot, "app/page.tsx"), "utf8")
  assert.equal(
    src.includes("Home Cinema Service in Pakistan | Home Theater Installation"),
    true,
  )
  assert.equal(src.includes("Home Theatre Installation"), false)
})

test("homepage testimonials do not ship placeholder-user images", () => {
  const src = readFileSync(join(frontendRoot, "components/testimonials.tsx"), "utf8")
  assert.equal(src.includes("placeholder-user"), false)
  assert.equal(src.includes("next/image"), false)
})
