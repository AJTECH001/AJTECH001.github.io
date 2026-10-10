import Link from "next/link";
import { journalHref } from "@/lib/journal";
import { researchHref } from "@/lib/research";
import type { JournalEntry, ResearchRecord } from "@/types/content";

export function WritingIndex({
  entries,
  research,
}: {
  entries: readonly JournalEntry[];
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
        <p className="eyebrow accent">Writing / Engineering notes</p>
        <h1>Technical writing</h1>
        <p>
          Build notes and question-led investigations, with their publication
          state made clear. The engineering log documents work already
          completed; research topics below are early outlines, not finished
          findings.
        </p>
        <p className="technical muted journal-count">
          {entries.length} published{" "}
          {entries.length === 1 ? "engineering note" : "engineering notes"} ·{" "}
          {research.length} ongoing research topics
        </p>
      </header>

      <section
        className="writing-section"
        aria-labelledby="published-writing-heading"
      >
        <h2 id="published-writing-heading">Published engineering notes</h2>
        {entries.length > 0 ? (
          <ol className="journal-archive">
            {entries.map((entry) => (
              <li className="journal-row" key={entry.id}>
                <div className="journal-marker" aria-hidden="true">
                  <span />
                </div>
                <div className="journal-row-main">
                  <p className="journal-row-meta technical">
                    <span>{entry.period ?? "Undated"}</span>
                    <span>{entry.type}</span>
                  </p>
                  <h3>
                    <Link href={journalHref(entry)}>{entry.title}</Link>
                  </h3>
                  <p className="journal-summary">{entry.summary}</p>
                  <Link className="text-link" href={journalHref(entry)}>
                    Read the engineering log <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="writing-empty">
            No technical writing is published yet.
          </p>
        )}
      </section>

      <section
        className="writing-section"
        aria-labelledby="research-topics-heading"
      >
        <h2 id="research-topics-heading">Research topics in progress</h2>
        <p className="writing-section-intro">
          These records define questions and learning scope. They do not report
          validated research, operational experience, or completed outcomes.
        </p>
        {research.length > 0 ? (
          <ul className="writing-research-list">
            {research.map((record) => (
              <li key={record.id}>
                <div>
                  <p className="eyebrow">{record.domain} · In progress</p>
                  <h3>
                    <Link href={researchHref(record)}>{record.title}</Link>
                  </h3>
                  <p>{record.summary}</p>
                </div>
                <Link
                  className="text-link"
                  href={researchHref(record)}
                  aria-label={`Read the ongoing research outline: ${record.title}`}
                >
                  Open outline <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="writing-empty">
            Research notes will appear here when ready to share.
          </p>
        )}
      </section>
    </div>
  );
}
