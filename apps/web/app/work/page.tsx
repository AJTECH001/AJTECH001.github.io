import type { Metadata } from "next";
import { WorkIndex } from "@/components/work/work-index";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — AJTECH",
  description:
    "Projects with documented scope, implementation, engineering decisions, and current status.",
};
export default async function WorkPage() {
  return <WorkIndex projects={await getProjects()} />;
}
