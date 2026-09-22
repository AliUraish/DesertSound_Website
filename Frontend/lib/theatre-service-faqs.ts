import type { RankingSeoFaq } from "./ranking-seo-types"

/** Single source for the theatre service accordion and FAQPage JSON-LD. */
export const theatreServiceFaqs: RankingSeoFaq[] = [
  {
    q: "What's included in home theater installation in Pakistan?",
    a: "Home theater installation in Pakistan includes a projector and screen or large display, surround sound, an AV receiver or processor, seating, acoustic treatment, lighting control, system integration, and networking for streaming — designed and calibrated for the room, not a boxed retail system.",
  },
  {
    q: "Do you visit the site before installing a home theater?",
    a: "Yes. Home theater installation in Pakistan starts with a site visit. From our DHA Karachi HQ we survey seating distance, light, power, and cable paths, then write a scope before equipment is ordered. Rooms outside Karachi follow the same visit-first process.",
  },
  {
    q: "What does design, install, and calibrate include?",
    a: "Design sets screen size, speaker layout, and hidden wiring for the room. Install covers projection or display, surround or Atmos, seating, and control. Calibration measures picture and sound so dialogue stays clear in every seat.",
  },
  {
    q: "Can I visit the Karachi showroom, and do you install across Pakistan?",
    a: "Yes. The showroom is at 22-C/II, 2nd Zamzama Commercial Lane, Phase V, DHA Karachi — for listening and planning. We install cinema rooms across Pakistan after a site visit. Karachi work covers DHA, Clifton, and Bahria-style homes; other cities use the same design, install, and calibrate process.",
  },
  {
    q: "Can I integrate smart home features with my cinema?",
    a: "Yes. We install a control system and program cinema scenes so one command dims the lights, drops the screen, and starts the source. Lighting, display, and playback are wired into that system during install.",
  },
  {
    q: "Do you provide multi-room audio solutions?",
    a: "Yes. We install audio distribution with the cinema and whole-home system so sources play in other rooms with independent volume in each. Zones, speakers, and control go in during the same install; the cinema mix stays separate when a film is on.",
  },
  {
    q: "Can a small space be customized as a home theater?",
    a: "Yes. Home theater installation works in compact Karachi apartments and other rooms across Pakistan, not only a dedicated cinema.",
  },
  {
    q: "How long does installation take?",
    a: "A compact apartment cinema can take a few days once the room is ready; a dedicated cinema with hidden wiring, seating, and treatment can take several weeks. Wiring access, construction readiness, and calibration set the pace. We confirm a schedule after the site visit.",
  },
]

export const theatreServiceFaqItems = theatreServiceFaqs.map((faq) => ({
  question: faq.q,
  answer: faq.a,
}))
