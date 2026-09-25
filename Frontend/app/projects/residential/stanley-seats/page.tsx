import { ProjectCaseStudyPage, TheatreInstallLink } from "@/components/project-case-study-page"

export default function StanleySeatsPage() {
  return (
    <ProjectCaseStudyPage
      title="Stanley Seats"
      coverImage="/Pictures Final/Projects/Residential/Stanley_Seats/Cover_page.jpg"
      coverImageAlt="Stanley recliners in a Karachi private cinema with backlit wall panels and under-seat lighting"
      galleryImages={[
        "/Pictures Final/Projects/Residential/Stanley_Seats/gallery_1.jpg",
        "/Pictures Final/Projects/Residential/Stanley_Seats/gallery_2.jpg",
        "/Pictures Final/Projects/Residential/Stanley_Seats/gallery_3.jpg",
      ]}
      galleryImageAlts={[
        "Two rows of Stanley cinema recliners with backlit onyx panels and blue under-seat lighting",
        "View from Stanley recliners toward a large cinema screen in a darkened room",
        "Head-on view of Stanley recliner rows in a finished private cinema",
      ]}
      description={[
        "Stanley Seats is a residential cinema seating install in Karachi, built around Stanley recliners. It shows how dedicated seating shapes the atmosphere and usability of a private entertainment room — tailored comfort, clean detailing, and a premium presentation.",
        "The configuration balances comfort, circulation, and clear sightlines so the room stays composed and every viewer has a strong position. Console tables and recliner rows are part of the architecture, not an afterthought.",
        "Lighting, wall finishes, and concealed speakers keep the hardware quiet while the Stanley recliners do the visual work. The envelope is a cinema: controlled light, a finished screen wall, and wiring that does not show.",
        <>
          Seating is specified with the room, then picture and sound are calibrated to it. That pairing is the point of
          our <TheatreInstallLink /> process for private cinemas.
        </>,
      ]}
      breadcrumb="Home / Projects / Residential / Stanley Seats"
    />
  )
}
