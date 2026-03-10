import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project12Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 12"
      coverImage="/project_12/img_1.jpg"
      coverImageAlt="Project 12 main image"
      galleryImages={[
        "/project_12/img_2.jpg",
        "/project_12/img_3.jpg",
        "/project_12/img_4.jpg",
      ]}
      description={[
        "Project 12 is a residential cinema presentation shaped around warm contrast, controlled lighting, and a clean entertainment-focused layout. The space is intended to feel visually composed and comfortable while maintaining the sense of focus expected from a dedicated media room.",
        "The copy is placeholder text for now so the project can sit properly within the residential library. Final story content, technical details, and approved design notes can be added later without changing the page structure.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 12"
    />
  )
}
