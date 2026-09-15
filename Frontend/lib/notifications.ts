import { Resend } from "resend"

const notificationRecipient = process.env.NOTIFICATION_TO_EMAIL ?? "info@desertsound.com.pk"
const resendEmailDomain = process.env.RESEND_EMAIL_DOMAIN
const notificationSender =
  process.env.NOTIFICATION_FROM_EMAIL ??
  (resendEmailDomain
    ? `Desert Sound Website <website@${resendEmailDomain}>`
    : "Desert Sound Website <onboarding@resend.dev>")

let resend: Resend | undefined

function getResend() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }

  resend ??= new Resend(apiKey)
  return resend
}

export type NotificationAttachment = {
  filename: string
  content: Buffer
  contentType?: string
}

type Notification = {
  subject: string
  html: string
  replyTo?: string
  attachments?: NotificationAttachment[]
}

function emailPayload({
  from,
  subject,
  html,
  replyTo,
  attachments,
}: Notification & { from: string }) {
  return {
    from,
    to: notificationRecipient,
    subject,
    html,
    replyTo,
    attachments: attachments?.map((attachment) => ({
      filename: attachment.filename.replace(/[/\\]/g, "").trim() || "resume.pdf",
      content: attachment.content,
      contentType: attachment.contentType,
    })),
  }
}

export async function sendNotification({ subject, html, replyTo, attachments }: Notification) {
  const resend = getResend()
  const { error } = await resend.emails.send(
    emailPayload({
      from: notificationSender,
      subject,
      html,
      replyTo,
      attachments,
    }),
  )

  if (!error) {
    return
  }

  const unverifiedDomain = /domain is not verified/i.test(error.message)
  const alreadyUsingResendDev = notificationSender.toLowerCase().includes("@resend.dev")

  if (unverifiedDomain && !alreadyUsingResendDev) {
    const fallback = await resend.emails.send(
      emailPayload({
        from: "Desert Sound Website <onboarding@resend.dev>",
        subject,
        html,
        replyTo,
        attachments,
      }),
    )

    if (!fallback.error) {
      return
    }

    throw new Error(fallback.error.message)
  }

  throw new Error(error.message)
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    }

    return entities[character]
  })
}

export function emailLayout(title: string, rows: Array<[string, string]>) {
  const content = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e6e2cd;font-weight:600;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e6e2cd;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("")

  return `
    <div style="background:#f5f5dc;color:#111;font-family:Arial,sans-serif;padding:28px">
      <div style="margin:0 auto;max-width:680px;background:#fff;padding:28px">
        <h1 style="font-size:24px;margin:0 0 22px">${escapeHtml(title)}</h1>
        <table style="border-collapse:collapse;width:100%;font-size:15px">${content}</table>
      </div>
    </div>`
}
