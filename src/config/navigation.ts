import { siteConfig } from "./site.config";

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; links: NavLink[] };

/** Single source of truth for public route paths. */
export const routes = {
  home: "/",
  goldDigger: "/gold-digger",
  coaching: "/coaching",
  academy: "/academy",
  masteryCourses: "/mastery-courses",
  blogs: "/blogs",
  events: "/events",
  shop: "/shop",
  collaborations: "/collaborations",
  about: "/about",
  testimonials: "/#testimonials",
  faq: "/#faq",
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
  cookies: "/cookie-policy",
  refunds: "/refund-policy",
  dataDeletion: "/data-deletion",
  login: "/login",
  register: "/register",
  /** Owned by Roddy (feat/dashboard). See docs/team/INTEGRATION_CONTRACT.md. */
  dashboard: "/dashboard",
} as const;

/** Where "Dashboard" CTAs point until the protected dashboard is merged. */
export const dashboardEntryHref = siteConfig.features.dashboardAvailable
  ? routes.dashboard
  : routes.login;

export const primaryNav: NavLink[] = [
  { label: "Gold Digger", href: routes.goldDigger },
  { label: "One on One", href: routes.coaching },
  { label: "Academy", href: routes.academy },
  { label: "Mastery Courses", href: routes.masteryCourses },
];

export const footerNav: NavGroup[] = [
  {
    title: "Education",
    links: [
      { label: "Gold Digger", href: routes.goldDigger },
      { label: "1-on-1 Coaching", href: routes.coaching },
      { label: "Academy", href: routes.academy },
      { label: "Mastery Courses", href: routes.masteryCourses },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Events", href: routes.events },
      { label: "Blogs", href: routes.blogs },
      { label: "Shop", href: routes.shop },
      { label: "Collaborations", href: routes.collaborations },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: routes.about },
      { label: "Testimonials", href: routes.testimonials },
      { label: "FAQ", href: routes.faq },
      { label: "Sign in", href: routes.login },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: routes.privacy },
      { label: "Terms of Service", href: routes.terms },
      { label: "Cookie Policy", href: routes.cookies },
      { label: "Refund Policy", href: routes.refunds },
      { label: "Data Deletion", href: routes.dataDeletion },
    ],
  },
];

/** Returns true when `href` should be marked as the current page. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
