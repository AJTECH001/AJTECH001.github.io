import type { DebuggingCase } from "@/types/project";
const stages = [
  ["symptom", "Symptom"],
  ["investigation", "Investigation"],
  ["hypothesis", "Hypothesis"],
  ["test", "Test"],
  ["rootCause", "Root cause"],
  ["fix", "Fix"],
  ["lesson", "Lesson"],
] as const;
export function DebuggingRecord({ cases }: { cases: DebuggingCase[] }) {
  return (
    <div className="debugging-records">
      {cases.map((item) => (
        <article
          key={item.id}
          aria-labelledby={`debug-${item.id}`}
          className="debugging-case"
        >
          <h3 id={`debug-${item.id}`}>{item.title}</h3>
          <dl>
            {stages.map(([key, label]) =>
              item[key]?.trim() ? (
                <div key={key}>
                  <dt>{label}</dt>
                  <dd>{item[key]}</dd>
                </div>
              ) : null,
            )}
          </dl>
          <p className="technical muted debugging-source">
            Source / {item.source}
          </p>
        </article>
      ))}
    </div>
  );
}
