/**
 * Home FAQ — the buying questions, answered before they are asked.
 *
 * CONTENT INTEGRITY (CLAUDE.md): every answer here is a commitment a buyer will
 * hold us to, and several are contractual — NDAs, source-code ownership, what
 * support follows launch. These were written by Apeiroq, not inferred from the
 * rest of the site, which is the only way that is allowed to happen.
 *
 * Two of them settle questions the rest of the repo had left open, so treat
 * this file as the source of truth if anything disagrees:
 *
 *   existing-systems  we DO take on existing software — modernise, extend,
 *                     rebuild, migrate. content/process.ts still describes a
 *                     greenfield sequence (Discovery → ... → Deployment), so
 *                     that file understates what we offer and should be revised.
 *   nda               yes, as standard, before sensitive detail is discussed.
 *
 * Order is the buying order: what we do, how it starts, how long, how we
 * engage, who you talk to, then the contractual questions a buyer asks last.
 */

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: "existing-systems",
    question: "Do you only build new products, or can you improve existing systems?",
    answer:
      "Both. We work with businesses starting from an idea as well as organizations looking to modernize, extend, or rebuild existing software. Whether it's adding new features, improving performance, or migrating legacy systems, we can help.",
  },
  {
    id: "project-start",
    question: "How does a typical project start?",
    answer:
      "Every project begins with understanding your business goals. We discuss your requirements, identify technical challenges, define the project scope, recommend the right technology stack, and create a development roadmap before writing production code.",
  },
  {
    id: "project-duration",
    question: "How long does software development take?",
    answer:
      "The timeline depends on the project's complexity. Smaller applications may take a few weeks, while larger platforms can span several months. After our discovery phase, we provide a realistic delivery roadmap with milestones and regular progress updates.",
  },
  {
    id: "ongoing-development",
    question: "Can I hire your team for ongoing development?",
    answer:
      "Yes. We offer both project-based development and long-term engineering partnerships. Many clients continue working with us after launch for feature development, maintenance, performance improvements, and technical consulting.",
  },
  {
    id: "direct-developers",
    question: "Will I work directly with the developers?",
    answer:
      "Yes. Communication happens directly with the engineers working on your project. This keeps discussions technical, transparent, and efficient while reducing unnecessary communication layers.",
  },
  {
    id: "nda",
    question: "Do you sign NDAs and protect confidential information?",
    answer:
      "Absolutely. We understand the importance of intellectual property and confidential business information. We're happy to sign Non-Disclosure Agreements (NDAs) before discussing sensitive project details.",
  },
  {
    id: "after-launch",
    question: "Do you provide support after launch?",
    answer:
      "Yes. Launch is only the beginning. We provide ongoing maintenance, monitoring, bug fixes, security updates, feature enhancements, and technical support to ensure your software continues to perform as your business grows.",
  },
  {
    id: "why-apeiroq",
    question: "Why choose Apeiroq?",
    answer:
      "We combine business understanding with engineering expertise to build software that solves real operational challenges. Rather than simply delivering code, we focus on creating scalable, maintainable solutions and building long-term partnerships with our clients.",
  },
  {
    id: "specification",
    question: "Do I need a complete specification before contacting you?",
    answer:
      "Not at all. Many projects begin with just an idea or a business challenge. We help define the requirements, validate the concept, and create a technical roadmap before development begins.",
  },
  {
    id: "existing-team",
    question: "Can you join an existing development team?",
    answer:
      "Yes. We can integrate with your in-house team, collaborate with external partners, or take ownership of specific parts of your product while following your existing workflows and development practices.",
  },
  {
    id: "transparency",
    question: "How do you keep projects transparent?",
    answer:
      "We follow an agile development process with regular sprint updates, progress reviews, milestone demonstrations, and open communication. You'll always know what we're working on and what's coming next.",
  },
  {
    id: "code-ownership",
    question: "Who owns the source code?",
    answer:
      "Once the project is completed and contractual obligations are fulfilled, you own the source code, intellectual property, and project assets. We believe your software should remain fully under your control.",
  },
  {
    id: "scaling",
    question: "Can you help scale our product as we grow?",
    answer:
      "Yes. We design software with scalability in mind and can continue supporting your product as your user base, team, and business requirements evolve.",
  },
];

/** Guard against a half-written entry reaching the page. */
export const answeredFaqs = faqs.filter((faq) => faq.answer.trim() !== "");
