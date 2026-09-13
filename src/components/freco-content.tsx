"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project, Insight } from "@/lib/freco-content";
import { ArrowLink, ImagePanel } from "@/components/freco-site";

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className="group">
      <Link href={`/developments/${project.slug}`} className="block">
        <ImagePanel src={project.featuredImage} alt={`${project.name} development concept`} className={compact ? "aspect-[4/3]" : "aspect-[1.25/1]"} />
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">{project.category}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em]">{project.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{project.location}</p>
          </div>
          <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-border text-primary transition-all group-hover:bg-primary group-hover:text-white"><ArrowUpRight size={16} /></span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          <span>{project.status}</span><span>View project</span>
        </div>
      </Link>
    </article>
  );
}

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="group">
      <Link href={`/insights/${insight.slug}`} className="block">
        <ImagePanel src={insight.featuredImage} alt="" className="aspect-[1.28/1]" />
        <div className="mt-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary"><span>{insight.category}</span><span className="size-1 rounded-full bg-primary/50" /><span>{insight.date}</span></div>
        <h3 className="mt-3 text-2xl font-semibold leading-[1.05] tracking-[-0.045em] transition-colors group-hover:text-primary">{insight.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{insight.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">Read insight <ArrowUpRight size={14} /></span>
      </Link>
    </article>
  );
}

export function TrustGrid() {
  const pillars = [
    ["Strategy", "We look beyond the parcel to understand its potential."],
    ["Partnerships", "We create structures that align interests and unlock opportunity."],
    ["Development", "We turn viable concepts into purposeful developments."],
    ["Long-term value", "We focus on developments designed to remain relevant beyond launch."],
  ];
  return <div className="grid border-l border-t border-border sm:grid-cols-2">{pillars.map(([title, text], index) => <div key={title} className="border-b border-r border-border p-6 lg:p-8"><span className="text-sm font-semibold text-primary">0{index + 1}</span><h3 className="mt-14 text-2xl font-semibold tracking-[-0.045em]">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div>;
}

export function FormShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <div className="border border-border bg-white p-6 lg:p-10"><div className="max-w-xl"><h2 className="text-3xl font-semibold tracking-[-0.055em] lg:text-4xl">{title}</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p></div><div className="mt-10">{children}</div></div>;
}

export function Field({ label, name, type = "text", placeholder, required = true }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return <label className="block"><span className="eyebrow text-muted-foreground">{label}{required ? " *" : ""}</span><input name={name} type={type} required={required} placeholder={placeholder} className="mt-3 h-12 w-full border-b border-border bg-transparent px-0 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary" /></label>;
}

export function TextareaField({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return <label className="block"><span className="eyebrow text-muted-foreground">{label}</span><textarea name={name} rows={5} placeholder={placeholder} className="mt-3 w-full resize-none border border-border bg-sand/40 p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary" /></label>;
}

export function FormSuccess({ title = "Thank you. Your enquiry has been received.", copy = "Your information is now ready for review. We will get in touch through the contact details provided." }: { title?: string; copy?: string }) {
  return <div className="border border-primary/20 bg-primary/5 p-8"><CheckCircle2 className="text-primary" size={24} /><h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></div>;
}

export function PrimaryFormButton({ label }: { label: string }) {
  return <Button type="submit" className="h-12 rounded-full bg-primary px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-primary/90">{label}<ArrowUpRight size={15} /></Button>;
}
