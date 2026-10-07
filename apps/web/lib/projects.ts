import { isPublishedProject } from "@/lib/project-records";
export { getProjectSections } from "@/lib/project-records";
import { projectRecords } from "@/lib/project-content";
import type { ProjectRecord } from "@/types/project";

// Storage boundary. UI components receive records rather than importing the local store.
export async function getProjects(): Promise<readonly ProjectRecord[]> {
  return projectRecords.filter(isPublishedProject);
}
export async function getProjectBySlug(
  slug: string,
): Promise<ProjectRecord | undefined> {
  return (await getProjects()).find((project) => project.slug === slug);
}
export function projectHref(project: Pick<ProjectRecord, "slug">) {
  return `/work/${project.slug}`;
}
