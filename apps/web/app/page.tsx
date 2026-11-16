import { HomePage } from "@/components/home/home-page";
import { professionalContent } from "@/lib/professional-content";
import { siteContent } from "@/lib/site-content";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: professionalContent.fullName,
  alternateName: siteContent.name,
  url: siteContent.url,
  jobTitle: "Security Engineer",
  description: siteContent.description,
  knowsAbout: [
    "Blockchain security",
    "Smart contract auditing",
    "Solidity",
    "Rust",
    "Solana",
    "AI security",
    "AI red teaming",
    "Prompt injection",
    "Model Context Protocol security",
    "Application security",
  ],
  sameAs: professionalContent.contact
    .filter((item) => item.href.startsWith("https://"))
    .map((item) => item.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage />
    </>
  );
}
