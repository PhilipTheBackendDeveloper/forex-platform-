import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MarketTicker } from "@/features/market/components/market-ticker";

/** Pages with the global header (reference: home, blog index, articles) + market ticker strip. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader
        ticker={
          <Suspense fallback={null}>
            <MarketTicker />
          </Suspense>
        }
      />
      <main id="main" className="relative overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
