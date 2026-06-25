import { Target, Eye, HeartHandshake, Award, Building2, Users2, MapPinned, TrendingUp } from "lucide-react";
import { ScrollReveal } from "../../components/marketing/ScrollReveal";
import { Card } from "../../components/ui/Card";

const VALUES = [
  { title: "Integrity", description: "We handle your documents and statutory filings with the same care we'd want for our own business.", icon: HeartHandshake },
  { title: "Precision", description: "Every application is checked against current requirements before it ever reaches an authority.", icon: Target },
  { title: "Transparency", description: "No black boxes — you see exactly where your application stands, at every stage.", icon: Eye },
  { title: "Reliability", description: "Deadlines tracked automatically, so compliance never depends on memory.", icon: Award },
];

const MILESTONES = [
  { year: "Year 1", title: "Founded in Harare", description: "Started as a small practice helping local traders register companies and file tax returns.", icon: Building2 },
  { year: "Year 2–3", title: "Compliance services added", description: "Expanded into NSSA, NEC, and PRAZ registration as clients asked for one consultancy to handle it all.", icon: Users2 },
  { year: "Year 4", title: "Bulawayo & Mutare branches opened", description: "Grew to a three-branch footprint to serve clients without requiring travel to Harare.", icon: MapPinned },
  { year: "Today", title: "A platform, not just a practice", description: "The same expert team, now backed by digital tracking, automatic reminders, and a secure document cabinet.", icon: TrendingUp },
];

const PRINCIPLES = [
  { title: "We check before we submit", description: "Every application goes through an internal review against current ZIMRA, NSSA, and PRAZ requirements before it's filed — reducing rejections and rework." },
  { title: "We tell you the real timeline", description: "If a service usually takes 10 days, we say 10 days. Estimates are based on actual completion history, not optimism." },
  { title: "We keep your records permanently", description: "Every certificate, invoice, and compliance record stays in your digital cabinet for as long as you're a client — no more digging through old emails." },
];

export function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-forest-dark py-16 text-center sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-forest-light/30 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-ochre/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-ochre-light">About Us</span>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Built by people who understand Zimbabwean compliance
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-paper/65">
            J&amp;H Consultancy Services started as a small team helping local businesses navigate
            registration and tax compliance. Today we run the same relationships through a modern
            platform — without losing the personal accountability that built our reputation.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Our Story</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-paper/65">
              For years, business registration and statutory compliance in Zimbabwe meant phone calls,
              WhatsApp threads, and spreadsheets that only one person fully understood. We built J&amp;H
              Consultancy Services to change that — starting with the same expert team our clients have
              always trusted, now backed by a platform that tracks every application, document, and
              deadline automatically.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-paper/65">
              From a single office handling company registrations, we've grown into a multi-branch
              consultancy covering tax services, NSSA and PRAZ compliance, and business support —
              while keeping the same close, accountable relationship with every client.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-paper/65">
              We still believe the best compliance work is invisible to the client — it just means nothing
              ever lapses, nothing gets rejected for a missing document, and nobody has to remember a
              renewal date themselves.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Card className="p-8">
              <h3 className="font-display text-lg font-medium text-ink dark:text-paper">Our Mission</h3>
              <p className="mt-2 text-sm text-ink-soft dark:text-paper/60">
                To make business registration and statutory compliance in Zimbabwe transparent,
                predictable, and accessible — regardless of how large or small the business is.
              </p>
              <h3 className="mt-6 font-display text-lg font-medium text-ink dark:text-paper">Our Vision</h3>
              <p className="mt-2 text-sm text-ink-soft dark:text-paper/60">
                A Zimbabwe where every registered business can track its compliance status as easily as
                checking a courier delivery.
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Milestones timeline */}
      <section className="border-t border-ink/8 bg-white py-16 dark:border-white/8 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">Our Journey</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper">From single office to full platform</h2>
          </ScrollReveal>
          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink/10 dark:bg-white/10 lg:block" />
            {MILESTONES.map((m, i) => (
              <ScrollReveal key={m.title} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-ochre-light shadow-glow">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-ochre-dark dark:text-ochre-light">{m.year}</span>
                  <h3 className="mt-1 font-display text-base font-medium text-ink dark:text-paper">{m.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/55">{m.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-ink/8 py-16 dark:border-white/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">What guides us</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper">Our Values</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <Card interactive className="h-full p-6 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-medium text-ink dark:text-paper">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/55">{v.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t border-ink/8 bg-white py-16 dark:border-white/8 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">How we work</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper">Principles, not just promises</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-ink/8 p-6 dark:border-white/8">
                  <span className="font-display text-3xl font-semibold text-ochre/30">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-base font-medium text-ink dark:text-paper">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/55">{p.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
