import { formJson, formOptions } from "@/lib/form-cors"
import { ensureSubmissionSchema, getDatabase } from "@/lib/database"
import { formRateLimitRejection } from "@/lib/form-rate-limit"
import { newsletterWelcomeEmail } from "@/lib/newsletter-welcome"
import { emailLayout, sendEmail, sendNotification, syncNewsletterContact } from "@/lib/notifications"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function OPTIONS(request: Request) {
  return formOptions(request)
}

export async function POST(request: Request) {
  const limited = formRateLimitRejection(request, "newsletter")
  if (limited) return formJson(request, limited.body, limited.status, limited.headers)

  try {
    const body = (await request.json()) as { email?: unknown; website?: unknown }
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""

    if (body.website) {
      return formJson(request, { ok: true })
    }

    if (!emailPattern.test(email) || email.length > 254) {
      return formJson(request, { error: "Please enter a valid email address." }, 400)
    }

    await ensureSubmissionSchema()
    const sql = getDatabase()
    const rows = await sql`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${email})
      ON CONFLICT (email) DO UPDATE
      SET
        unsubscribed_at = NULL,
        subscribed_at = NOW()
      WHERE newsletter_subscribers.unsubscribed_at IS NOT NULL
      RETURNING id
    `

    if (rows.length === 0) {
      return formJson(request, { ok: true, alreadySubscribed: true })
    }

    const id = String(rows[0].id)
    await syncNewsletterContact(email, false)

    const errors: string[] = []
    const welcome = newsletterWelcomeEmail(email)

    try {
      await sendEmail({
        to: email,
        subject: welcome.subject,
        html: welcome.html,
        text: welcome.text,
        replyTo: welcome.replyTo,
        headers: welcome.headers,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message.slice(0, 500) : "Welcome email failed"
      errors.push(`welcome: ${message}`)
      console.error("Newsletter welcome email failed", { id, error: message })
    }

    try {
      await sendNotification({
        subject: "New Desert Sound newsletter subscriber",
        html: emailLayout("New Newsletter Subscriber", [
          ["Email", email],
          ["Submission ID", id],
          ["Welcome email", errors.some((item) => item.startsWith("welcome:")) ? "Failed" : "Sent to subscriber"],
        ]),
      })
    } catch (error) {
      const message = error instanceof Error ? error.message.slice(0, 500) : "Internal email failed"
      errors.push(`internal: ${message}`)
      console.error("Newsletter notification failed", { id, error: message })
    }

    if (errors.length > 0) {
      const notificationError = errors.join(" | ").slice(0, 1000)
      await sql`
        UPDATE newsletter_subscribers
        SET notification_status = 'failed', notification_error = ${notificationError}
        WHERE id = ${id}
      `
    } else {
      await sql`UPDATE newsletter_subscribers SET notification_status = 'sent' WHERE id = ${id}`
    }

    return formJson(request, { ok: true }, 201)
  } catch (error) {
    console.error("Newsletter submission failed", error)
    return formJson(request, { error: "Subscription could not be saved. Please try again." }, 500)
  }
}
