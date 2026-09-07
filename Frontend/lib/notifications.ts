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

type Notification = {
  subject: string
  html: string
  replyTo?: string
}

export async function sendNotification({ subject, html, replyTo }: Notification) {
  const { error } = await getResend().emails.send({
    from: notificationSender,
    to: notificationRecipient,
    subject,
    html,
    replyTo,
  })

  if (error) {
    throw new Error(error.message)
  }
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
