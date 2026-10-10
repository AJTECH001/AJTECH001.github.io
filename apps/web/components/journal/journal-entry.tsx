import Link from "next/link";
import type { JournalEntry as Entry } from "@/types/content";

type RelatedLink = {
  id: string;
  title: string;
  href: string;
  explanation: string;
};
type Neighbour = { title: string; href: string } | undefined;

const debuggingLabels = [
  ["symptom", "Symptom"],
  ["investigation", "Investigation"],
  ["hypothesis", "Hypothesis"],
  ["test", "Test"],
  ["rootCause", "Root cause"],
  ["fix", "Fix"],
  ["lesson", "Lesson"],
] as const;
const experimentLabels = [
  ["hypothesis", "Hypothesis"],
  ["test", "Test"],
  ["observation", "Observation"],
  ["conclusion", "Conclusion"],
] as const;

function TextSection({
  id,
  title,
  paragraphs,
  items,
}: {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
}) {
  const content = [...(paragraphs ?? []), ...(items ?? [])].filter((text) =>
    text.trim(),
  );
  if (!content.length) return null;
  return (
    <section
      className="journal-section"
      id={id}
      aria-labelledby={id + "-title"}
    >
      <h2 id={id + "-title"}>{title}</h2>
      {paragraphs
        ?.filter((text) => text.trim())
        .map((text) => (
          <p key={text}>{text}</p>
        ))}
      {!!items?.filter((text) => text.trim()).length && (
        <ul className="journal-points">
          {items
            .filter((text) => text.trim())
            .map((text) => (
              <li key={text}>{text}</li>
            ))}
        </ul>
      )}
    </section>
  );
}

export function JournalEntry({
  entry,
  related,
  previous,
  next,
}: {
  entry: Entry;
  related: readonly RelatedLink[];
  previous: Neighbour;
  next: Neighbour;
}) {
  const hasExperiments = entry.experiments?.some((experiment) =>
    experimentLabels.some(([key]) => !!experiment[key]?.trim()),
  );
  const hasDebugging = entry.debugging?.some((caseRecord) =>
    debuggingLabels.some(([key]) => !!caseRecord[key]?.trim()),
  );
  const sections = [
    ["context", "Context", entry.context],
    ["objective", "Objective", entry.objective],
    ["problem", "Problem", entry.problem],
  ] as const;
  const visibleSections = [
    ...sections.filter(([, , value]) => !!value?.trim()),
    ...(entry.investigation?.some((text) => text.trim())
      ? [["investigation", "Investigation", "list"] as const]
      : []),
    ...(hasExperiments
      ? [["experiments", "Experiments", "list"] as const]
      : []),
    ...(entry.implementation?.some((text) => text.trim())
      ? [["implementation", "Implementation", "list"] as const]
      : []),
    ...(hasDebugging ? [["debugging", "Debugging", "list"] as const] : []),
    ...(entry.decisions?.some((text) => text.trim())
      ? [["decisions", "Engineering decisions", "list"] as const]
      : []),
    ...(entry.tradeoffs?.some((text) => text.trim())
      ? [["tradeoffs", "Tradeoffs", "list"] as const]
      : []),
    ...(entry.lessons?.some((text) => text.trim())
      ? [["lessons", "Lessons", "list"] as const]
      : []),
    ...(entry.result?.trim()
      ? [["result", "Result", entry.result] as const]
      : []),
    ...(entry.currentState?.trim()
      ? [["current-state", "Current state", entry.currentState] as const]
      : []),
    ...(related.length
      ? [["related", "Related work and research", "list"] as const]
      : []),
    ...(entry.externalLinks?.length
      ? [["references", "External references", "list"] as const]
      : []),
  ];

  return (
    <article className="shell journal-entry">
      <nav aria-label="Breadcrumb" className="journal-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/journal">Writing</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{entry.title}</span>
      </nav>
      <header className="journal-entry-header">
        <p className="eyebrow accent">
          Engineering log{entry.number ? " / Entry " + entry.number : ""}
        </p>
        <div className="journal-entry-meta technical">
          {entry.period && <span>{entry.period}</span>}
          <span>{entry.type}</span>
          <span>{entry.status}</span>
        </div>
        <h1>{entry.title}</h1>
        <p className="journal-entry-summary">{entry.summary}</p>
        <ul className="journal-topics" aria-label="Topics">
          {entry.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        {!!entry.technologies?.length && (
          <p className="journal-technologies">
            <span className="technical muted">Technologies / </span>
            {entry.technologies.join(" · ")}
          </p>
        )}
      </header>
      <div className="journal-document">
        <nav aria-label="On this entry" className="journal-toc">
          <p className="eyebrow">In this entry</p>
          <ol>
            {visibleSections.map(([id, title], index) => (
              <li key={id}>
                <a href={"#" + id}>
                  <span className="technical accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="journal-body">
          {sections.map(([id, title, value]) =>
            value ? (
              <TextSection
                key={id}
                id={id}
                title={title}
                paragraphs={[value]}
              />
            ) : null,
          )}
          {!!entry.investigation?.length && (
            <TextSection
              id="investigation"
              title="Investigation"
              items={entry.investigation}
            />
          )}
          {hasExperiments && (
            <section
              className="journal-section"
              id="experiments"
              aria-labelledby="experiments-title"
            >
              <h2 id="experiments-title">Experiments</h2>
              {entry.experiments?.map((experiment, index) => {
                const steps = experimentLabels.flatMap(([key, label]) => {
                  const value = experiment[key];
                  return value?.trim() ? [{ label, value }] : [];
                });
                return steps.length ? (
                  <dl className="journal-sequence" key={index}>
                    {steps.map((step) => (
                      <div key={step.label}>
                        <dt>{step.label}</dt>
                        <dd>{step.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null;
              })}
            </section>
          )}
          {!!entry.implementation?.length && (
            <TextSection
              id="implementation"
              title="Implementation"
              items={entry.implementation}
            />
          )}
          {hasDebugging && (
            <section
              className="journal-section"
              id="debugging"
              aria-labelledby="debugging-title"
            >
              <h2 id="debugging-title">Debugging record</h2>
              {entry.debugging?.map((caseRecord, index) => {
                const steps = debuggingLabels.flatMap(([key, label]) => {
                  const value = caseRecord[key];
                  return value?.trim() ? [{ label, value }] : [];
                });
                return steps.length ? (
                  <article
                    className="debug-sequence"
                    key={caseRecord.symptom ?? index}
                  >
                    <h3>
                      {caseRecord.symptom ??
                        "Investigation " + String(index + 1).padStart(2, "0")}
                    </h3>
                    <dl className="journal-sequence">
                      {steps.map((step) => (
                        <div key={step.label}>
                          <dt>{step.label}</dt>
                          <dd>{step.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ) : null;
              })}
            </section>
          )}
          {!!entry.decisions?.length && (
            <TextSection
              id="decisions"
              title="Engineering decisions"
              items={entry.decisions}
            />
          )}
          {!!entry.tradeoffs?.length && (
            <TextSection
              id="tradeoffs"
              title="Tradeoffs"
              items={entry.tradeoffs}
            />
          )}
          {!!entry.lessons?.length && (
            <TextSection id="lessons" title="Lessons" items={entry.lessons} />
          )}
          {entry.result && (
            <TextSection
              id="result"
              title="Result"
              paragraphs={[entry.result]}
            />
          )}
          {entry.currentState && (
            <TextSection
              id="current-state"
              title="Current state"
              paragraphs={[entry.currentState]}
            />
          )}
          {related.length > 0 && (
            <section
              className="journal-section"
              id="related"
              aria-labelledby="related-title"
            >
              <h2 id="related-title">Related work and research</h2>
              <ul className="journal-related-list">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href}>
                      {item.title}
                      <span aria-hidden="true"> ↗</span>
                    </Link>
                    <p>{item.explanation}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {!!entry.externalLinks?.length && (
            <section
              className="journal-section"
              id="references"
              aria-labelledby="references-title"
            >
              <h2 id="references-title">External references</h2>
              <ul>
                {entry.externalLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label} ↗</a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      {(previous || next) && (
        <nav className="journal-neighbours" aria-label="Journal navigation">
          {previous ? (
            <Link href={previous.href}>
              <span className="technical muted">Previous entry</span>
              {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href}>
              <span className="technical muted">Next entry</span>
              {next.title}
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}
