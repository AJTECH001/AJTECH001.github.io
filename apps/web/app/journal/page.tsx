import type { Metadata } from "next";
import { JournalIndex } from "@/components/journal/journal-index";
import { getJournalEntries } from "@/lib/journal";
import { getProjects } from "@/lib/projects";
import "./journal.css";

export const metadata: Metadata = {
  title: "Engineering notes — AJTECH",
  description:
    "Published engineering notes documenting implementation, decisions, and lessons from the portfolio project.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const [entries, projects] = await Promise.all([
    getJournalEntries(),
    getProjects(),
  ]);
  return <JournalIndex entries={entries} projects={projects} />;
}
