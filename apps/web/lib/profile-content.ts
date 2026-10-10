import type { EngineeringProfile } from "@/types/content";

// Owner-supplied identity and direction; only Project 001 has a published case study.
// Other source leads are intentionally described as unpublished, not accomplishments.
export const engineeringProfile: EngineeringProfile = {
  id: "engineering-profile",
  kind: "profile",
  slug: "engineering-profile",
  title: "Computer Engineer across software and physical systems.",
  summary:
    "Computer Engineer working across software, hardware, networking, and systems, with a growing focus on infrastructure engineering.",
  publication: {
    state: "published",
    visibility: "public",
    publishedAt: "2026-09-20",
  },
  updatedAt: "2026-09-20",
  revision: "1",
  domainIds: [
    "hardware",
    "software",
    "networking",
    "infrastructure",
    "ai-infrastructure",
    "security",
  ],
  evidence: [
    {
      id: "owner-profile-direction",
      kind: "owner-statement",
      locator: "Engineering Profile feature brief",
      visibility: "private",
      note: "Computer Engineer identity, supplied subject context, and stated future direction; not a dated employment or qualification record.",
    },
    {
      id: "platform-record",
      kind: "document",
      locator: "/work/personal-technology-headquarters",
      visibility: "public",
      note: "Published record of the portfolio's current implementation and architecture.",
    },
  ],
  introduction: [
    "I approach computing by looking at how physical machines, software, and networks work together. Understanding those connections helps me make deliberate design decisions and explain how a system behaves.",
    "I’m developing further toward systems and infrastructure engineering. AI infrastructure and data centers in Africa are longer-term interests, not claims about work I have already operated.",
  ],
  domains: [
    {
      id: "hardware",
      label: "Hardware & embedded",
      description:
        "Computer hardware, electronics, sensors, and embedded systems that connect software to physical devices.",
      state: "Unpublished context",
      connection:
        "Hardware constrains what software can measure, control, and sustain. Power and interfaces belong in the design from the beginning.",
      evidenceNote:
        "Source leads include laptop/desktop hardware, Arduino, electronics, and embedded or sensor systems. Specific builds, roles, and test results have not been documented here yet.",
      contentRefs: [],
    },
    {
      id: "software",
      label: "Software & systems",
      description:
        "Software and backend development, system design, and Rust as a learning interest.",
      state: "Building",
      connection:
        "Software expresses the system's behavior. Clear boundaries make implementation decisions easier to inspect and change.",
      evidenceNote:
        "Project 001 documents the application structure, typed content, and public interface of this portfolio. Rust and OpenBoardAnim / Doodler remain separate unpublished source leads; they are not technologies claimed for this project.",
      contentRefs: [
        { kind: "project", id: "personal-technology-headquarters" },
      ],
    },
    {
      id: "networking",
      label: "Networking & communication",
      description:
        "Networking and communication systems, including LoRa, RS485/Modbus, GSM, CCTV, and IT infrastructure.",
      state: "Learning",
      connection:
        "A sensor reading becomes useful only when its path through a wider system is understood, including failures and communication constraints.",
      evidenceNote:
        "The supplied context includes LoRa, RS485 / MAX485, Modbus, GSM, and SIM900A / SIM800L, alongside CCTV and IT infrastructure. These await verified records; no topology, range, installation, or deployment is claimed here.",
      contentRefs: [],
    },
    {
      id: "infrastructure",
      label: "Infrastructure & operations",
      description:
        "Linux, servers, hardware maintenance, and the systems that support applications and services.",
      state: "Learning",
      connection:
        "An application architecture is a starting point. Operating its supporting infrastructure requires additional knowledge, repeatable procedures, and evidence from real systems.",
      evidenceNote:
        "The portfolio's application architecture is documented. It is not evidence of a self-hosted deployment, server fleet, cloud environment, or live monitoring system.",
      contentRefs: [
        { kind: "project", id: "personal-technology-headquarters" },
      ],
    },
    {
      id: "ai-infrastructure",
      label: "AI infrastructure & data centers",
      description:
        "The compute, storage, networks, and physical facilities needed to support AI workloads.",
      state: "Direction",
      connection:
        "GPU compute and distributed systems depend on the same lower layers, with additional demands on data movement, power, cooling, and operation.",
      evidenceNote:
        "This is a stated learning and research direction, including African infrastructure. No GPU deployment, facility, capacity, or completed research result is claimed.",
      contentRefs: [],
    },
    {
      id: "security",
      label: "Security & protocols",
      description:
        "Blockchain protocols, protocol engineering, and security as areas of technical interest.",
      state: "Research",
      connection:
        "Security crosses every layer: physical access, interfaces, network boundaries, application behavior, and operational practice.",
      evidenceNote:
        "Solana, blockchain security, and protocol engineering are supplied research subjects. Audits, findings, contributions, and specific results remain unpublished; this label describes the subject area, not a security credential.",
      contentRefs: [],
    },
  ],
  trajectory: [
    {
      label: "Computer Engineering",
      state: "Background",
      description:
        "A foundation for examining hardware and software as parts of the same system. No education dates or credentials are asserted here.",
    },
    {
      label: "A public system to inspect",
      state: "Building",
      year: 2026,
      description:
        "This platform provides a concrete engineering record: its public interface, application structure, and implementation decisions.",
      content: { kind: "project", id: "personal-technology-headquarters" },
    },
    {
      label: "Systems and infrastructure",
      state: "Learning",
      description:
        "Deepening the connection between Linux, networking, hardware, cloud infrastructure, and distributed systems.",
    },
    {
      label: "AI infrastructure and data centers",
      state: "Direction",
      description:
        "Working toward the ability to understand and eventually build infrastructure for modern computing, with a long-term interest in Africa.",
    },
  ],
  practice: [
    {
      label: "Learn",
      description:
        "Identify the underlying concept and the constraints before choosing a tool.",
    },
    {
      label: "Build",
      description:
        "Make a bounded implementation whose behavior can be inspected.",
    },
    {
      label: "Break",
      description:
        "Challenge assumptions in a controlled experiment; explore failure without risking a live system.",
    },
    {
      label: "Debug",
      description:
        "Gather evidence, isolate the cause, and distinguish symptoms from the fault.",
    },
    {
      label: "Understand",
      description:
        "Explain why the system behaved that way, including the tradeoffs.",
    },
    {
      label: "Document",
      description:
        "Leave decisions, limitations, and reproducible observations for the next reader.",
    },
    {
      label: "Operate",
      description:
        "Work toward repeatable maintenance and observation once a real system exists.",
    },
  ],
  future:
    "My long-term direction is AI infrastructure and data-center engineering: compute and GPU infrastructure, networking, storage, distributed systems, and the operational knowledge that connects them. I want to understand those systems deeply enough to contribute to computing infrastructure in Africa. That capability is something I’m working toward.",
  relationships: [
    {
      id: "profile-platform",
      from: { kind: "profile", id: "engineering-profile" },
      to: { kind: "project", id: "personal-technology-headquarters" },
      predicate: "related-to",
      explanation:
        "The platform is the published engineering record supporting this profile's current software-building work.",
      evidenceIds: ["platform-record"],
    },
    {
      id: "profile-infrastructure-research",
      from: { kind: "profile", id: "engineering-profile" },
      to: { kind: "research", id: "infrastructure-engineering" },
      predicate: "related-to",
      explanation:
        "This question-led record makes the profile's infrastructure learning direction inspectable.",
      evidenceIds: ["owner-profile-direction"],
    },
  ],
};
