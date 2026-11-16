/** Future cross-feature contracts. No storage, publishing, or live-data service is implemented. */
export type ContentKind =
  | "project"
  | "journal"
  | "research"
  | "knowledge"
  | "architecture"
  | "lab-system"
  | "experiment"
  | "infrastructure"
  | "profile"
  | "now";
export type ContentRef = { kind: ContentKind; id: string };
export type EvidenceRef = {
  id: string;
  kind: "repository" | "document" | "measurement" | "owner-statement";
  locator: string;
  visibility: "public" | "private";
  note: string;
};
export type Publication =
  | {
      state: "draft" | "in-review" | "unpublished";
      visibility: "private";
      publishedAt?: never;
    }
  | { state: "published"; visibility: "public"; publishedAt: string }
  | { state: "withdrawn"; visibility: "private"; publishedAt?: string };
export type ContentIdentity = {
  id: string;
  kind: ContentKind;
  slug: string;
  title: string;
  summary: string;
  publication: Publication;
  updatedAt: string;
  revision: string;
  domainIds: string[];
  evidence: EvidenceRef[];
};
export type TechnicalBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "code"; language: string; code: string; caption?: string }
  | { kind: "diagram"; architectureId: string; caption?: string }
  | { kind: "reference"; label: string; href: `https://${string}` }
  | {
      kind: "callout";
      label: "Current" | "Planned" | "Future" | "Unverified";
      text: string;
    };
export type TechnicalSection = {
  id: string;
  title: string;
  blocks: TechnicalBlock[];
};
export type TechnicalDocument = ContentIdentity & {
  kind: "journal" | "research" | "knowledge";
  sections: TechnicalSection[];
  prerequisites?: ContentRef[];
  learningOutcomes?: string[];
};
export type ResearchStatus =
  "Draft" | "Research" | "Ongoing" | "Validated" | "Archived";
export type ResearchDomain =
  | "Blockchain Security"
  | "AI Security"
  | "Cybersecurity"
  | "Infrastructure"
  | "Systems"
  | "Networking"
  | "Data Center"
  | "AI Infrastructure"
  | "Distributed Systems"
  | "Security"
  | "Blockchain"
  | "Hardware"
  | "Embedded Systems"
  | "Software"
  | "Other";
export type ResearchExperiment = {
  hypothesis: string;
  method: string;
  observation?: string;
  conclusion?: string;
};
/** Question-led investigation. Status records the work state, not a research result. */
export type ResearchRecord = ContentIdentity & {
  kind: "research";
  number?: string;
  status: ResearchStatus;
  domain: ResearchDomain;
  period?: string;
  topics: string[];
  technologies?: string[];
  question?: string;
  context?: string;
  motivation?: string;
  hypotheses?: string[];
  concepts?: string[];
  investigation?: string[];
  findings?: string[];
  experiments?: ResearchExperiment[];
  openQuestions?: string[];
  implications?: string[];
  limitations?: string[];
  currentState?: string;
  relationships: ContentRelation[];
  relatedProjects?: string[];
  relatedJournal?: string[];
  relatedResearch?: string[];
  relatedKnowledge?: string[];
  relatedArchitecture?: string[];
  externalLinks?: { label: string; href: `https://${string}` }[];
};
/** Foundational knowledge contract; no public Knowledge route is implemented yet. */
export type KnowledgeEntry = TechnicalDocument & {
  kind: "knowledge";
  term: string;
  definition: string;
  domain: Domain;
  relationships: ContentRelation[];
  relatedProjects?: string[];
  relatedJournal?: string[];
  relatedResearch?: string[];
  relatedKnowledge?: string[];
  relatedArchitecture?: string[];
};
export type JournalStatus = "Draft" | "Published" | "Ongoing" | "Archived";
export type JournalEntryType =
  | "Engineering Log"
  | "Build Log"
  | "Debugging"
  | "Learning Note"
  | "Research Note"
  | "Infrastructure Log"
  | "Field Note";
export type JournalExperiment = {
  hypothesis?: string;
  test?: string;
  observation?: string;
  conclusion?: string;
};
export type JournalDebugging = {
  symptom?: string;
  investigation?: string;
  hypothesis?: string;
  test?: string;
  rootCause?: string;
  fix?: string;
  lesson?: string;
};
/** Editorial journal content reuses the platform identity and relationship contract. */
export type JournalEntry = ContentIdentity & {
  kind: "journal";
  number?: string;
  status: JournalStatus;
  type: JournalEntryType;
  period?: string;
  topics: string[];
  technologies?: string[];
  context?: string;
  objective?: string;
  problem?: string;
  investigation?: string[];
  experiments?: JournalExperiment[];
  implementation?: string[];
  debugging?: JournalDebugging[];
  decisions?: string[];
  tradeoffs?: string[];
  lessons?: string[];
  result?: string;
  currentState?: string;
  relationships: ContentRelation[];
  relatedProjects?: string[];
  relatedJournal?: string[];
  relatedResearch?: string[];
  relatedKnowledge?: string[];
  relatedArchitecture?: string[];
  externalLinks?: { label: string; href: `https://${string}` }[];
};
export type ContentRelation = {
  id: string;
  from: ContentRef;
  to: ContentRef;
  predicate:
    | "documents"
    | "explains"
    | "investigates"
    | "implements"
    | "depicts"
    | "depends-on"
    | "supersedes"
    | "related-to";
  explanation: string;
  evidenceIds: string[];
};
export type Domain = {
  id: string;
  label: string;
  parentId?: string;
  description: string;
};
export type NowItem = {
  lane:
    | "building"
    | "learning"
    | "researching"
    | "experimenting"
    | "operating"
    | "next";
  description: string;
  content?: ContentRef;
  evidenceIds: string[];
};
export type NowSnapshot = ContentIdentity & {
  kind: "now";
  asOf: string;
  items: NowItem[];
};

// Editorial intent, publication, and observed health are independent axes.
// "Operational" project status is never used to infer current service health.
export type EditorialProjection<T> = {
  source: "editorial";
  updatedAt: string;
  content: T;
};
export type PublicObservation<T> =
  | {
      source: "live";
      state: "fresh";
      observedAt: string;
      expiresAt: string;
      sourceId: string;
      value: T;
    }
  | {
      source: "live";
      state: "stale";
      observedAt: string;
      expiresAt: string;
      sourceId: string;
      lastKnownValue: T;
    }
  | {
      source: "live";
      state: "unknown";
      reason: "not-connected" | "unavailable";
      value?: never;
    };
