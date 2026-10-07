import { researchRecords } from "@/lib/research-content";
import type { ResearchRecord } from "@/types/content";

export async function getResearchRecords(): Promise<readonly ResearchRecord[]> {
  return researchRecords
    .filter(
      (record) =>
        record.publication.state === "published" &&
        record.publication.visibility === "public" &&
        record.status !== "Draft" &&
        record.status !== "Archived",
    )
    .sort((a, b) => (a.number ?? a.title).localeCompare(b.number ?? b.title));
}

export async function getResearchBySlug(slug: string) {
  return (await getResearchRecords()).find((record) => record.slug === slug);
}

export async function getResearchById(id: string) {
  return (await getResearchRecords()).find((record) => record.id === id);
}

export function researchHref(record: Pick<ResearchRecord, "slug">) {
  return `/research/${record.slug}`;
}
