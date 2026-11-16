import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchRecord } from "@/components/research/research-record";
import {
  getResearchBySlug,
  getResearchRecords,
  researchHref,
} from "@/lib/research";
import { getResearchRelationships } from "@/lib/research-relationships";
import { pageMetadata } from "@/lib/metadata";

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
  return pageMetadata({
    title: record.title,
    description: record.summary,
    path: researchHref(record) as `/${string}`,
    type: "article",
  });
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
