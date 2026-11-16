import type { ResearchRecord } from "@/types/content";

const projectEvidence = (id: string, slug: string, note: string) => ({
  id,
  kind: "document" as const,
  locator: `/work/${slug}`,
  visibility: "public" as const,
  note,
});

// Research notes synthesise the owner's own audits, assessments, and labs.
// Findings are limited to what those records demonstrate.
export const researchRecords: readonly ResearchRecord[] = [
  {
    id: "agent-guardrails-are-not-authorization",
    kind: "research",
    slug: "agent-guardrails-are-not-authorization",
    number: "R-001",
    title: "Agent guardrails are not authorization",
    summary:
      "What six AI-agent challenges show about where security controls belong when an LLM is given tools.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-11-16",
    },
    updatedAt: "2026-11-16",
    revision: "1",
    domainIds: ["ai-security"],
    evidence: [
      projectEvidence(
        "ai-agent-assessment-record",
        "ai-agent-red-team-assessment",
        "A-01 summarises the six-challenge assessment, its severity ratings, and the OWASP LLM and CWE mapping.",
      ),
    ],
    status: "Validated",
    domain: "AI Security",
    period: "November 2026",
    topics: ["AI agents", "MCP", "Tool abuse", "Authorization", "OWASP LLM"],
    technologies: ["LLM agents", "MCP"],
    question:
      "When an LLM agent can call privileged tools, does the security boundary hold if the model is persuaded to misbehave?",
    context:
      "The ARKX AI Agent CTF exposes purpose-built LLM agents through tools that guard a protected secret. I assessed six challenges across the Advanced and Expert tracks and solved five.",
    findings: [
      "In five of the six challenges, a tool performed a privileged or dangerous operation, such as evaluating code, deserializing YAML, unlocking a resource, writing privilege state, or accepting a price, while trusting the model or the caller to act as gatekeeper.",
      "Disabling the front-end agent did not protect the MCP server behind it: its tool and resource had no function-level authorization of their own.",
      "Multi-agent systems inherit confused-deputy risk. A low-privilege worker could write a record that a privileged worker trusted without verification.",
      "Model-level guardrails did slow one attack: they blocked the character-level queries needed to extract a secret through a side channel, even though the side channel itself was confirmed.",
    ],
    implications: [
      "Every tool call should authenticate the principal and validate its inputs in the backend, independently of the model.",
      "Treat MCP servers as APIs with their own attack surface, not as implementation details of an agent.",
      "Data shared between agents needs provenance and integrity checks; self-asserted status fields are attacker-controlled.",
    ],
    limitations: [
      "CTF targets are purpose-built to be vulnerable, so these observations show failure modes, not how common they are in production systems.",
      "Flags and step-by-step solutions are withheld.",
    ],
    currentState:
      "Findings validated against the platform for five of six challenges. A longer write-up is planned.",
    relationships: [
      {
        id: "r001-a01",
        from: {
          kind: "research",
          id: "agent-guardrails-are-not-authorization",
        },
        to: { kind: "project", id: "ai-agent-ctf-assessment" },
        predicate: "explains",
        explanation:
          "This note draws its cross-cutting conclusions from the A-01 assessment.",
        evidenceIds: ["ai-agent-assessment-record"],
      },
    ],
    relatedProjects: ["ai-redteam-skills"],
    relatedResearch: ["indirect-prompt-injection-defence-in-depth"],
  },
  {
    id: "indirect-prompt-injection-defence-in-depth",
    kind: "research",
    slug: "indirect-prompt-injection-defence-in-depth",
    number: "R-002",
    title: "Indirect prompt injection needs defence in depth",
    summary:
      "Why detecting injected instructions is not enough, and why the agent's own memory is a trust boundary.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-11-16",
    },
    updatedAt: "2026-11-16",
    revision: "1",
    domainIds: ["ai-security"],
    evidence: [
      projectEvidence(
        "ipi-lab-record",
        "indirect-prompt-injection-lab",
        "A-03 describes the lab, its two defensive layers, and the 26 tests that pin each result.",
      ),
    ],
    status: "Ongoing",
    domain: "AI Security",
    period: "2026",
    topics: [
      "Prompt injection",
      "RAG poisoning",
      "Stored injection",
      "Least privilege",
    ],
    technologies: ["Python", "RAG"],
    question:
      "Which defences still hold once an injected instruction has reached a tool-using agent's context?",
    context:
      "I built an offline lab with a toy agent, labelled benign payloads, a detector, a tool policy gate, a RAG pipeline, and a writable memory store, so each attack and defence can be run and tested in isolation.",
    experiments: [
      {
        hypothesis:
          "A content detector is sufficient to stop indirect prompt injection.",
        method:
          "Run a stealth payload designed to evade the detector through the full retrieve, scan, decide, and act pipeline.",
        observation:
          "The payload passed the detector. The least-privilege policy gate still blocked the consequential action.",
        conclusion:
          "Detection reduces exposure, but containment has to come from limiting what the agent can do.",
      },
      {
        hypothesis: "Content from a trusted internal source is safe to reuse.",
        method:
          "Store a note derived from an attacker-supplied ticket, then retrieve it on a later, unrelated query.",
        observation:
          "The note was tagged as internal and trusted, and the injection fired on the second turn.",
        conclusion:
          "Writes are a trust boundary. Scan on write and quarantine derived content; re-scanning on read is the backstop.",
      },
    ],
    findings: [
      "Keyword stuffing was enough to pull a poisoned document into retrieved context in a naive RAG pipeline.",
      "Trust-by-source checks at read time miss provenance laundering through the agent's own memory.",
    ],
    openQuestions: [
      "How do these defences behave against a real model rather than a deterministic toy agent?",
      "How can tool risk classification be derived automatically from a tool's schema and side effects?",
    ],
    limitations: [
      "The lab uses an in-memory agent with no real model or network, so results describe mechanisms, not model-specific rates.",
    ],
    currentState:
      "Lab complete with 26 passing tests. Testing against real models is next.",
    relationships: [
      {
        id: "r002-a03",
        from: {
          kind: "research",
          id: "indirect-prompt-injection-defence-in-depth",
        },
        to: { kind: "project", id: "indirect-prompt-injection-lab" },
        predicate: "documents",
        explanation: "The experiments in this note run in the A-03 lab.",
        evidenceIds: ["ipi-lab-record"],
      },
    ],
    relatedResearch: ["agent-guardrails-are-not-authorization"],
  },
  {
    id: "recurring-smart-contract-vulnerabilities",
    kind: "research",
    slug: "recurring-smart-contract-vulnerability-classes",
    number: "R-003",
    title: "Recurring vulnerability classes across three audits",
    summary:
      "Patterns from the Puppy Raffle, Snowman Merkle Airdrop, and RustFund reviews: 29 findings, 10 of them high severity.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-11-16",
    },
    updatedAt: "2026-11-16",
    revision: "1",
    domainIds: ["blockchain-security"],
    evidence: [
      projectEvidence(
        "puppy-raffle-record",
        "puppy-raffle-audit",
        "B-01: 4 high, 4 medium, and 8 informational findings.",
      ),
      projectEvidence(
        "snowman-record",
        "snowman-merkle-airdrop-audit",
        "B-02: 3 high, 3 medium, and 3 low findings.",
      ),
      projectEvidence(
        "rustfund-record",
        "rustfund-anchor-audit",
        "B-03: 3 high findings and 1 medium finding.",
      ),
    ],
    status: "Validated",
    domain: "Blockchain Security",
    period: "2026",
    topics: [
      "Smart contracts",
      "Reentrancy",
      "Access control",
      "Signatures",
      "Solana",
    ],
    technologies: ["Solidity", "Rust", "Anchor"],
    question:
      "Which root causes recur across small protocols, regardless of language or chain?",
    context:
      "These are three time-boxed reviews of training and First Flight codebases, two in Solidity and one in Rust with Anchor.",
    findings: [
      "Ordering of external calls and state updates: reentrancy in Puppy Raffle's refund and Snowman's claim, and a checks-effects-interactions violation in RustFund's refund. The bug class carries across languages.",
      "Missing or weak authorization: unrestricted NFT minting (Snowman) and unrestricted creator withdrawal (RustFund). Both are cases of business rules that exist in the specification but not in the code.",
      "Unsafe arithmetic and accounting: fee overflow (Puppy Raffle, Snowman) and unrecorded contribution amounts (RustFund).",
      "Denial of service through assumptions about other actors: winners that cannot receive funds, forced ETH breaking balance checks, and a global purchase timer any user can reset.",
      "Cryptographic glue: an EIP-712 type hash that does not match the signed struct, and signature malleability.",
    ],
    implications: [
      "Start every review by writing down which business rules must hold on-chain, then look for the code that enforces each one.",
    ],
    limitations: [
      "Three small codebases are a small sample; they show recurring patterns, not frequency in production protocols.",
    ],
    currentState:
      "Updated with each new review. The RustFund report will be published alongside the others.",
    relationships: [
      {
        id: "r003-b01",
        from: {
          kind: "research",
          id: "recurring-smart-contract-vulnerabilities",
        },
        to: { kind: "project", id: "puppy-raffle-audit" },
        predicate: "explains",
        explanation: "Puppy Raffle findings contribute to these patterns.",
        evidenceIds: ["puppy-raffle-record"],
      },
      {
        id: "r003-b02",
        from: {
          kind: "research",
          id: "recurring-smart-contract-vulnerabilities",
        },
        to: { kind: "project", id: "snowman-airdrop-audit" },
        predicate: "explains",
        explanation:
          "Snowman Merkle Airdrop findings contribute to these patterns.",
        evidenceIds: ["snowman-record"],
      },
      {
        id: "r003-b03",
        from: {
          kind: "research",
          id: "recurring-smart-contract-vulnerabilities",
        },
        to: { kind: "project", id: "rustfund-audit" },
        predicate: "explains",
        explanation: "RustFund findings show the same classes in Rust.",
        evidenceIds: ["rustfund-record"],
      },
    ],
    relatedResearch: ["solana-account-validation"],
  },
  {
    id: "solana-account-validation",
    kind: "research",
    slug: "solana-program-security-account-validation",
    number: "R-004",
    title: "Solana program security starts with account validation",
    summary:
      "Notes from building and auditing Anchor programs: signer checks, PDA seeds, and the business rules Anchor cannot infer.",
    publication: {
      state: "published",
      visibility: "public",
      publishedAt: "2026-11-16",
    },
    updatedAt: "2026-11-16",
    revision: "1",
    domainIds: ["blockchain-security"],
    evidence: [
      projectEvidence(
        "solana-programs-record",
        "solana-access-control-programs",
        "B-04 lists the published Anchor programs built around access control.",
      ),
      projectEvidence(
        "rustfund-validation-record",
        "rustfund-anchor-audit",
        "B-03 records the authorization and accounting findings in an Anchor program.",
      ),
    ],
    status: "Ongoing",
    domain: "Blockchain Security",
    period: "2026",
    topics: ["Solana", "Anchor", "PDAs", "Token-2022", "Rust"],
    technologies: ["Rust", "Anchor", "Token-2022"],
    question:
      "Which security properties does Anchor enforce for you, and which must the program author still state explicitly?",
    context:
      "This note combines my Anchor programs (a transfer-hook whitelist, a vault, and an escrow), the RustFund audit, and the Rektoff × Solana Foundation Rust Security Bootcamp, whose capstone was a security audit of a lending protocol.",
    concepts: [
      "Signer and owner checks on every account an instruction trusts",
      "PDA derivation from seeds the caller cannot control",
      "Account constraints as executable statements of the trust model",
      "Business rules (goals, deadlines, limits) that the framework cannot infer",
    ],
    findings: [
      "Anchor account types and constraints remove whole classes of account-confusion bugs, but RustFund's high-severity findings were all business rules that no constraint expressed.",
      "Transfer hooks move access control into every transfer, so the whitelist account's derivation and authority become part of the token's security.",
    ],
    openQuestions: [
      "How should a review checklist separate framework-enforced checks from author-enforced invariants?",
    ],
    currentState:
      "Ongoing. Extended with each Solana program I build or review.",
    relationships: [
      {
        id: "r004-b04",
        from: { kind: "research", id: "solana-account-validation" },
        to: { kind: "project", id: "solana-access-control-programs" },
        predicate: "documents",
        explanation:
          "The programs in B-04 are the builder's side of this note.",
        evidenceIds: ["solana-programs-record"],
      },
    ],
    relatedProjects: ["rustfund-audit"],
    relatedResearch: ["recurring-smart-contract-vulnerabilities"],
  },
];
