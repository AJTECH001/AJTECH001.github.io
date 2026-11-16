import type { Metadata } from "next";
import { SecurityProfile } from "@/components/about/security-profile";
import { getProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";
import "./about.css";

const description =
  "About Alade Jamiu Damilola: security engineer focused on smart contract auditing, AI security research and red teaming, and application security.";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description,
  path: "/about",
  type: "profile",
});

export default async function AboutPage() {
  return <SecurityProfile projects={await getProjects()} />;
}
