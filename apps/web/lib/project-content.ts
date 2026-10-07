import type { ProjectRecord } from "@/types/project";

// Publish only verified records. Year reflects repository work documented in 2026.
// Empty external links and outbound relationships are intentional: no public destinations supplied.
export const projectRecords: readonly ProjectRecord[] = [
  {
    id: "personal-technology-headquarters",
    slug: "personal-technology-headquarters",
    number: "001",
    title: "Personal technology headquarters",
    shortDescription:
      "A public engineering workspace built as an inspectable record of systems thinking, implementation, and future infrastructure work.",
    category: { id: "software", label: "Software" },
    domains: [
      {
        id: "software",
        label: "Software",
        description: "Public application design and implementation.",
      },
      {
        id: "systems",
        label: "Systems",
        description:
          "Application boundaries, content flow, and engineering documentation.",
      },
    ],
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-09-20",
    },
    status: "In development",
    year: 2026,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "pnpm"],
    scope: "Public platform",
    summary:
      "An evolving home for my engineering identity, technical writing, research, and future infrastructure lab. Starting with a modular monolith and a public interface built around readable, structured content.",
    overview: [
      { label: "Architecture", value: "One application · modular monolith" },
      {
        label: "Current scope",
        value:
          "Public shell, homepage, engineering profile, engineering records",
      },
      { label: "Repository checks", value: "Formatting, lint, types, build" },
    ],
    sections: {
      context: {
        paragraphs: [
          "The platform itself is an engineering artifact: its architecture, accessibility, content structure, and quality checks are part of the work being documented.",
          "It grows from a Computer Engineer’s direction toward systems, AI infrastructure, and eventually data-center engineering in Africa. The public interface starts small while preserving room for a technical journal and an operated lab.",
        ],
      },
      problem: {
        paragraphs: [
          "Create one public home for engineering work, research, and future infrastructure documentation. A visitor should be able to inspect the reasoning behind a project, not just see its title and technology list.",
        ],
      },
      requirements: {
        items: [
          "Keep project content separate from presentation and reusable across the homepage, archive, and detailed records.",
          "Use accessible, responsive pages with semantic navigation and clear keyboard focus.",
          "Distinguish implemented capabilities from planned and future work.",
          "Preserve the existing pnpm workspace and validation workflow.",
          "Start with a modular monolith; introduce data services only when the platform requires them.",
        ],
      },
      architecture: {
        paragraphs: [
          "One Next.js App Router application lives in apps/web within the pnpm workspace. Server Components render the public pages using shared components and typed local content.",
          "Project reads pass through a small async data-access module. A future storage adapter can return the same record shape without changing the display components. No database is connected.",
        ],
      },
      implementation: {
        items: [
          "The shared layout provides navigation, a skip link, the main landmark, and a footer.",
          "The homepage presents selected work; /work lists published records; /work/[slug] renders their technical documentation.",
          "Static generation prepares the known project route at build time. Unknown records return a not-found response.",
          "CSS tokens define the graphite surfaces, typography, borders, and restrained accent. Diagram and document layouts adapt to narrow screens.",
          "ESLint, TypeScript, Prettier, Husky, and GitHub Actions provide repository quality checks.",
        ],
      },
      software: {
        paragraphs: [
          "The content layer holds typed local records. Async readers supply published records to Server Components. The homepage, About profile, archive, and detail page reference the same project identity rather than maintaining separate descriptions.",
        ],
      },
      decisions: {
        items: [
          "Keep one application and local components until real reuse justifies extracting shared packages.",
          "Prefer Server Components and native browser interactions. Reading a record or expanding a disclosure does not require custom client-side state.",
          "Use a stable record ID, URL slug, and display number for distinct purposes. Category and status are structured metadata, not decorative labels.",
          "Render only sections backed by content. Do not publish empty project records or invented repository links.",
        ],
      },
      tradeoffs: {
        paragraphs: [
          "Local content keeps this milestone simple to inspect and maintain. Publishing changes currently requires editing source and rebuilding the application.",
          "Static pages keep the public reading experience straightforward, but they do not represent live infrastructure state. Future operational data will need a separate, truthful source.",
        ],
      },
      "current-state": {
        paragraphs: [
          "The public UI foundation and the first engineering archive are implemented. Project 001 is available as a detailed record, with its homepage preview and archive entry drawn from the same local content.",
          "The wider platform remains in development. Self-hosting, a database, authentication, and live telemetry are not implemented in this milestone.",
        ],
      },
      lessons: {
        items: [
          "A build failure can originate in the execution environment. Read the underlying error before changing application architecture.",
          "A layout can avoid overflow and still read poorly. Inspect actual headline wrapping, labels, and diagrams at narrow widths.",
          "Separate editorial publication from a project’s operational state. Published documentation does not establish that infrastructure is live.",
        ],
      },
    },
    learningOutcomes: [
      "Trace typed content through readers and server-rendered pages.",
      "Understand why stable IDs, URL slugs, and project numbers serve different purposes.",
      "Follow a build failure from its symptom to an environment-level cause.",
      "Separate documented capabilities from planned infrastructure.",
    ],
    debugging: [
      {
        id: "build-worker-permission",
        title: "A build worker blocked by the local sandbox",
        symptom:
          "The production build failed while processing globals.css. The error reported that binding a worker port was not permitted.",
        investigation:
          "The Turbopack error chain identified process creation and port binding during CSS transformation, rather than a stylesheet syntax error.",
        hypothesis:
          "The execution environment was preventing the worker from starting. A retry could also be reusing the failed generated cache.",
        test: "Retried outside the sandbox. When the same failure remained, moved the generated .next directory aside and ran a clean build outside the sandbox.",
        rootCause:
          "The initial worker port operation was denied by the sandbox. The retained cache was a suspected contributor to the repeated failure, not independently proven as a second root cause.",
        fix: "The clean build completed successfully without changing the workspace or application architecture.",
        lesson:
          "Separate permission failures from source defects. A successful retry establishes recovery, not proof of every hypothesis.",
        source:
          "Project 001 local validation history, recorded in the existing project context.",
      },
      {
        id: "narrow-screen-reading",
        title: "Readable content despite passing overflow checks",
        symptom:
          "At narrow widths, the homepage headline left an isolated final word and the engineering map labels were cramped.",
        investigation:
          "Screenshots exposed readability problems that the horizontal-overflow check did not detect.",
        test: "Reviewed the headline and engineering map at the requested responsive widths after adjusting their composition.",
        fix: "Balanced headline segments separately and used single-column map labels on narrow phones.",
        lesson:
          "Automated layout checks establish a baseline; visual inspection still matters for typography and reading order.",
        source: "Project 001 homepage refinement and responsive review.",
      },
    ],
    architecture: {
      title: "Public application / current structure",
      state: "Current",
      caption:
        "Logical application relationships within one modular monolith. This is not a deployment or network topology.",
      nodes: [
        {
          id: "content",
          title: "Typed project records",
          detail: "lib/project-content.ts · verified local content",
        },
        {
          id: "reader",
          title: "Project read functions",
          detail: "lib/projects.ts · list and slug lookup",
        },
        {
          id: "routes",
          title: "App Router pages",
          detail: "Home · /about · /work · /work/[slug]",
        },
        {
          id: "ui",
          title: "Shared presentation",
          detail: "Server Components · CSS design tokens",
        },
      ],
      connections: [
        { from: "content", to: "reader", label: "Provides canonical records" },
        { from: "reader", to: "routes", label: "Supplies typed content" },
        { from: "routes", to: "ui", label: "Composes the public interface" },
      ],
    },
    roadmap: [
      {
        phase: "Current",
        description:
          "Public shell, refined homepage, engineering profile, and educational engineering records.",
      },
      {
        phase: "Planned",
        description:
          "Journal, research collections, and documentation for an engineering lab.",
      },
      {
        phase: "Future",
        description:
          "Self-hosting, persistent data, and observability connected to real systems. No operational capability is claimed yet.",
      },
    ],
    links: [],
    relationships: [],
  },
];
