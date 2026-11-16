import Link from "next/link";
import type {
  ContentKind,
  ResearchRecord as ResearchEntry,
} from "@/types/content";

type RelatedLink = {
  id: string;
  title: string;
  href: string;
  kind: ContentKind;
  explanation: string;
};
type Neighbour = { title: string; href: string } | undefined;

const experimentFields = [
  ["hypothesis", "Hypothesis"],
  ["method", "Method"],
  ["observation", "Observation"],
  ["conclusion", "Conclusion"],
] as const;

function ResearchSection({
  id,
  title,
  text,
  items,
}: {
  id: string;
  title: string;
  text?: string;
  items?: string[];
}) {
  const visibleItems = items?.filter((item) => item.trim());
  if (!text?.trim() && !visibleItems?.length) return null;
  return (
    <section
      className="journal-section research-section"
      id={id}
      aria-labelledby={id + "-title"}
    >
      <h2 id={id + "-title"}>{title}</h2>
      {text?.trim() && <p>{text}</p>}
      {!!visibleItems?.length && (
        <ul className="journal-points">
          {visibleItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

const kindLabels: Partial<Record<ContentKind, string>> = {
  project: "Projects",
  journal: "Writing",
  research: "Related research",
  knowledge: "Knowledge topics",
  architecture: "Architecture",
};

export function ResearchRecord({
  record,
  related,
  previous,
  next,
}: {
  record: ResearchEntry;
  related: readonly RelatedLink[];
  previous: Neighbour;
  next: Neighbour;
}) {
  const experiments = record.experiments?.flatMap((experiment, index) => {
    const steps = experimentFields.flatMap(([key, label]) => {
      const value = experiment[key];
      return value?.trim() ? [{ label, value }] : [];
    });
    return steps.length ? [{ id: index, steps }] : [];
  });
  const publicEvidence = record.evidence.filter(
    (source) => source.visibility === "public",
  );
  const sections = [
    ["question", "Research question", record.question?.trim()],
    ["context", "Context", record.context?.trim()],
    ["motivation", "Motivation", record.motivation?.trim()],
    [
      "hypotheses",
      "Hypotheses",
      record.hypotheses?.some((item) => item.trim()),
    ],
    [
      "concepts",
      "Concepts under study",
      record.concepts?.some((item) => item.trim()),
    ],
    [
      "investigation",
      "Investigation",
      record.investigation?.some((item) => item.trim()),
    ],
    ["experiments", "Experiments", !!experiments?.length],
    ["findings", "Findings", record.findings?.some((item) => item.trim())],
    [
      "open-questions",
      "Open questions",
      record.openQuestions?.some((item) => item.trim()),
    ],
    [
      "implications",
      "Implications",
      record.implications?.some((item) => item.trim()),
    ],
    [
      "limitations",
      "Limitations",
      record.limitations?.some((item) => item.trim()),
    ],
    ["current-state", "Current state", record.currentState?.trim()],
    ["evidence", "Source basis", !!publicEvidence.length],
    ["related", "Related work and concepts", !!related.length],
    ["references", "External references", !!record.externalLinks?.length],
  ] as const;
  const visibleSections = sections.filter(([, , visible]) => !!visible);

  return (
    <article className="shell journal-entry research-entry">
      <nav aria-label="Breadcrumb" className="journal-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/writing">Writing</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">
          {record.number} · {record.title}
        </span>
      </nav>
      <header className="journal-entry-header research-entry-header">
        <p className="eyebrow accent">Research note / {record.number}</p>
        <div className="journal-entry-meta technical">
          <span>Domain / {record.domain}</span>
          <span>Status / {record.status}</span>
          {record.period && <span>{record.period}</span>}
        </div>
        <h1>{record.title}</h1>
        <p className="journal-entry-summary">{record.summary}</p>
        <ul className="journal-topics" aria-label="Research topics">
          {record.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        {!!record.technologies?.length && (
          <p className="journal-technologies">
            <span className="technical muted">Technologies / </span>
            {record.technologies.join(" · ")}
          </p>
        )}
      </header>
      <div className="journal-document research-document">
        <nav aria-label="On this research record" className="journal-toc">
          <p className="eyebrow">In this note</p>
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
        <div className="journal-body research-body">
          <ResearchSection
            id="question"
            title="Research question"
            text={record.question}
          />
          <ResearchSection id="context" title="Context" text={record.context} />
          <ResearchSection
            id="motivation"
            title="Motivation"
            text={record.motivation}
          />
          <ResearchSection
            id="hypotheses"
            title="Hypotheses"
            items={record.hypotheses}
          />
          <ResearchSection
            id="concepts"
            title="Concepts under study"
            items={record.concepts}
          />
          <ResearchSection
            id="investigation"
            title="Investigation"
            items={record.investigation}
          />
          {!!experiments?.length && (
            <section
              className="journal-section research-section"
              id="experiments"
              aria-labelledby="experiments-title"
            >
              <h2 id="experiments-title">Experiments</h2>
              {experiments.map((experiment) => (
                <dl
                  className="journal-sequence research-sequence"
                  key={experiment.id}
                >
                  {experiment.steps.map((step) => (
                    <div key={step.label}>
                      <dt>{step.label}</dt>
                      <dd>{step.value}</dd>
                    </div>
                  ))}
                </dl>
              ))}
            </section>
          )}
          <ResearchSection
            id="findings"
            title="Findings"
            items={record.findings}
          />
          <ResearchSection
            id="open-questions"
            title="Open questions"
            items={record.openQuestions}
          />
          <ResearchSection
            id="implications"
            title="Implications"
            items={record.implications}
          />
          <ResearchSection
            id="limitations"
            title="Limitations"
            items={record.limitations}
          />
          <ResearchSection
            id="current-state"
            title="Current state"
            text={record.currentState}
          />
          {!!publicEvidence.length && (
            <section
              className="journal-section research-section"
              id="evidence"
              aria-labelledby="evidence-title"
            >
              <h2 id="evidence-title">Source basis</h2>
              <ul className="research-evidence">
                {publicEvidence.map((source) => (
                  <li key={source.id}>
                    <Link href={source.locator}>{source.locator}</Link>
                    <p>{source.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {!!related.length && (
            <section
              className="journal-section research-section"
              id="related"
              aria-labelledby="related-title"
            >
              <h2 id="related-title">Related work and concepts</h2>
              <ul className="journal-related-list">
                {related.map((item) => (
                  <li key={item.id}>
                    <p className="eyebrow">
                      {kindLabels[item.kind] ?? "Related material"}
                    </p>
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
          {!!record.externalLinks?.length && (
            <section
              className="journal-section research-section"
              id="references"
              aria-labelledby="references-title"
            >
              <h2 id="references-title">External references</h2>
              <ul className="research-evidence">
                {record.externalLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label} ↗</a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      {(previous || next) && (
        <nav className="journal-neighbours" aria-label="Research navigation">
          {previous ? (
            <Link href={previous.href}>
              <span className="technical muted">Previous record</span>
              {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href}>
              <span className="technical muted">Next record</span>
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
