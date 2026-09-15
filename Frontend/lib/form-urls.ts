const githubUsernamePattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/

export function normalizeHttpUrl(value: string, maximumLength = 500) {
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > maximumLength) return null

  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : trimmed.startsWith("//")
      ? `https:${trimmed}`
      : `https://${trimmed}`

  try {
    const url = new URL(withProtocol)
    if (!["http:", "https:"].includes(url.protocol) || url.href.length > maximumLength) {
      return null
    }
    return url.href
  } catch {
    return null
  }
}

function githubPathFromSsh(value: string) {
  const ssh = value.trim().match(/^git@github\.com:(.+?)(?:\.git)?$/i)
  if (ssh) return ssh[1]
  const sshUrl = value.trim().match(/^ssh:\/\/git@github\.com\/(.+?)(?:\.git)?$/i)
  return sshUrl ? sshUrl[1] : null
}

export function normalizeGitHubProfileUrl(value: string, maximumLength = 500) {
  const trimmed = value.trim()
  if (!trimmed) return null

  const sshPath = githubPathFromSsh(trimmed)
  if (sshPath) {
    return normalizeGitHubProfileUrl(`https://github.com/${sshPath}`, maximumLength)
  }

  if (githubUsernamePattern.test(trimmed)) {
    return `https://github.com/${trimmed}`
  }

  const href = normalizeHttpUrl(trimmed, maximumLength)
  if (!href) return null

  try {
    const url = new URL(href)
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "")
    if (hostname !== "github.com") return null

    const segments = url.pathname.replace(/\.git$/i, "").split("/").filter(Boolean)
    if (segments.length === 0) return null

    return `https://github.com/${segments.join("/")}`
  } catch {
    return null
  }
}

export function isValidHttpUrl(value: string, maximumLength = 500) {
  return normalizeHttpUrl(value, maximumLength) !== null
}

export function isValidGitHubProfileUrl(value: string, maximumLength = 500) {
  return normalizeGitHubProfileUrl(value, maximumLength) !== null
}
