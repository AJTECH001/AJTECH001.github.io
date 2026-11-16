import { getProjectRelationships } from "@/lib/project-relationships";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/work/project-detail";
import { pageMetadata } from "@/lib/metadata";
import { getProjectBySlug, getProjects } from "@/lib/projects";

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();
  return pageMetadata({
    title: `${project.number}: ${project.title}`,
    description: project.shortDescription,
    path: `/work/${project.slug}`,
    type: "article",
  });
}
export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();
  const relatedContent = await getProjectRelationships(project);
  return <ProjectDetail project={project} relatedContent={relatedContent} />;
}
