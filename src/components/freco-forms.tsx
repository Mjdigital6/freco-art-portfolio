"use client";

import { useActionState, useState, type ChangeEvent, type FormEvent } from "react";
import { submitContactInquiry } from "@/app/contact/actions";
import { submitInvestorInquiry, submitLandInquiry } from "@/app/inquiries/actions";
import { FormShell, FormSuccess, Field, PrimaryFormButton, TextareaField } from "@/components/freco-content";
import { SelectArrow } from "@/components/freco-site";

function FormGrid({ children }: { children: React.ReactNode }) { return <div className="grid gap-7 md:grid-cols-2">{children}</div>; }

const inquiryInitialState = { status: "idle" as const, message: "" };

type Draft = Record<string, string>;

type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function rememberChange(event: ChangeEvent<HTMLFormElement>, setDraft: React.Dispatch<React.SetStateAction<Draft>>) {
  const target = event.target as unknown as FormField;
  if (target.name) setDraft((current) => ({ ...current, [target.name]: target.value }));
}

function rememberForm(event: FormEvent<HTMLFormElement>, setDraft: React.Dispatch<React.SetStateAction<Draft>>) {
  const entries = Array.from(new FormData(event.currentTarget).entries()).filter((entry): entry is [string, string] => typeof entry[1] === "string");
  setDraft((current) => ({ ...current, ...Object.fromEntries(entries) }));
}

export function LandSubmissionForm() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>({});
  const [state, formAction, pending] = useActionState(submitLandInquiry, inquiryInitialState);
  const next = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); rememberForm(event, setDraft); setStep((current) => Math.min(current + 1, 4)); };
  if (state.status === "success") return <FormSuccess title="Thank you. Your land opportunity has been received." copy={state.message} />;
  return <FormShell title="Submit a land opportunity" description="Share the starting point. The more context you can provide, the better we can understand the opportunity."><div className="mb-8 flex items-center gap-2">{[1, 2, 3, 4].map((item) => <span key={item} className={`h-1 flex-1 ${item <= step ? "bg-primary" : "bg-border"}`} />)}</div><form action={step === 4 ? formAction : undefined} onSubmit={step < 4 ? next : (event) => rememberForm(event, setDraft)} onChange={(event) => rememberChange(event, setDraft)}><input type="hidden" name="draftData" value={JSON.stringify(draft)} /><p className="eyebrow text-primary">Step {step} of 4</p>{step === 1 ? <FormGrid><Field label="Full name" name="fullName" placeholder="Your name" /><Field label="Phone" name="phone" type="tel" placeholder="Your phone number" /><Field label="Email" name="email" type="email" placeholder="you@example.com" /></FormGrid> : null}{step === 2 ? <FormGrid><Field label="Land location" name="landLocation" placeholder="Town, neighbourhood or area" /><Field label="County" name="county" placeholder="County" /><Field label="Approximate land size" name="landSize" placeholder="e.g. 2 acres" /><label className="relative block"><span className="eyebrow text-muted-foreground">Land type *</span><select required name="landType" className="mt-3 h-12 w-full appearance-none border-b border-border bg-transparent px-0 text-sm outline-none focus:border-primary"><option value="">Select land type</option><option>Agricultural</option><option>Residential</option><option>Commercial</option><option>Mixed use</option><option>Other</option></select><SelectArrow /></label></FormGrid> : null}{step === 3 ? <label className="relative block"><span className="eyebrow text-muted-foreground">Preferred or intended use *</span><select required name="intendedUse" className="mt-3 h-12 w-full appearance-none border-b border-border bg-transparent px-0 text-sm outline-none focus:border-primary"><option value="">Select an option</option><option>Residential</option><option>Apartments</option><option>Commercial</option><option>Mixed use</option><option>Not sure</option></select><SelectArrow /></label> : null}{step === 4 ? <TextareaField label="Additional information" name="additionalInformation" placeholder="Tell us anything important about the land or your goals." /> : null}{state.status === "error" ? <p role="alert" className="mt-6 border border-destructive/25 bg-destructive/5 p-4 text-sm leading-6 text-destructive">{state.message}</p> : null}<div className="mt-10 flex justify-between gap-4">{step > 1 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-primary">Back</button> : <span />}{step < 4 ? <PrimaryFormButton label="Continue" /> : <PrimaryFormButton label={pending ? "Saving…" : "Submit land opportunity"} />}</div></form></FormShell>;
}

export function InvestorForm() {
  const [draft, setDraft] = useState<Draft>({});
  const [state, formAction, pending] = useActionState(submitInvestorInquiry, inquiryInitialState);
  if (state.status === "success") return <FormSuccess title="Thank you. Your interest has been registered." copy={state.message} />;
  return <FormShell title="Register your interest" description="Tell us what you would like to understand about future development opportunities."><form action={formAction} onChange={(event) => rememberChange(event, setDraft)} className="space-y-7"><input type="hidden" name="draftData" value={JSON.stringify(draft)} /><FormGrid><Field label="Name" name="name" placeholder="Your name" /><Field label="Phone" name="phone" type="tel" placeholder="Your phone number" /><Field label="Email" name="email" type="email" placeholder="you@example.com" /><Field label="Preferred location" name="location" placeholder="Location or area" /></FormGrid><label className="relative block"><span className="eyebrow text-muted-foreground">Investment interest *</span><select required name="investmentInterest" className="mt-3 h-12 w-full appearance-none border-b border-border bg-transparent px-0 text-sm outline-none focus:border-primary"><option value="">Select an option</option><option>Residential development</option><option>Apartments</option><option>Commercial or mixed use</option><option>General opportunity</option></select><SelectArrow /></label><TextareaField label="Message" name="message" placeholder="What would you like to explore?" />{state.status === "error" ? <p role="alert" className="border border-destructive/25 bg-destructive/5 p-4 text-sm leading-6 text-destructive">{state.message}</p> : null}<PrimaryFormButton label={pending ? "Saving…" : "Register interest"} /></form></FormShell>;
}

export function ContactForm() {
  const [type, setType] = useState("");
  const [state, formAction, pending] = useActionState(submitContactInquiry, inquiryInitialState);

  if (state.status === "success") return <FormSuccess title="Thank you. Your enquiry has been sent." copy={state.message} />;

  return <FormShell title="Start the conversation" description="Choose the path that best matches your enquiry and tell us what you want to explore."><form action={formAction} className="space-y-7"><label className="relative block"><span className="eyebrow text-muted-foreground">Enquiry type *</span><select required value={type} onChange={(event) => setType(event.target.value)} name="enquiryType" className="mt-3 h-12 w-full appearance-none border-b border-border bg-transparent px-0 text-sm outline-none focus:border-primary"><option value="">Select an option</option><option>Landowner partnership</option><option>Investment opportunity</option><option>Property enquiry</option><option>Strategic partnership</option><option>General enquiry</option></select><SelectArrow /></label><FormGrid><Field label="Name" name="name" placeholder="Your name" /><Field label="Phone" name="phone" type="tel" placeholder="Your phone number" /><Field label="Email" name="email" type="email" placeholder="you@example.com" /></FormGrid><TextareaField label="Message" name="message" placeholder="Tell us what you want to explore." /><input type="hidden" name="pageSource" value="contact" />{state.status === "error" ? <p role="alert" className="border border-destructive/25 bg-destructive/5 p-4 text-sm leading-6 text-destructive">{state.message}</p> : null}<PrimaryFormButton label={pending ? "Sending enquiry…" : "Submit enquiry"} /></form></FormShell>;
}
