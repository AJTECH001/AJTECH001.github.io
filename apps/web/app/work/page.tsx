import type { Metadata } from "next";
import { WorkIndex } from "@/components/work/work-index";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Engineering records — ajtech",
  description:
    "An archive of engineering work: problems, architecture, implementation, and the decisions behind each project.",
};
export default async function WorkPage() {
  return <WorkIndex projects={await getProjects()} />;
}
