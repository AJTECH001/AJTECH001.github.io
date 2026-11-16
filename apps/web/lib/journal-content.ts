import type { JournalEntry } from "@/types/content";

// The journal is retained as a content type for future security write-ups.
// Public /journal URLs redirect to /writing until an entry is published.
export const journalEntries: readonly JournalEntry[] = [];
