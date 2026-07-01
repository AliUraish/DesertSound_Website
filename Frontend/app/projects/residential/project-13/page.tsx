import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project13Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 13"
      coverImage="/Pictures%20Final/Projects/Residential/project_13/img_1.jpg"
      coverImageAlt="Project 13 main image"
      galleryImages={["/Pictures%20Final/Projects/Residential/project_13/img_2.jpg", "/Pictures%20Final/Projects/Residential/project_13/img_3.jpg"]}
      description={[
        "Project 13 is a residential cinema presentation designed around clean geometry, controlled ambiance, and a calm visual hierarchy. The space is intended to feel polished and livable while still delivering the focus and comfort expected from a dedicated entertainment room.",
        "The text here is placeholder copy for now so the page can be published with the rest of the project library. Final narrative content, technical details, and project-specific notes can be added later without changing the page structure.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 13"
    />
  )
}
