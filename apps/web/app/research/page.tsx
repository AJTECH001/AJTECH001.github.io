import type { Metadata } from "next";
import { ResearchIndex } from "@/components/research/research-index";
import { getProjects } from "@/lib/projects";
import { getResearchRecords } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research lab — ajtech",
  description:
    "Question-led investigations into infrastructure, systems, data centers, AI infrastructure, and protocol security.",
  alternates: { canonical: "/research" },
};

export default async function ResearchPage() {
  const [records, projects] = await Promise.all([
    getResearchRecords(),
    getProjects(),
  ]);
  return <ResearchIndex records={records} projects={projects} />;
}
