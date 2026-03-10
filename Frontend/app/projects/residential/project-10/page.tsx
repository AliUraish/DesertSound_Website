import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project10Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 10"
      coverImage="/project_10/img_1.jpg"
      coverImageAlt="Project 10 main image"
      galleryImages={[
        "/project_10/img_2.jpg",
        "/project_10/img_3.jpg",
        "/project_10/img_4.jpg",
      ]}
      description={[
        "Project 10 presents a private media room designed around soft tonal contrast, clean geometry, and a polished cinematic mood. The overall composition is meant to balance residential warmth with the focus and clarity expected from a dedicated entertainment space.",
        "This text is temporary and can be replaced once the final approved project narrative is available. The page is already structured to support finished copy, photography, and any project-specific system details.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 10"
    />
  )
}
