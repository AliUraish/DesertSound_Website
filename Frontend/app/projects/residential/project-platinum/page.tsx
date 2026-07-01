import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function ProjectPlatinumPage() {
  return (
    <ProjectCaseStudyPage
      title="Project Platinum"
      coverImage="/Pictures%20Final/Projects/Residential/Project_Platinum/Cover.png"
      coverImageAlt="Project Platinum main image"
      galleryImages={[
        "/Pictures%20Final/Projects/Residential/Project_Platinum/image.png",
        "/Pictures%20Final/Projects/Residential/Project_Platinum/image%20copy%202.png",
      ]}
      description={[
        "Project Platinum presents a residential cinema environment shaped around a premium viewing experience, clean detailing, and an elevated entertainment atmosphere.",
        "This page follows the same project format as the existing residential case studies and can be updated later with approved project copy, technical details, and final narrative text.",
      ]}
      breadcrumb="Home / Projects / Residential / Project Platinum"
    />
  )
}
