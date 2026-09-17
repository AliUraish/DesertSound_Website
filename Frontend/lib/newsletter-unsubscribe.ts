import { createHmac, timingSafeEqual } from "node:crypto"
import { siteUrl } from "@/lib/seo"

function unsubscribeSecret() {
  return process.env.NEWSLETTER_UNSUBSCRIBE_SECRET || process.env.RESEND_API_KEY || "desertsound-newsletter"
}

export function newsletterUnsubscribeToken(email: string) {
  return createHmac("sha256", unsubscribeSecret()).update(email.trim().toLowerCase()).digest("base64url")
}

export function isValidNewsletterUnsubscribeToken(email: string, token: string) {
  const expected = Buffer.from(newsletterUnsubscribeToken(email))
  const received = Buffer.from(token)
  return expected.length === received.length && timingSafeEqual(expected, received)
}

export function newsletterUnsubscribeUrl(email: string) {
  const home = siteUrl.replace(/\/$/, "")
  const params = new URLSearchParams({
    email,
    token: newsletterUnsubscribeToken(email),
  })
  return `${home}/unsubscribe?${params.toString()}`
}

export function newsletterUnsubscribeApiUrl(email: string) {
  const home = siteUrl.replace(/\/$/, "")
  const params = new URLSearchParams({
    email,
    token: newsletterUnsubscribeToken(email),
  })
  return `${home}/api/newsletter/unsubscribe?${params.toString()}`
}
