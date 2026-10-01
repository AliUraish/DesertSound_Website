import { canonicalizePath as canonicalizeCutoverPath } from "../cutover-redirects.mjs"

/** Drop a trailing slash except for `/`. */
export function stripTrailingSlash(pathname: string) {
  if (!pathname || pathname === "/") return pathname || "/"
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
}

/**
 * Final non-redirecting path: slashless, and `/services/...` → `/service/...`.
 * Hash/query are preserved for in-page links.
 */
export function canonicalizePath(pathname: string) {
  const [pathAndQuery, hash = ""] = pathname.split("#")
  const [path, query = ""] = pathAndQuery.split("?")
  const canonical = canonicalizeCutoverPath(path)
  return `${canonical}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`
}

export function isCanonicalInternalHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return true
  return canonicalizePath(href) === href
}
