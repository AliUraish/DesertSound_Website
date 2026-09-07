import { NextResponse } from "next/server"
import { ensureSubmissionSchema, getDatabase } from "@/lib/database"
import { emailLayout, sendNotification } from "@/lib/notifications"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : ""
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const phone = typeof body.phone === "string" ? body.phone.trim() : ""
    const message = typeof body.message === "string" ? body.message.trim() : ""

    if (body.website) {
      return NextResponse.json({ ok: true })
    }

    if (!firstName || firstName.length > 100 || lastName.length > 100) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 })
    }
    if (!emailPattern.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }
    if (phone.length > 50) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 })
    }
    if (!message || message.length > 5000) {
      return NextResponse.json({ error: "Please enter a message under 5,000 characters." }, { status: 400 })
    }

    await ensureSubmissionSchema()
    const sql = getDatabase()
    const rows = await sql`
      INSERT INTO contact_submissions (first_name, last_name, email, phone, message)
      VALUES (${firstName}, ${lastName}, ${email}, ${phone}, ${message})
      RETURNING id
    `
    const id = String(rows[0].id)

    try {
      await sendNotification({
        subject: `New website enquiry from ${firstName}${lastName ? ` ${lastName}` : ""}`,
        replyTo: email,
        html: emailLayout("New Contact Enquiry", [
          ["Name", `${firstName}${lastName ? ` ${lastName}` : ""}`],
          ["Email", email],
          ["Phone", phone || "Not provided"],
          ["Message", message],
          ["Submission ID", id],
        ]),
      })
      await sql`UPDATE contact_submissions SET notification_status = 'sent' WHERE id = ${id}`
    } catch (error) {
      const notificationError = error instanceof Error ? error.message.slice(0, 1000) : "Unknown email error"
      await sql`
        UPDATE contact_submissions
        SET notification_status = 'failed', notification_error = ${notificationError}
        WHERE id = ${id}
      `
      console.error("Contact notification failed", { id, error: notificationError })
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error("Contact submission failed", error)
    return NextResponse.json({ error: "Your message could not be sent. Please try again." }, { status: 500 })
  }
}
