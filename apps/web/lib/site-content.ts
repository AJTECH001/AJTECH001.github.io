import { professionalContent } from "@/lib/professional-content";

export const siteUrl = "https://ajtech001.github.io";

export const siteContent = {
  name: "AJTECH",
  url: siteUrl,
  title: `${professionalContent.fullName} — Security Engineer | Blockchain Security & AI Security Research`,
  description:
    "Security engineer specialising in blockchain security and AI security research: smart contract audits in Solidity and Rust, AI agent red teaming, and application security.",
  keywords: [
    "Security Engineer",
    "Blockchain Security Engineer",
    "Smart Contract Security Researcher",
    "Smart Contract Auditor",
    "AI Security Researcher",
    "AI Red Teaming",
    "LLM Security",
    "Solana Security",
    "Cybersecurity",
  ],
  identity: {
    eyebrow: professionalContent.positioning,
    heading: professionalContent.headline,
    introduction: professionalContent.homeIntroduction,
  },
  work: {
    title: "Selected security work",
    description:
      "Audits, assessments, and research labs, each with its problem, method, my contribution, and its findings.",
    featuredProjectIds: [
      "puppy-raffle-audit",
      "ai-agent-ctf-assessment",
      "indirect-prompt-injection-lab",
    ],
  },
  contact: {
    title: "Work with me",
    description:
      "I’m open to security research collaborations, blockchain and AI security engagements, security engineering roles, and community work.",
  },
  footer: {
    label: professionalContent.positioning,
    note: professionalContent.fullName,
  },
};
