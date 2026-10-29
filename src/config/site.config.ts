/**
 * Central, reviewable site configuration.
 *
 * Every value marked `PLACEHOLDER` is NOT client-approved. Track each one in
 * docs/OPEN_CLIENT_ITEMS.md and replace it here only — components read from this file.
 * `null` links render as clearly disabled controls with an explanation (never href="#").
 */
export const siteConfig = {
  /** PLACEHOLDER — real business name not yet supplied. */
  name: "Your Brand",
  /** PLACEHOLDER — wordmark shown in header/footer until a logo file is supplied. */
  wordmark: "YOURBRAND",
  /** PLACEHOLDER — mentor/educator display name. */
  mentorName: "Your Mentor",
  tagline: "Forex education built on discipline, risk management and patience.",
  description:
    "A focused forex education platform: structured courses, an academy, private coaching and a learning community. Education only — trading involves significant risk.",
  /** PLACEHOLDER — production domain not supplied. Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",

  contact: {
    /** PLACEHOLDER — no business email supplied. */
    email: null as string | null,
    location: null as string | null,
  },

  /** PLACEHOLDER — community / social URLs not supplied. */
  social: {
    telegram: null as string | null,
    instagram: null as string | null,
    youtube: null as string | null,
    x: null as string | null,
    facebook: null as string | null,
  },

  /**
   * Feature visibility. Keep unfinished capabilities explicit so pages render honest
   * "not yet connected" states instead of faking success.
   */
  features: {
    /** Roddy's dashboard route exists on `feat/dashboard`; until merged, CTAs go to /login. */
    dashboardAvailable: false,
    authConnected: false,
    paymentsConnected: false,
    formDeliveryConnected: false,
    assistantConnected: false,
    /** Show "Placeholder" pills beside unapproved content. Turn off only after sign-off. */
    showPlaceholderBadges: true,
    /** Only index the site once the client approves a production environment. */
    allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  },

  legal: {
    lastReviewed: null as string | null,
    riskDisclaimer:
      "Trading foreign exchange and other leveraged products carries a high level of risk and may not be suitable for all investors. You could lose some or all of your capital. Content on this website is for education only and is not financial advice. Past performance does not guarantee future results.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
