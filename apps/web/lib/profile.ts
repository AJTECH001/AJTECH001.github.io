import { engineeringProfile } from "@/lib/profile-content";
import { getProjects } from "@/lib/projects";
import { siteContent } from "@/lib/site-content";

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
  const projects = (await getProjects()).filter((project) =>
    projectIds.has(project.id),
  );
  return {
    profile: {
      ...profile,
      evidence: profile.evidence.filter((item) => item.visibility === "public"),
    },
    projects,
    learning: siteContent.now.focus,
  };
}
