import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo-json-ld";
import { Callout, SiteFooter, SiteHeader } from "@/components/freco-site";
import { InsightCard } from "@/components/freco-content";
import { insights } from "@/lib/freco-content";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() { return insights.map((insight) => ({ slug: insight.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) return {};
  return {
    title: `${insight.title} | FRECO ART Insights`,
    description: insight.excerpt,
    keywords: [insight.title, `${insight.category} property Kenya`, "real estate insights Kenya", "FRECO ART"],
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: { type: "article", title: `${insight.title} | FRECO ART LTD`, description: insight.excerpt, publishedTime: insight.date, authors: [insight.author], images: [{ url: insight.featuredImage, alt: insight.title }] },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) notFound();
  const related = insights.filter((item) => item.id !== insight.id).slice(0, 2);
  const baseUrl = await siteUrl();
  return <main><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: insight.title, description: insight.excerpt, datePublished: insight.date, author: { "@type": "Organization", name: insight.author }, publisher: { "@type": "Organization", name: "FRECO ART LTD", url: baseUrl }, image: `${baseUrl}${insight.featuredImage}`, mainEntityOfPage: `${baseUrl}/insights/${insight.slug}` }} /><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: baseUrl }, { "@type": "ListItem", position: 2, name: "Insights", item: `${baseUrl}/insights` }, { "@type": "ListItem", position: 3, name: insight.title, item: `${baseUrl}/insights/${insight.slug}` }] }} /><section className="relative min-h-[620px] overflow-hidden bg-ink text-white"><Image src={insight.featuredImage} alt={`${insight.title} feature image`} fill priority className="object-cover opacity-50" sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/15" /><SiteHeader /><div className="relative mx-auto flex min-h-[620px] max-w-[1440px] items-end px-6 pb-20 pt-40 lg:px-12 lg:pb-28"><div className="max-w-4xl"><div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55"><span>{insight.category}</span><span className="size-1 rounded-full bg-white/45" /><span>{insight.date}</span></div><h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.075em] sm:text-7xl lg:text-8xl">{insight.title}</h1><p className="mt-6 text-sm text-white/60">By {insight.author}</p></div></div></section><article className="bg-background"><div className="mx-auto grid max-w-[1120px] gap-14 px-6 py-20 lg:grid-cols-[0.25fr_0.75fr] lg:px-12 lg:py-28"><div><Link href="/insights" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary"><ArrowLeft size={14} /> Back to insights</Link></div><div className="max-w-2xl">{insight.content.map((paragraph) => <p key={paragraph} className="mb-8 text-xl leading-[1.45] tracking-[-0.02em] text-foreground/80">{paragraph}</p>)}<div className="mt-12 border-t border-border pt-6"><Link href="/contact" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">Start a conversation <ArrowUpRight size={15} /></Link></div></div></div></article><section className="bg-sand"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><p className="eyebrow text-primary">Related insights</p><div className="mt-10 grid gap-10 md:grid-cols-2">{related.map((item) => <InsightCard key={item.id} insight={item} />)}</div></div></section><Callout eyebrow="Keep exploring" title="The next opportunity starts with a better question." copy="Explore the work behind the ideas or start a conversation with FRECO ART." href="/contact" label="Start a conversation" /><SiteFooter /></main>;
}
