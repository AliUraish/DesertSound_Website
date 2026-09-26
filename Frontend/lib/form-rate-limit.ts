export const FORM_RATE_LIMIT_SCOPES = ["contact", "newsletter", "job-applications"] as const

export type FormRateLimitScope = (typeof FORM_RATE_LIMIT_SCOPES)[number]

export type FormRateLimitConfig = {
  limit: number
  windowMs: number
}

export const FORM_RATE_LIMITS: Record<FormRateLimitScope, FormRateLimitConfig> = {
  contact: { limit: 5, windowMs: 15 * 60 * 1000 },
  newsletter: { limit: 5, windowMs: 15 * 60 * 1000 },
  "job-applications": { limit: 3, windowMs: 15 * 60 * 1000 },
}

export const FORM_RATE_LIMIT_ERROR = "Too many requests. Please try again later."

const MAX_TRACKED_KEYS = 10_000
const hitsByKey = new Map<string, number[]>()

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }

  const realIp = request.headers.get("x-real-ip")?.trim()
  if (realIp) return realIp

  return "unknown"
}

export function resetFormRateLimitStore() {
  hitsByKey.clear()
}

export function checkRateLimit(
  key: string,
  config: FormRateLimitConfig,
  now = Date.now(),
): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const windowStart = now - config.windowMs
  const recent = (hitsByKey.get(key) ?? []).filter((timestamp) => timestamp > windowStart)

  if (recent.length >= config.limit) {
    hitsByKey.set(key, recent)
    const retryAfterSeconds = Math.max(1, Math.ceil((recent[0] + config.windowMs - now) / 1000))
    return { ok: false, retryAfterSeconds }
  }

  recent.push(now)
  hitsByKey.set(key, recent)

  if (hitsByKey.size > MAX_TRACKED_KEYS) {
    const overflow = hitsByKey.size - MAX_TRACKED_KEYS
    let removed = 0
    for (const staleKey of hitsByKey.keys()) {
      hitsByKey.delete(staleKey)
      if (++removed >= overflow) break
    }
  }

  return { ok: true }
}

export function checkRequestRateLimit(
  request: Request,
  scope: FormRateLimitScope,
  now = Date.now(),
) {
  const config = FORM_RATE_LIMITS[scope]
  return checkRateLimit(`${scope}:${getClientIp(request)}`, config, now)
}

export function formRateLimitRejection(request: Request, scope: FormRateLimitScope) {
  const result = checkRequestRateLimit(request, scope)
  if (result.ok) return null

  return {
    body: { error: FORM_RATE_LIMIT_ERROR },
    status: 429 as const,
    headers: { "Retry-After": String(result.retryAfterSeconds) },
  }
}
