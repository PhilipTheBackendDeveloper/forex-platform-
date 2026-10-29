import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { Wordmark } from "./wordmark";

// Cache Components forbids reading the clock during prerender; cache the year instead.
async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getCopyrightYear();
  return (
    <footer className="relative border-t border-border bg-background-deep">
      <h2 className="sr-only">Footer</h2>
      <div className="container-site grid gap-14 py-20 lg:grid-cols-[1.3fr_2fr] lg:py-24">
        <div className="flex flex-col gap-5">
          <Wordmark />
          <p className="max-w-sm text-[15px] leading-relaxed text-foreground/55">{siteConfig.tagline}</p>
          <p className="text-sm text-muted">
            {siteConfig.contact.email ? (
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground">
                {siteConfig.contact.email}
              </a>
            ) : (
              "Contact details pending client confirmation."
            )}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-[12px] font-semibold tracking-[0.18em] text-foreground/45 uppercase">{group.title}</h3>
              <ul className="mt-5 flex flex-col gap-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-9 items-center text-[15px] text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-4 py-8 text-[13px] leading-relaxed text-foreground/45">
          <p>
            <strong className="font-semibold text-foreground/65">Risk warning: </strong>
            {siteConfig.legal.riskDisclaimer}
          </p>
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
