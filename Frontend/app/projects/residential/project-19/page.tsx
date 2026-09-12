import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project19Page() {
  return (
    <ProjectCaseStudyPage
      title="Rich-Finish Entertainment Room"
      coverImage="/Pictures Final/Projects/Residential/project_19/img_1.jpg"
      coverImageAlt="Rich-Finish Entertainment Room main image"
      galleryImages={["/Pictures Final/Projects/Residential/project_19/img_2.jpg", "/Pictures Final/Projects/Residential/project_19/img_3.jpg", "/Pictures Final/Projects/Residential/project_19/img_4.jpg"]}
      description={[
        "This residential entertainment room is built around rich finishes, relaxed seating, and a dramatic cinematic mood. The design intent is to keep the space comfortable for everyday use while giving movie nights a stronger sense of occasion.",
        "Lighting, sound, and screen placement are coordinated to create an immersive presentation while retaining the warmth and usability of a residential setting.",
      ]}
      breadcrumb="Home / Projects / Residential / Rich-Finish Entertainment Room"
    />
  )
}
