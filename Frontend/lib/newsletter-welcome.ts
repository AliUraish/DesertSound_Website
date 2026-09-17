import { escapeHtml } from "@/lib/notifications"
import { newsletterUnsubscribeApiUrl, newsletterUnsubscribeUrl } from "@/lib/newsletter-unsubscribe"
import { siteUrl } from "@/lib/seo"

const showroomPhone = "+92 21 111 570 111"
const showroomEmail = "info@desertsound.com.pk"
const showroomAddress = "22-C/II, 2nd Zamzama Commercial Lane, Phase V, DHA Karachi"
const headingFont = "'Playfair Display', Georgia, 'Times New Roman', serif"
const bodyFont = "Georgia, 'Times New Roman', serif"

function assetUrl(home: string, path: string) {
  return `${home}${path.split("/").map((part) => encodeURIComponent(part)).join("/")}`
}

export function newsletterWelcomeEmail(subscriberEmail: string) {
  const home = siteUrl.replace(/\/$/, "")
  const contactUrl = `${home}/contact-us`
  const logoUrl = assetUrl(home, "/0-removebg-preview.png")
  const cediaUrl = assetUrl(home, "/image-removebg-preview (1).png")
  const heroImage = assetUrl(home, "/Pictures Final/Hero Page/homepage_header/Homepage22.JPG")
  const dealsImage = assetUrl(home, "/Pictures Final/Services/Audio_Systems/image.jpg")
  const productsImage = assetUrl(home, "/Pictures Final/Services/Audio_Systems/IMG_9598-vertical.jpg")
  const unsubscribePage = newsletterUnsubscribeUrl(subscriberEmail)
  const unsubscribeApi = newsletterUnsubscribeApiUrl(subscriberEmail)
  const safeEmail = escapeHtml(subscriberEmail)

  const subject = "You're in. Welcome to Desert Sound."
  const preheader = "Welcome to Desert Sound. Exclusive deals and new products, sent first."

  const text = [
    "You're in.",
    "",
    "Desert Sound designs and installs home cinemas, hi-fi audio, and smart home systems in Karachi and across Pakistan. From the showroom on Zamzama, we specify rooms that look calm and sound exceptional.",
    "",
    "On this list we send exclusive deals and our new products, so you hear about them first.",
    "",
    "Karachi showroom",
    showroomAddress,
    "Monday to Saturday, 9:30am to 7:30pm",
    showroomPhone,
    showroomEmail,
    "",
    `Visit us: ${contactUrl}`,
    `See the work: ${home}`,
    "",
    `Unsubscribe: ${unsubscribePage}`,
  ].join("\n")

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,500&display=swap" rel="stylesheet" />
    <style type="text/css">
      a { color: inherit; }
      .cta {
        background-color: #111111 !important;
        background-image: linear-gradient(#F5F5DC, #F5F5DC);
        background-repeat: no-repeat;
        background-size: 0% 100%;
        background-position: left center;
        color: #F5F5DC !important;
        border: 1px solid #111111;
        box-sizing: border-box;
        transition: background-size 0.6s cubic-bezier(0.22, 1, 0.36, 1), color 0.35s ease, letter-spacing 0.45s ease;
      }
      .cta:hover,
      .cta:hover .label,
      .cta:hover .arrow {
        color: #111111 !important;
      }
      .cta:hover {
        background-size: 100% 100%;
        letter-spacing: 0.22em;
      }
      .cta .arrow {
        display: inline-block;
        transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .cta:hover .arrow {
        transform: translateX(8px);
      }
      .ghost {
        background-color: transparent !important;
        background-image: linear-gradient(#F5F5DC, #F5F5DC);
        background-repeat: no-repeat;
        background-size: 0% 100%;
        background-position: left center;
        transition: background-size 0.55s cubic-bezier(0.22, 1, 0.36, 1), color 0.35s ease, border-color 0.35s ease, letter-spacing 0.4s ease;
      }
      .ghost:hover {
        background-size: 100% 100%;
        border-color: #F5F5DC !important;
        letter-spacing: 0.22em;
      }
      .ghost:hover,
      .ghost:hover .label {
        color: #111111 !important;
      }
      .quiet {
        transition: opacity 0.35s ease, letter-spacing 0.35s ease, border-color 0.35s ease;
      }
      .quiet:hover {
        opacity: 1 !important;
        letter-spacing: 0.06em;
        border-bottom-color: #111111 !important;
      }
      .phone:hover, .mail:hover {
        opacity: 1 !important;
        letter-spacing: 0.02em;
      }
      html, body {
        background-color: #F5F5DC !important;
      }
      @media only screen and (max-width: 620px) {
        .stack { display: block !important; width: 100% !important; }
        .stack-pad { padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 18px !important; }
        .stagger { padding-top: 0 !important; }
        .product-shot { width: 180px !important; height: auto !important; margin: 0 auto !important; }
        .product-cell { padding-right: 0 !important; padding-bottom: 16px !important; text-align: center !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#F5F5DC;" bgcolor="#F5F5DC">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#F5F5DC" style="background:#F5F5DC;margin:0;padding:0;">
      <tr>
        <td align="center" bgcolor="#F5F5DC" style="padding:24px 12px 32px;background:#F5F5DC;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border-collapse:collapse;">
            <tr>
              <td style="background:#F5F5DC;padding:20px 32px 18px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="middle" width="58%">
                      <img src="${escapeHtml(logoUrl)}" alt="Desert Sound" width="138" style="display:block;width:138px;max-width:72%;height:auto;border:0;" />
                    </td>
                    <td valign="middle" align="right" width="42%">
                      <img src="${escapeHtml(cediaUrl)}" alt="CEDIA Member" width="86" style="display:block;margin-left:auto;width:86px;max-width:42%;height:auto;border:0;" />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0;font-size:0;line-height:0;">
                <img src="${escapeHtml(heroImage)}" alt="Desert Sound cinema lounge" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="background:#111111;padding:14px 32px 16px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.38em;text-transform:uppercase;color:#F5F5DC;opacity:0.55;">
                  Private list &nbsp;·&nbsp; Karachi
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#F5F5DC;padding:42px 32px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="top" style="padding-right:16px;width:2px;">
                      <div style="width:1px;height:86px;background:#111111;opacity:0.35;"></div>
                    </td>
                    <td valign="top">
                      <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.34em;text-transform:uppercase;color:#111111;opacity:0.38;">
                        Confirmed
                      </p>
                      <h1 style="margin:0;font-family:${headingFont};font-size:52px;line-height:0.92;font-weight:500;font-style:italic;color:#111111;">
                        You're in.
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#F5F5DC;padding:20px 32px 8px;">
                <p style="margin:0;font-family:${headingFont};font-size:22px;line-height:1.35;font-weight:500;font-style:italic;color:#111111;">
                  Rooms that look calm and sound exceptional.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#F5F5DC;padding:14px 32px 36px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.8;color:#3a3a3a;">
                Desert Sound designs and installs home cinemas, hi-fi audio, and smart home systems in Karachi and across Pakistan. From Zamzama, this list is how we reach you first.
              </td>
            </tr>
            <tr>
              <td style="background:#F5F5DC;padding:0 32px 12px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:0 0 18px;">
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#111111;opacity:0.35;">
                        What we send
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#F5F5DC;padding:0 32px 22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:0;font-size:0;line-height:0;">
                      <img src="${escapeHtml(dealsImage)}" alt="Floor-standing speakers" width="536" style="display:block;width:100%;height:auto;border:0;" />
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#111111;padding:20px 22px 22px;">
                      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#F5F5DC;opacity:0.42;">01 — List</p>
                      <p style="margin:0 0 8px;font-family:${headingFont};font-size:22px;line-height:1.15;font-weight:500;color:#F5F5DC;">Exclusive deals</p>
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.65;color:#F5F5DC;opacity:0.7;">Private pricing on rooms, seating, and systems. This list hears first.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#F5F5DC;padding:0 32px 10px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td class="stack product-cell" width="38%" valign="middle" style="padding-right:18px;">
                      <img class="product-shot" src="${escapeHtml(productsImage)}" alt="Focal speaker" width="180" style="display:block;width:100%;max-width:180px;height:auto;border:0;" />
                    </td>
                    <td class="stack" width="62%" valign="middle" style="background:#111111;padding:28px 22px;">
                      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#F5F5DC;opacity:0.42;">02 — Floor</p>
                      <p style="margin:0 0 8px;font-family:${headingFont};font-size:22px;line-height:1.15;font-weight:500;color:#F5F5DC;">New products</p>
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.65;color:#F5F5DC;opacity:0.7;">Arrivals from the showroom: audio, video, and automation.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#F5F5DC;padding:28px 32px 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#3a3a3a;">
                Hear a system before you choose one. The showroom is open Monday to Saturday.
              </td>
            </tr>
            <tr>
              <td style="background:#F5F5DC;padding:0 32px 12px;">
                <a class="cta" href="${escapeHtml(contactUrl)}" style="display:block;background-color:#111111;color:#F5F5DC;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;text-align:center;padding:20px 28px;border:1px solid #111111;">
                  <span class="label">Visit the showroom</span> <span class="arrow">→</span>
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="background:#F5F5DC;padding:6px 32px 40px;">
                <a class="quiet" href="${escapeHtml(home)}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.04em;color:#111111;text-decoration:none;opacity:0.5;border-bottom:1px solid rgba(17,17,17,0.22);padding-bottom:3px;">
                  See recent rooms
                </a>
              </td>
            </tr>
            <tr>
              <td style="background:#111111;padding:36px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="stack stack-pad" width="46%" valign="top" style="padding-right:18px;">
                      <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#F5F5DC;opacity:0.38;">Zamzama · DHA</p>
                      <p style="margin:0;font-family:${headingFont};font-size:30px;line-height:1.12;font-weight:500;font-style:italic;color:#F5F5DC;">Karachi showroom</p>
                    </td>
                    <td class="stack" width="54%" valign="top" style="font-family:${bodyFont};font-size:15px;line-height:1.75;color:#F5F5DC;">
                      ${escapeHtml(showroomAddress)}<br />
                      Monday to Saturday, 9:30am – 7:30pm<br />
                      <a class="phone" href="tel:+9221111570111" style="color:#F5F5DC;text-decoration:none;opacity:0.78;">${escapeHtml(showroomPhone)}</a><br />
                      <a class="mail" href="mailto:${escapeHtml(showroomEmail)}" style="color:#F5F5DC;text-decoration:none;opacity:0.78;">${escapeHtml(showroomEmail)}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="background:#111111;padding:28px 32px 16px;">
                <a class="ghost" href="${escapeHtml(unsubscribePage)}" style="display:inline-block;border:1px solid rgba(245,245,220,0.32);color:#F5F5DC;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:13px 26px;">
                  <span class="label">Unsubscribe</span>
                </a>
              </td>
            </tr>
            <tr>
              <td style="background:#111111;padding:0 32px 32px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.04em;color:#F5F5DC;opacity:0.34;text-align:center;">
                ${safeEmail}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  return {
    subject,
    html,
    text,
    replyTo: showroomEmail,
    headers: {
      "List-Unsubscribe": `<${unsubscribeApi}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  }
}
