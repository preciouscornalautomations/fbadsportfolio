/**
 * START HERE. Your name, links, photo and hero copy.
 * Image paths are relative to the /public folder, so "images/profile/profile.jpg"
 * means the file public/images/profile/profile.jpg.
 */
export const site = {
  name: "Precious Cornal",
  verified: true, // shows the blue tick next to your name
  role: "Meta Ads Specialist",
  handle: "@preciousmaecornal", // shown next to your role in the profile header and the sidebar

  /**
   * Visit counter shown in the profile header (phones and tablets) and the desktop sidebar.
   * Starts at 0. viewsStart is added to the live count, so you can carry over an existing
   * total later. The live count needs VITE_LEAD_ENDPOINT; without it the header shows
   * viewsStart (0) and does not count.
   */
  viewsStart: 0,
  /** Set to true to show the visit count under your name. */
  showViews: false,

  /** Optional. Leave empty to hide the email link. LinkedIn is the main contact. */
  email: "",
  linkedin: "https://www.linkedin.com/in/preciousmaecornal/",
  /** Optional. Leave empty to hide the booking link. */
  bookingUrl: "",

  /** To use a real photo, drop it at public/images/profile/profile.jpg and change this to "images/profile/profile.jpg". */
  photo: "images/profile/profile.svg",
  photoFallback: "images/profile/profile.png",

  eyebrow: "Meta Ads · Performance and creative strategy",

  hero: {
    title: "Ads that bring in leads and sales, not just likes.",
    lead: "I set up and manage Facebook and Instagram campaigns for leads and sales, and I plan the creative side too: concepts, hooks, angles and what to test next. Every decision comes from the numbers: CPL, CPA, CTR and ROAS.",
    primaryCta: "Let's talk about your ads",
    secondaryCta: "See sample work",
    flowTitle: "How one ad turns into a customer",
    flowWindowTitle: "Campaign journey",
    pills: [
      { icon: "target", label: "Targeting" },
      { icon: "image", label: "Creative testing" },
      { icon: "chart", label: "Tracking" },
    ],
  },

  about: {
    title: "The person behind the campaigns.",
    paragraphs: [
      "I'm Precious, a Meta Ads specialist from the Philippines. I manage campaigns from start to finish: setup, audiences and retargeting, budgets, Pixel and Conversions API tracking, daily checks, and a clear report with recommendations every week.",
      "I treat creative as the biggest lever in the account. I turn customer research into concepts, hooks and angles, decide which images, videos, UGC-style content, copy and offers to test, and brief or build the ads myself. When an ad starts to tire, I already have the next round ready.",
      "I care about the numbers that pay the bills: CPL, CPA, CTR and ROAS. I test one thing at a time, cut what doesn't work quickly, and put more budget behind what does.",
      "The sample campaigns on this page use fictional brands so I can show my full process without sharing any client's private data. I'm happy to walk you through how I would plan a campaign for your business on a call.",
    ],
    facts: [
      { label: "Based in", value: "Philippines (GMT+8)" },
      {
        label: "Working hours",
        value: "Flexible, with overlap for US, UK and AU clients",
      },
      {
        label: "Best fit",
        value: "Agencies, local services, clinics, coaches, online stores",
      },
      { label: "Reply time", value: "Within one business day" },
    ],
  },

  contact: {
    title: "Questions, and how to reach me.",
    sub: "Tell me what you sell, your monthly ad budget, and what results you want. I'll reply within one business day.",
    bookingLabel: "Book a 20-minute call",
    linkedinLabel: "Message me on LinkedIn",
    messageLabel: "What do you want your ads to do?",
    successMessage: "Message sent. I'll reply within one business day.",
  },
} as const;
