import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Callout, SectionHeading, SiteFooter, SiteHeader, ArrowLink } from "@/components/freco-site";
import { InsightCard, ProjectCard, TrustGrid } from "@/components/freco-content";
import { FrecoHomeExperience } from "@/components/freco-home-experience";
import { getInsights, getProjects } from "@/lib/site-content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Strategic Property Development in Kenya",
  description: "FRECO ART turns strategically positioned land into purposeful residential, apartment, gated community and mixed-use development opportunities through clear partnerships and disciplined development thinking.",
  keywords: ["property development Kenya", "land development partnerships Kenya", "real estate development Nairobi", "landowners Kenya", "mixed-use development Kenya"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "FRECO ART LTD — Strategic Property Development in Kenya",
    description: "Turning land into opportunity through partnerships and purposeful real estate.",
    type: "website",
    images: [{ url: "/freco-art-logo-user.jpg", width: 1407, height: 768, alt: "FRECO ART LTD logo" }],
  },
};

export default async function Home() {
  const baseUrl = await siteUrl();
  const [projects, insights] = await Promise.all([getProjects(), getInsights()]);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "FRECO ART LTD", url: baseUrl, logo: `${baseUrl}/freco-art-logo-user.jpg`, description: "A strategic Kenyan property development company turning land into opportunity through partnerships and purposeful real estate.", areaServed: { "@type": "Country", name: "Kenya" }, knowsAbout: ["Property development", "Landowner partnerships", "Residential development", "Mixed-use development"] },
      { "@type": "WebSite", name: "FRECO ART LTD", url: baseUrl, description: "Strategic property development and landowner partnerships in Kenya." },
    ],
  };

  return <main><SiteHeader /><FrecoHomeExperience /><section className="bg-background"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-36"><SectionHeading eyebrow="Selected development conversations" title="The work begins with a better question." copy="Our development records are kept clear and honest. Where a brief is still being formed, we say so — because trust is part of the work." /><div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">{projects.filter((project) => project.featured).slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} compact />)}</div><div className="mt-12"><ArrowLink href="/developments">View all developments</ArrowLink></div></div></section><section className="border-y border-border bg-sand"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><div className="grid gap-14 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20"><div><p className="eyebrow text-primary">Why FRECO ART</p><h2 className="mt-5 max-w-sm text-5xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-6xl">A partner for the full picture.</h2></div><TrustGrid /></div></div></section><section className="bg-background"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-36"><div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="FRECO ART insights" title="Useful thinking for better decisions." copy="Practical notes on land, partnerships, development and the questions that shape value." /><ArrowLink href="/insights">Read all insights</ArrowLink></div><div className="mt-14 grid gap-10 md:grid-cols-3">{insights.filter((insight) => insight.featured).slice(0, 3).map((insight) => <InsightCard key={insight.id} insight={insight} />)}</div></div></section><Callout eyebrow="Start a development conversation" title="Have land, capital or a serious opportunity to explore?" copy="Tell us what you are working with. We will help clarify the next useful conversation — without forcing a direction before the facts are understood." href="/contact" label="Begin the conversation" dark={false} /><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></main>;
}
