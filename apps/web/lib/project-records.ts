import type { ProjectRecord, RecordSectionId } from "@/types/project";

export function isPublishedProject(project: ProjectRecord): boolean {
  return (
    project.publication.state === "published" &&
    project.publication.visibility === "public"
  );
}
export function projectPeriod(project: ProjectRecord): string | undefined {
  return (
    project.period?.trim() ||
    (project.year === undefined ? undefined : String(project.year))
  );
}
// Insertion order is the reading order on a project page.
const sectionLabels: Record<RecordSectionId, string> = {
  context: "Context",
  problem: "Problem investigated",
  requirements: "Requirements",
  approach: "Technical approach",
  contribution: "My contribution",
  findings: "Findings",
  architecture: "Architecture",
  hardware: "Hardware",
  software: "Software",
  networking: "Networking & communication",
  implementation: "Implementation",
  challenges: "Engineering challenges",
  debugging: "Debugging record",
  decisions: "Engineering decisions",
  tradeoffs: "Tradeoffs",
  security: "Security",
  operations: "Operations",
  result: "Result",
  lessons: "Lessons",
  "current-state": "Current state",
};
export function getProjectSections(project: ProjectRecord) {
  return (Object.entries(sectionLabels) as [RecordSectionId, string][]).flatMap(
    ([id, title]) => {
      const content = project.sections[id];
      const hasText =
        content?.paragraphs?.some((text) => text.trim()) ||
        content?.items?.some((text) => text.trim());
      if (
        !hasText &&
        !(id === "architecture" && project.architecture) &&
        !(id === "current-state" && project.roadmap?.length) &&
        !(id === "debugging" && project.debugging?.length)
      )
        return [];
      return [{ id, title, content }];
    },
  );
}
