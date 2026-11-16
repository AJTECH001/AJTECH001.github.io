import type { SecurityAreaId } from "@/types/project";

type ContactMethod = {
  id: string;
  label: string;
  value: string;
  href: `https://${string}` | `mailto:${string}` | `tel:${string}`;
};

type ExperienceRecord = {
  employer: string;
  role: string;
  period: string;
  location: string;
  /** Security areas this role provides evidence for; empty for foundations. */
  areas: SecurityAreaId[];
  responsibilities: string[];
};

type Certification = {
  name: string;
  year: string;
  issuer: string;
  detail?: string;
  area: SecurityAreaId;
};

type SkillGroup = {
  area: SecurityAreaId | "foundations";
  category: string;
  items: string[];
};

// Employment, education, and certifications are sourced from the owner's CV.
// Skills are limited to what is demonstrated by a role, report, or repository on this site.
export const professionalContent = {
  fullName: "Alade Jamiu Damilola",
  shortName: "Alade Jamiu",
  positioning: "Security Engineer · Blockchain Security · AI Security Research",
  headline:
    "I research, build, and secure systems across blockchain and artificial intelligence.",
  homeIntroduction:
    "My work centres on finding vulnerabilities and understanding attack surfaces in emerging technology: smart contracts and on-chain programs, LLM agents and their tools, and the application code around both. I write up what I find with clear severity, root cause, and remediation.",
  introduction: [
    "I am a security engineer focused on blockchain security and AI security research. I audit Solidity and Rust smart contracts, red-team LLM agents and MCP integrations, and build tooling that makes those assessments repeatable.",
    "I came to security through building. I have shipped smart contracts in production payment flows, developed backend services, and designed embedded access-control systems for bank-vault environments. That experience is how I read code today: as a builder looking for the assumption that does not hold.",
    "My current work is split between smart-contract auditing (EVM and Solana), adversarial testing of AI agents, and security write-ups that document each finding with impact, proof of concept, and a fix.",
  ],
  contact: [
    {
      id: "email",
      label: "Email",
      value: "aladejamiudamilola@gmail.com",
      href: "mailto:aladejamiudamilola@gmail.com",
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/AJTECH001",
      href: "https://github.com/AJTECH001",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/jamiualade",
      href: "https://linkedin.com/in/jamiualade",
    },
    {
      id: "x",
      label: "X",
      value: "x.com/Aj_Tech_01",
      href: "https://x.com/Aj_Tech_01",
    },
    {
      id: "phone",
      label: "Phone",
      value: "+234 908 446 8784",
      href: "tel:+2349084468784",
    },
  ] satisfies ContactMethod[],
  collaboration: [
    {
      title: "Smart contract security reviews",
      description:
        "Solidity and Rust (Anchor) code review, vulnerability analysis, and audit write-ups.",
    },
    {
      title: "AI security research",
      description:
        "Red teaming LLM applications, tool-using agents, RAG pipelines, and MCP servers.",
    },
    {
      title: "Security engineering roles",
      description:
        "Positions in blockchain security, AI security, and application security teams.",
    },
    {
      title: "Research and community",
      description:
        "Joint research, security competitions, workshops, and technical writing.",
    },
  ],
  experience: [
    {
      employer: "Blockchain Innovation Hub",
      role: "Blockchain Developer",
      period: "2023–Present",
      location: "NewGarage, Ibadan",
      areas: ["blockchain-security"],
      responsibilities: [
        "Performed smart contract auditing and security reviews, including analysis of reentrancy, overflow issues, and improper access control.",
        "Developed Solidity smart contracts with an emphasis on security, optimization, and gas efficiency.",
        "Built decentralized applications integrating frontend interfaces with blockchain networks using Web3 libraries and APIs.",
        "Contributed to Web3 architecture decisions, protocol improvements, and product innovation.",
      ],
    },
    {
      employer: "UNITED Pan-Africanist Movement (UPAM)",
      role: "Software Engineer",
      period: "2025–Present",
      location: "Windhoek, Namibia",
      areas: ["cybersecurity"],
      responsibilities: [
        "Design and develop backend systems and software services with an emphasis on security, reliability, and maintainability.",
        "Perform code reviews, debugging, testing, and performance optimization.",
        "Integrate databases and external services to improve application data flow, storage, and retrieval.",
      ],
    },
    {
      employer: "ImportaPay (Contract)",
      role: "Smart Contract Developer",
      period: "2025",
      location: "Wales, United Kingdom",
      areas: ["blockchain-security"],
      responsibilities: [
        "Worked on security-focused contract architecture, vulnerability analysis, testing, code review, and gas optimization.",
        "Designed and deployed Solidity smart contracts supporting cross-border payment flows, vendor payments, and transaction settlement within a regulated fintech environment.",
        "Collaborated with backend and product teams to integrate blockchain payment logic with traditional financial systems and licensed payment partners.",
      ],
    },
    {
      employer: "Xenea Initiative DMCC",
      role: "Blockchain Developer",
      period: "2024",
      location: "Dubai, United Arab Emirates",
      areas: ["blockchain-security"],
      responsibilities: [
        "Supported developers integrating applications, services, and developer tools with the Xenea blockchain ecosystem.",
        "Collaborated on technical requests and initiatives supporting the developer community.",
      ],
    },
    {
      employer: "Agusto Investment Limited",
      role: "IT Engineer",
      period: "January 2019–April 2022",
      location: "Onikan, Lagos",
      areas: ["cybersecurity"],
      responsibilities: [
        "Designed and programmed embedded control systems for automated security-booth door access and authentication.",
        "Integrated door-controller hardware with access-control technologies.",
        "Performed system testing, troubleshooting, and firmware updates to maintain availability and enhance security in bank-vault and security environments.",
      ],
    },
  ] satisfies ExperienceRecord[],
  education: [
    {
      institution: "Lagos State Polytechnic",
      qualification: "Higher National Diploma (HND), Computer Engineering",
      result: "Upper Credit",
      period: "2021–2023",
    },
    {
      institution: "Lagos State Polytechnic",
      qualification: "National Diploma (ND), Computer Engineering",
      result: "Upper Credit",
      period: "2017–2019",
    },
  ],
  certifications: [
    {
      name: "Rust Security Bootcamp",
      year: "2026",
      issuer: "Rektoff × Solana Foundation",
      detail:
        "Rust internals, Solana security principles, and a capstone security audit of a lending protocol.",
      area: "blockchain-security",
    },
    {
      name: "Introduction to Linux (LFS101)",
      year: "2026",
      issuer: "The Linux Foundation",
      detail: "Certificate ID: LF-rlevhrjsa9.",
      area: "cybersecurity",
    },
  ] satisfies Certification[],
  skills: [
    {
      area: "blockchain-security",
      category: "Blockchain security",
      items: [
        "Solidity",
        "Rust",
        "Anchor (Solana)",
        "EVM security",
        "Smart contract auditing",
        "DeFi protocol review",
        "Foundry",
        "Hardhat",
      ],
    },
    {
      area: "ai-security",
      category: "AI security",
      items: [
        "AI red teaming",
        "Prompt injection (direct and indirect)",
        "AI agent and tool-use security",
        "MCP security",
        "RAG security",
        "OWASP Top 10 for LLM Applications",
      ],
    },
    {
      area: "cybersecurity",
      category: "Cybersecurity",
      items: [
        "Application security",
        "Vulnerability research",
        "Web and browser security",
        "Authentication and authorization",
        "Linux",
        "Python",
        "Security tooling",
      ],
    },
    {
      area: "foundations",
      category: "Engineering foundations",
      items: [
        "TypeScript",
        "Node.js",
        "REST APIs",
        "PostgreSQL",
        "Git",
        "Embedded access-control systems",
      ],
    },
  ] satisfies SkillGroup[],
  teaching: [
    "Conduct workshops and tutorials on blockchain development, smart contracts, and secure software design principles.",
    "Guide developers integrating applications into blockchain ecosystems and applying coding best practices.",
    "Develop educational content and hands-on exercises for beginner and intermediate developers.",
  ],
} as const;
