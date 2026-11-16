import type { Metadata } from "next";
import { AreaPage } from "@/components/security/area-page";
import { pageMetadata } from "@/lib/metadata";
import { getSecurityArea } from "@/lib/security-areas";
import "../work/work.css";

const area = getSecurityArea("cybersecurity");

export const metadata: Metadata = pageMetadata({
  title: area.label,
  description: area.metaDescription,
  path: area.path,
});

export default function CybersecurityPage() {
  return <AreaPage id="cybersecurity" />;
}
