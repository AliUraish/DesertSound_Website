import { fallbackFormOrigin } from "@/lib/form-origins"

export async function submitForm(path: string, init: RequestInit) {
  const requestInit: RequestInit = { cache: "no-store", ...init }

  try {
    return await fetch(path, requestInit)
  } catch (error) {
    if (typeof window === "undefined") {
      throw error
    }

    const fallbackOrigin = fallbackFormOrigin(window.location.origin)
    if (!fallbackOrigin) {
      throw error
    }

    return await fetch(`${fallbackOrigin}${path}`, {
      ...requestInit,
      credentials: "omit",
    })
  }
}
