import Link from "next/link";

export default function JournalEntryNotFound() {
  return (
    <div className="shell journal-page">
      <div className="journal-intro">
        <p className="eyebrow">Journal / Entry not found</p>
        <h1>This entry isn’t in the journal.</h1>
        <p>
          The address may be incorrect, or the entry has not been published.
        </p>
        <Link className="text-link" href="/journal">
          <span aria-hidden="true">←</span> Return to the engineering journal
        </Link>
      </div>
    </div>
  );
}
