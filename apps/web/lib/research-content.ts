import type { ResearchRecord } from "@/types/content";

const profileEvidence = (id: string, note: string) => ({
  id,
  kind: "document" as const,
  locator: "/about",
  visibility: "public" as const,
  note,
});

const projectEvidence = {
  id: "project-001-record",
  kind: "document" as const,
  locator: "/work/personal-technology-headquarters",
  visibility: "public" as const,
  note: "Project 001 describes the current application and explicitly separates implemented, planned, and future capabilities.",
};

const journalEvidence = {
  id: "platform-engineering-notes",
  kind: "document" as const,
  locator: "/journal/building-a-personal-technology-headquarters",
  visibility: "public" as const,
  note: "The engineering journal records the platform's current application architecture and states that self-hosting and live operations are not implemented.",
};

export const researchRecords: readonly ResearchRecord[] = [
  {
    id: "infrastructure-engineering",
    kind: "research",
    slug: "infrastructure-engineering",
    number: "R-001",
    title: "Infrastructure engineering",
    summary:
      "A learning investigation into the responsibilities that connect operating systems, networks, compute, and reliable service operation.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-09-27",
    },
    updatedAt: "2026-09-27",
    revision: "1",
    domainIds: ["infrastructure", "systems", "networking"],
    evidence: [
      profileEvidence(
        "profile-infrastructure-direction",
        "The Engineering Profile describes Linux, compute, networking, and infrastructure as an active learning direction.",
      ),
    ],
    status: "Ongoing",
    domain: "Infrastructure",
    topics: ["Linux", "Networking", "Reliability", "Operations", "Automation"],
    technologies: ["Linux"],
    question:
      "What knowledge and operating practices connect a system's design to its reliable day-to-day operation?",
    context:
      "The Engineering Profile identifies systems and infrastructure as a learning trajectory. The published work currently documents a web application and its content architecture; it does not document production infrastructure operation.",
    motivation:
      "Understanding the foundations of infrastructure is part of the stated direction toward systems and AI infrastructure engineering.",
    concepts: [
      "Linux system fundamentals",
      "Servers and resource management",
      "Network communication",
      "Reliability and failure handling",
      "Monitoring, automation, and operational ownership",
    ],
    investigation: [
      "Build a source-backed understanding of the responsibilities and boundaries in each area.",
      "Separate general infrastructure concepts from evidence of operating a specific system.",
      "Connect future hands-on work to a dated engineering record before treating it as operational experience.",
    ],
    openQuestions: [
      "Which Linux administration fundamentals should be demonstrated through a bounded, documented exercise?",
      "How should reliability and monitoring be evaluated for a small self-hosted service?",
    ],
    limitations: [
      "This entry describes a learning investigation, not production operations or completed research.",
      "No server inventory, deployment, monitoring data, or reliability measurements are documented.",
    ],
    currentState:
      "Ongoing learning direction. No final conclusion or operational result has been established.",
    relationships: [
      {
        id: "research-infrastructure-self-hosting",
        from: { kind: "research", id: "infrastructure-engineering" },
        to: { kind: "research", id: "self-hosted-infrastructure" },
        predicate: "related-to",
        explanation:
          "Self-hosting is a bounded question within the broader study of infrastructure engineering.",
        evidenceIds: ["profile-infrastructure-direction"],
      },
    ],
    relatedResearch: ["self-hosted-infrastructure"],
  },
  {
    id: "self-hosted-infrastructure",
    kind: "research",
    slug: "self-hosted-infrastructure",
    number: "R-002",
    title: "Self-hosted infrastructure",
    summary:
      "An investigation into the responsibilities involved in owning application infrastructure, grounded in the platform's explicitly planned future direction.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-09-27",
    },
    updatedAt: "2026-09-27",
    revision: "1",
    domainIds: ["infrastructure", "software", "systems"],
    evidence: [projectEvidence, journalEvidence],
    status: "Research",
    domain: "Infrastructure",
    topics: [
      "Infrastructure ownership",
      "Linux",
      "DNS",
      "Backups",
      "Operations",
    ],
    technologies: ["Linux", "DNS", "Databases", "Reverse proxies"],
    question:
      "What operational responsibilities would need to be understood before this platform could be self-hosted?",
    context:
      "Project 001 is a server-rendered Next.js application with typed local content. The project record and journal explicitly state that self-hosting, databases, authentication, and live telemetry are not currently implemented.",
    motivation:
      "The platform's long-term direction includes an owned engineering lab. Studying the operational boundary helps keep that plan distinct from the current application.",
    concepts: [
      "Linux server administration",
      "DNS and service routing",
      "Databases and persistent state",
      "Reverse proxies and TLS",
      "Backups, monitoring, deployment, and recovery",
    ],
    investigation: [
      "Map the application dependencies and the operational responsibilities each would introduce.",
      "Identify what would need to be backed up, monitored, secured, and recovered before proposing an operating design.",
      "Keep proposed components labeled as topics for investigation until an implementation and its evidence exist.",
    ],
    openQuestions: [
      "Which parts of this application would require persistent state if its editorial content remains local?",
      "What recovery objective and backup procedure would be appropriate for a first hosted version?",
      "Which DNS, proxy, and monitoring responsibilities would an owner need to operate?",
    ],
    implications: [
      "A future infrastructure record should distinguish an intended design from deployed and observed services.",
    ],
    limitations: [
      "No server, DNS zone, database, reverse proxy, backup service, monitoring system, or deployment is documented as implemented.",
      "No hosting choice or operational design has been validated.",
    ],
    currentState:
      "Research direction connected to Project 001. Infrastructure components remain planned or not yet implemented.",
    relationships: [
      {
        id: "research-self-hosting-project-001",
        from: { kind: "research", id: "self-hosted-infrastructure" },
        to: { kind: "project", id: "personal-technology-headquarters" },
        predicate: "investigates",
        explanation:
          "The research question concerns future operation of the application documented in Project 001.",
        evidenceIds: ["project-001-record"],
      },
      {
        id: "research-self-hosting-journal",
        from: { kind: "research", id: "self-hosted-infrastructure" },
        to: { kind: "journal", id: "platform-engineering-notes" },
        predicate: "related-to",
        explanation:
          "The journal records the current platform state and its explicit self-hosting limitations.",
        evidenceIds: ["platform-engineering-notes"],
      },
    ],
    relatedProjects: ["personal-technology-headquarters"],
    relatedJournal: ["platform-engineering-notes"],
    relatedResearch: ["infrastructure-engineering"],
  },
  {
    id: "data-center-engineering",
    kind: "research",
    slug: "data-center-engineering",
    number: "R-003",
    title: "Data center engineering fundamentals",
    summary:
      "A long-term learning area focused on how compute, storage, networks, power, cooling, and operations fit together in data centers.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-09-27",
    },
    updatedAt: "2026-09-27",
    revision: "1",
    domainIds: ["infrastructure", "data-center", "systems"],
    evidence: [
      profileEvidence(
        "profile-data-center-direction",
        "The Engineering Profile identifies data-center engineering in Africa as a long-term direction, not an existing facility or credential.",
      ),
    ],
    status: "Research",
    domain: "Data Center",
    topics: [
      "Compute",
      "Storage",
      "Networking",
      "Power",
      "Cooling",
      "Reliability",
    ],
    question:
      "How do facility and computing-system constraints combine to shape data-center reliability?",
    context:
      "Data-center engineering is identified as a long-term learning and career direction. No data center, facility, or capacity is represented as owned or operated.",
    motivation:
      "A useful understanding of computing infrastructure needs to include the physical resources and operational conditions that support compute.",
    concepts: [
      "Compute and storage systems",
      "Network paths and capacity",
      "Power delivery and redundancy",
      "Thermal management and cooling",
      "Monitoring, maintenance, and reliability",
    ],
    investigation: [
      "Study the role and interaction of each facility and computing layer.",
      "Record assumptions and source references before drawing design conclusions.",
      "Connect future small-scale practical work to the appropriate research question without equating it to data-center operation.",
    ],
    openQuestions: [
      "Which dependencies create the most important failure paths across power, cooling, compute, and networking?",
      "How should redundancy claims be evaluated against maintenance and common-cause failures?",
      "Which operating measurements are needed to reason about capacity and reliability?",
    ],
    limitations: [
      "No facility measurements, capacity figures, redundancy analysis, or data-center operations are documented.",
      "This record contains a research scope, not a completed technical review.",
    ],
    currentState:
      "Long-term research direction. No findings or data-center operating experience are claimed.",
    relationships: [
      {
        id: "research-datacenter-ai-infrastructure",
        from: { kind: "research", id: "data-center-engineering" },
        to: { kind: "research", id: "ai-infrastructure" },
        predicate: "related-to",
        explanation:
          "AI infrastructure depends on compute and facility systems that are part of this broader study.",
        evidenceIds: ["profile-data-center-direction"],
      },
    ],
    relatedResearch: ["ai-infrastructure"],
  },
  {
    id: "ai-infrastructure",
    kind: "research",
    slug: "ai-infrastructure",
    number: "R-004",
    title: "AI infrastructure",
    summary:
      "A research direction for understanding the compute, networking, storage, and operations that AI workloads depend on.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-09-27",
    },
    updatedAt: "2026-09-27",
    revision: "1",
    domainIds: ["ai-infrastructure", "infrastructure", "data-center"],
    evidence: [
      profileEvidence(
        "profile-ai-infrastructure-direction",
        "The Engineering Profile names AI infrastructure as a future direction and explicitly disclaims GPU deployments and facilities.",
      ),
    ],
    status: "Research",
    domain: "AI Infrastructure",
    topics: [
      "GPU compute",
      "Model serving",
      "Networking",
      "Storage",
      "Scheduling",
      "Capacity planning",
    ],
    question:
      "What infrastructure constraints shape how AI workloads are scheduled, served, and operated?",
    context:
      "AI infrastructure is a stated learning and research direction. The profile does not claim GPU cluster operation, model-serving systems, or AI data-center experience.",
    motivation:
      "Understanding the systems behind AI workloads connects the current infrastructure learning path to a longer-term engineering direction.",
    concepts: [
      "Compute architecture and accelerators",
      "Inference and model serving",
      "Data movement, storage, and networking",
      "Scheduling and resource allocation",
      "Observability and capacity economics",
    ],
    investigation: [
      "Identify the infrastructure concerns each workload introduces before comparing possible architectures.",
      "Separate general design concepts from measurements that would require access to an implemented system.",
      "Use sourced examples for capacity or cost discussion; no estimates are published in this record.",
    ],
    openQuestions: [
      "How do inference workload patterns affect compute scheduling and capacity planning?",
      "Where can storage or network constraints limit accelerator utilization?",
      "What operational signals are needed to reason about serving reliability and resource use?",
    ],
    limitations: [
      "No GPU cluster, model-serving service, workload benchmark, capacity estimate, or infrastructure cost analysis is documented.",
      "No experiment or final conclusion has been established.",
    ],
    currentState:
      "Research direction only. This entry does not describe an operated AI system.",
    relationships: [
      {
        id: "research-ai-datacenter",
        from: { kind: "research", id: "ai-infrastructure" },
        to: { kind: "research", id: "data-center-engineering" },
        predicate: "depends-on",
        explanation:
          "AI infrastructure questions share physical compute, power, cooling, networking, and facility concerns.",
        evidenceIds: ["profile-ai-infrastructure-direction"],
      },
    ],
    relatedResearch: ["data-center-engineering"],
  },
  {
    id: "systems-programming-rust",
    kind: "research",
    slug: "systems-programming-and-rust",
    number: "R-005",
    title: "Systems programming and Rust",
    summary:
      "A learning investigation into systems programming concepts and how Rust expresses memory safety, concurrency, and low-level control.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-09-27",
    },
    updatedAt: "2026-09-27",
    revision: "1",
    domainIds: ["systems", "software", "security"],
    evidence: [
      profileEvidence(
        "profile-rust-learning-lead",
        "The Engineering Profile identifies Rust as an unpublished learning/source lead, separate from Project 001.",
      ),
    ],
    status: "Research",
    domain: "Systems",
    topics: [
      "Systems programming",
      "Memory safety",
      "Concurrency",
      "Infrastructure",
    ],
    technologies: ["Rust"],
    question:
      "How do Rust's ownership and type systems shape the way systems software represents memory and concurrency?",
    context:
      "Rust is named as a learning area in the supplied profile context. No Rust project, contribution, benchmark, or completed study is documented in the published engineering records.",
    motivation:
      "Systems programming offers a way to examine resource ownership and low-level behavior that also matter in infrastructure and protocol software.",
    concepts: [
      "Ownership and borrowing",
      "Lifetimes and memory safety",
      "Concurrency and shared state",
      "Systems interfaces and native code",
      "Reading and tracing existing Rust implementations",
    ],
    investigation: [
      "Study the language concepts through small, source-backed examples.",
      "Read native Rust code to understand how types and ownership express system boundaries.",
      "Document a concrete exercise before making claims about implementation experience.",
    ],
    openQuestions: [
      "Which ownership patterns most clearly explain resource lifetime in a systems program?",
      "How do Rust abstractions interact with operating-system and network interfaces?",
      "What evidence would show that a small systems exercise behaves as intended?",
    ],
    limitations: [
      "No Rust implementation or test result is included in the published portfolio records.",
      "This page records a learning direction, not Rust proficiency or a performance claim.",
    ],
    currentState:
      "Research and learning direction. Specific exercises and conclusions remain to be documented.",
    relationships: [],
  },
  {
    id: "blockchain-protocol-security",
    kind: "research",
    slug: "blockchain-protocol-security",
    number: "R-006",
    title: "Blockchain protocols and security",
    summary:
      "A question-led research area for learning about protocol behavior, smart-contract security, privacy, and distributed systems.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-09-27",
    },
    updatedAt: "2026-09-27",
    revision: "1",
    domainIds: ["security", "blockchain", "systems"],
    evidence: [
      profileEvidence(
        "profile-protocol-security-lead",
        "The Engineering Profile identifies Solana, blockchain security, and protocol engineering as research subjects, while stating that audits and findings are unpublished.",
      ),
    ],
    status: "Research",
    domain: "Security",
    topics: [
      "Protocol engineering",
      "Smart contracts",
      "Security",
      "Privacy",
      "Distributed systems",
    ],
    technologies: ["Rust", "Solana"],
    question:
      "How should protocol assumptions and smart-contract behavior be examined before making a security claim?",
    context:
      "Solana, blockchain security, protocol engineering, and privacy are supplied areas of interest. The published profile explicitly distinguishes those subjects from audit engagements, findings, and credentials.",
    motivation:
      "Security reasoning depends on understanding a protocol's assumptions and behavior, not just its intended use.",
    concepts: [
      "Protocol state and trust assumptions",
      "Smart-contract behavior",
      "Threat models and failure modes",
      "Privacy properties and limits",
      "Distributed-system consistency and liveness",
    ],
    investigation: [
      "Choose a specific protocol question and gather its primary technical sources before drawing conclusions.",
      "Keep learning exercises, challenge participation, security research, and production work as separate evidence categories.",
      "Record scope and disclosure constraints before publishing any security observation.",
    ],
    openQuestions: [
      "Which assumptions are required for a selected protocol property to hold?",
      "How can a security observation be reproduced and scoped without overstating its impact?",
      "What privacy guarantees does a given system actually provide, and under what assumptions?",
    ],
    limitations: [
      "No security finding, audit, challenge result, protocol implementation, or professional engagement is published here.",
      "No external protocol references have been attached to this early-stage record.",
    ],
    currentState:
      "Early research direction. A specific protocol, source set, and investigation have not yet been selected.",
    relationships: [
      {
        id: "research-blockchain-rust",
        from: { kind: "research", id: "blockchain-protocol-security" },
        to: { kind: "research", id: "systems-programming-rust" },
        predicate: "related-to",
        explanation:
          "Rust is a relevant learning subject for the supplied protocol and security research interests; no implementation connection is claimed.",
        evidenceIds: [
          "profile-rust-learning-lead",
          "profile-protocol-security-lead",
        ],
      },
    ],
    relatedResearch: ["systems-programming-rust"],
  },
];
