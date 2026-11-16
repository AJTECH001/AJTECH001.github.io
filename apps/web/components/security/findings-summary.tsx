import type { ProjectRecord } from "@/types/project";

/** Severity counts as a compact, accessible list. Counts come from the report. */
export function FindingsSummary({
  findings,
  compact = false,
}: {
  findings: NonNullable<ProjectRecord["findings"]>;
  compact?: boolean;
}) {
  const total = findings.reduce((sum, item) => sum + item.count, 0);
  return (
    <div className="findings-summary" data-compact={compact}>
      <p className="technical muted">
        {total} {total === 1 ? "finding" : "findings"}
      </p>
      <ul className="severity-list" aria-label="Findings by severity">
        {findings.map((item) => (
          <li key={item.severity} data-severity={item.severity.toLowerCase()}>
            <span className="severity-count">{item.count}</span>
            <span>{item.severity}</span>
          </li>
        ))}
      </ul>
      {!compact && (
        <div className="severity-bar" aria-hidden="true">
          {findings.map((item) => (
            <span
              key={item.severity}
              data-severity={item.severity.toLowerCase()}
              style={{ flexGrow: item.count }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
