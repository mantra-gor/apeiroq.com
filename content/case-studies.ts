/**
 * Case studies — the work cards in the Home rail (DESIGN.md §2 #2, #6), the
 * index behind /case-studies, and the source for each /case-studies/[slug].
 *
 * There is no separate "projects" list. Everything we publish about our work is
 * a case study: a named problem, the product we built against it, and what
 * changed. A screenshot with a title and no problem is a portfolio tile, and a
 * portfolio of four tiles reads as thin (DESIGN.md §11) — the problem → product
 * → outcome structure is what makes a small body of work read as depth.
 *
 * CONTENT INTEGRITY — read before editing (CLAUDE.md):
 * Real work only. No placeholder companies, no stock screenshots, no invented
 * outcomes. Every section that reads this file renders nothing while it is
 * empty, and /case-studies/[slug] 404s. Add real entries and they appear.
 *
 * Framing (DESIGN.md §1, §11): say "prototype" when it is one. "Built as a
 * product thesis, then customised and shipped for X" is a stronger claim than
 * pretending to a portfolio we do not have — it reads as independent product
 * thinking, which is rarer than contract delivery.
 *
 * TODO: awaiting the three to four real entries. Each needs:
 *   title · one-line summary · slug · screenshot (real product UI, not a mock)
 *   · the problem in the client's own terms · how the product solves it
 *   · the stack · optional outcome stat, only where the client permits
 *     publishing it
 *
 * `outcome` is the DESIGN.md §5 stat pattern: it reports the client's result,
 * never a company-level vanity counter, and never ships unsourced.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  /** One line, sits on the image. What the product is. */
  summary: string;
  /** Path under /public. Real screenshot, fixed aspect ratio. */
  image: string;
  imageAlt: string;
  /**
   * The situation before we built anything, stated concretely — the cost,
   * the manual step, the thing that broke at scale. No generic pain points.
   */
  problem: string;
  /**
   * How the product removes that problem. Mechanism, not adjectives: what it
   * does, and why that answers the paragraph above.
   */
  solution: string;
  /** What we actually built, in order. Screens over prose — keep each short. */
  build?: string[];
  /** Technologies used. Names only; the reader can infer the rest. */
  stack?: string[];
  /** Optional, publishable client result. Omit rather than approximate. */
  outcome?: {
    stat: string;
    label: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "hotel-management-solution",
    title: "Multi-property hotel management, built end-to-end.",
    summary:
      "A complete hospitality platform: online booking engine, centralised multi-property dashboard, and integrated payment processing — all managed from one interface, across countries.",
    image: "/case-studies/hotel-management-solution.jpg",
    imageAlt:
      "Admin dashboard showing booking statistics, a property calendar, and a recent bookings table across multiple hotel properties.",
    problem:
      "The client operated hotels across multiple countries, each running its own patchwork of spreadsheets, phone reservations, and disconnected payment tools. A guest booking at one property had no visibility into the others. Revenue reporting required staff to manually reconcile data from each site — a process that took days and still produced gaps. There was no online booking channel at all.",
    solution:
      "We built a single web platform — that hosts every property in one account. Guests book online through a property-specific booking page; payments are captured and recorded there too. The owner switches between properties from the same sidebar, and the dashboard aggregates occupancy, revenue, and bookings across all of them in real time. No spreadsheets, no manual reconciliation, no separate logins.",
    build: [
      "Multi-tenant data model: each hotel is a separate property under one owner account, with role-based staff access per property.",
      "Guest-facing booking engine with real-time room availability, date selection, and a secure checkout flow.",
      "Stripe-integrated payment processing: charges, refunds, and payout tracking handled server-side.",
      "Centralised owner dashboard: occupancy, revenue, and booking statistics aggregated live across all properties.",
      "Booking calendar per property — color-coded by room, with drag-to-reschedule for front-desk staff.",
      "Guest profiles and stay history, linked across properties within the same account.",
      "Admin panel for room types, seasonal pricing rules, and property settings — built on Filament (Laravel).",
    ],
    stack: [
      "Laravel",
      "Filament",
      "MySQL",
      "Alpine.js",
      "Livewire",
      "Stripe",
      "Tailwind CSS",
    ],
  },
  {
    slug: "studynotion-lms",
    title: "A learning platform where any instructor can ship a course.",
    summary:
      "A full-featured LMS: instructors create and publish structured courses; students enrol, pay, and learn — all on one platform with no third-party course host required.",
    image: "/case-studies/studynotion-lms.jpg",
    imageAlt:
      "StudyNotion platform showing the course catalog homepage with category filters, course cards, instructor avatars, and ratings.",
    problem:
      "Instructors in technical and creative fields had no straightforward way to package knowledge as a product. Existing platforms either took a large revenue cut, locked content behind opaque algorithms, or required the instructor to bolt together five separate tools — a video host, a payment processor, a quiz builder, an email list, and a landing page — just to sell one course. Building on someone else's marketplace also meant no ownership of the student relationship.",
    solution:
      "StudyNotion is a self-contained LMS where instructors own their content and their students. They create a course — sections, video lectures, reading materials, and quizzes — inside a purpose-built editor. Students browse the catalog, enrol via Razorpay, and track progress through a learner dashboard. Instructors see enrolment numbers, ratings, and revenue from their own analytics view. The platform sits between the two without taking the relationship.",
    build: [
      "Instructor course builder: structured sections, video lectures (Cloudinary-hosted), rich-text notes, and multiple-choice quizzes per section.",
      "Student-facing catalog with category filters, ratings, enrolment counts, and a course preview before purchase.",
      "Razorpay-integrated checkout: purchase recorded server-side, access unlocked immediately on success.",
      "Progress tracking per student: completion state stored per lecture, resume-from-last-position on re-entry.",
      "Instructor analytics dashboard: total enrolments, course ratings, and revenue over time.",
      "OTP-verified email auth with JWT sessions; separate role flows for student, instructor, and admin.",
      "Admin review queue: new courses held for approval before appearing in the public catalog.",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Razorpay",
      "Cloudinary",
      "Redux Toolkit",
      "JWT",
      "Tailwind CSS",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
