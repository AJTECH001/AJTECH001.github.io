import { journalEntries } from "@/lib/journal-content";
import type { JournalEntry } from "@/types/content";

export async function getJournalEntries(): Promise<readonly JournalEntry[]> {
  return journalEntries
    .filter(
      (entry) =>
        entry.publication.state === "published" &&
        entry.publication.visibility === "public" &&
        entry.status !== "Draft" &&
        entry.status !== "Archived",
    )
    .sort((a, b) =>
      (b.period ?? b.updatedAt).localeCompare(a.period ?? a.updatedAt),
    );
}

export async function getJournalEntryBySlug(slug: string) {
  return (await getJournalEntries()).find((entry) => entry.slug === slug);
}

export async function getJournalEntryById(id: string) {
  return (await getJournalEntries()).find((entry) => entry.id === id);
}

export function journalHref(entry: Pick<JournalEntry, "slug">) {
  return `/journal/${entry.slug}`;
}
