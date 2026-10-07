import type {
  Publication,
  Domain,
  ContentRelation,
  ContentRef,
} from "@/types/content";

export const projectStatuses = [
  "Concept",
  "Planning",
  "Research",
  "Active",
  "In development",
  "Operational",
  "Paused",
  "Archived",
] as const;
export type ProjectStatus = (typeof projectStatuses)[number];
export type ProjectCategory = { id: string; label: string };
export type RecordSectionId =
  | "context"
  | "problem"
  | "requirements"
  | "architecture"
  | "hardware"
  | "software"
  | "networking"
  | "security"
  | "operations"
  | "debugging"
  | "current-state"
  | "implementation"
  | "challenges"
  | "decisions"
  | "tradeoffs"
  | "result"
  | "lessons";
export type RecordSection = {
  paragraphs?: string[];
  items?: string[];
};
export type Architecture = {
  title: string;
  caption: string;
  state: "Current" | "Planned" | "Future";
  nodes: { id: string; title: string; detail: string }[];
  connections: { from: string; to: string; label: string }[];
};
export type DebuggingCase = {
  id: string;
  title: string;
  symptom: string;
  investigation?: string;
  hypothesis?: string;
  test?: string;
  rootCause?: string;
  fix?: string;
  lesson?: string;
  source: string;
};
export type ProjectRecord = {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  category: ProjectCategory;
  domains: Domain[];
  publication: Publication;
  status: ProjectStatus;
  /** Year of the documented work, not a claim of completion. */
  year?: number;
  period?: string;
  technologies: string[];
  scope: string;
  summary: string;
  overview: { label: string; value: string }[];
  sections: Partial<Record<RecordSectionId, RecordSection>>;
  architecture?: Architecture;
  architectureRefs?: ContentRef[];
  learningOutcomes?: string[];
  debugging?: DebuggingCase[];
  roadmap?: { phase: "Current" | "Planned" | "Future"; description: string }[];
  links: {
    label: string;
    href: `https://${string}`;
    kind: "Repository" | "Documentation" | "Reference";
  }[];
  relationships: ContentRelation[];
};
