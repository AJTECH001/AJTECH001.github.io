import { publicPageHref } from "@/lib/platform-routes";

export type SectionId =
  | "now"
  | "work"
  | "infrastructure"
  | "notes"
  | "contact"
  | "journal"
  | "research";
export type ContentStatus =
  "In development" | "Planned" | "Not published" | "Published";
type NavigationItem = { label: string; id: SectionId | "about"; href: string };
type FocusArea = {
  title: string;
  learning: string;
  relevance: string;
  destination: string;
};
// Editorial records, not live system state. Add external links only when verified.
export const siteContent = {
  name: "ajtech",
  title: "ajtech — Personal technology headquarters",
  description:
    "A Computer Engineer’s evolving workspace for systems, infrastructure, research, and the work of building.",
  navigation: [
    { label: "About", id: "about", href: publicPageHref("about") },
    { label: "Now", id: "now", href: "/#now" },
    { label: "Work", id: "work", href: publicPageHref("work") },
    { label: "Journal", id: "journal", href: publicPageHref("journal") },
    { label: "Research", id: "research", href: publicPageHref("research") },
    { label: "Infrastructure", id: "infrastructure", href: "/#infrastructure" },
    { label: "Research direction", id: "notes", href: "/#notes" },
    { label: "Contact", id: "contact", href: "/#contact" },
  ] satisfies NavigationItem[],
  identity: {
    eyebrow: "Personal technology headquarters",
    heading: "Understanding systems.\nBuilding from the ground up.",
    introduction:
      "I’m a Computer Engineer moving toward AI infrastructure engineering. My interests span the physical hardware, networks, and software that make computing possible.",
    purpose:
      "This is where I’m building a record of that work: the projects, the questions, and eventually the systems I operate.",
    trajectory: ["Engineer", "Builder", "Operator", "Infrastructure architect"],
    trajectoryLabel: "The direction I’m working toward",
    overview: {
      title: "An engineering direction, mapped.",
      caption: "Learning pathway · not an operational system",
      layers: [
        {
          title: "Computer engineering",
          detail: "Hardware + software foundations",
        },
        {
          title: "Systems & networks",
          detail: "Linux · resources · communication",
        },
        {
          title: "Infrastructure",
          detail: "Compute · cloud · distributed systems",
        },
        {
          title: "AI infrastructure",
          detail: "The systems behind AI workloads",
        },
        {
          title: "Data-center engineering",
          detail: "Long-term direction · Africa",
        },
      ],
    },
  },
  now: {
    title: "Building the foundation.",
    description:
      "My immediate project is this platform. Alongside it, my learning direction connects systems fundamentals to the infrastructure behind AI.",
    focus: [
      {
        title: "Systems & networks",
        learning: "Linux, resource management, and how machines communicate.",
        relevance:
          "Reliable infrastructure starts with understanding the behavior of a single machine and its network.",
        destination:
          "A foundation for administering and troubleshooting systems.",
      },
      {
        title: "Compute & infrastructure",
        learning: "Hardware, cloud infrastructure, and distributed systems.",
        relevance:
          "Compute depends on how resources are connected, allocated, and maintained.",
        destination:
          "The knowledge to design and eventually operate a self-hosted lab.",
      },
      {
        title: "AI & data centers",
        learning: "The infrastructure requirements behind AI workloads.",
        relevance:
          "AI systems depend on physical compute, networking, and the facilities that support them.",
        destination:
          "AI infrastructure engineering, with a long-term interest in data centers in Africa.",
      },
    ] satisfies FocusArea[],
  },
  work: {
    title: "The platform is the first project.",
    description:
      "A place to inspect engineering decisions as the work takes shape. This is the first documented project; further case studies will follow when there is work to share.",
    featuredProjectIds: ["personal-technology-headquarters"],
  },
  infrastructure: {
    title: "From understanding to operating.",
    description:
      "The long-term ambition is a self-hosted engineering lab, with public documentation of the systems I run and the decisions behind them.",
    status: "Planned" as ContentStatus,
    notice:
      "No infrastructure inventory or live operational data is published yet.",
    architecture: [
      { title: "Hardware", detail: "Physical resources" },
      { title: "Network", detail: "Connectivity" },
      { title: "Compute", detail: "Execution" },
      { title: "Services", detail: "Applications" },
      { title: "Observability", detail: "System feedback" },
    ],
    architectureCaption:
      "Conceptual system layers · planned lab, no deployed inventory",
    stages: [
      {
        title: "Document",
        description: "Record the hardware, networks, and system architecture.",
      },
      {
        title: "Operate",
        description:
          "Develop repeatable practices for hosting and maintaining services.",
      },
      {
        title: "Observe",
        description: "Publish meaningful measurements backed by real systems.",
      },
    ],
    caption: "Intended progression · not a deployed architecture",
  },
  notes: {
    title: "Questions worth investigating.",
    description:
      "The engineering journal records documented build work. The research archive records open technical questions and the learning direction behind them.",
    cycle: [
      { title: "Learn", detail: "Investigate a question" },
      { title: "Build", detail: "Put understanding to work" },
      { title: "Document", detail: "Record decisions & findings" },
      { title: "Operate", detail: "Learn from real behavior" },
    ],
    cycleCaption:
      "Intended practice · the journal and notebook will connect these stages",
    collections: [
      {
        title: "Research archive",
        label: "Question / investigate",
        description:
          "Question-led investigations into infrastructure, systems, protocols, and the foundations of computing.",
      },
    ],
    status: "Published" as ContentStatus,
  },
  contact: {
    title: "Start with a shared technical question.",
    description:
      "Systems, infrastructure, and the future of computing in Africa are the conversations I want this platform to make possible.",
    topics: [
      {
        title: "Technical exchange",
        description:
          "Questions about systems, networks, and infrastructure design.",
      },
      {
        title: "Engineering collaboration",
        description:
          "Shared problems, project ideas, and research into computing infrastructure in Africa.",
      },
    ],
    notice: "A public contact channel has not been added yet.",
  },
  footer: {
    label: "An engineering workspace, built deliberately.",
    note: "Static editorial content · no live telemetry",
  },
};
