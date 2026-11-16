import type { Metadata } from "next";
import { WritingIndex } from "@/components/writing/writing-index";
import { pageMetadata } from "@/lib/metadata";
import { getResearchRecords } from "@/lib/research";
import "../journal/journal.css";
import "./writing.css";

const description =
  "Smart contract audit reports, an AI agent red-team assessment, and research notes on prompt injection, agent authorization, and Solana program security.";

export const metadata: Metadata = pageMetadata({
  title: "Writing & Publications",
  description,
  path: "/writing",
});

export default async function WritingPage() {
  return <WritingIndex research={await getResearchRecords()} />;
}
