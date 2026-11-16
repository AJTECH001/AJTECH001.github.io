import type { Metadata } from "next";
import { professionalContent } from "@/lib/professional-content";
import { siteContent } from "@/lib/site-content";

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${professionalContent.fullName}: Security Engineer, Blockchain Security and AI Security Research`,
};

/**
 * Next.js replaces (rather than merges) nested metadata objects such as
 * openGraph, so every page builds its full social metadata here.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: `/${string}`;
  type?: "website" | "article" | "profile";
}): Metadata {
  const fullTitle = `${title} — ${professionalContent.fullName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: `${siteContent.name} · ${professionalContent.fullName}`,
      title: fullTitle,
      description,
      url: path,
      locale: "en",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@Aj_Tech_01",
      images: [ogImage.url],
    },
  };
}
