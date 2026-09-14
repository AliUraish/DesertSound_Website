import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const APEX_HOST = "desertsound.com.pk"
const WWW_HOST = "www.desertsound.com.pk"
const CUTOVER_COOKIE = "ds-cutover"
const GOOGLE_VERIFICATION_FILE = /^\/google[^/]+\.html$/

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // GSC fetches the URL-prefix host as-is and rejects 3xx / redirect bodies.
  if (GOOGLE_VERIFICATION_FILE.test(pathname)) {
    return NextResponse.next()
  }

  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() || ""

  if (host === APEX_HOST) {
    const url = request.nextUrl.clone()
    url.protocol = "https:"
    url.host = WWW_HOST
    return NextResponse.redirect(url, 308)
  }

  const response = NextResponse.next()
  const accept = request.headers.get("accept") || ""
  const isDocument = request.method === "GET" && accept.includes("text/html")

  if (isDocument && !request.cookies.get(CUTOVER_COOKIE)) {
    // Drop cached WordPress HTML/assets from the old host after DNS cutover.
    response.headers.set("Clear-Site-Data", '"cache"')
    response.cookies.set(CUTOVER_COOKIE, "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    })
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|favicon.png|og.jpg|google[^/]+\\.html$).*)",
  ],
}
