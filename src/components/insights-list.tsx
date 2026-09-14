"use client";

import { useMemo, useState } from "react";
import type { Insight } from "@/lib/freco-content";
import { InsightCard } from "@/components/freco-content";
import { Callout, FilterPills, PageIntro, SectionHeading, SiteFooter, SiteHeader } from "@/components/freco-site";

const insightCategories = ["All", "Land", "Investment", "Development", "Market", "Design"] as const;

export function InsightsList({ insights }: { insights: Insight[] }) {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => insights.filter((insight) => { const matchesCategory = active === "All" || insight.category === active; const matchesQuery = `${insight.title} ${insight.excerpt}`.toLowerCase().includes(query.toLowerCase()); return matchesCategory && matchesQuery; }), [active, insights, query]);
  return <main><PageIntro eyebrow="Insights" title="Thinking beyond the property." copy="Ideas on land, development, investment, market context and design." image="/freco-residential.webp" /><SiteHeader /><section className="bg-background"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><SectionHeading eyebrow="The journal" title="Useful thinking for the next conversation." copy="A growing editorial platform for landowners, investors, buyers and the people shaping the built environment." /><div className="mt-12 flex flex-col gap-5 border-y border-border py-6 lg:flex-row lg:items-center lg:justify-between"><FilterPills values={insightCategories} active={active} onChange={setActive} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search insights" className="h-10 w-full border-b border-border bg-transparent px-0 text-sm outline-none focus:border-primary lg:max-w-xs" /></div>{filtered.length ? <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">{filtered.map((insight) => <InsightCard key={insight.id} insight={insight} />)}</div> : <div className="mt-14 border border-border p-12 text-center"><p className="eyebrow text-primary">No match yet</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">Try another search.</h2></div>}</div></section><Callout eyebrow="Keep exploring" title="See what the thinking becomes." copy="Explore the developments shaped by location, opportunity and purpose." href="/developments" label="Explore developments" /><SiteFooter /></main>;
}
