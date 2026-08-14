import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function StanleySeatsPage() {
  return (
    <ProjectCaseStudyPage
      title="Stanley Seats"
      coverImage="/Pictures Final/Projects/Residential/Stanley_Seats/Cover_page.jpg"
      coverImageAlt="Stanley Seats cover image"
      galleryImages={[
        "/Pictures Final/Projects/Residential/Stanley_Seats/gallery_1.jpg",
        "/Pictures Final/Projects/Residential/Stanley_Seats/gallery_2.jpg",
        "/Pictures Final/Projects/Residential/Stanley_Seats/gallery_3.jpg",
      ]}
      description={[
        "Stanley Seats is a residential cinema seating showcase centered on tailored comfort, clean detailing, and a premium visual presentation. The project is intended to highlight how dedicated recliner systems can shape the atmosphere and usability of a private entertainment room.",
        "The seating configuration balances comfort, circulation, and clear sightlines, helping the room feel composed while giving every viewer a strong position.",
      ]}
      breadcrumb="Home / Projects / Residential / Stanley Seats"
    />
  )
}
