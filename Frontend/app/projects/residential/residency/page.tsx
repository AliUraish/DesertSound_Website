import {
  CaseStudyLink,
  cinemaInstallerArticleHref,
  ProjectCaseStudyPage,
  TheatreInstallLink,
} from "@/components/project-case-study-page"

export default function ResidencyPage() {
  return (
    <ProjectCaseStudyPage
      title="Residency Private Cinema"
      coverImage="/Pictures Final/Projects/Residential/Red&White/Cover.JPG"
      coverImageAlt="Residency Private Cinema in Karachi — large projection screen, acoustic walls, and leather seating in a dedicated media room"
      coverImageClassName="w-full aspect-[3/2] md:aspect-auto md:h-[58vh] object-cover object-[50%_15%] lg:h-[68vh]"
      galleryImages={[
        "/Pictures Final/Projects/Residential/Red&White/IMG_9563.JPG",
        "/Pictures Final/Projects/Residential/Red&White/IMG_9699.JPG",
        "/Pictures Final/Projects/Residential/Red&White/IMG_9709.JPG",
        "/Pictures Final/Projects/Residential/Red&White/IMG_9724.JPG",
        "/Pictures Final/Projects/Residential/Red&White/IMG_9737.JPG",
      ]}
      galleryImageAlts={[
        "Acoustic wall treatment with integrated speakers in the Residency Private Cinema",
        "Ceiling-mounted projector and cove lighting in the Residency Private Cinema",
        "Film playing on the Residency Private Cinema screen in a darkened room",
        "Residency Private Cinema seating with recliners, sofa, acoustic panels, and a projector",
        "Side view of the Residency Private Cinema showing recliners, sofa, and acoustic wall finishes",
      ]}
      description={[
        "Karachi home theater / home cinema installation — finished residential room.",
        "Residency Private Cinema is a Karachi residential cinema built for immersive viewing without losing a welcoming, livable atmosphere — comfort first, with a strong cinematic presence throughout the room.",
        "Lighting, sound, and display are integrated so the space stays refined. Acoustic wall finishes and a large-format screen carry the cinema character; the technology stays discreet in the architecture.",
        "Seating is arranged as a media room people actually use: recliners and a sofa, a clean finish, and a layout that still feels residential when the film is over.",
        "The install still follows a proper cinema process — hidden wiring, acoustic control, and calibration of picture and sound. That is how we approach dedicated rooms and media rooms alike.",
      ]}
      sections={[
        {
          heading: "What this room needed",
          paragraphs: [
            "Not every Karachi brief is a sealed theatre. This one needed immersive viewing that still works as a room people sit in when the film is over — recliners and a sofa, a large-format screen, acoustic walls, and lighting, sound, and display that stay in the architecture. Comfort and presence, not a room whose only job is hiding the kit.",
          ],
        },
        {
          heading: "How the install shows up",
          paragraphs: [
            "Acoustic wall finishes and a ceiling-mounted projector carry the cinema character; cove lighting and integrated speakers keep the hardware quiet. Hidden wiring and calibration still happen — the same process as a dedicated cinema — but the envelope stays residential. That is the Residency difference from a room built only to hide a rack.",
          ],
        },
        {
          heading: "Explore more",
          paragraphs: [
            <>
              This is one finished example of{" "}
              <TheatreInstallLink>home theater installation in Karachi</TheatreInstallLink>. For
              the sequence — design the room, hide the work, calibrate — read the{" "}
              <CaseStudyLink href={cinemaInstallerArticleHref}>
                cinema installer process for a Karachi media room
              </CaseStudyLink>
              . A dedicated counterpart with concealment as the lead story is{" "}
              <CaseStudyLink href="/projects/residential/project-platinum">
                Project Platinum
              </CaseStudyLink>
              .
            </>,
          ],
        },
      ]}
      breadcrumb="Home / Projects / Residential / Residency Private Cinema"
    />
  )
}
