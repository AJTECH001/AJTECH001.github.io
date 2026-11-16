import type { MetadataRoute } from "next";
import { getProjects, projectHref } from "@/lib/projects";
import { getResearchRecords, researchHref } from "@/lib/research";
import { securityAreas } from "@/lib/security-areas";
import { siteContent } from "@/lib/site-content";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, research] = await Promise.all([
    getProjects(),
    getResearchRecords(),
  ]);
  // Trailing slash matches the static export and the canonical links.
  const url = (path: string) =>
    new URL(path.endsWith("/") ? path : `${path}/`, siteContent.url).toString();
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...securityAreas.map((area) => ({
      url: url(area.path),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: url("/work"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/writing"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/research"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: url(projectHref(project)),
      lastModified: project.publication.publishedAt,
      priority: 0.7,
    })),
    ...research.map((record) => ({
      url: url(researchHref(record)),
      lastModified: record.updatedAt,
      priority: 0.6,
    })),
  ];
}
