import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const schema = readFileSync(join(root, "lib/job-posting-schema.ts"), "utf8")
const page = readFileSync(join(root, "app/careers/[slug]/page.tsx"), "utf8")
const data = readFileSync(join(root, "lib/careers-data.ts"), "utf8")

test("JobPosting stays in markup and does not invent baseSalary", () => {
  assert.match(schema, /@type": "JobPosting"/)
  assert.match(page, /jobPostingJsonLd/)
  assert.doesNotMatch(schema, /baseSalary/)
  assert.doesNotMatch(page, /baseSalary/)
  assert.doesNotMatch(data, /baseSalary/)
})

test("JobPosting required fields stay lockstep with visible career copy", () => {
  assert.match(schema, /hiringOrganization/)
  assert.match(schema, /jobLocation/)
  assert.match(schema, /datePosted/)
  assert.match(schema, /validThrough/)
  assert.match(schema, /employmentType/)
  assert.match(schema, /identifier/)
  assert.match(schema, /applicantLocationRequirements/)
  assert.match(page, /Open until the role is filled/)
  assert.match(page, /\{position\.employmentType\}/)
  assert.match(page, /\{position\.location\}, Pakistan/)
  assert.match(data, /title: "Senior Software Engineer"/)
  assert.match(data, /location: "Karachi"/)
  assert.match(data, /employmentType: "Full-time"/)
  assert.match(data, /datePosted: "2026-09-04"/)
  assert.match(data, /validThrough: "2027-09-04"/)
})
