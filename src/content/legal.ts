/**
 * DRAFT legal page outlines. These are structural placeholders written for this project —
 * NOT copied from the reference site and NOT legal advice. Every page must be replaced with
 * text reviewed by the client's legal adviser before launch (docs/OPEN_CLIENT_ITEMS.md).
 */
export type LegalDoc = {
  slug: "privacy-policy" | "terms-of-service" | "cookie-policy" | "refund-policy" | "data-deletion";
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

const pending = "Draft placeholder — wording to be supplied and approved by the client's legal adviser.";

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How personal information will be collected, used, stored and protected.",
    sections: [
      { heading: "Who we are", body: `Controller identity, registered address and contact details. ${pending}` },
      { heading: "Information we collect", body: `Account, enquiry, payment and usage data categories. ${pending}` },
      { heading: "How we use information", body: `Purposes and lawful bases (e.g. contract, consent, legitimate interests). ${pending}` },
      { heading: "Sharing and processors", body: `Categories of service providers (hosting, email, payments, analytics). ${pending}` },
      { heading: "International transfers", body: `Where data is processed and the safeguards used. ${pending}` },
      { heading: "Retention", body: `How long each category is kept. ${pending}` },
      { heading: "Your rights", body: `Access, correction, deletion, objection and complaint routes (including Ghana's Data Protection Commission where applicable). ${pending}` },
      { heading: "Contact", body: `Privacy contact channel. ${pending}` },
    ],
  },
  "terms-of-service": {
    slug: "terms-of-service",
    title: "Terms of Service",
    summary: "The rules for using the website, courses and community.",
    sections: [
      { heading: "Acceptance", body: `How these terms apply to visitors and account holders. ${pending}` },
      { heading: "Educational purpose & risk", body: `Content is education only, not financial advice; trading carries substantial risk. ${pending}` },
      { heading: "Accounts", body: `Eligibility, account security and acceptable use. ${pending}` },
      { heading: "Purchases & access", body: `Licences to course content, sharing restrictions and access duration. ${pending}` },
      { heading: "Intellectual property", body: `Ownership of course materials and brand assets. ${pending}` },
      { heading: "Liability", body: `Limitations of liability as permitted by law. ${pending}` },
      { heading: "Governing law", body: `Applicable jurisdiction. ${pending}` },
    ],
  },
  "cookie-policy": {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary: "Which cookies and similar technologies are used, and how to control them.",
    sections: [
      { heading: "What cookies are", body: `Plain-language explanation. ${pending}` },
      { heading: "Cookies we use", body: `Strictly necessary (sessions), preferences and — only with consent — analytics. No analytics are active on this preview. ${pending}` },
      { heading: "Managing cookies", body: `Consent controls and browser settings. ${pending}` },
    ],
  },
  "refund-policy": {
    slug: "refund-policy",
    title: "Refund Policy",
    summary: "When and how refunds apply to courses, coaching, events and merchandise.",
    sections: [
      { heading: "Digital courses", body: `Eligibility window and conditions. ${pending}` },
      { heading: "Coaching & mentorship", body: `Cancellation and rescheduling terms. ${pending}` },
      { heading: "Events", body: `Ticket refunds and transfers. ${pending}` },
      { heading: "Merchandise", body: `Returns, damaged items and shipping costs. ${pending}` },
      { heading: "How to request a refund", body: `Request channel and processing time. ${pending}` },
    ],
  },
  "data-deletion": {
    slug: "data-deletion",
    title: "Data Deletion Instructions",
    summary: "How to request deletion of your account and personal data.",
    sections: [
      { heading: "Deleting your account", body: `Self-service steps in the student dashboard (once available). ${pending}` },
      { heading: "Requesting deletion by message", body: `Verified request channel and identity checks. ${pending}` },
      { heading: "Third-party sign-in data", body: `How data received via social sign-in providers is removed. ${pending}` },
      { heading: "What we may retain", body: `Records kept for legal, tax or fraud-prevention obligations. ${pending}` },
    ],
  },
};
