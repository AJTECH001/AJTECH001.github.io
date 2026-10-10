import type { Metadata } from "next";
import { ResearchIndex } from "@/components/research/research-index";
import { getProjects } from "@/lib/projects";
import { getResearchRecords } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research topics in progress — AJTECH",
  description:
    "Early research outlines into infrastructure, systems, AI infrastructure, Rust, and blockchain protocols. No findings are claimed.",
  alternates: { canonical: "/research" },
};

export default async function ResearchPage() {
  const [records, projects] = await Promise.all([
    getResearchRecords(),
    getProjects(),
  ]);
  return <ResearchIndex records={records} projects={projects} />;
}
