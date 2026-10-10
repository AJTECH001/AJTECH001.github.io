import type { Metadata } from "next";
import { EngineeringProfile } from "@/components/about/engineering-profile";
import { getEngineeringProfile } from "@/lib/profile";
import "./about.css";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getEngineeringProfile();
  return {
    title: "About — AJTECH",
    description: profile.summary,
  };
}
export default async function AboutPage() {
  return <EngineeringProfile data={await getEngineeringProfile()} />;
}
