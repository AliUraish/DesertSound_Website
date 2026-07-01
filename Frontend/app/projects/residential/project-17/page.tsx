import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project17Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 17"
      coverImage="/Pictures%20Final/Projects/Residential/project_17/img_1.jpg"
      coverImageAlt="Project 17 main image"
      galleryImages={["/Pictures%20Final/Projects/Residential/project_17/img_2.jpg", "/Pictures%20Final/Projects/Residential/project_17/img_3.jpg"]}
      description={[
        "Project 17 highlights a private cinema room intended to feel intimate, practical, and visually resolved. The layout leans on clean composition and balanced finishes so the technology supports the space without overpowering it.",
        "For now the page uses temporary copy to match the rest of the residential library. Final descriptive text, specifications, and client-approved project notes can replace this content later with no changes to the page structure.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 17"
    />
  )
}
