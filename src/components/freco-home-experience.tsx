"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Crosshair, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { developmentCategories, methodSteps } from "@/lib/freco-content";

const principles = [
  {
    label: "Evidence first",
    title: "We make the assumptions visible.",
    copy: "Before a direction is presented, we look at location, access, context, demand and feasibility. The work starts with what can be understood and verified.",
  },
  {
    label: "Clear relationships",
    title: "We give every conversation room to be understood.",
    copy: "Landowners, investors and development partners should be able to understand the opportunity, the roles involved and the decisions that still need to be made.",
  },
  {
    label: "Responsible value",
    title: "We think beyond the first transaction.",
    copy: "A purposeful development considers the people who will use it, the place where it sits and the value it can sustain over time.",
  },
];

export function FrecoHomeExperience() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const pointer = pointerRef.current;
    if (!pointer) return;

    const movePointer = (event: PointerEvent) => {
      pointer.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a, button, [data-pointer]")) pointer.dataset.active = "true";
    };
    const handleOut = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a, button, [data-pointer]")) pointer.dataset.active = "false";
    };

    window.addEventListener("pointermove", movePointer, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    window.addEventListener("pointerout", handleOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", movePointer);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerout", handleOut);
    };
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <>
      <div ref={pointerRef} aria-hidden="true" className="site-pointer" data-active="false"><span /></div>
      <div className="scroll-meter" aria-hidden="true" />

      <section className="relative min-h-[820px] overflow-hidden bg-ink text-white lg:min-h-[900px]">
        <Image src="/freco-hero.webp" alt="Landscape and architecture in a Kenyan development context" fill priority className="object-cover object-center opacity-45" sizes="100vw" />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto min-h-[820px] max-w-[1440px] px-6 pb-14 pt-32 lg:min-h-[900px] lg:px-12 lg:pb-16">
          <div className="grid min-h-[670px] items-end gap-14 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
            <div className="max-w-4xl">
              <p className="eyebrow text-white/60">Strategic property development in Kenya</p>
              <h1 className="mt-6 max-w-4xl text-6xl font-semibold leading-[0.88] tracking-[-0.075em] sm:text-8xl lg:text-[8.6rem]">Land has potential.<br /><span className="text-white/55">We build the conversation.</span></h1>
              <p className="mt-9 max-w-2xl text-base leading-7 text-white/72 lg:text-lg">FRECO ART brings together land, strategy and development partnerships to shape purposeful residential, apartment, gated community and mixed-use opportunities.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4"><Button render={<Link href="/developments" />} data-pointer className="h-12 rounded-full bg-white px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary hover:bg-white/90">Explore developments <ArrowUpRight size={15} /></Button><Link href="#method" data-pointer className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white">See how we work <ArrowDown size={15} /></Link></div>
            </div>

            <div className="relative ml-auto w-full max-w-[390px] lg:mb-4">
              <div className="brand-plate relative overflow-hidden bg-white p-5 text-ink shadow-2xl shadow-black/20">
                <div className="flex items-center justify-between border-b border-black/10 pb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45"><span>FRECO ART / FIELD MARK</span><span>01—26</span></div>
                <div className="relative mt-4 aspect-[1.8/1] overflow-hidden bg-background"><Image src="/freco-art-logo-user.jpg" alt="FRECO ART LTD logo" fill className="object-cover object-center" sizes="390px" /></div>
                <div className="mt-4 flex items-end justify-between gap-4"><p className="max-w-[220px] text-sm leading-5 text-black/60">A strategic property development company turning land into opportunity.</p><span className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/25 text-primary"><MoveUpRight size={16} /></span></div>
              </div>
              <div className="absolute -bottom-7 -left-6 hidden items-center gap-3 text-[10px] uppercase tracking-[0.17em] text-white/50 sm:flex"><Crosshair size={14} /> Nairobi / Kenya / active brief</div>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-5 text-[10px] uppercase tracking-[0.17em] text-white/45"><span>Land · Strategy · Partnership · Development · Value</span><span className="hidden items-center gap-2 sm:inline-flex"><Compass size={14} /> Move through the field</span></div>
        </div>
      </section>

      <section className="bg-background"><div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 lg:grid-cols-[0.68fr_1.32fr] lg:px-12 lg:py-36"><div className="lg:pt-2"><p className="eyebrow text-primary">The development conversation</p><p className="mt-12 max-w-xs text-sm leading-6 text-muted-foreground">Every worthwhile project begins by making the opportunity clearer: where it sits, who it serves and what responsible value could look like.</p></div><div><h2 className="display-title max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-7xl">From land<br /><span className="text-primary">to a considered future.</span></h2><div className="mt-10 grid gap-8 md:grid-cols-2"><p className="max-w-md text-base leading-7 text-muted-foreground">We do not treat land as an isolated asset. We study the wider context and build a development direction around real use, real place and real alignment.</p><p className="max-w-md text-base leading-7 text-muted-foreground">That means conversations that are deliberate from the start — with the landowner, the market, the future user and the partners who make delivery possible.</p></div><Link href="/about" data-pointer className="mt-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Read our approach <ArrowRight size={15} /></Link></div></div></section>

      <section id="method" className="border-y border-border bg-sand"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><div className="grid gap-12 lg:grid-cols-[0.64fr_1.36fr] lg:gap-20"><div><p className="eyebrow text-primary">How we move</p><h2 className="mt-5 max-w-sm text-4xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl">A clear path from possibility to place.</h2><p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">The work moves in stages so that each next step is informed by the one before it.</p></div><div className="min-w-0 border-t border-border">{methodSteps.map((step, index) => <button key={step.number} type="button" data-pointer onClick={() => setActiveStep(index)} className={`group grid w-full min-w-0 grid-cols-[48px_1fr_auto] items-start gap-3 border-b border-border py-6 text-left transition-colors duration-500 ease-out lg:grid-cols-[72px_1fr_24px] lg:gap-6 ${activeStep === index ? "text-primary" : "text-foreground hover:text-primary"}`} aria-pressed={activeStep === index}><span className="pt-1 text-xs font-semibold tracking-[0.14em] text-muted-foreground">{step.number}</span><span className="min-w-0"><span className="block text-2xl font-semibold tracking-[-0.045em] lg:text-3xl">{step.title}</span><span className={`mt-2 block max-w-xl text-sm leading-6 transition-all duration-500 ease-out ${activeStep === index ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>{step.text}</span></span><ArrowUpRight size={17} className={`mt-1 transition-transform duration-500 ease-out ${activeStep === index ? "rotate-45" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} /></button>)}</div></div></div></section>

      <section className="bg-background"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-36"><div className="flex flex-col gap-8 border-b border-border pb-10 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow text-primary">Development categories</p><h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-7xl">Different places.<br /><span className="text-primary">The same discipline.</span></h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Explore the kinds of places we are prepared to shape — each grounded in context, purpose and a clear development conversation.</p></div><div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">{developmentCategories.map((category, index) => <button key={category.label} type="button" data-pointer onClick={() => setActiveCategory(index)} className={`group min-w-0 border-b border-border px-0 py-5 text-left transition-colors duration-500 ease-out ${activeCategory === index ? "text-primary" : "text-foreground hover:text-primary"}`} aria-pressed={activeCategory === index}><span className="flex w-full min-w-0 items-center justify-between gap-4"><span className="min-w-0 truncate text-2xl font-semibold tracking-[-0.045em]">{category.label}</span><ArrowUpRight size={17} className={`shrink-0 transition-transform duration-500 ease-out ${activeCategory === index ? "rotate-45" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} /></span><span className={`block max-w-md overflow-hidden text-sm leading-6 transition-all duration-500 ease-out ${activeCategory === index ? "mt-2 max-h-16 opacity-100" : "max-h-0 opacity-0"}`}>{category.title}</span></button>)}</div><div className="relative min-h-[420px] overflow-hidden bg-ink text-white lg:min-h-[520px]"><Image src={developmentCategories[activeCategory].image} alt={`${developmentCategories[activeCategory].label} development concept`} fill className="object-cover transition-transform duration-1000 ease-out" sizes="(max-width: 1024px) 100vw, 60vw" key={developmentCategories[activeCategory].image} /><div className="absolute inset-0 bg-ink/35" /><div className="absolute inset-x-0 bottom-0 p-6 lg:p-10"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow text-white/65">{developmentCategories[activeCategory].label}</p><h3 className="mt-3 max-w-lg text-4xl font-semibold leading-[0.96] tracking-[-0.055em] lg:text-6xl">{developmentCategories[activeCategory].title}</h3></div><Link href={developmentCategories[activeCategory].href} data-pointer className="grid size-12 shrink-0 place-items-center rounded-full border border-white/35 text-white transition-colors hover:bg-white hover:text-primary" aria-label={`Explore ${developmentCategories[activeCategory].label}`}><ArrowUpRight size={18} /></Link></div></div><div className="absolute right-5 top-5 text-[10px] uppercase tracking-[0.17em] text-white/60">0{activeCategory + 1} / 0{developmentCategories.length}</div></div></div></div></section>

      <section className="bg-primary text-white"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><p className="eyebrow text-white/60">Ethical conduct in practice</p><h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-7xl">Good development starts with good operations.</h2><p className="mt-7 max-w-md text-base leading-7 text-white/70">Our operating principles are deliberately practical: understand the facts, make roles clear and consider the place and people around each opportunity.</p></div><div className="grid border-t border-white/20">{principles.map((principle, index) => <article key={principle.label} className="grid gap-5 border-b border-white/20 py-7 sm:grid-cols-[140px_1fr] sm:gap-8"><p className="eyebrow pt-1 text-white/55">0{index + 1} / {principle.label}</p><div><h3 className="text-2xl font-semibold tracking-[-0.045em]">{principle.title}</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-white/68">{principle.copy}</p></div></article>)}</div></div></div></section>
    </>
  );
}
