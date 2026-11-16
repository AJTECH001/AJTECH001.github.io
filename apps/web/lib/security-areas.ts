import type { ProjectRecord, SecurityAreaId } from "@/types/project";

export type SecurityArea = {
  id: SecurityAreaId;
  path: `/${string}`;
  index: string;
  label: string;
  navLabel: string;
  title: string;
  summary: string;
  description: string;
  metaDescription: string;
  /** Topics shown on the area page. Each names the record that substantiates it. */
  topics: { title: string; description: string; evidence: string }[];
  /** Honest note on what is still being developed in this area. */
  developing: string;
};

export const securityAreas: readonly SecurityArea[] = [
  {
    id: "blockchain-security",
    path: "/blockchain-security",
    index: "01",
    label: "Blockchain Security",
    navLabel: "Blockchain",
    title: "Smart contract and protocol security across EVM and Solana.",
    summary:
      "Auditing Solidity and Rust smart contracts for the flaws that move or lock value.",
    description:
      "I review smart contracts and on-chain programs for vulnerabilities in fund handling, access control, randomness, signatures, and protocol logic. I work in Solidity on the EVM and in Rust with Anchor on Solana, and document each finding with severity, a proof of concept, and a mitigation.",
    metaDescription:
      "Smart contract security audits in Solidity and Rust (Anchor) by Alade Jamiu: audit reports, findings by severity, and Solana program security work.",
    topics: [
      {
        title: "Smart contract auditing",
        description:
          "Time-boxed manual review with severity classification, proofs of concept, and remediation.",
        evidence: "Three audit reports: B-01, B-02, B-03",
      },
      {
        title: "Solidity vulnerability classes",
        description:
          "Reentrancy, weak randomness, integer overflow, denial of service, signature malleability, and broken access control.",
        evidence: "Findings in B-01 and B-02",
      },
      {
        title: "Rust and Solana program security",
        description:
          "Anchor account validation, PDA design, checks-effects-interactions in Rust, and Token-2022 transfer hooks.",
        evidence: "B-03, B-04, Rust Security Bootcamp",
      },
      {
        title: "DeFi and payment protocols",
        description:
          "Security-focused contract architecture for cross-border payments, and a capstone audit of a Solana lending protocol.",
        evidence: "ImportaPay contract role, Rektoff capstone",
      },
    ],
    developing:
      "Next: publishing the RustFund report and taking part in competitive audit contests.",
  },
  {
    id: "ai-security",
    path: "/ai-security",
    index: "02",
    label: "AI Security Research",
    navLabel: "AI Security",
    title: "Red teaming LLM agents, their tools, and the systems around them.",
    summary:
      "Adversarial testing of LLM applications, tool-using agents, RAG pipelines, and MCP servers.",
    description:
      "I test where AI systems trust the wrong thing: injected instructions in retrieved content, tools that execute model output, MCP servers without authorization, and agents that trust each other. Alongside assessments, I build labs and tooling that make the results reproducible.",
    metaDescription:
      "AI security research and red teaming by Alade Jamiu: AI agent CTF assessment, prompt injection research, MCP security, and an AI security assessment toolkit.",
    topics: [
      {
        title: "AI agent red teaming",
        description:
          "Exploiting tool abuse, code execution, and broken authorization in purpose-built LLM agents.",
        evidence: "A-01: 5 of 6 challenges solved",
      },
      {
        title: "MCP and multi-agent security",
        description:
          "Missing function-level authorization on MCP servers, and confused-deputy trust between agents.",
        evidence: "A-01 findings, mcp-auditor in A-02",
      },
      {
        title: "Prompt injection",
        description:
          "Direct, indirect, RAG-borne, and stored (second-order) injection, with layered defences.",
        evidence: "A-03: 26-test lab",
      },
      {
        title: "Assessment methodology and tooling",
        description:
          "Attack-surface mapping, OWASP LLM-aligned audits, automated adversarial test planning, and reproducible reporting.",
        evidence: "A-02: 9-skill toolkit",
      },
    ],
    developing:
      "Next: publishing the toolkit and writing up the prompt injection research in full.",
  },
  {
    id: "cybersecurity",
    path: "/cybersecurity",
    index: "03",
    label: "Cybersecurity",
    navLabel: "Cybersecurity",
    title: "Application, web, and access-control security.",
    summary:
      "The application security fundamentals underneath blockchain and AI systems.",
    description:
      "Blockchain and AI vulnerabilities usually land in ordinary application code: deserialization, code injection, authorization, and browser trust boundaries. This area covers that groundwork, from web security research labs to authorization design and physical access-control systems.",
    metaDescription:
      "Cybersecurity work by Alade Jamiu: application security, web and browser security research, authentication and authorization, and access-control systems.",
    topics: [
      {
        title: "Application security",
        description:
          "Code injection (CWE-94), unsafe deserialization (CWE-502), missing authorization (CWE-862), and TOCTOU (CWE-367).",
        evidence: "Classes exploited in A-01",
      },
      {
        title: "Web and browser security",
        description:
          "Same-origin policy, storage partitioning, XSS escalation, CSRF, framing controls, and SameSite cookies.",
        evidence: "C-01: browser security lab",
      },
      {
        title: "Authentication and authorization",
        description:
          "Explicit role hierarchies, typed failure modes, and tested privilege checks.",
        evidence: "C-02: public repository",
      },
      {
        title: "Access-control systems and Linux",
        description:
          "Embedded door-access and authentication systems in bank-vault environments; Linux fundamentals.",
        evidence: "Agusto Investment role, LFS101",
      },
    ],
    developing:
      "Next: more structured web application testing and documented Linux hardening exercises.",
  },
];

export function getSecurityArea(id: SecurityAreaId): SecurityArea {
  const area = securityAreas.find((item) => item.id === id);
  if (!area) throw new Error(`Unknown security area: ${id}`);
  return area;
}

export function projectsForArea(
  projects: readonly ProjectRecord[],
  id: SecurityAreaId,
  { includeSecondary = false } = {},
) {
  return projects.filter(
    (project) =>
      project.area === id ||
      (includeSecondary && project.secondaryAreas?.includes(id)),
  );
}

/** Totals derived from the records so homepage figures never drift from the evidence. */
export function evidenceSummary(projects: readonly ProjectRecord[]) {
  const audits = projects.filter(
    (project) => project.category.id === "smart-contract-audit",
  );
  const auditFindings = audits
    .flatMap((project) => project.findings ?? [])
    .reduce((total, finding) => total + finding.count, 0);
  const auditHighs = audits
    .flatMap((project) => project.findings ?? [])
    .filter(
      (finding) =>
        finding.severity === "High" || finding.severity === "Critical",
    )
    .reduce((total, finding) => total + finding.count, 0);
  return {
    audits: audits.length,
    auditFindings,
    auditHighs,
    publicReports: audits.filter(
      (project) => project.evidence === "Public report",
    ).length,
  };
}
