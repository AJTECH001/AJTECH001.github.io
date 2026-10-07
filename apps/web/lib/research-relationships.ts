import { getJournalEntries } from "@/lib/journal";
import { getProjects, projectHref } from "@/lib/projects";
import { getResearchRecords, researchHref } from "@/lib/research";
import type { RelatedContentLink } from "@/lib/project-relationships";
import type { ContentRef, ResearchRecord } from "@/types/content";

function references(record: ResearchRecord) {
  return [
    ...record.relationships.map((edge) => ({
      ref:
        edge.from.kind === "research" && edge.from.id === record.id
          ? edge.to
          : edge.from,
      explanation: edge.explanation,
    })),
    ...(record.relatedProjects ?? []).map((id) => ({
      ref: { kind: "project" as const, id },
      explanation: "Engineering project connected to this research question.",
    })),
    ...(record.relatedJournal ?? []).map((id) => ({
      ref: { kind: "journal" as const, id },
      explanation: "Journal entry documenting the related engineering context.",
    })),
    ...(record.relatedResearch ?? []).map((id) => ({
      ref: { kind: "research" as const, id },
      explanation: "Related research direction.",
    })),
  ] satisfies { ref: ContentRef; explanation: string }[];
}

export async function getResearchRelationships(
  record: ResearchRecord,
): Promise<RelatedContentLink[]> {
  const [projects, journals, research] = await Promise.all([
    getProjects(),
    getJournalEntries(),
    getResearchRecords(),
  ]);
  const resolved = new Map<string, RelatedContentLink>();
  const incomingResearch = research.flatMap((candidate) =>
    candidate.id !== record.id
      ? references(candidate)
          .filter(({ ref }) => ref.kind === "research" && ref.id === record.id)
          .map(() => ({
            ref: { kind: "research" as const, id: candidate.id },
            explanation: "Research record with a related question.",
          }))
      : [],
  );
  for (const { ref, explanation } of [
    ...references(record),
    ...incomingResearch,
  ]) {
    if (ref.kind === "project") {
      const project = projects.find((item) => item.id === ref.id);
      if (project)
        resolved.set("project:" + ref.id, {
          id: ref.id,
          title: `Project ${project.number} — ${project.title}`,
          href: projectHref(project),
          kind: "project",
          explanation,
        });
    }
    if (ref.kind === "journal") {
      const entry = journals.find((item) => item.id === ref.id);
      if (entry)
        resolved.set("journal:" + ref.id, {
          id: ref.id,
          title: entry.title,
          href: "/journal/" + entry.slug,
          kind: "journal",
          explanation,
        });
    }
    if (ref.kind === "research") {
      const related = research.find((item) => item.id === ref.id);
      if (related && related.id !== record.id)
        resolved.set("research:" + ref.id, {
          id: ref.id,
          title: related.number + " — " + related.title,
          href: researchHref(related),
          kind: "research",
          explanation,
        });
    }
    // Knowledge and architecture refs stay stored until those public routes exist.
  }
  return [...resolved.values()];
}

export async function getProjectResearchLinks(
  projectId: string,
): Promise<RelatedContentLink[]> {
  const records = await getResearchRecords();
  const linked = records.filter((record) =>
    references(record).some(
      ({ ref }) => ref.kind === "project" && ref.id === projectId,
    ),
  );
  return linked.map((record) => ({
    id: record.id,
    title: record.number + " — " + record.title,
    href: researchHref(record),
    kind: "research",
    explanation: "Research question connected to this engineering project.",
  }));
}

export async function getJournalResearchLinks(
  journalId: string,
): Promise<RelatedContentLink[]> {
  const records = await getResearchRecords();
  return records
    .filter((record) =>
      references(record).some(
        ({ ref }) => ref.kind === "journal" && ref.id === journalId,
      ),
    )
    .map((record) => ({
      id: record.id,
      title: record.number + " — " + record.title,
      href: researchHref(record),
      kind: "research",
      explanation: "Research direction connected to this journal entry.",
    }));
}
