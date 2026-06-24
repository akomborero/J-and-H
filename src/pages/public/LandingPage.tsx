import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { HeroCarousel } from "../../components/marketing/HeroCarousel";
import { Button } from "../../components/ui/Button";
import { services } from "../../mock/data/services";

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
  { title: "Apply Online", description: "Choose your service and submit details and documents in minutes.", icon: FileCheck2 },
  { title: "We Process It", description: "Our team verifies, files, and progresses your application with the relevant authority.", icon: Clock },
  { title: "Track in Real Time", description: "Follow every step on your ledger timeline — no more chasing updates.", icon: CheckCircle2 },
  { title: "Receive Your Documents", description: "Certificates and records land in your secure digital cabinet, ready to download.", icon: Users },
];

const TESTIMONIALS = [
  {
    quote: "We registered our PBC and got our BP number without a single trip to government offices. Everything was tracked online.",
    name: "T. Moyo",
    role: "Founder, Logistics PBC",
  },
  {
    quote: "Tax clearance renewal used to be a yearly headache. Now I get a reminder before it even expires.",
    name: "R. Chikafu",
    role: "Director, Trading Pvt Ltd",
  },
  {
    quote: "The team handled our PRAZ registration and gave us visibility we never had with our old consultancy.",
    name: "B. Sibanda",
    role: "Operations Manager",
  },
];

export function LandingPage() {
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div>
      <HeroCarousel />

      <section className="border-b border-ink/8 bg-white dark:border-white/8 dark:bg-[#0f1310]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-forest dark:text-ochre-light">{stat.value}</p>
              <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">What we do</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper sm:text-4xl">
              Every statutory service, one portal
            </h2>
            <p className="mt-3 text-ink-soft dark:text-paper/60">
              From first registration to annual renewals — apply, upload documents, and pay without a single phone call.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => {
              const Icon = categoryIcons[cat];
              const count = services.filter((s) => s.category === cat).length;
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group rounded-xl border border-ink/8 p-6 transition-all hover:-translate-y-1 hover:shadow-elevated dark:border-white/8"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest/10 text-forest transition-colors group-hover:bg-forest group-hover:text-ochre-light dark:bg-forest-light/15 dark:text-ochre-light">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-medium text-ink dark:text-paper">
                    {categoryLabels[cat]}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">{count} services available</p>
                  <Link to="/services" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-forest dark:text-ochre-light">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/8 bg-white py-20 dark:border-white/8 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">How it works</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper sm:text-4xl">
              From application to certificate
            </h2>
          </div>

          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink/10 dark:bg-white/10 lg:block" />
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-ochre-light shadow-soft">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-medium text-ink dark:text-paper">{step.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/55">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">Trusted by businesses</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper sm:text-4xl">
              What our clients say
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-ink/8 bg-white p-6 shadow-soft dark:border-white/8 dark:bg-[#141815]"
              >
                <Quote className="h-6 w-6 text-ochre/60" />
                <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-paper/70">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 border-t border-ink/8 pt-4 dark:border-white/8">
                  <p className="text-sm font-medium text-ink dark:text-paper">{t.name}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="bg-forest-dark py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
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
              <Button size="lg" variant="outline" className="border-paper/30 text-paper hover:bg-paper/10">
                Talk to us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
