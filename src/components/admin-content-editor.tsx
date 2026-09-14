"use client";

import { useState, useTransition } from "react";
import { Check, Save } from "lucide-react";
import { updateInsight, updateProject } from "@/app/admin/actions";
import type { Insight, Project } from "@/lib/freco-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const projectCategories = ["Residential", "Apartments", "Gated communities", "Commercial", "Mixed use"] as const;
const projectStatuses = ["Concept", "In preparation", "Pipeline"] as const;
const insightCategories = ["Land", "Investment", "Development", "Market", "Design"] as const;

type EditorProps = { projects: Project[]; insights: Insight[] };

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{children}</span>;
}

export function AdminContentEditor({ projects, insights }: EditorProps) {
  const [section, setSection] = useState<"projects" | "insights">("projects");
  const [projectIndex, setProjectIndex] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);
  const [projectDrafts, setProjectDrafts] = useState(projects);
  const [insightDrafts, setInsightDrafts] = useState(insights);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const project = projectDrafts[projectIndex];
  const insight = insightDrafts[insightIndex];

  function updateProjectDraft(patch: Partial<Project>) {
    setProjectDrafts((current) => current.map((item, index) => index === projectIndex ? { ...item, ...patch } : item));
    setSaved(false);
  }

  function updateInsightDraft(patch: Partial<Insight>) {
    setInsightDrafts((current) => current.map((item, index) => index === insightIndex ? { ...item, ...patch } : item));
    setSaved(false);
  }

  function saveCurrent() {
    const formData = new FormData();
    if (section === "projects") formData.set("project", JSON.stringify(project));
    else formData.set("insight", JSON.stringify(insight));
    startTransition(() => {
      const task = section === "projects" ? updateProject(formData) : updateInsight(formData);
      void task.then(() => setSaved(true)).catch(() => setSaved(false));
    });
  }

  return <section className="border-b border-border bg-background"><div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-24"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow text-primary">Content desk</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">Edit what people see.</h2><p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">Choose a development or insight, make your changes, then save. Your public pages use the saved version.</p></div><div className="flex items-center gap-2 border border-border bg-white p-1"><button type="button" onClick={() => setSection("projects")} className={`min-w-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] ${section === "projects" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}>Developments</button><button type="button" onClick={() => setSection("insights")} className={`min-w-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] ${section === "insights" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}>Insights</button></div></div>{section === "projects" ? <div className="mt-12 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]"><div className="min-w-0 space-y-2">{projectDrafts.map((item, index) => <button key={item.id} type="button" onClick={() => { setProjectIndex(index); setSaved(false); }} className={`block w-full min-w-0 border px-4 py-4 text-left ${index === projectIndex ? "border-primary bg-accent" : "border-border bg-white hover:border-primary/50"}`}><span className="block truncate text-sm font-semibold text-foreground">{item.name}</span><span className="mt-1 block truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{item.status}</span></button>)}</div><ProjectForm project={project} onChange={updateProjectDraft} onSave={saveCurrent} isPending={isPending} saved={saved} /></div> : <div className="mt-12 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]"><div className="min-w-0 space-y-2">{insightDrafts.map((item, index) => <button key={item.id} type="button" onClick={() => { setInsightIndex(index); setSaved(false); }} className={`block w-full min-w-0 border px-4 py-4 text-left ${index === insightIndex ? "border-primary bg-accent" : "border-border bg-white hover:border-primary/50"}`}><span className="block truncate text-sm font-semibold text-foreground">{item.title}</span><span className="mt-1 block truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{item.category}</span></button>)}</div><InsightForm insight={insight} onChange={updateInsightDraft} onSave={saveCurrent} isPending={isPending} saved={saved} /></div>}</div></section>;
}

function ProjectForm({ project, onChange, onSave, isPending, saved }: { project: Project; onChange: (patch: Partial<Project>) => void; onSave: () => void; isPending: boolean; saved: boolean }) {
  return <div className="min-w-0 border border-border bg-white p-6 sm:p-8"><div className="grid gap-6 md:grid-cols-2"><label><FieldLabel>Name</FieldLabel><Input value={project.name} onChange={(event) => onChange({ name: event.target.value })} /></label><label><FieldLabel>Page address</FieldLabel><Input value={project.slug} onChange={(event) => onChange({ slug: event.target.value })} /></label><label><FieldLabel>Location</FieldLabel><Input value={project.location} onChange={(event) => onChange({ location: event.target.value })} /></label><label><FieldLabel>Image path</FieldLabel><Input value={project.featuredImage} onChange={(event) => onChange({ featuredImage: event.target.value })} /></label><label><FieldLabel>Category</FieldLabel><select value={project.category} onChange={(event) => onChange({ category: event.target.value as Project["category"] })} className="h-10 w-full border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">{projectCategories.map((item) => <option key={item}>{item}</option>)}</select></label><label><FieldLabel>Status</FieldLabel><select value={project.status} onChange={(event) => onChange({ status: event.target.value as Project["status"] })} className="h-10 w-full border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">{projectStatuses.map((item) => <option key={item}>{item}</option>)}</select></label><label className="md:col-span-2"><FieldLabel>Description</FieldLabel><Textarea value={project.description} onChange={(event) => onChange({ description: event.target.value })} rows={4} /></label><label className="md:col-span-2"><FieldLabel>Opportunity</FieldLabel><Textarea value={project.opportunity} onChange={(event) => onChange({ opportunity: event.target.value })} rows={4} /></label><label><FieldLabel>Scale</FieldLabel><Input value={project.scale} onChange={(event) => onChange({ scale: event.target.value })} /></label><label><FieldLabel>Amenities, one per line</FieldLabel><Textarea value={project.amenities.join("\n")} onChange={(event) => onChange({ amenities: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) })} rows={4} /></label></div><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={project.featured} onChange={(event) => onChange({ featured: event.target.checked })} className="size-4 accent-primary" /> Show on the homepage</label><Button type="button" onClick={onSave} disabled={isPending} className="h-11 rounded-full bg-primary px-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-primary/90">{saved ? <><Check size={15} /> Saved</> : <><Save size={15} /> {isPending ? "Saving" : "Save development"}</>}</Button></div></div>;
}

function InsightForm({ insight, onChange, onSave, isPending, saved }: { insight: Insight; onChange: (patch: Partial<Insight>) => void; onSave: () => void; isPending: boolean; saved: boolean }) {
  return <div className="min-w-0 border border-border bg-white p-6 sm:p-8"><div className="grid gap-6 md:grid-cols-2"><label><FieldLabel>Title</FieldLabel><Input value={insight.title} onChange={(event) => onChange({ title: event.target.value })} /></label><label><FieldLabel>Page address</FieldLabel><Input value={insight.slug} onChange={(event) => onChange({ slug: event.target.value })} /></label><label><FieldLabel>Author</FieldLabel><Input value={insight.author} onChange={(event) => onChange({ author: event.target.value })} /></label><label><FieldLabel>Date</FieldLabel><Input value={insight.date} onChange={(event) => onChange({ date: event.target.value })} /></label><label><FieldLabel>Category</FieldLabel><select value={insight.category} onChange={(event) => onChange({ category: event.target.value as Insight["category"] })} className="h-10 w-full border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">{insightCategories.map((item) => <option key={item}>{item}</option>)}</select></label><label><FieldLabel>Image path</FieldLabel><Input value={insight.featuredImage} onChange={(event) => onChange({ featuredImage: event.target.value })} /></label><label className="md:col-span-2"><FieldLabel>Excerpt</FieldLabel><Textarea value={insight.excerpt} onChange={(event) => onChange({ excerpt: event.target.value })} rows={3} /></label><label className="md:col-span-2"><FieldLabel>Article paragraphs, one per line</FieldLabel><Textarea value={insight.content.join("\n")} onChange={(event) => onChange({ content: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) })} rows={9} /></label></div><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={insight.featured} onChange={(event) => onChange({ featured: event.target.checked })} className="size-4 accent-primary" /> Show on the homepage</label><Button type="button" onClick={onSave} disabled={isPending} className="h-11 rounded-full bg-primary px-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-primary/90">{saved ? <><Check size={15} /> Saved</> : <><Save size={15} /> {isPending ? "Saving" : "Save insight"}</>}</Button></div></div>;
}
