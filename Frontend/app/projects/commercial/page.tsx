import { Header } from "@/components/header"
import { ProjectLibrarySection } from "@/components/project-library-section"
import { projectLibraries } from "@/lib/projects-data"

export default function CommercialProjectsPage() {
  return (
    <div className="w-full overflow-x-clip">
      <main className="min-h-screen bg-background lg:h-screen lg:overflow-hidden">
        <Header />
        <div className="pt-24">
          <ProjectLibrarySection
            badge="Project Library"
            title="Commercial Projects Library"
            description="Explore featured commercial installations and AV-driven environments from the commercial category."
            projects={projectLibraries.commercial}
          />
        </div>
      </main>
    </div>
  )
}
