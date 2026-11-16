import Link from "next/link";
import { publications } from "@/lib/publications";
import { researchHref } from "@/lib/research";
import { getSecurityArea, securityAreas } from "@/lib/security-areas";
import type { ResearchRecord } from "@/types/content";

const areaByDomain: Partial<Record<ResearchRecord["domain"], string>> = {
  "Blockchain Security": "blockchain-security",
  "AI Security": "ai-security",
  Cybersecurity: "cybersecurity",
};

export function WritingIndex({
  research,
}: {
  research: readonly ResearchRecord[];
}) {
  return (
    <div className="shell journal-page writing-page">
      <nav aria-label="Breadcrumb" className="journal-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Writing</span>
      </nav>
      <header className="journal-intro">
        <p className="eyebrow accent">Writing & publications</p>
        <h1>Security reports and research notes</h1>
        <p>
          Audit and assessment reports, and research notes that draw conclusions
          from them. Every entry links to the project record it comes from.
        </p>
        <p className="technical muted journal-count">
          {publications.length} reports ·{" "}
          {publications.filter((item) => item.availability === "Public").length}{" "}
          public · {research.length} research notes
        </p>
      </header>

      <section className="writing-section" aria-labelledby="reports-heading">
        <h2 id="reports-heading">Audit and assessment reports</h2>
        <p className="writing-section-intro">
          Public reports link to the full document. Private reports are
          summarised on their project record without exploit payloads or CTF
          solutions.
        </p>
        <ul className="writing-research-list">
          {publications.map((item) => {
            const area = getSecurityArea(item.area);
            return (
              <li key={item.title}>
                <div>
                  <p className="eyebrow">
                    {item.type} · {area.label} · {item.date}
                  </p>
                  <h3>
                    <a href={item.href}>{item.title}</a>
                  </h3>
                  <p>{item.summary}</p>
                  <p className="technical muted writing-availability">
                    {item.availability} ·{" "}
                    <Link href={`/work/${item.projectSlug}`}>
                      Project record
                    </Link>
                  </p>
                </div>
                <a
                  className="text-link"
                  href={item.href}
                  aria-label={`${item.availability === "Public" ? "Open report" : "Read summary"}: ${item.title}`}
                >
                  {item.availability === "Public"
                    ? "Open report"
                    : "Read summary"}{" "}
                  <span aria-hidden="true">
                    {item.availability === "Public" ? "↗" : "→"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        className="writing-section"
        aria-labelledby="research-notes-heading"
      >
        <h2 id="research-notes-heading">Research notes</h2>
        <p className="writing-section-intro">
          Each note states its question, evidence, findings, and limitations.
          Status shows whether the findings are validated or still in progress.
        </p>
        {securityAreas.map((area) => {
          const notes = research.filter(
            (record) => areaByDomain[record.domain] === area.id,
          );
          if (!notes.length) return null;
          return (
            <div className="writing-area" key={area.id}>
              <p className="eyebrow accent">
                {area.index} / {area.label}
              </p>
              <ul className="writing-research-list">
                {notes.map((record) => (
                  <li key={record.id}>
                    <div>
                      <p className="eyebrow">
                        {record.number} · {record.status}
                      </p>
                      <h3>
                        <Link href={researchHref(record)}>{record.title}</Link>
                      </h3>
                      <p>{record.summary}</p>
                    </div>
                    <Link
                      className="text-link"
                      href={researchHref(record)}
                      aria-label={`Read the research note: ${record.title}`}
                    >
                      Read note <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </div>
  );
}
