import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  path: "/careers",
  title: "Careers",
  description:
    "Explore open roles at Desert Sound for AV installation, control systems, networking, acoustics, lighting, service, and project engineering.",
  image: "/DSC09710.JPG",
})

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children
}
