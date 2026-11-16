import { ogImage } from "@/lib/metadata";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteContent } from "@/lib/site-content";
import { professionalContent } from "@/lib/professional-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.url),
  title: {
    default: siteContent.title,
    template: `%s — ${professionalContent.fullName}`,
  },
  description: siteContent.description,
  keywords: siteContent.keywords,
  authors: [{ name: professionalContent.fullName, url: siteContent.url }],
  creator: professionalContent.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${siteContent.name} · ${professionalContent.fullName}`,
    title: siteContent.title,
    description: siteContent.description,
    url: "/",
    locale: "en",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.title,
    description: siteContent.description,
    creator: "@Aj_Tech_01",
    images: [ogImage.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
