import { ensureSubmissionSchema, getDatabase } from "@/lib/database"
import { isValidNewsletterUnsubscribeToken } from "@/lib/newsletter-unsubscribe"
import { syncNewsletterContact } from "@/lib/notifications"

export async function unsubscribeNewsletter(email: string, token: string) {
  const normalized = email.trim().toLowerCase()

  if (!normalized || !isValidNewsletterUnsubscribeToken(normalized, token)) {
    return { ok: false as const, reason: "invalid" as const }
  }

  await ensureSubmissionSchema()
  const sql = getDatabase()
  const rows = await sql`
    UPDATE newsletter_subscribers
    SET unsubscribed_at = COALESCE(unsubscribed_at, NOW())
    WHERE email = ${normalized}
    RETURNING id, unsubscribed_at
  `

  await syncNewsletterContact(normalized, true)

  if (rows.length === 0) {
    return { ok: true as const, already: true }
  }

  return { ok: true as const, already: false }
}
