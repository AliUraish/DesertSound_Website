import { NextResponse } from "next/server"
import { isFormOrigin } from "@/lib/form-origins"

export function applyFormCors(request: Request, response: NextResponse) {
  const origin = request.headers.get("origin")

  if (isFormOrigin(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin)
    response.headers.set("Vary", "Origin")
  }

  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type")
  return response
}

export function formOptions(request: Request) {
  return applyFormCors(request, new NextResponse(null, { status: 204 }))
}

export function formJson(request: Request, body: unknown, status = 200, headers?: HeadersInit) {
  return applyFormCors(request, NextResponse.json(body, { status, headers }))
}
