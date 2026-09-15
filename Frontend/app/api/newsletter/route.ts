import { formJson, formOptions } from "@/lib/form-cors"
import { ensureSubmissionSchema, getDatabase } from "@/lib/database"
import { emailLayout, sendNotification } from "@/lib/notifications"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function OPTIONS(request: Request) {
  return formOptions(request)
}

export async function POST(request: Request) {
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
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `

    if (rows.length === 0) {
      return formJson(request, { ok: true, alreadySubscribed: true })
    }

    const id = String(rows[0].id)

    try {
      await sendNotification({
        subject: "New Desert Sound newsletter subscriber",
        html: emailLayout("New Newsletter Subscriber", [
          ["Email", email],
          ["Submission ID", id],
        ]),
      })
      await sql`UPDATE newsletter_subscribers SET notification_status = 'sent' WHERE id = ${id}`
    } catch (error) {
      const message = error instanceof Error ? error.message.slice(0, 1000) : "Unknown email error"
      await sql`
        UPDATE newsletter_subscribers
        SET notification_status = 'failed', notification_error = ${message}
        WHERE id = ${id}
      `
      console.error("Newsletter notification failed", { id, error: message })
    }

    return formJson(request, { ok: true }, 201)
  } catch (error) {
    console.error("Newsletter submission failed", error)
    return formJson(request, { error: "Subscription could not be saved. Please try again." }, 500)
  }
}
