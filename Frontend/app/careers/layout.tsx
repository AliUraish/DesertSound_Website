import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  path: "/careers",
  title: "Careers",
  description:
    "Explore the full-time Senior Software Engineer opportunity at Desert Sound in Karachi, Pakistan.",
  image: "/DSC09710.JPG",
})

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children
}
