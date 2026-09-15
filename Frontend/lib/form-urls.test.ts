import assert from "node:assert/strict"
import test from "node:test"
import { isValidGitHubProfileUrl, normalizeGitHubProfileUrl, normalizeHttpUrl } from "./form-urls.ts"

test("github profile urls from common paste formats", () => {
  assert.equal(normalizeGitHubProfileUrl("https://github.com/octocat"), "https://github.com/octocat")
  assert.equal(normalizeGitHubProfileUrl("http://www.github.com/octocat/"), "https://github.com/octocat")
  assert.equal(normalizeGitHubProfileUrl("github.com/octocat"), "https://github.com/octocat")
  assert.equal(normalizeGitHubProfileUrl("octocat"), "https://github.com/octocat")
  assert.equal(normalizeGitHubProfileUrl("git@github.com:octocat/hello-world.git"), "https://github.com/octocat/hello-world")
})

test("github profile urls reject non-github values", () => {
  assert.equal(normalizeGitHubProfileUrl(""), null)
  assert.equal(normalizeGitHubProfileUrl("https://github.com"), null)
  assert.equal(normalizeGitHubProfileUrl("https://gitlab.com/octocat"), null)
  assert.equal(isValidGitHubProfileUrl("https://example.com/octocat"), false)
})

test("http urls gain https when the scheme is missing", () => {
  assert.equal(normalizeHttpUrl("linkedin.com/in/octocat"), "https://linkedin.com/in/octocat")
  assert.equal(normalizeHttpUrl("not a url"), null)
})
