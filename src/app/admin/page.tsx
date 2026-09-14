import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Inbox, Mail, Phone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, Wordmark } from "@/components/freco-site";
import { AdminContentEditor } from "@/components/admin-content-editor";
import { getUser } from "@/lib/auth";
import { listInquiries } from "@/lib/inquiries";
import { getInsights, getProjects } from "@/lib/site-content";
import { changeInquiryStatus, removeInquiry } from "@/app/admin/actions";

const adminEmail = "frecoartdevelopers@gmail.com";

function parseDetails(value: string): Array<[string, string]> {
  try {
    return Object.entries(JSON.parse(value) as Record<string, unknown>).flatMap(([key, entry]) => typeof entry === "string" && entry ? [[key, entry]] : []);
  } catch {
    return [];
  }
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeStyle: "short" }).format(value);
}

function statusLabel(status: string) {
  return status === "in_progress" ? "In progress" : status === "closed" ? "Closed" : "New";
}

export default async function AdminPage() {
  const user = await getUser();
  if (!user) {
    return <main className="grid min-h-dvh place-items-center bg-background px-6"><div className="max-w-md border border-border bg-white p-8 text-center"><p className="eyebrow text-primary">FRECO ART workspace</p><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">Sign in to manage your site.</h1><p className="mt-4 text-sm leading-6 text-muted-foreground">Use the approved business account to access your private editing area and enquiry inbox.</p><Button render={<Link href="/auth/start?after=%2Fadmin" />} className="mt-8 h-12 rounded-full bg-primary px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-primary/90">Sign in <ArrowUpRight size={15} /></Button></div></main>;
  }

  if (user.email.toLowerCase() !== adminEmail) {
    return <main className="grid min-h-dvh place-items-center bg-background px-6"><div className="max-w-md border border-border bg-white p-8 text-center"><p className="eyebrow text-primary">Access limited</p><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">This workspace is private.</h1><p className="mt-4 text-sm leading-6 text-muted-foreground">The signed-in account does not have permission to manage FRECO ART content.</p><Link href="/" className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Return to site <ArrowUpRight size={15} /></Link></div></main>;
  }

  const inquiries = await listInquiries();
  const [projects, insights] = await Promise.all([getProjects(), getInsights()]);
  const newCount = inquiries.filter((item) => item.status === "new").length;
  const activeCount = inquiries.filter((item) => item.status === "in_progress").length;
  const closedCount = inquiries.filter((item) => item.status === "closed").length;

  return <main className="min-h-dvh bg-background"><header className="border-b border-border bg-white"><div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-5 lg:px-12"><Wordmark /><Link href="/" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"><ArrowLeft size={15} /> Back to site</Link></div></header><section className="border-b border-border bg-sand"><div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-24"><p className="eyebrow text-primary">FRECO ART / PRIVATE WORKSPACE</p><div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="max-w-3xl text-5xl font-semibold leading-[0.92] tracking-[-0.07em]">Your private content desk.</h1><p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">Update the public story, keep the portfolio current and follow up with people who reach out.</p></div><p className="text-sm text-muted-foreground">Signed in as <span className="font-medium text-foreground">{user.email}</span></p></div><div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-3"><div className="bg-white p-6"><Inbox size={18} className="text-primary" /><p className="mt-8 text-4xl font-semibold tracking-[-0.06em]">{newCount}</p><p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">New enquiries</p></div><div className="bg-white p-6"><Mail size={18} className="text-primary" /><p className="mt-8 text-4xl font-semibold tracking-[-0.06em]">{activeCount}</p><p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">In progress</p></div><div className="bg-white p-6"><Phone size={18} className="text-primary" /><p className="mt-8 text-4xl font-semibold tracking-[-0.06em]">{closedCount}</p><p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Closed</p></div></div></div></section><AdminContentEditor projects={projects} insights={insights} /><section className="bg-background"><div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-24"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="eyebrow text-primary">Conversation inbox</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">Enquiries worth following up.</h2></div><p className="hidden max-w-sm text-sm leading-6 text-muted-foreground lg:block">Review every public enquiry, keep its status current and give the next conversation a clear place to start.</p></div>{inquiries.length === 0 ? <div className="border border-dashed border-border bg-white p-12 text-center"><Inbox size={22} className="mx-auto text-primary" /><h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em]">No enquiries yet.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">New contact, landowner and investor submissions will appear here.</p></div> : <div className="space-y-6">{inquiries.map((inquiry) => { const details = parseDetails(inquiry.details); const extraDetails = details.filter(([key]) => !["name", "email", "phone", "message"].includes(key)); return <article key={inquiry.id} className="border border-border bg-white p-6 lg:p-8"><div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"><div><div className="flex flex-wrap items-center gap-3"><span className="eyebrow text-primary">{inquiry.inquiryType}</span><span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">{statusLabel(inquiry.status)}</span></div><h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">{inquiry.name}</h2><p className="mt-2 text-sm text-muted-foreground">Received {formatDate(inquiry.createdAt)} · {inquiry.source}</p></div><div className="flex flex-wrap items-center gap-3"><form action={changeInquiryStatus} className="flex items-center gap-2"><input type="hidden" name="id" value={inquiry.id} /><select name="status" defaultValue={inquiry.status} className="h-10 border border-border bg-background px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground"><option value="new">New</option><option value="in_progress">In progress</option><option value="closed">Closed</option></select><Button type="submit" variant="outline" className="h-10 rounded-full px-4 text-[10px] font-semibold uppercase tracking-[0.14em]">Save</Button></form><form action={removeInquiry}><input type="hidden" name="id" value={inquiry.id} /><Button type="submit" variant="ghost" className="h-10 rounded-full px-3 text-destructive hover:bg-destructive/10 hover:text-destructive" aria-label={`Delete enquiry from ${inquiry.name}`}><Trash2 size={16} /></Button></form></div></div><div className="mt-8 grid gap-8 border-t border-border pt-6 lg:grid-cols-[0.8fr_1.2fr]"><div className="space-y-3 text-sm"><a href={`mailto:${inquiry.email}`} className="flex items-center gap-3 text-primary hover:underline"><Mail size={15} /> {inquiry.email}</a>{inquiry.phone ? <a href={`tel:${inquiry.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary"><Phone size={15} /> {inquiry.phone}</a> : null}</div><div><p className="max-w-3xl whitespace-pre-wrap text-sm leading-7 text-foreground">{inquiry.message || "No message provided."}</p>{extraDetails.length > 0 ? <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">{extraDetails.map(([key, value]) => <span key={key}><strong className="font-semibold text-foreground">{key.replace(/([A-Z])/g, " $1")}:</strong> {value}</span>)}</div> : null}</div></div></article>; })}</div>}</div></section><SiteFooter /></main>;
}
