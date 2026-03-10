import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project21Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 21"
      coverImage="/project_21/img_1.jpg"
      coverImageAlt="Project 21 main image"
      galleryImages={["/project_21/img_2.jpg", "/project_21/img_3.jpg", "/project_21/img_4.jpg"]}
      description={[
        "Project 21 is a private cinema environment designed around tonal contrast, comfort, and a clean room layout that keeps the visual focus where it belongs. The space aims to feel composed and premium without losing its residential warmth.",
        "The page currently uses temporary descriptive text to complete the presentation. When the final approved copy is ready, it can be inserted directly into the same structure together with any project-specific details.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 21"
    />
  )
}
