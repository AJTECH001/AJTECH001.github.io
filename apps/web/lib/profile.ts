import { engineeringProfile } from "@/lib/profile-content";
import { getProjects } from "@/lib/projects";
import { siteContent } from "@/lib/site-content";
import { getJournalEntries } from "@/lib/journal";
import { getResearchRecords } from "@/lib/research";

export async function getEngineeringProfile() {
  const profile = engineeringProfile;
  const projectIds = new Set([
    ...profile.domains.flatMap((domain) =>
      domain.contentRefs
        .filter((ref) => ref.kind === "project")
        .map((ref) => ref.id),
    ),
    ...profile.relationships
      .filter((edge) => edge.to.kind === "project")
      .map((edge) => edge.to.id),
  ]);
  const researchIds = new Set(
    profile.relationships
      .filter((edge) => edge.to.kind === "research")
      .map((edge) => edge.to.id),
  );
  // Existing project reader contains only published records. Never resolve private intake leads here.
  const projects = (await getProjects()).filter((project) =>
    projectIds.has(project.id),
  );
  const publishedProjectIds = new Set(projects.map((project) => project.id));
  const journalEntries = (await getJournalEntries()).filter((entry) =>
    entry.relatedProjects?.some((id) => publishedProjectIds.has(id)),
  );
  const researchRecords = (await getResearchRecords()).filter((record) =>
    researchIds.has(record.id),
  );
  return {
    profile: {
      ...profile,
      evidence: profile.evidence.filter((item) => item.visibility === "public"),
    },
    projects,
    journalEntries,
    researchRecords,
    learning: siteContent.now.focus,
  };
}
