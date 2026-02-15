import { Header } from "@/components/header"
import { ProjectLibrarySection } from "@/components/project-library-section"
import { projectLibraries } from "@/lib/projects-data"

export default function ResidentialProjectsPage() {
  return (
    <div className="w-full overflow-x-clip">
      <main className="min-h-screen bg-background lg:h-screen lg:overflow-hidden">
        <Header projectsHref="/#projects" />
        <div className="pt-24">
          <ProjectLibrarySection
            badge="Project Library"
            title="Residential Projects Library"
            description="Discover private cinema and smart-home projects from the residential category."
            projects={projectLibraries.residential}
          />
        </div>
      </main>
    </div>
  )
}
