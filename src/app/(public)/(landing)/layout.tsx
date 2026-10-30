import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Standalone landing pages. Each page renders its own `PageHeader` through `LandingShell`
 * (reference: coaching, academy, courses, events, shop, collaborations and legal pages each
 * have a page-specific sub-header instead of the global navigation).
 */
export default function LandingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] h-200 w-200 rounded-full bg-primary/[0.06] blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-10%] h-150 w-150 rounded-full bg-primary/[0.05] blur-[120px]" />
        <div className="bg-noise absolute inset-0 opacity-[0.015] mix-blend-overlay" />
      </div>
      {children}
      <SiteFooter />
    </>
  );
}
