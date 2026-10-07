import Link from "next/link";
import { journalHref } from "@/lib/journal";
import { projectHref } from "@/lib/projects";
import type { JournalEntry } from "@/types/content";
import type { ProjectRecord } from "@/types/project";

export function JournalIndex({
  entries,
  projects,
}: {
  entries: readonly JournalEntry[];
  projects: readonly ProjectRecord[];
}) {
  return (
    <div className="shell journal-page">
      <header className="journal-intro">
        <p className="eyebrow accent">Field notes / Engineering log</p>
        <h1>Engineering journal</h1>
        <p>
          Notes on what I’m building, learning, investigating, and changing.
          Each entry records its state and links back to the engineering work
          behind it.
        </p>
        <p className="technical muted journal-count">
          {String(entries.length).padStart(2, "0")} published{" "}
          {entries.length === 1 ? "entry" : "entries"} / local editorial record
        </p>
      </header>
      <section
        aria-labelledby="journal-archive-heading"
        className="journal-archive"
      >
        <h2 id="journal-archive-heading" className="sr-only">
          Chronological archive
        </h2>
        {entries.map((entry) => (
          <article className="journal-row" key={entry.id}>
            <div className="journal-marker" aria-hidden="true">
              <span />
            </div>
            <div className="journal-row-main">
              <div className="journal-row-meta technical">
                <span>{entry.period ?? "Undated"}</span>
                {entry.number && <span>Entry {entry.number}</span>}
                <span>{entry.type}</span>
                <span className="journal-status">{entry.status}</span>
              </div>
              <h2>
                <Link href={journalHref(entry)}>{entry.title}</Link>
              </h2>
              <p className="journal-summary">{entry.summary}</p>
              <ul className="journal-topics" aria-label="Topics">
                {entry.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              {projects.some((project) =>
                entry.relatedProjects?.includes(project.id),
              ) && (
                <p className="journal-related technical">
                  Related record /{" "}
                  {projects
                    .filter((project) =>
                      entry.relatedProjects?.includes(project.id),
                    )
                    .map((project, index) => (
                      <span key={project.id}>
                        {index > 0 && ", "}
                        <Link href={projectHref(project)}>
                          Project {project.number}
                        </Link>
                      </span>
                    ))}
                </p>
              )}
            </div>
            <Link
              className="journal-open technical"
              href={journalHref(entry)}
              aria-label={"Open journal entry: " + entry.title}
            >
              Open <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
