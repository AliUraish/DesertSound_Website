import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project15Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 15"
      coverImage="/Pictures%20Final/Projects/Residential/project_15/img_1.jpg"
      coverImageAlt="Project 15 main image"
      galleryImages={["/Pictures%20Final/Projects/Residential/project_15/img_2.webp", "/Pictures%20Final/Projects/Residential/project_15/img_3.jpg"]}
      description={[
        "Project 15 presents a compact residential entertainment room built around layered comfort, controlled lighting, and a refined cinema mood. The design direction aims to keep the room elegant and relaxed while supporting an immersive viewing experience.",
        "This text is temporary and can be replaced with the final approved content later. The page is already set up to support photography, project narrative, and any technical highlights that need to be added.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 15"
    />
  )
}
