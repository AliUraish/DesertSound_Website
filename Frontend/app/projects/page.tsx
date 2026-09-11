import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectLibraryChooser } from "@/components/project-library-chooser"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = serviceRouteMetadata("/projects")

export default function ProjectsPage() {
  return (
    <div className="w-full overflow-x-clip bg-background">
      <Header />
      <main className="min-h-screen bg-background">
        <div className="pt-24">
          <ProjectLibraryChooser />
        </div>
      </main>
      <Footer />
    </div>
  )
}
