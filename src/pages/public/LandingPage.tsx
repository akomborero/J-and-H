import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Receipt,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  FileCheck2,
  MapPin,
  Quote,
  Sparkles,
  Lock,
  BellRing,
  LineChart,
  Smartphone,
  Headset,
  ChevronDown,
  Store,
  Truck,
  Stethoscope,
  GraduationCap,
  Hammer,
  Landmark,
} from "lucide-react";
import { HeroCarousel } from "../../components/marketing/HeroCarousel";
import { ScrollReveal } from "../../components/marketing/ScrollReveal";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { services } from "../../mock/data/services";
import { cn } from "../../lib/utils";

const categoryIcons = {
  company_registration: Building2,
  tax_services: Receipt,
  compliance_services: ShieldCheck,
  business_support: Briefcase,
};

const categoryLabels = {
  company_registration: "Company Registration",
  tax_services: "Tax Services",
  compliance_services: "Compliance Services",
  business_support: "Business Support",
};

const STATS = [
  { value: "1,200+", label: "Applications processed" },
  { value: "3", label: "Branches across Zimbabwe" },
  { value: "98%", label: "On-time completion rate" },
  { value: "15+", label: "Statutory services covered" },
];

const PROCESS = [
  { title: "Apply Online", description: "Choose your service and submit details and documents in minutes, from any device.", icon: FileCheck2 },
  { title: "We Process It", description: "Our team verifies, files, and progresses your application with the relevant authority.", icon: Clock },
  { title: "Track in Real Time", description: "Follow every step on your ledger timeline — no more chasing updates by phone.", icon: CheckCircle2 },
  { title: "Receive Your Documents", description: "Certificates and records land in your secure digital cabinet, ready to download.", icon: Users },
];

const FEATURES = [
  { title: "Bank-Grade Security", description: "Every document is encrypted at rest and access is scoped to your account alone.", icon: Lock },
  { title: "Automatic Reminders", description: "Renewal dates for tax clearance, PRAZ, and NSSA tracked and flagged before they lapse.", icon: BellRing },
  { title: "Live Progress Tracking", description: "A ledger-style timeline shows exactly where your application stands, updated in real time.", icon: LineChart },
  { title: "WhatsApp & Email Alerts", description: "Status changes reach you the way you already check your phone — no app required.", icon: Smartphone },
  { title: "Dedicated Support", description: "Raise a ticket and reach a real advisor who already has your file open.", icon: Headset },
  { title: "Transparent Pricing", description: "Every service shows its price and turnaround time upfront — no surprise invoices.", icon: Sparkles },
];

const SEGMENTS = [
  { label: "Retail & Trading", icon: Store },
  { label: "Logistics & Transport", icon: Truck },
  { label: "Healthcare Practices", icon: Stethoscope },
  { label: "Education & Training", icon: GraduationCap },
  { label: "Construction & Trades", icon: Hammer },
  { label: "Professional Services", icon: Landmark },
];

const FAQS = [
  {
    q: "How long does company registration actually take?",
    a: "Most Private Limited Company registrations complete in 7–10 business days once your documents are verified, and PBC registrations are typically faster at 5–7 days. Your exact timeline is always visible on your application's ledger timeline.",
  },
  {
    q: "Do I need to visit a branch in person?",
    a: "No — the entire process, from application to document collection, can be completed online. You're welcome to visit one of our three branches if you prefer face-to-face support, but it's never required.",
  },
  {
    q: "What happens if my tax clearance or PRAZ registration is about to expire?",
    a: "We track every renewal date tied to your account and send automatic reminders by email and WhatsApp starting 30 days before expiry, so you have time to act before anything lapses.",
  },
  {
    q: "Can I track multiple applications at once?",
    a: "Yes. Your client dashboard lists every application you've submitted, each with its own status, documents, and timeline — whether that's one registration or a full compliance package.",
  },
  {
    q: "How do I pay for a service?",
    a: "Once an application reaches the billing stage, we generate an invoice you can view in your dashboard. You upload proof of payment directly against that invoice, and our team verifies it — no need to email receipts separately.",
  },
];

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-medium text-ink dark:text-paper">{q}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-ink-soft transition-transform dark:text-paper/50", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft dark:text-paper/60">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

const TESTIMONIALS = [
  {
    quote: "We registered our PBC and got our BP number without a single trip to government offices. Everything was tracked online, end to end.",
    name: "T. Moyo",
    role: "Founder, Logistics PBC",
  },
  {
    quote: "Tax clearance renewal used to be a yearly headache. Now I get a reminder before it even expires, and the renewal is submitted within days.",
    name: "R. Chikafu",
    role: "Director, Trading Pvt Ltd",
  },
  {
    quote: "The team handled our PRAZ registration and gave us visibility we never had with our old consultancy. The dashboard alone is worth it.",
    name: "B. Sibanda",
    role: "Operations Manager",
  },
];

export function LandingPage() {
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div>
      <HeroCarousel />

      {/* Stats strip */}
      <section className="border-b border-ink/8 bg-white dark:border-white/8 dark:bg-[#0a0f1c]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-display text-3xl font-semibold tracking-tight text-forest dark:text-ochre-light">{stat.value}</p>
                <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">What we do</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper sm:text-4xl">
              Every statutory service, one portal
            </h2>
            <p className="mt-3 text-ink-soft dark:text-paper/60">
              From first registration to annual renewals — apply, upload documents, and pay without a single
              phone call. Each service shows its price and turnaround time before you commit.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => {
              const Icon = categoryIcons[cat];
              const count = services.filter((s) => s.category === cat).length;
              return (
                <ScrollReveal key={cat} delay={i * 0.08}>
                  <Card interactive className="group h-full p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest/10 text-forest transition-colors group-hover:bg-forest group-hover:text-ochre-light dark:bg-forest-light/15 dark:text-ochre-light">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-medium text-ink dark:text-paper">
                      {categoryLabels[cat]}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">{count} services available</p>
                    <Link to="/services" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-forest dark:text-ochre-light">
                      Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why J&H — glass feature grid */}
      <section className="relative overflow-hidden border-y border-ink/8 bg-forest-dark py-20 dark:border-white/8">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-forest-light/30 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-ochre/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-light">Why J&amp;H</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
              Built for businesses that can't afford to miss a deadline
            </h2>
            <p className="mt-3 text-paper/65">
              Every feature exists because something used to fall through the cracks on WhatsApp or in a spreadsheet.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.07}>
                <div className="glass-dark h-full rounded-2xl border-paper/10 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ochre/15 text-ochre-light">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-medium text-paper">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-paper/60">{f.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">How it works</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper sm:text-4xl">
              From application to certificate
            </h2>
          </ScrollReveal>

          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink/10 dark:bg-white/10 lg:block" />
            {PROCESS.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-ochre-light shadow-glow">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-medium text-ink dark:text-paper">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/55">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">Who we serve</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper sm:text-4xl">
              Every sector, the same standard of compliance
            </h2>
            <p className="mt-3 text-ink-soft dark:text-paper/60">
              Whatever you run, the registration and compliance requirements rarely change in spirit — we've built
              processes that scale from a single trader to a multi-branch operation.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {SEGMENTS.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink/8 p-5 text-center transition-all hover:-translate-y-1 hover:shadow-elevated dark:border-white/8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-medium text-ink dark:text-paper">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-ink/8 bg-white py-20 dark:border-white/8 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">Trusted by businesses</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper sm:text-4xl">
              What our clients say
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <Card className="h-full p-6">
                  <Quote className="h-6 w-6 text-ochre/60" />
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-paper/70">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-5 border-t border-ink/8 pt-4 dark:border-white/8">
                    <p className="text-sm font-medium text-ink dark:text-paper">{t.name}</p>
                    <p className="text-xs text-ink-soft dark:text-paper/50">{t.role}</p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">Frequently asked</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper sm:text-4xl">
              Questions we hear most
            </h2>
          </ScrollReveal>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 0.05}>
                <FaqItem q={f.q} a={f.a} defaultOpen={i === 0} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="border-t border-ink/8 bg-white py-16 dark:border-white/8 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h2 className="font-display text-xl font-medium text-ink dark:text-paper">Visit a branch near you</h2>
              <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Three locations, one consistent standard of service.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Harare", "Bulawayo", "Mutare"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-sm text-ink dark:border-white/10 dark:text-paper">
                  <MapPin className="h-3.5 w-3.5 text-ochre-dark dark:text-ochre-light" /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-forest-dark py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-1/3 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-ochre/15 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
              Ready to put your compliance on record?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-paper/65">
              Create your client profile and submit your first application in minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/register">
                <Button size="lg" variant="ochre" className="gap-2">
                  Create your account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="glass border-paper/25 text-paper hover:bg-white/10">
                  Talk to us
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
