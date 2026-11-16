import type { SecurityAreaId } from "@/types/project";

export type Publication = {
  title: string;
  type: "Audit report" | "Assessment report";
  date: string;
  summary: string;
  area: SecurityAreaId;
  /** The project record that documents this publication. */
  projectSlug: string;
  /** Public document URL, or the project record when the report is private. */
  href: string;
  availability: "Public" | "Private (summary published)";
};

const reports = "https://github.com/AJTECH001/audit-reports/blob/main";

export const publications: readonly Publication[] = [
  {
    title: "Puppy Raffle audit report",
    type: "Audit report",
    date: "January 2026",
    summary:
      "4 high, 4 medium, and 8 informational findings, including reentrancy in refund and weak randomness in winner selection.",
    area: "blockchain-security",
    projectSlug: "puppy-raffle-audit",
    href: `${reports}/PuppyRaffle-report.pdf`,
    availability: "Public",
  },
  {
    title: "Snowman Merkle Airdrop audit report",
    type: "Audit report",
    date: "January 2026",
    summary:
      "3 high, 3 medium, and 3 low findings, including unrestricted minting and an inconsistent EIP-712 type hash.",
    area: "blockchain-security",
    projectSlug: "snowman-merkle-airdrop-audit",
    href: `${reports}/SnowmanMarkleAirdrop-report.pdf`,
    availability: "Public",
  },
  {
    title: "RustFund Anchor program audit report",
    type: "Audit report",
    date: "2026",
    summary:
      "3 high findings and 1 medium finding in a Solana crowdfunding program, led by an unrestricted creator withdrawal.",
    area: "blockchain-security",
    projectSlug: "rustfund-anchor-audit",
    href: "/work/rustfund-anchor-audit",
    availability: "Private (summary published)",
  },
  {
    title: "AI agent red-team assessment report",
    type: "Assessment report",
    date: "November 2026",
    summary:
      "Six challenge write-ups and an executive summary mapped to the OWASP Top 10 for LLM Applications and CWE.",
    area: "ai-security",
    projectSlug: "ai-agent-red-team-assessment",
    href: "/work/ai-agent-red-team-assessment",
    availability: "Private (summary published)",
  },
];
