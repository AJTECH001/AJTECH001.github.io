import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchRecord } from "@/components/research/research-record";
import {
  getResearchBySlug,
  getResearchRecords,
  researchHref,
} from "@/lib/research";
import { getResearchRelationships } from "@/lib/research-relationships";

export async function generateStaticParams() {
  return (await getResearchRecords()).map((record) => ({
    slug: record.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/research/[slug]">): Promise<Metadata> {
  const record = await getResearchBySlug((await params).slug);
  if (!record) notFound();
  return {
    title: record.title + " — Research lab — ajtech",
    description: record.summary,
    alternates: { canonical: researchHref(record) },
  };
}

export default async function ResearchRecordPage({
  params,
}: PageProps<"/research/[slug]">) {
  const record = await getResearchBySlug((await params).slug);
  if (!record) notFound();
  const records = await getResearchRecords();
  const index = records.findIndex((item) => item.id === record.id);
  const related = await getResearchRelationships(record);
  return (
    <ResearchRecord
      record={record}
      related={related}
      previous={
        index > 0
          ? {
              title:
                records[index - 1].number + " — " + records[index - 1].title,
              href: researchHref(records[index - 1]),
            }
          : undefined
      }
      next={
        index < records.length - 1
          ? {
              title:
                records[index + 1].number + " — " + records[index + 1].title,
              href: researchHref(records[index + 1]),
            }
          : undefined
      }
    />
  );
}
