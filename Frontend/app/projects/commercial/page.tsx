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
            description="Explore commercial audiovisual and automation installations created for hospitality, fitness, and business spaces."
            projects={projectLibraries.commercial}
          />
        </div>
      </main>
    </div>
  )
}
