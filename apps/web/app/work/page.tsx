import type { Metadata } from "next";
import { WorkIndex } from "@/components/work/work-index";
import { pageMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/projects";

const description =
  "Smart contract audits, AI agent red-team assessments, prompt injection research, and application security labs, with findings by severity.";

export const metadata: Metadata = pageMetadata({
  title: "Projects & Research",
  description,
  path: "/work",
});

export default async function WorkPage() {
  return <WorkIndex projects={await getProjects()} />;
}
