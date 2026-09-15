export const WWW_ORIGIN = "https://www.desertsound.com.pk"
export const APEX_ORIGIN = "https://desertsound.com.pk"
export const FORM_ORIGINS = [WWW_ORIGIN, APEX_ORIGIN] as const

export function isFormOrigin(origin: string | null): origin is (typeof FORM_ORIGINS)[number] {
  return origin !== null && FORM_ORIGINS.includes(origin as (typeof FORM_ORIGINS)[number])
}

export function fallbackFormOrigin(origin: string) {
  if (origin === WWW_ORIGIN) return APEX_ORIGIN
  if (origin === APEX_ORIGIN) return WWW_ORIGIN
  return null
}

export function shouldBypassApexRedirect(pathname: string) {
  return pathname.startsWith("/api/") || /^\/google[^/]+\.html$/.test(pathname)
}
