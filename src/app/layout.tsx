import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { siteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await siteUrl();
  return {
    metadataBase: new URL(baseUrl),
    title: { default: "FRECO ART LTD — Turning Land Into Opportunity", template: "%s — FRECO ART LTD" },
    description: "FRECO ART identifies strategically positioned land, creates development partnerships and transforms opportunity into purposeful real estate in Kenya.",
    openGraph: { title: "FRECO ART LTD — Turning Land Into Opportunity", description: "Strategic property development, landowner partnerships and purposeful real estate in Kenya.", type: "website", images: [{ url: "/freco-hero.webp", width: 1600, height: 900, alt: "FRECO ART property development landscape" }] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="min-h-dvh antialiased">{children}<Script src="https://cdn-chatly.vyro.ai/chatly-make/sites-script/make-preview-runtime.js" strategy="afterInteractive" /><Script src="https://cdn-chatly.vyro.ai/chatly-make/sites-script/heading-override.js" strategy="afterInteractive" /></body></html>;
}
