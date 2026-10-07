import type { Metadata } from "next";
import { JournalIndex } from "@/components/journal/journal-index";
import { getJournalEntries } from "@/lib/journal";
import { getProjects } from "@/lib/projects";
import "./journal.css";

export const metadata: Metadata = {
  title: "Engineering journal — ajtech",
  description:
    "A chronological engineering log documenting the work, investigation, decisions, and lessons behind the platform.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const [entries, projects] = await Promise.all([
    getJournalEntries(),
    getProjects(),
  ]);
  return <JournalIndex entries={entries} projects={projects} />;
}
