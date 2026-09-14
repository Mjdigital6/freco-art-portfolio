"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/freco-content";
import { ProjectCard } from "@/components/freco-content";
import { ArrowLink, Callout, FilterPills, PageIntro, SectionHeading, SiteFooter, SiteHeader } from "@/components/freco-site";

const projectCategories = ["All", "Residential", "Apartments", "Gated communities", "Commercial", "Mixed use"] as const;

export function DevelopmentsList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("All");
  const filtered = useMemo(() => active === "All" ? projects : projects.filter((project) => project.category === active), [active, projects]);
  return <main><PageIntro eyebrow="Development portfolio" title="What we're building." copy="Developments shaped by location, opportunity and purpose." image="/freco-commercial.webp" /><SiteHeader /><section className="bg-background"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="Explore the portfolio" title="Places with a point of view." copy="These development records are updated directly by FRECO ART." /><ArrowLink href="/landowners">Have land with potential?</ArrowLink></div><div className="mt-12"><FilterPills values={projectCategories} active={active} onChange={setActive} /></div>{filtered.length ? <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">{filtered.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className="mt-14 border border-border p-12 text-center"><p className="eyebrow text-primary">Portfolio update</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">More developments are being prepared.</h2><p className="mt-3 text-sm text-muted-foreground">Check back soon.</p></div>}</div></section><Callout eyebrow="For buyers and partners" title="Want to understand a development opportunity?" copy="Start a conversation and tell us which part of the work you want to explore." href="/contact" label="Register interest" /><SiteFooter /></main>;
}
