import Link from "next/link";
export default function RecordNotFound() {
  return (
    <div className="shell work-page">
      <div className="work-page-header">
        <p className="eyebrow">Work / Record not found</p>
        <h1>This record isn’t in the archive.</h1>
        <p>
          The address may be incorrect, or the record has not been published.
        </p>
        <Link className="text-link" href="/work">
          <span aria-hidden="true">←</span> Return to engineering records
        </Link>
      </div>
    </div>
  );
}
