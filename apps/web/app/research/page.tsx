import type { Metadata } from "next";
import { ResearchIndex } from "@/components/research/research-index";
import { pageMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/projects";
import { getResearchRecords } from "@/lib/research";

export const metadata: Metadata = pageMetadata({
  title: "Security Research Notes",
  description:
    "Research notes on AI agent security, indirect prompt injection, smart contract vulnerability classes, and Solana program security.",
  path: "/research",
});

export default async function ResearchPage() {
  const [records, projects] = await Promise.all([
    getResearchRecords(),
    getProjects(),
  ]);
  return <ResearchIndex records={records} projects={projects} />;
}
