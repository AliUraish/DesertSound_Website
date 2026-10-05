export type TheatreServiceFaq = {
  question: string
  answer: string
}

/**
 * Visible theatre-service accordion Q&As. FAQPage JSON-LD must stay in lockstep
 * with these strings after markdown links are stripped to link labels.
 * Do not change these strings here unless the on-page accordion copy also changes.
 */
export const theatreServiceFaqs: TheatreServiceFaq[] = [
  {
    question: "What's included in home theater installation in Pakistan?",
    answer:
      "Home theater installation in Pakistan includes a projector and screen or large display, surround sound, an AV receiver or processor, seating, acoustic treatment, lighting control, system integration, and networking for streaming — designed and calibrated for the room, not a boxed retail system. See [Project Platinum, a finished private cinema](/projects/residential/project-platinum) for discreet equipment and a calibrated room.",
  },
  {
    question: "Do you offer home cinema installation in Karachi?",
    answer:
      "Yes. We plan home cinema installation in Karachi and across Pakistan around the room: design, install, and calibrate — cinema installation work, not a boxed retail system. Finished Karachi residential rooms are the local proof. Other cities get the same method on a site visit from Karachi.",
  },
  {
    question: "Can a small space or apartment be a home theater?",
    answer:
      "Yes. Home theater installation works in Karachi apartments and other compact rooms across Pakistan, not only a dedicated cinema. The room decides the design — size, layout, acoustics, lighting, and how you watch. [Residency Private Cinema, a livable media room](/projects/residential/residency) is that shared-use approach: cinematic presence without losing a welcoming layout.",
  },
  {
    question: "Can smart home control be integrated with the cinema?",
    answer:
      "Yes. With smart home automation systems like Control4, Crestron, and HDL, you can manage lighting, audio, video, curtains, and temperature with one touch or a voice command. Displays, speakers, automation, and networking are integrated so the room works together and needs fewer remotes.",
  },
  {
    question: "How does the cinema installer process fit this service?",
    answer:
      "This page is the home cinema design-and-install scope. The [cinema installer process behind those rooms](/home-cinema-and-cinema-installer-pakistan) covers design, concealment, and calibration in order. Seating can be specified with the install, as at [Studio Vellari, a flagship private cinema](/projects/residential/studio-vellari), or as [Stanley Seats, cinema seating inside a viewing room](/projects/residential/stanley-seats).",
  },
]

function faqAnswerPlainText(answer: string) {
  return answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "")
}

/** FAQPage JSON-LD answers: same copy as the accordion, markdown stripped. */
export function theatreFaqJsonLdItems(): TheatreServiceFaq[] {
  return theatreServiceFaqs.map((faq) => ({
    question: faq.question,
    answer: faqAnswerPlainText(faq.answer),
  }))
}
