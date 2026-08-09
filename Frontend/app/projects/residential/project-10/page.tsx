import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project10Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 10"
      coverImage="/Pictures Final/Projects/Residential/project_10/img_1.jpg"
      coverImageAlt="Project 10 main image"
      galleryImages={[
        "/Pictures Final/Projects/Residential/project_10/img_2.jpg",
        "/Pictures Final/Projects/Residential/project_10/img_3.jpg",
        "/Pictures Final/Projects/Residential/project_10/img_4.jpg",
      ]}
      description={[
        "Project 10 presents a private media room designed around soft tonal contrast, clean geometry, and a polished cinematic mood. The overall composition is meant to balance residential warmth with the focus and clarity expected from a dedicated entertainment space.",
        "The display, audio system, lighting, and seating work together as one cohesive environment, keeping operation simple while preserving the room's clean residential character.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 10"
    />
  )
}
