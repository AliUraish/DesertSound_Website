import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function ProjectPlatinumPage() {
  return (
    <ProjectCaseStudyPage
      title="Project Platinum"
      coverImage="/Pictures Final/Projects/Residential/Project_Platinum/Cover.jpg"
      coverImageAlt="Project Platinum main image"
      galleryImages={[
        "/Pictures Final/Projects/Residential/Project_Platinum/image.jpg",
        "/Pictures Final/Projects/Residential/Project_Platinum/image copy 2.jpg",
      ]}
      description={[
        "Project Platinum presents a residential cinema environment shaped around a premium viewing experience, clean detailing, and an elevated entertainment atmosphere.",
        "Careful equipment placement and discreet integration preserve the room's refined character while delivering an immersive and intuitive cinema experience.",
      ]}
      breadcrumb="Home / Projects / Residential / Project Platinum"
    />
  )
}
