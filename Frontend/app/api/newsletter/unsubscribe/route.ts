import { NextResponse } from "next/server"
import { formJson, formOptions } from "@/lib/form-cors"
import { unsubscribeNewsletter } from "@/lib/newsletter-list"
import { siteUrl } from "@/lib/seo"

function readUnsubscribeParams(request: Request) {
  const url = new URL(request.url)
  return {
    email: url.searchParams.get("email") ?? "",
    token: url.searchParams.get("token") ?? "",
  }
}

export function OPTIONS(request: Request) {
  return formOptions(request)
}

export async function GET(request: Request) {
  const { email, token } = readUnsubscribeParams(request)
  const next = new URL("/unsubscribe", siteUrl.replace(/\/$/, ""))
  if (email) next.searchParams.set("email", email)
  if (token) next.searchParams.set("token", token)
  return NextResponse.redirect(next, 303)
}

export async function POST(request: Request) {
  const { email, token } = readUnsubscribeParams(request)
  const result = await unsubscribeNewsletter(email, token)

  if (!result.ok) {
    return new Response("Invalid unsubscribe link", { status: 400 })
  }

  return new Response(null, { status: 200 })
}
