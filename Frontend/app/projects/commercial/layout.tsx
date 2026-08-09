import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  path: "/projects/commercial",
  title: "Commercial AV Projects",
  description:
    "View Desert Sound commercial AV, audio, control, and hospitality technology projects for restaurants, gyms, and workspaces in Pakistan.",
  image: "/Pictures Final/Projects/Commercial/Cafe Flow/Cover.JPG",
})

export default function CommercialProjectsLayout({ children }: { children: ReactNode }) {
  return children
}
