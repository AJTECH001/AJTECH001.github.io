import Link from "next/link";

export default function ResearchRecordNotFound() {
  return (
    <div className="shell research-page">
      <div className="research-intro">
        <p className="eyebrow">Research / Record not found</p>
        <h1>This record isn’t in the research archive.</h1>
        <p>
          The address may be incorrect, or the record has not been published.
        </p>
        <Link className="text-link" href="/research">
          <span aria-hidden="true">←</span> Return to the research archive
        </Link>
      </div>
    </div>
  );
}
