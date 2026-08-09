import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project13Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 13"
      coverImage="/Pictures Final/Projects/Residential/project_13/img_1.jpg"
      coverImageAlt="Project 13 main image"
      galleryImages={["/Pictures Final/Projects/Residential/project_13/img_2.jpg", "/Pictures Final/Projects/Residential/project_13/img_3.jpg"]}
      description={[
        "Project 13 is a residential cinema presentation designed around clean geometry, controlled ambiance, and a calm visual hierarchy. The space is intended to feel polished and livable while still delivering the focus and comfort expected from a dedicated entertainment room.",
        "Careful placement of the screen, speakers, seating, and lighting gives the room a clear focal point while keeping everyday operation straightforward.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 13"
    />
  )
}
