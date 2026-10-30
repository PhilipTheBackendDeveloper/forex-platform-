import Link from "next/link";
import { AtSign, Camera, CirclePlay, Send } from "lucide-react";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { BrandGlyph } from "./wordmark";

// Cache Components forbids reading the clock during prerender; cache the year instead.
async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

const socials = [
  { label: "Telegram", icon: Send, href: siteConfig.social.telegram },
  { label: "YouTube", icon: CirclePlay, href: siteConfig.social.youtube },
  { label: "Instagram", icon: Camera, href: siteConfig.social.instagram },
  { label: "X", icon: AtSign, href: siteConfig.social.x },
].filter((s): s is typeof s & { href: string } => Boolean(s.href));

/** Footer layout from the live audit: 4 link columns · brand row · centred copyright + disclaimer. */
export async function SiteFooter() {
  const year = await getCopyrightYear();
  return (
    <footer className="relative border-t border-border bg-surface">
      <h2 className="sr-only">Footer</h2>
      <div className="mx-auto max-w-[1100px] px-6 pt-16 pb-10 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-[17px] font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-5 flex flex-col gap-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-9 items-center text-[14px] text-muted transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-8 border-t border-border pt-10 sm:flex-row sm:items-start">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2.5">
              <BrandGlyph />
              <span className="text-[19px] font-semibold tracking-tight text-foreground">{siteConfig.name}</span>
            </Link>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{siteConfig.tagline}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-[14px] text-muted">Get in touch</p>
            {siteConfig.contact.email ? (
              <a href={`mailto:${siteConfig.contact.email}`} className="mt-1 inline-block text-[15px] font-medium text-foreground hover:underline">
                {siteConfig.contact.email}
              </a>
            ) : (
              <p className="mt-1 text-[14px] text-muted">Contact details pending</p>
            )}
            {socials.length > 0 && (
              <ul className="mt-4 flex gap-3 sm:justify-end">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex size-9 items-center justify-center text-muted hover:text-primary transition-colors">
                      <s.icon aria-hidden className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8 text-center text-[12px] leading-relaxed text-muted">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="mx-auto mt-5 max-w-3xl">
            <strong className="font-semibold text-foreground">DISCLAIMER: </strong>
            {siteConfig.legal.riskDisclaimer}
          </p>
          <p className="mx-auto mt-4 max-w-3xl">
            By using this website you agree to our{" "}
            <Link href="/terms-of-service" className="text-primary underline underline-offset-2">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            (drafts pending legal review).
          </p>
        </div>
      </div>
    </footer>
  );
}
