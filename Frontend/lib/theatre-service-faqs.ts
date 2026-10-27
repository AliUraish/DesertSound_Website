export type TheatreServiceFaq = {
  question: string
  answer: string
}

/**
 * Visible theatre-service accordion Q&As. FAQPage JSON-LD must stay in lockstep.
 * Do not change these strings here unless the on-page accordion copy also changes.
 */
export const theatreServiceFaqs: TheatreServiceFaq[] = [
  {
    question: "What's included in home theater installation in Pakistan?",
    answer:
      "Home theater installation in Pakistan includes a projector and screen or large display, surround sound, an AV receiver or processor, seating, acoustic treatment, lighting control, system integration, and networking for streaming — designed and calibrated for the room, not a boxed retail system.",
  },
  // TODO cost-post link after Desk clear
  {
    question: "How much does a home theatre cost in Pakistan?",
    answer:
      "It depends on the room and what you want from it. Room size, the screen or projector, the number of speakers, acoustic treatment, seating, wiring and lighting control all change the total, and a finished room usually needs more wiring work than a new build. We quote after a site survey of your room.",
  },
  {
    question: "Should I build a dedicated cinema room or a living-room system?",
    answer:
      "A dedicated room gives full light control, more acoustic treatment and seats placed around the screen. A living-room system shares the space with daily life, so it relies on curtains, in-wall or in-ceiling speakers and hidden equipment. Either can work in an apartment or a house, including compact rooms. We recommend one after seeing the room.",
  },
  {
    question: "Can you install a home theatre in a house that is already finished?",
    answer:
      "Yes. In a finished room we use surface trunking painted to match, routes above an existing false ceiling, or concealed channels where the walls allow. In a new build, conduit and back boxes go in before plastering and the false ceiling, so no cable shows. The site survey decides which route suits your home.",
  },
  {
    question: "Can one remote dim the lights and close the curtains for a film?",
    answer:
      "Yes. We programme a movie scene so one press dims the lights, closes the curtains, lowers the screen and starts the projector and sound. The scene can sit on a remote or a wall keypad. Lighting circuits and curtain motors are wired as part of the theatre, so we plan them at the site survey.",
  },
  {
    question: "Do you provide multi-room audio solutions?",
    answer:
      "Yes. We distribute audio to multiple rooms and outdoor spaces with central control, so music can play in sync from the living room to the bedrooms and the garden.",
  },
]
