import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalEntry } from "@/components/journal/journal-entry";
import {
  getJournalEntryBySlug,
  getJournalEntries,
  journalHref,
} from "@/lib/journal";
import { getJournalRelationships } from "@/lib/journal-relationships";
import "../journal.css";

export async function generateStaticParams() {
  return (await getJournalEntries()).map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const entry = await getJournalEntryBySlug((await params).slug);
  if (!entry) notFound();
  return {
    title: entry.title + " — Engineering notes — AJTECH",
    description: entry.summary,
    alternates: { canonical: journalHref(entry) },
  };
}

export default async function JournalEntryPage({
  params,
}: PageProps<"/journal/[slug]">) {
  const entry = await getJournalEntryBySlug((await params).slug);
  if (!entry) notFound();
  const entries = await getJournalEntries();
  const index = entries.findIndex((item) => item.id === entry.id);
  const related = await getJournalRelationships(entry);
  return (
    <JournalEntry
      entry={entry}
      related={related}
      previous={
        index > 0
          ? {
              title: entries[index - 1].title,
              href: journalHref(entries[index - 1]),
            }
          : undefined
      }
      next={
        index < entries.length - 1
          ? {
              title: entries[index + 1].title,
              href: journalHref(entries[index + 1]),
            }
          : undefined
      }
    />
  );
}
