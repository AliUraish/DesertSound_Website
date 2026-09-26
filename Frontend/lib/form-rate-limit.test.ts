import assert from "node:assert/strict"
import test from "node:test"
import {
  FORM_RATE_LIMITS,
  FORM_RATE_LIMIT_ERROR,
  checkRateLimit,
  checkRequestRateLimit,
  formRateLimitRejection,
  getClientIp,
  resetFormRateLimitStore,
} from "./form-rate-limit.ts"

test.beforeEach(() => {
  resetFormRateLimitStore()
})

test("reads the first forwarded IP and falls back to x-real-ip", () => {
  assert.equal(
    getClientIp(
      new Request("https://www.desertsound.com.pk/api/contact", {
        headers: {
          "x-forwarded-for": "203.0.113.10, 127.0.0.1",
          "x-real-ip": "198.51.100.2",
        },
      }),
    ),
    "203.0.113.10",
  )
  assert.equal(
    getClientIp(
      new Request("https://www.desertsound.com.pk/api/contact", {
        headers: { "x-real-ip": "198.51.100.2" },
      }),
    ),
    "198.51.100.2",
  )
  assert.equal(getClientIp(new Request("https://www.desertsound.com.pk/api/contact")), "unknown")
})

test("allows a sliding window of requests then returns Retry-After seconds", () => {
  const config = { limit: 2, windowMs: 60_000 }
  const start = 1_000_000

  assert.equal(checkRateLimit("contact:203.0.113.10", config, start).ok, true)
  assert.equal(checkRateLimit("contact:203.0.113.10", config, start + 1_000).ok, true)

  const blocked = checkRateLimit("contact:203.0.113.10", config, start + 2_000)
  assert.equal(blocked.ok, false)
  if (!blocked.ok) {
    assert.equal(blocked.retryAfterSeconds, 58)
  }

  const afterWindow = checkRateLimit("contact:203.0.113.10", config, start + 60_000)
  assert.equal(afterWindow.ok, true)
})

test("keeps contact, newsletter, and job-application buckets separate per IP", () => {
  const request = new Request("https://www.desertsound.com.pk/api/contact", {
    headers: { "x-forwarded-for": "203.0.113.10" },
  })

  for (let index = 0; index < FORM_RATE_LIMITS.contact.limit; index += 1) {
    assert.equal(checkRequestRateLimit(request, "contact").ok, true)
  }
  assert.equal(checkRequestRateLimit(request, "contact").ok, false)
  assert.equal(checkRequestRateLimit(request, "newsletter").ok, true)
  assert.equal(checkRequestRateLimit(request, "job-applications").ok, true)
})

test("does not let one IP consume another IP's budget", () => {
  const first = new Request("https://www.desertsound.com.pk/api/newsletter", {
    headers: { "x-forwarded-for": "203.0.113.10" },
  })
  const second = new Request("https://www.desertsound.com.pk/api/newsletter", {
    headers: { "x-forwarded-for": "198.51.100.2" },
  })

  for (let index = 0; index < FORM_RATE_LIMITS.newsletter.limit; index += 1) {
    assert.equal(checkRequestRateLimit(first, "newsletter").ok, true)
  }

  assert.equal(checkRequestRateLimit(first, "newsletter").ok, false)
  assert.equal(checkRequestRateLimit(second, "newsletter").ok, true)
})

test("form rejection payload is a short 429 with Retry-After", () => {
  const request = new Request("https://www.desertsound.com.pk/api/contact", {
    headers: { "x-forwarded-for": "203.0.113.10" },
  })

  for (let index = 0; index < FORM_RATE_LIMITS.contact.limit; index += 1) {
    assert.equal(formRateLimitRejection(request, "contact"), null)
  }

  const limited = formRateLimitRejection(request, "contact")
  assert.ok(limited)
  assert.equal(limited?.status, 429)
  assert.deepEqual(limited?.body, { error: FORM_RATE_LIMIT_ERROR })
  assert.match(limited?.headers["Retry-After"] ?? "", /^[1-9]\d*$/)
})
