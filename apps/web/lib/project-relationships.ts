import { isPublishedProject } from "@/lib/project-records";
import { engineeringProfile } from "@/lib/profile-content";
import { getProjects, projectHref } from "@/lib/projects";
import { publicRoutes } from "@/lib/platform-routes";
import type { ContentRef } from "@/types/content";
import type { ProjectRecord } from "@/types/project";
import { getProjectJournalLinks } from "@/lib/journal-relationships";
import { getProjectResearchLinks } from "@/lib/research-relationships";

export type RelatedContentLink = {
  id: string;
  title: string;
  href: string;
  kind: ContentRef["kind"];
  explanation: string;
};
/** Resolve only supported, published destinations. Reserved kinds remain content references, not links. */
export async function getProjectRelationships(
  project: ProjectRecord,
): Promise<RelatedContentLink[]> {
  if (!isPublishedProject(project)) return [];
  const projects = await getProjects();
  const profileIsPublic =
    engineeringProfile.publication.state === "published" &&
    engineeringProfile.publication.visibility === "public";
  const edges = [
    ...projects.flatMap((record) => record.relationships),
    ...(profileIsPublic ? engineeringProfile.relationships : []),
  ];
  const links = new Map<string, RelatedContentLink>();
  for (const edge of edges) {
    const fromHere =
      edge.from.kind === "project" && edge.from.id === project.id;
    const toHere = edge.to.kind === "project" && edge.to.id === project.id;
    if (!fromHere && !toHere) continue;
    const ref = fromHere ? edge.to : edge.from;
    if (ref.kind === "project" && ref.id !== project.id) {
      const target = projects.find((item) => item.id === ref.id);
      if (target)
        links.set(`project:${ref.id}`, {
          id: ref.id,
          title: target.title,
          href: projectHref(target),
          kind: ref.kind,
          explanation: edge.explanation,
        });
    }
    if (
      ref.kind === "profile" &&
      ref.id === engineeringProfile.id &&
      profileIsPublic &&
      publicRoutes.about.state === "implemented"
    ) {
      links.set(`profile:${ref.id}`, {
        id: ref.id,
        title: "Engineering profile",
        href: publicRoutes.about.path,
        kind: ref.kind,
        explanation: edge.explanation,
      });
    }
  }
  for (const link of await getProjectJournalLinks(project.id)) {
    links.set("journal:" + link.id, link);
  }
  for (const link of await getProjectResearchLinks(project.id)) {
    links.set("research:" + link.id, link);
  }
  return [...links.values()];
}
