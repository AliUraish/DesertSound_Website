import assert from "node:assert/strict"
import test from "node:test"
import { APEX_ORIGIN, WWW_ORIGIN, fallbackFormOrigin, isFormOrigin, shouldBypassApexRedirect } from "./form-origins.ts"

test("form origins include both production hosts", () => {
  assert.equal(isFormOrigin(WWW_ORIGIN), true)
  assert.equal(isFormOrigin(APEX_ORIGIN), true)
  assert.equal(isFormOrigin("https://evil.example"), false)
  assert.equal(isFormOrigin(null), false)
})

test("fallback origin swaps www and apex", () => {
  assert.equal(fallbackFormOrigin(WWW_ORIGIN), APEX_ORIGIN)
  assert.equal(fallbackFormOrigin(APEX_ORIGIN), WWW_ORIGIN)
  assert.equal(fallbackFormOrigin("http://localhost:3000"), null)
})

test("API posts skip the apex to www redirect", () => {
  assert.equal(shouldBypassApexRedirect("/api/contact"), true)
  assert.equal(shouldBypassApexRedirect("/api/newsletter"), true)
  assert.equal(shouldBypassApexRedirect("/api/job-applications"), true)
  assert.equal(shouldBypassApexRedirect("/contact-us"), false)
})
