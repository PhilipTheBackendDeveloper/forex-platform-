import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/** Pages with the global header (reference: home, blog index, articles). */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="relative overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
