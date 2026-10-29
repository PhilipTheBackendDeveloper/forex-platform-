import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

/** Indexing is off unless NEXT_PUBLIC_ALLOW_INDEXING=true on an approved production deploy. */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.features.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard/", "/admin/", "/api/", "/login", "/register"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
