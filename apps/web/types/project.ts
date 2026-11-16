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
  "Completed",
  "Paused",
  "Archived",
] as const;
export type ProjectStatus = (typeof projectStatuses)[number];
export type ProjectCategory = { id: string; label: string };
/** The three security areas every published record belongs to. */
export type SecurityAreaId =
  "blockchain-security" | "ai-security" | "cybersecurity";
export type FindingSeverity =
  "Critical" | "High" | "Medium" | "Low" | "Informational";
export type RecordSectionId =
  | "context"
  | "problem"
  | "approach"
  | "contribution"
  | "findings"
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
  area: SecurityAreaId;
  /** Other areas the work provides evidence for (e.g. AppSec classes in an AI assessment). */
  secondaryAreas?: SecurityAreaId[];
  /** Where the evidence lives, e.g. "Public report" or "Private report". */
  evidence: string;
  /** One sentence describing the owner's personal contribution. */
  contribution: string;
  /** Severity counts taken directly from the published or private report. */
  findings?: { severity: FindingSeverity; count: number }[];
  /** Short, verifiable outcome shown on cards. */
  outcome?: string;
  domains: Domain[];
  publication: Publication;
  status: ProjectStatus;
  /** Year of the documented work, not a claim of completion. */
  year?: number;
  period?: string;
  technologies: string[];
  technologyStatus?: "Current" | "Planned";
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
    kind: "Repository" | "Report" | "Documentation" | "Reference";
  }[];
  relationships: ContentRelation[];
};
