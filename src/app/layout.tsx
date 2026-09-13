import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { JsonLd } from "@/components/seo-json-ld";
import { siteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await siteUrl();
  return {
    metadataBase: new URL(baseUrl),
    title: { default: "FRECO ART LTD — Strategic Property Development in Kenya", template: "%s — FRECO ART LTD" },
    description: "FRECO ART is a Kenyan strategic property development company working with landowners, investors and partners to turn land into purposeful real estate.",
    keywords: ["property development Kenya", "real estate development Kenya", "land development Kenya", "landowner partnerships Kenya", "diaspora property Kenya", "Nairobi property development"],
    alternates: { canonical: "/" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: { title: "FRECO ART LTD — Strategic Property Development in Kenya", description: "Strategic property development, landowner partnerships and purposeful real estate in Kenya.", type: "website", url: baseUrl, siteName: "FRECO ART LTD", locale: "en_KE", images: [{ url: "/freco-hero.webp", width: 1600, height: 900, alt: "FRECO ART property development landscape" }] },
    twitter: { card: "summary_large_image", title: "FRECO ART LTD — Strategic Property Development in Kenya", description: "Strategic property development, landowner partnerships and purposeful real estate in Kenya.", images: ["/freco-hero.webp"] },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const baseUrl = await siteUrl();
  return <html lang="en"><body className="min-h-dvh antialiased"><JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "FRECO ART LTD", url: baseUrl, email: "frecoartdevelopers@gmail.com", description: "A Kenyan strategic property development company turning land into opportunity through partnerships and purposeful real estate." }} /><JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "FRECO ART LTD", url: baseUrl, description: "Strategic property development, landowner partnerships and purposeful real estate in Kenya." }} />{children}<Script src="https://cdn-chatly.vyro.ai/chatly-make/sites-script/make-preview-runtime.js" strategy="afterInteractive" /><Script src="https://cdn-chatly.vyro.ai/chatly-make/sites-script/heading-override.js" strategy="afterInteractive" /></body></html>;
}
