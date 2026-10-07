import type { JournalEntry } from "@/types/content";

// Published material is limited to work already documented in Project 001.
export const journalEntries: readonly JournalEntry[] = [
  {
    id: "platform-engineering-notes",
    kind: "journal",
    slug: "building-a-personal-technology-headquarters",
    title: "Building a personal technology headquarters",
    summary:
      "Why this platform is being built as an inspectable engineering system, and what its first implementation has taught me.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-09-20",
    },
    updatedAt: "2026-09-20",
    revision: "1",
    domainIds: ["software", "systems", "infrastructure"],
    evidence: [
      {
        id: "project-001-record",
        kind: "document",
        locator: "/work/personal-technology-headquarters",
        visibility: "public",
        note: "Project 001 documents the current application, its decisions, limitations, and validation history.",
      },
    ],
    status: "Published",
    type: "Engineering Log",
    period: "2026",
    topics: ["Engineering documentation", "Systems thinking", "Web platform"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "pnpm"],
    context:
      "A conventional portfolio can show finished work, but it leaves little room to connect implementation decisions, learning, research, and future infrastructure work. This platform is being built as a public engineering workspace whose content and structure can be inspected.",
    objective:
      "Start with a small, server-rendered application and structured local content, while keeping clear boundaries for future journal and infrastructure documentation.",
    problem:
      "The public record needs to explain what exists today without implying that planned self-hosting or operational systems are already in place.",
    investigation: [
      "The repository architecture uses one Next.js App Router application, shared presentation components, typed local records, and small async readers.",
      "The first record separates current implementation from planned and future platform work. The journal extends that record with the reasoning and investigation sequence.",
    ],
    implementation: [
      "Built a shared public shell, homepage, engineering profile, and project archive using server-rendered pages.",
      "Kept project identity and publication state in typed content, with route readers handling published records and unknown slugs.",
      "Documented architecture as application relationships, not a deployment or network topology.",
    ],
    debugging: [
      {
        symptom:
          "A production build stopped while processing globals.css; the reported operation was a worker port bind denied by the local sandbox.",
        investigation:
          "The error chain pointed to process creation and port binding during CSS transformation rather than a stylesheet syntax error.",
        hypothesis:
          "The execution environment was preventing the worker from starting. A retry could also be reusing the failed generated cache.",
        test: "Retried outside the sandbox. After the failure repeated, moved the generated .next directory aside and ran a clean build outside the sandbox.",
        rootCause:
          "The initial worker port operation was denied by the sandbox. The retained cache was suspected in the repeat failure, but was not independently established as a second cause.",
        fix: "The clean build completed without changing the workspace or application architecture.",
        lesson:
          "Separate environment permission failures from source defects. A successful retry establishes recovery, not proof of every hypothesis.",
      },
      {
        symptom:
          "At narrow widths, the homepage headline left an isolated final word and engineering map labels felt cramped.",
        investigation:
          "Visual review exposed readability issues that a horizontal-overflow check could not detect.",
        test: "Reviewed the headline and engineering map at the requested responsive widths after adjusting their composition.",
        fix: "Balanced headline segments and used single-column map labels on narrow phones.",
        lesson:
          "Automated layout checks establish a baseline; typography and reading order still need visual review.",
      },
    ],
    decisions: [
      "Use stable content IDs, route slugs, and display numbers for distinct purposes.",
      "Prefer Server Components and native browser interactions for editorial reading.",
      "Render only content backed by a source; keep planned infrastructure visibly separate from current implementation.",
    ],
    tradeoffs: [
      "Local typed content is easy to inspect and keeps this milestone small, though updates currently require a source change and rebuild.",
      "Static editorial pages make no claim about live infrastructure state.",
    ],
    lessons: [
      "A platform can document its engineering process as well as present its output.",
      "A technical diagram should name what it represents; an application map is not a deployment topology.",
      "Check actual reading quality at narrow widths, not just whether content fits the viewport.",
    ],
    result:
      "The public shell, engineering profile, and first engineering record are available as a small modular monolith with typed local content.",
    currentState:
      "The platform remains in development. Self-hosting, databases, authentication, and live telemetry are not part of the current implementation.",
    relatedProjects: ["personal-technology-headquarters"],
    relationships: [
      {
        id: "journal-documents-project-001",
        from: { kind: "journal", id: "platform-engineering-notes" },
        to: { kind: "project", id: "personal-technology-headquarters" },
        predicate: "documents",
        explanation:
          "This entry records implementation reasoning and investigation already described in Project 001.",
        evidenceIds: ["project-001-record"],
      },
    ],
  },
];
