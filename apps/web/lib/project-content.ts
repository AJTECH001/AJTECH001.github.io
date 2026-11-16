import type { ProjectRecord } from "@/types/project";

const published = (publishedAt: string) =>
  ({ state: "published", visibility: "public", publishedAt }) as const;

const auditReportsRepository = "https://github.com/AJTECH001/audit-reports";

// Every record is backed by a report, repository, or lab the owner produced.
// Severity counts are copied from the reports. Private reports are summarised
// without exploit payloads, CTF flags, or step-by-step solutions.
export const projectRecords: readonly ProjectRecord[] = [
  {
    id: "puppy-raffle-audit",
    slug: "puppy-raffle-audit",
    number: "B-01",
    title: "Puppy Raffle security audit",
    shortDescription:
      "Time-boxed manual review of an NFT raffle contract, covering fund handling, randomness, and winner selection.",
    category: { id: "smart-contract-audit", label: "Smart contract audit" },
    area: "blockchain-security",
    evidence: "Public report",
    contribution:
      "Sole reviewer: scoped the codebase, identified and classified every finding, wrote proofs of concept, and authored the report.",
    findings: [
      { severity: "High", count: 4 },
      { severity: "Medium", count: 4 },
      { severity: "Informational", count: 8 },
    ],
    outcome:
      "16 findings, including reentrancy that drains the contract balance.",
    domains: [
      {
        id: "evm",
        label: "EVM / Solidity",
        description: "Solidity smart contract review.",
      },
    ],
    publication: published("2026-01-07"),
    status: "Completed",
    period: "January 2026",
    technologies: ["Solidity", "Foundry", "EVM"],
    scope: "PuppyRaffle.sol · commit 22bbbb2",
    summary:
      "A security review of Puppy Raffle, a protocol that raffles NFTs of varying rarity and splits entrance fees between the winner and a fee address. The review was carried out on the Cyfrin Puppy Raffle training codebase.",
    overview: [
      { label: "Target", value: "PuppyRaffle.sol" },
      { label: "Commit", value: "22bbbb2c47f3f2b78c1b134590baf41383fd354f" },
      { label: "Method", value: "Manual review with proof-of-concept tests" },
      { label: "Report", value: "Published January 7, 2026" },
    ],
    sections: {
      problem: {
        paragraphs: [
          "The raffle holds participant funds, refunds entrants, selects a winner, and mints an NFT whose rarity is derived on-chain. Each of those steps is a place where value can be redirected or the protocol can be halted.",
        ],
      },
      approach: {
        items: [
          "Mapped roles (owner, players, fee address) and the flow of funds through enterRaffle, refund, selectWinner, and withdrawFees.",
          "Checked state updates against external calls, the source of randomness, arithmetic on fee accounting, and the assumptions behind the active-player checks.",
          "Wrote proofs of concept for the high-impact findings and classified each by impact and likelihood.",
        ],
      },
      contribution: {
        paragraphs: [
          "I carried out the review alone and authored the full report, including severity rationale and recommended mitigations for each finding.",
        ],
      },
      findings: {
        items: [
          "[H-1] Reentrancy in refund lets an entrant drain the contract balance, because the player slot is cleared after the external transfer.",
          "[H-2] Weak randomness in selectWinner allows a caller to predict or influence the winner and NFT rarity.",
          "[H-3] Integer overflow of totalFees silently loses accumulated fees.",
          "[H-4] A malicious winner can permanently halt the raffle.",
          "[M-1–M-4] Denial of service in the duplicate-entrant check, griefing of withdrawFees through forced ETH, an unsafe fee cast, and winners that cannot receive funds blocking new rounds.",
          "Eight informational issues, from floating pragmas and magic numbers to an erroneous index for the active player.",
        ],
      },
      lessons: {
        items: [
          "Checks-effects-interactions ordering still decides whether refund-style functions are safe.",
          "On-chain values such as timestamps and caller addresses are not a source of randomness.",
          "Balance-equality invariants turn forced ETH transfers into denial of service.",
        ],
      },
    },
    links: [
      {
        label: "Puppy Raffle audit report (PDF)",
        href: `${auditReportsRepository}/blob/main/PuppyRaffle-report.pdf`,
        kind: "Report",
      },
      {
        label: "audit-reports repository",
        href: auditReportsRepository,
        kind: "Repository",
      },
    ],
    relationships: [],
  },
  {
    id: "snowman-airdrop-audit",
    slug: "snowman-merkle-airdrop-audit",
    number: "B-02",
    title: "Snowman Merkle Airdrop security audit",
    shortDescription:
      "Review of an ERC-20 and ERC-721 airdrop that verifies eligibility with Merkle proofs and EIP-712 signatures.",
    category: { id: "smart-contract-audit", label: "Smart contract audit" },
    area: "blockchain-security",
    evidence: "Public report",
    contribution:
      "Sole reviewer: modelled the claim flow, identified and classified every finding, and authored the report.",
    findings: [
      { severity: "High", count: 3 },
      { severity: "Medium", count: 3 },
      { severity: "Low", count: 3 },
    ],
    outcome:
      "9 findings, including unrestricted NFT minting and an inconsistent signature type hash.",
    domains: [
      {
        id: "evm",
        label: "EVM / Solidity",
        description: "Solidity smart contract review.",
      },
    ],
    publication: published("2026-01-07"),
    status: "Completed",
    period: "January 2026",
    technologies: ["Solidity", "Foundry", "Merkle proofs", "EIP-712"],
    scope: "SnowmanAirdrop.sol · Snow.sol · Snowman.sol",
    summary:
      "A security review of a protocol that distributes Snow tokens and Snowman NFTs to eligible users through Merkle proof verification and signed claims. The target is the CodeHawks Snowman Merkle Airdrop First Flight codebase.",
    overview: [
      { label: "Target", value: "SnowmanAirdrop.sol, Snow.sol, Snowman.sol" },
      { label: "Roles", value: "Owner · Receiver · Minter" },
      { label: "Method", value: "Manual review with proof-of-concept tests" },
      { label: "Report", value: "Published January 7, 2026" },
    ],
    sections: {
      problem: {
        paragraphs: [
          "Airdrops combine access control (who may mint), cryptographic eligibility (Merkle proofs and signatures), and token accounting. A flaw in any of them lets ineligible users claim or eligible users be denied.",
        ],
      },
      approach: {
        items: [
          "Traced the claim path from signature verification through Merkle proof checks to NFT minting.",
          "Compared the EIP-712 type hash with the struct actually signed, and reviewed signature handling for malleability.",
          "Reviewed minting permissions, fee arithmetic, and time-based purchase logic for abuse and denial of service.",
        ],
      },
      contribution: {
        paragraphs: [
          "I carried out the review alone and authored the full report with severity classification and mitigations.",
        ],
      },
      findings: {
        items: [
          "[H-1] Unrestricted NFT minting in Snowman.sol lets anyone mint.",
          "[H-2] Potential reentrancy in SnowmanAirdrop.claimSnowman.",
          "[H-3] An inconsistent MESSAGE_TYPEHASH breaks the signed-claim scheme.",
          "[M-1–M-3] Front-running that denies a user's claim by changing their balance, signature malleability, and an unchecked fee overflow.",
          "[L-1–L-3] A missing claim-status check, a global timer reset that enables denial of service in buySnow, and a magic number.",
        ],
      },
      lessons: {
        items: [
          "Signature schemes fail quietly: a type hash that does not match the signed struct still compiles.",
          "Eligibility that depends on a live balance can be changed by anyone who can send tokens.",
        ],
      },
    },
    links: [
      {
        label: "Snowman Merkle Airdrop audit report (PDF)",
        href: `${auditReportsRepository}/blob/main/SnowmanMarkleAirdrop-report.pdf`,
        kind: "Report",
      },
      {
        label: "audit-reports repository",
        href: auditReportsRepository,
        kind: "Repository",
      },
    ],
    relationships: [],
  },
  {
    id: "rustfund-audit",
    slug: "rustfund-anchor-audit",
    number: "B-03",
    title: "RustFund Anchor program audit",
    shortDescription:
      "Security review of a Solana crowdfunding program written in Rust with the Anchor framework.",
    category: { id: "smart-contract-audit", label: "Solana program audit" },
    area: "blockchain-security",
    evidence: "Private report",
    contribution:
      "Sole reviewer: reviewed the program logic, wrote proofs of concept, and authored the report.",
    findings: [
      { severity: "High", count: 3 },
      { severity: "Medium", count: 1 },
    ],
    outcome:
      "4 findings, including a creator withdrawal path that bypasses the campaign goal and deadline.",
    domains: [
      {
        id: "svm",
        label: "Solana / Rust",
        description: "Anchor program review.",
      },
    ],
    publication: published("2026-11-16"),
    status: "Completed",
    year: 2026,
    technologies: ["Rust", "Anchor", "Solana"],
    scope: "programs/rustfund/src/lib.rs",
    summary:
      "A review of RustFund, a crowdfunding program in which creators set a goal and deadline and contributors can claim refunds if a campaign fails. The target is the CodeHawks RustFund First Flight codebase. The full report is not yet published.",
    overview: [
      { label: "Target", value: "Anchor program (src/lib.rs)" },
      { label: "Risk rating", value: "High" },
      { label: "Method", value: "Manual review with proof-of-concept tests" },
      { label: "Report", value: "Private; summary published here" },
    ],
    sections: {
      problem: {
        paragraphs: [
          "Crowdfunding programs hold contributor funds under rules about goals, deadlines, and refunds. If those rules are not enforced on-chain, contributors are trusting the creator rather than the program.",
        ],
      },
      approach: {
        items: [
          "Compared each instruction against the stated trust model for creators and contributors.",
          "Checked that contribution amounts were recorded and that refund paths followed checks-effects-interactions.",
          "Wrote a proof of concept and a recommended mitigation for each finding.",
        ],
      },
      contribution: {
        paragraphs: [
          "I carried out the review alone and authored the report. It applies the same review discipline as the EVM audits to Rust and Solana's account model.",
        ],
      },
      findings: {
        items: [
          "[H-1] Unrestricted withdrawal: the creator can withdraw funds immediately, regardless of whether the goal was met or the deadline passed.",
          "[H-2] Contribution amounts are not recorded, which breaks refund accounting.",
          "[H-3] Broken deadline-setter logic.",
          "[M-1] The refund instruction violates checks-effects-interactions.",
        ],
      },
      "current-state": {
        paragraphs: [
          "The report is complete and held privately. It will be added to the public audit-reports repository.",
        ],
      },
    },
    links: [],
    relationships: [],
  },
  {
    id: "solana-access-control-programs",
    slug: "solana-access-control-programs",
    number: "B-04",
    title: "Solana programs: access control and Token-2022 transfer hooks",
    shortDescription:
      "Anchor programs that enforce who may move tokens, built to understand Solana's account-validation surface from the builder's side.",
    category: { id: "secure-engineering", label: "Secure program engineering" },
    area: "blockchain-security",
    evidence: "Public repositories",
    contribution:
      "Designed and implemented each program, including PDA layouts, account constraints, and tests.",
    domains: [
      {
        id: "svm",
        label: "Solana / Rust",
        description: "Anchor program engineering.",
      },
    ],
    publication: published("2026-11-16"),
    status: "Completed",
    year: 2026,
    technologies: ["Rust", "Anchor", "Token-2022", "Solana"],
    scope: "Personal engineering work",
    summary:
      "A set of Anchor programs built around access control: a Token-2022 transfer hook that only lets whitelisted addresses transfer, a vault that compares vector-based and PDA-based whitelists, and an escrow. Building these is how I learned the account checks I now look for when auditing Solana programs.",
    overview: [
      {
        label: "Focus",
        value: "Signer checks, PDA derivation, account constraints",
      },
      {
        label: "Token standard",
        value: "SPL Token-2022 transfer hook extension",
      },
      { label: "Status", value: "Published repositories" },
    ],
    sections: {
      problem: {
        paragraphs: [
          "Most Solana program vulnerabilities come from accounts that are not validated: missing signer checks, unchecked owners, or PDAs derived from attacker-controlled seeds.",
        ],
      },
      approach: {
        items: [
          "Implemented whitelist enforcement inside a transfer hook that runs on every Token-2022 transfer.",
          "Compared a vector-stored whitelist with per-user whitelist PDAs, trading account size against lookup cost and flexibility.",
          "Used Anchor account constraints and PDA seeds to bind authority to the expected accounts.",
        ],
      },
      contribution: {
        paragraphs: [
          "I designed and built each program. They are learning and engineering projects, not audited production deployments.",
        ],
      },
    },
    links: [
      {
        label: "whitelist_transfer_hook",
        href: "https://github.com/AJTECH001/whitelist_transfer_hook",
        kind: "Repository",
      },
      {
        label: "transfer-hook-vault",
        href: "https://github.com/AJTECH001/transfer-hook-vault",
        kind: "Repository",
      },
      {
        label: "anchor_escrow",
        href: "https://github.com/AJTECH001/anchor_escrow",
        kind: "Repository",
      },
    ],
    relationships: [],
  },
  {
    id: "ai-agent-ctf-assessment",
    slug: "ai-agent-red-team-assessment",
    number: "A-01",
    title: "AI agent red-team assessment",
    shortDescription:
      "An authorized assessment of six purpose-built LLM agents in the ARKX AI Agent CTF, covering tool abuse, MCP authorization, and multi-agent trust.",
    category: { id: "ai-red-teaming", label: "AI red teaming" },
    area: "ai-security",
    secondaryAreas: ["cybersecurity"],
    evidence: "Private report",
    contribution:
      "Operated the engagement with an AI-assisted workflow: enumerated each agent's tools and endpoints, validated every exploit, submitted each flag, and approved the final report.",
    findings: [
      { severity: "Critical", count: 3 },
      { severity: "High", count: 2 },
      { severity: "Medium", count: 1 },
    ],
    outcome:
      "5 of 6 challenges solved; the sixth vulnerability confirmed and documented.",
    domains: [
      {
        id: "llm-agents",
        label: "LLM agents",
        description: "Tool-using and multi-agent LLM systems.",
      },
    ],
    publication: published("2026-11-16"),
    status: "Completed",
    period: "November 2026",
    technologies: ["LLM agents", "MCP", "HTTP", "Python"],
    scope: "ARKX AI Agent CTF · Advanced and Expert tracks",
    summary:
      "Six AI-agent challenges across the Advanced and Expert tracks, each an LLM agent exposed through tools that guard a protected flag. Five flags were captured. For the sixth, the vulnerability was confirmed, but the agent's guardrails blocked the character-level queries needed to extract the secret.",
    overview: [
      { label: "Engagement", value: "Authorized CTF, November 1, 2026" },
      { label: "Result", value: "5 / 6 captured · Expert rank" },
      { label: "Taxonomy", value: "OWASP Top 10 for LLM Applications · CWE" },
      {
        label: "Report",
        value: "Private; six write-ups plus an executive summary",
      },
    ],
    sections: {
      problem: {
        paragraphs: [
          "LLM agents are increasingly given tools that execute code, read protected resources, change privilege state, or move value. The question in each challenge was whether the security control lived in the backend or only in the model's instructions.",
        ],
      },
      approach: {
        items: [
          "Reconnaissance: enumerated each level's briefing, agent behaviour, tool list, and chat and auxiliary endpoints, including rate limits.",
          "Exploitation: drove each agent through its own tools, and where the agent was disabled, spoke to the underlying MCP server directly.",
          "Validation: confirmed every result against the platform and cross-checked the root cause against the platform's own lesson text.",
          "Reporting: wrote each challenge up with description, root cause, impact, severity, and remediation, mapped to OWASP LLM and CWE identifiers.",
        ],
      },
      contribution: {
        paragraphs: [
          "I ran the engagement as the human operator in an AI-assisted workflow. An AI agent helped analyse responses and draft notes, while I made the decisions, validated and submitted every flag, and approved the final report. Flags and step-by-step solutions are withheld here.",
        ],
      },
      findings: {
        items: [
          "Critical: code injection through a tool that evaluated model-supplied input, despite a denylist (CWE-94).",
          "Critical: unsafe YAML deserialization leading to remote code execution (CWE-502).",
          "Critical: a cross-agent confused deputy, in which a low-privilege worker wrote a privilege record that a privileged worker trusted (CWE-441).",
          "High: missing function-level authorization on an MCP server's tool and resource, reachable without the front-end agent (CWE-862).",
          "High: client-controlled pricing in a purchase flow, with a time-of-check to time-of-use double spend as the intended flaw (CWE-602, CWE-367).",
          "Medium: blind data exfiltration through a connectivity oracle side channel (CWE-203); confirmed but not extracted.",
        ],
      },
      result: {
        paragraphs: [
          "The recurring root cause was insecure tool design: dangerous operations were exposed to the model while authorization and validation were assumed to happen in the prompt. Every tool call needs to authenticate the principal and validate its inputs independently of the model.",
        ],
      },
    },
    links: [],
    relationships: [],
  },
  {
    id: "ai-redteam-skills",
    slug: "ai-red-team-skills",
    number: "A-02",
    title: "ai-redteam-skills: AI security assessment toolkit",
    shortDescription:
      "Nine terminal-first skills for AI coding agents that structure security assessments of LLM, RAG, agent, and MCP systems.",
    category: { id: "security-tooling", label: "Security tooling" },
    area: "ai-security",
    evidence: "Repository not yet public",
    contribution:
      "Designed and built the toolkit: skill specifications, deterministic helper scripts, the validation harness, and the security policy.",
    outcome: "9 skills implemented; validation harness passing.",
    domains: [
      {
        id: "ai-tooling",
        label: "AI security tooling",
        description: "Agent skills for AI security assessment.",
      },
    ],
    publication: published("2026-11-16"),
    status: "In development",
    period: "October 2026–present",
    technologies: ["Python", "Claude Code", "garak", "PyRIT", "promptfoo"],
    scope: "Open-source toolkit (pre-release)",
    summary:
      "A toolkit of skills that an AI coding agent can run against an AI application. It starts with an attack-surface x-ray and moves through dedicated LLM, RAG, agent, MCP, and model-layer audits to a threat model and a findings report. The architecture follows the Pashov Audit Group skills model, adapted for the AI attack surface.",
    overview: [
      { label: "Skills", value: "9" },
      {
        label: "Coverage",
        value: "LLM · RAG · Agents · MCP · Model supply chain · Reporting",
      },
      {
        label: "Status",
        value: "Implemented and tested; repository not yet public",
      },
    ],
    sections: {
      problem: {
        paragraphs: [
          "AI applications combine prompts, retrieval, tools, and third-party servers, and each layer has its own failure modes. Assessments are easy to run inconsistently, and findings are easy to overstate without a reproduction.",
        ],
      },
      approach: {
        items: [
          "ai-x-ray maps architecture, LLM, RAG, agent, and MCP integrations, trust boundaries, and research priorities before any audit runs.",
          "llm-auditor, rag-auditor, agent-auditor, and mcp-auditor cover prompt injection, retrieval poisoning, tool abuse and excessive agency, and tool poisoning and MCP supply-chain risk.",
          "ai-fuzzer plans garak, PyRIT, promptfoo, and DeepTeam runs against an authorized target. It is a dry-run planner by default and never sends traffic itself.",
          "ai-report accepts a finding as confirmed only when it has a reproduction, and lints reports for leaked secrets and live payloads.",
        ],
      },
      contribution: {
        paragraphs: [
          "I designed the skill set and wrote the specifications, scripts, and tests. Each skill requires explicit scope and treats target content and tool output as untrusted input.",
        ],
      },
      "current-state": {
        paragraphs: [
          "All nine skills are implemented and pass the repository's validation harness. The repository will be linked here once it is published.",
        ],
      },
    },
    links: [],
    relationships: [],
  },
  {
    id: "indirect-prompt-injection-lab",
    slug: "indirect-prompt-injection-lab",
    number: "A-03",
    title: "Indirect prompt injection lab",
    shortDescription:
      "An offline lab that reproduces indirect and stored prompt injection against a tool-using RAG agent, then measures two layers of defence.",
    category: { id: "ai-security-research", label: "AI security research" },
    area: "ai-security",
    evidence: "Local lab",
    contribution:
      "Built the lab: a toy agent with a switchable trust boundary, labelled payloads, a detector, a tool policy gate, a RAG pipeline, and 26 tests.",
    outcome: "26 tests across five suites pin each attack and defence.",
    domains: [
      {
        id: "llm-agents",
        label: "LLM agents",
        description: "Prompt injection in tool-using agents.",
      },
    ],
    publication: published("2026-11-16"),
    status: "Completed",
    year: 2026,
    technologies: ["Python", "pytest", "RAG"],
    scope: "Offline research lab; no real model or network",
    summary:
      "Indirect prompt injection happens when an attacker plants instructions in content an agent later reads, such as a web page, email, document, or tool output. This lab makes the mechanism concrete with an in-memory agent and benign, labelled payloads, then tests which defences hold.",
    overview: [
      {
        label: "Attacks",
        value: "Indirect · RAG poisoning · Stored (second-order)",
      },
      {
        label: "Defences",
        value: "Detector and sanitiser · Least-privilege tool gate",
      },
      { label: "Tests", value: "26 passing across 5 suites" },
    ],
    sections: {
      problem: {
        paragraphs: [
          "An agent has no inherent boundary between its instructions and the data it processes. If it can also take consequential actions, untrusted content can become an attacker's control channel.",
        ],
      },
      approach: {
        items: [
          "Layer 1: a heuristic detector and sanitiser that fences untrusted content before it reaches the model.",
          "Layer 2: risk-classified tools behind a policy gate, so a hijacked agent still cannot take consequential actions unattended.",
          "RAG: a knowledge base with per-document provenance, including one poisoned document, and dependency-free retrieval that keyword stuffing can hijack.",
          "Stored injection: a writable memory store in which an injection saved on one turn fires on a later, unrelated query.",
        ],
      },
      findings: {
        items: [
          "A stealth payload bypassed the detector, but the least-privilege policy gate still contained the resulting actions.",
          "Keyword stuffing was enough to pull a poisoned document into retrieved context in the naive pipeline.",
          "Content derived from untrusted input was laundered into a trusted internal source when written to memory. Read-time, trust-by-source checks missed it, and scanning on write was the reliable fix.",
        ],
      },
      lessons: {
        items: [
          "A detector is one layer. Containment has to come from limiting what the agent can do.",
          "Writes are a trust boundary too: derived content is still untrusted.",
        ],
      },
    },
    links: [],
    relationships: [],
  },
  {
    id: "self-xss-browser-lab",
    slug: "self-xss-browser-security-lab",
    number: "C-01",
    title: "Browser security lab: escalating self-XSS",
    shortDescription:
      "A local victim and attacker lab that reproduces published research on turning self-XSS into real impact with credentialless iframes and fetchLater.",
    category: { id: "web-security", label: "Web and browser security" },
    area: "cybersecurity",
    evidence: "Local lab",
    contribution:
      "Built the vulnerable victim app, the attacker pages for each level, and the mitigation switches used to test each step of the chain.",
    domains: [
      {
        id: "web",
        label: "Web security",
        description: "Browser security boundaries and XSS.",
      },
    ],
    publication: published("2026-11-16"),
    status: "Completed",
    year: 2026,
    technologies: ["Python", "Flask", "JavaScript", "Chromium"],
    scope: "Localhost lab reproducing Slonser's “Make Self-XSS Great Again”",
    summary:
      "Self-XSS is usually dismissed as low impact. This lab reproduces each technique from Slonser's research in a self-contained environment: a deliberately vulnerable app on one origin and an attacker on another. Each mitigation can be switched on to see exactly which step it breaks.",
    overview: [
      { label: "Levels", value: "4: storage partitioning to fetchLater" },
      {
        label: "Boundary",
        value: "Same-site, cross-origin (two localhost ports)",
      },
      {
        label: "Mitigations",
        value: "Output escaping · CSRF token · X-Frame-Options · SameSite",
      },
    ],
    sections: {
      problem: {
        paragraphs: [
          "Browser isolation features interact in subtle ways. Credentialless iframes partition storage but remain same-origin, which can turn a self-only bug into one that affects another user.",
        ],
      },
      approach: {
        items: [
          "Level 0: shows that a credentialless frame loads in a partitioned cookie jar while the top page still cannot read either frame.",
          "Level 1: pivots between same-origin frames to reach a sibling frame's DOM and cookies.",
          "Level 2: chains stored self-XSS with login CSRF to act as the victim and escalate their role.",
          "Level 3: uses a deferred fetchLater request when the target forbids framing.",
        ],
      },
      findings: {
        items: [
          "Escaping output at the sink removes the chain at its source. It is the real fix; the other controls only break individual steps.",
          "CSRF protection on login defeats the automated chain and forces a clickjacking variant.",
          "X-Frame-Options: DENY breaks levels 0–2, leaving only fetchLater, which is why the research introduces it.",
        ],
      },
    },
    links: [],
    relationships: [],
  },
  {
    id: "rust-role-based-auth",
    slug: "rust-role-based-auth",
    number: "C-02",
    title: "Rust authentication and role-based authorization",
    shortDescription:
      "A focused Rust library for authenticating users and enforcing a role hierarchy, with typed errors and unit tests.",
    category: { id: "appsec", label: "Application security" },
    area: "cybersecurity",
    evidence: "Public repository",
    contribution: "Designed and implemented the library, CLI demo, and tests.",
    domains: [
      {
        id: "appsec",
        label: "Application security",
        description: "Authentication and authorization design.",
      },
    ],
    publication: published("2026-11-16"),
    status: "Completed",
    year: 2025,
    technologies: ["Rust", "Cargo"],
    scope: "Reference implementation",
    summary:
      "A reference implementation of an authorization layer: users, credential checks, and a role hierarchy (Admin over Moderator over User) behind a small public API, with failure cases expressed as typed errors rather than booleans.",
    overview: [
      { label: "Roles", value: "Admin › Moderator › User" },
      { label: "Errors", value: "Typed AuthError enum" },
      { label: "Storage", value: "In-memory store (reference implementation)" },
    ],
    sections: {
      problem: {
        paragraphs: [
          "Broken access control is among the most common application vulnerabilities. Keeping authentication and authorization explicit and testable makes privilege checks harder to skip.",
        ],
      },
      approach: {
        items: [
          "Separated authentication (who you are) from authorization (what your role permits).",
          "Modelled failure modes as an error enum so callers must handle invalid credentials and insufficient privilege.",
          "Covered registration, invalid passwords, and role-hierarchy enforcement with unit tests.",
        ],
      },
      "current-state": {
        paragraphs: [
          "A reference implementation with an in-memory user store. It is not a hardened production authentication service.",
        ],
      },
    },
    links: [
      {
        label: "rust-role-based-auth",
        href: "https://github.com/AJTECH001/rust-role-based-auth",
        kind: "Repository",
      },
    ],
    relationships: [],
  },
];
