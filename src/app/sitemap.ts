import type { MetadataRoute } from "next";
import { getInsights, getProjects } from "@/lib/site-content";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await siteUrl();
  const [projects, insights] = await Promise.all([getProjects(), getInsights()]);
  const routes = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/developments", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/landowners", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/investors", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/insights", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly" as const, priority: 0.7 },
    ...projects.map((project) => ({ path: `/developments/${project.slug}`, changeFrequency: "monthly" as const, priority: project.featured ? 0.8 : 0.6 })),
    ...insights.map((insight) => ({ path: `/insights/${insight.slug}`, changeFrequency: "monthly" as const, priority: insight.featured ? 0.7 : 0.5 })),
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency, priority }));
}
