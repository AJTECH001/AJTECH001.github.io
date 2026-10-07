import type { RelatedContentLink } from "@/lib/project-relationships";
import { getProjects, projectHref } from "@/lib/projects";
import { getJournalEntries } from "@/lib/journal";
import type { JournalEntry, ContentRef } from "@/types/content";
import { getJournalResearchLinks } from "@/lib/research-relationships";

export async function getJournalRelationships(
  entry: JournalEntry,
): Promise<RelatedContentLink[]> {
  const [projects, entries] = await Promise.all([
    getProjects(),
    getJournalEntries(),
  ]);
  const candidates: { ref: ContentRef; explanation: string }[] = [
    ...entry.relationships.map((edge) => ({
      ref:
        edge.from.id === entry.id && edge.from.kind === "journal"
          ? edge.to
          : edge.from,
      explanation: edge.explanation,
    })),
    ...(entry.relatedProjects ?? []).map((id) => ({
      ref: { kind: "project" as const, id },
      explanation: "Engineering record connected to this journal entry.",
    })),
  ];
  const resolved = new Map<string, RelatedContentLink>();
  for (const { ref, explanation } of candidates) {
    if (ref.kind === "project") {
      const project = projects.find((item) => item.id === ref.id);
      if (project)
        resolved.set("project:" + ref.id, {
          id: ref.id,
          title: "Project " + project.number + " — " + project.title,
          href: projectHref(project),
          kind: "project",
          explanation,
        });
    }
    if (ref.kind === "journal") {
      const related = entries.find((item) => item.id === ref.id);
      if (related)
        resolved.set("journal:" + ref.id, {
          id: ref.id,
          title: related.title,
          href: "/journal/" + related.slug,
          kind: "journal",
          explanation,
        });
    }
    // Reserved future kinds remain stored and are intentionally not rendered as links.
  }
  for (const link of await getJournalResearchLinks(entry.id)) {
    resolved.set("research:" + link.id, link);
  }
  return [...resolved.values()];
}

export async function getProjectJournalLinks(
  projectId: string,
): Promise<RelatedContentLink[]> {
  const entries = await getJournalEntries();
  return entries
    .filter(
      (entry) =>
        entry.relatedProjects?.includes(projectId) ||
        entry.relationships.some(
          (edge) =>
            (edge.from.kind === "project" && edge.from.id === projectId) ||
            (edge.to.kind === "project" && edge.to.id === projectId),
        ),
    )
    .map((entry) => ({
      id: entry.id,
      title: entry.title,
      href: "/journal/" + entry.slug,
      kind: "journal" as const,
      explanation: "Journal notes documenting this engineering record.",
    }));
}
