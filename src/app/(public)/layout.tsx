import { HelpLauncher } from "@/components/layout/help-launcher";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="relative overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
      <HelpLauncher />
    </>
  );
}
