import type { MetadataRoute } from "next";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { courses } from "@/features/courses/data/courses";
import { articles } from "@/features/editorial/data/articles";

export const publicStaticPaths = [
  routes.home,
  routes.goldDigger,
  routes.coaching,
  routes.academy,
  routes.masteryCourses,
  routes.blogs,
  routes.events,
  routes.shop,
  routes.collaborations,
  routes.about,
  routes.privacy,
  routes.terms,
  routes.cookies,
  routes.refunds,
  routes.dataDeletion,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    ...publicStaticPaths.map((p) => ({ url: `${base}${p === "/" ? "" : p}` })),
    ...courses.map((c) => ({ url: `${base}/mastery-courses/${c.slug}` })),
    ...articles.map((a) => ({ url: `${base}/blogs/${a.slug}`, lastModified: a.publishedAt })),
  ];
}
