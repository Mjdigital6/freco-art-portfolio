import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout, ImagePanel, SectionHeading, SiteFooter, SiteHeader, ArrowLink } from "@/components/freco-site";
import { InsightCard, ProjectCard, TrustGrid } from "@/components/freco-content";
import { developmentCategories, insights, methodSteps, projects } from "@/lib/freco-content";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[760px] overflow-hidden bg-ink text-white lg:min-h-[860px]">
        <Image src="/freco-hero.webp" alt="Strategic land and architecture in a green landscape" fill priority className="object-cover object-center opacity-70" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/15" />
        <SiteHeader />
        <div className="relative mx-auto flex min-h-[760px] max-w-[1440px] items-end px-6 pb-20 pt-36 lg:min-h-[860px] lg:px-12 lg:pb-28">
          <div className="max-w-5xl">
            <p className="eyebrow text-white/65">Property development · Partnerships · Value creation</p>
            <h1 className="mt-6 max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.08em] sm:text-8xl lg:text-[9.5rem]">Land has potential.<br /><span className="text-white/55">We turn it into value.</span></h1>
            <div className="mt-10 flex max-w-2xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-base leading-7 text-white/72 lg:text-lg">FRECO ART identifies strategically positioned land, structures development partnerships and transforms opportunity into purposeful residential, commercial and mixed-use developments.</p>
              <div className="flex shrink-0 items-center gap-5"><Button render={<Link href="/developments" />} className="h-12 rounded-full bg-white px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary hover:bg-white/90">Explore developments <ArrowUpRight size={15} /></Button><ArrowLink href="/landowners" inverted>Partner with us</ArrowLink></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 right-6 hidden items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/50 lg:flex"><ArrowDown size={15} /> Scroll to explore</div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 lg:grid-cols-[0.72fr_1.28fr] lg:px-12 lg:py-36">
          <div className="lg:pt-2"><p className="eyebrow text-primary">From land to landmark</p><div className="mt-12 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Land<br /><span className="my-3 block h-10 w-px bg-primary/35" />Strategy<br /><span className="my-3 block h-10 w-px bg-primary/35" />Partnership<br /><span className="my-3 block h-10 w-px bg-primary/35" />Development<br /><span className="my-3 block h-10 w-px bg-primary/35" />Value</div></div>
          <div><h2 className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.075em] sm:text-7xl">From land<br /><span className="text-primary">to landmark.</span></h2><div className="mt-10 grid gap-8 md:grid-cols-2"><p className="text-base leading-7 text-muted-foreground">Great developments begin long before construction. They begin with seeing what others may not yet see.</p><p className="text-base leading-7 text-muted-foreground">FRECO ART brings together land, strategy, partnerships and development expertise to unlock the potential of strategically positioned property.</p></div><div className="mt-12"><ArrowLink href="/about">Our approach</ArrowLink></div></div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><SectionHeading eyebrow="Development categories" title="We develop possibilities." copy="Our work is guided by the opportunity in each location, the people it can serve and the value it can create over time." /><div className="mt-14 grid gap-5 md:grid-cols-2">{developmentCategories.map((category, index) => <Link key={category.label} href={category.href} className={`group relative overflow-hidden ${index === 0 ? "md:row-span-2" : ""}`}><div className={`${index === 0 ? "aspect-[0.8/1] md:h-full" : "aspect-[1.3/1]"} relative`}><Image src={category.image} alt={`${category.label} development`} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 50vw" /><div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8"><p className="eyebrow text-white/60">{category.label}</p><h3 className="mt-3 max-w-md text-3xl font-semibold leading-[1.02] tracking-[-0.055em]">{category.title}</h3><span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em]">Explore <ArrowUpRight size={14} /></span></div></div></Link>)}</div></div>
      </section>

      <section className="bg-primary text-white">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><SectionHeading dark eyebrow="The FRECO method" title="How we unlock value." copy="A disciplined path from possibility to a development with purpose." /><div className="mt-16 border-t border-white/20">{methodSteps.map((step, index) => <div key={step.number} className="group grid gap-6 border-b border-white/20 py-7 transition-colors hover:bg-white/[0.04] md:grid-cols-[110px_1fr_1fr] md:items-center"><span className="text-sm text-white/45">{step.number}</span><h3 className="text-3xl font-semibold capitalize tracking-[-0.045em] md:text-4xl">{step.title}</h3><p className="max-w-sm text-sm leading-6 text-white/65">{step.text}</p></div>)}</div></div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-12 lg:py-32"><ImagePanel src="/freco-hero.webp" alt="Land with development potential" className="aspect-[0.9/1] lg:aspect-[0.8/1]" /><div><p className="eyebrow text-primary">For landowners</p><h2 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.94] tracking-[-0.075em] sm:text-7xl">Your land could be worth more than its current use.</h2><p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground">Strategic land can become more than an asset sitting idle. It can become homes, apartments, commercial spaces, communities and long-term value.</p><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">FRECO ART works with landowners to explore what their land can become.</p><div className="mt-10 flex flex-wrap gap-6"><Button render={<Link href="/landowners" />} className="h-12 rounded-full bg-primary px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-primary/90">Partner with FRECO ART <ArrowUpRight size={15} /></Button><ArrowLink href="/landowners">See how it works</ArrowLink></div></div></div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="Featured developments" title="What we're building." copy="Explore editable development records shaped by location, opportunity and purpose." /><ArrowLink href="/developments">View all developments</ArrowLink></div><div className="mt-14 grid gap-8 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} compact />)}</div></div>
      </section>

      <section className="bg-background"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"><SectionHeading eyebrow="Why FRECO ART" title="Development requires more than land." copy="We connect the opportunity in a place with the discipline, people and purpose needed to take it forward." /><TrustGrid /></div></div></section>

      <section className="bg-ink text-white"><div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-12 lg:py-32"><div><p className="eyebrow text-white/45">For investors</p><h2 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.94] tracking-[-0.075em] sm:text-7xl">Invest in what we're building.</h2><p className="mt-8 max-w-xl text-base leading-7 text-white/65">We believe strong property opportunities are created through disciplined development, strategic locations and clear execution.</p><div className="mt-10 flex flex-wrap gap-6"><Button render={<Link href="/investors" />} className="h-12 rounded-full bg-white px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary hover:bg-white/90">Explore opportunities <ArrowUpRight size={15} /></Button><ArrowLink href="/investors" inverted>Register your interest</ArrowLink></div></div><div className="border-l border-white/20 pl-8 lg:pl-14"><p className="text-7xl font-semibold leading-none tracking-[-0.08em] text-white/90">Land<br /><span className="text-primary-light">→</span><br />value</p></div></div></section>

      <section className="bg-background"><div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32"><div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="Insights" title="Thinking beyond the property." copy="Ideas on land, development, investment, market context and design." /><ArrowLink href="/insights">Explore insights</ArrowLink></div><div className="mt-14 grid gap-8 md:grid-cols-3">{insights.slice(0, 3).map((insight) => <InsightCard key={insight.id} insight={insight} />)}</div></div></section>

      <Callout eyebrow="Start a conversation" title="Have land with potential?" copy="Let's explore what it could become." href="/contact" label="Start a conversation" />
      <SiteFooter />
    </main>
  );
}
