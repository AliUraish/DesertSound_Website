import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createProjectMetadata } from "@/lib/seo"

export const metadata: Metadata = createProjectMetadata("residential", "new-theatre")

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children
}
