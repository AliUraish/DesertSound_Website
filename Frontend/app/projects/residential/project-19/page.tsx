import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project19Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 19"
      coverImage="/Pictures Final/Projects/Residential/project_19/img_1.jpg"
      coverImageAlt="Project 19 main image"
      galleryImages={["/Pictures Final/Projects/Residential/project_19/img_2.jpg", "/Pictures Final/Projects/Residential/project_19/img_3.jpg", "/Pictures Final/Projects/Residential/project_19/img_4.jpg"]}
      description={[
        "Project 19 presents a residential entertainment room built around rich finishes, relaxed seating, and a dramatic cinematic mood. The design intent is to keep the space comfortable for everyday use while giving movie nights a stronger sense of occasion.",
        "Lighting, sound, and screen placement are coordinated to create an immersive presentation while retaining the warmth and usability of a residential setting.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 19"
    />
  )
}
