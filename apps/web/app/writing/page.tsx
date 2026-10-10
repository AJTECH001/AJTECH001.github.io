import type { Metadata } from "next";
import { WritingIndex } from "@/components/writing/writing-index";
import { getJournalEntries } from "@/lib/journal";
import { getResearchRecords } from "@/lib/research";
import "../journal/journal.css";
import "./writing.css";

export const metadata: Metadata = {
  title: "Technical writing — AJTECH",
  description:
    "Published engineering notes and clearly labeled research topics in progress.",
  alternates: { canonical: "/writing" },
};

export default async function WritingPage() {
  const [entries, research] = await Promise.all([
    getJournalEntries(),
    getResearchRecords(),
  ]);
  return <WritingIndex entries={entries} research={research} />;
}
