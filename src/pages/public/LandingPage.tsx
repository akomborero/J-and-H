import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Receipt,
  ShieldCheck,
  ArrowRight,
  FileCheck2,
  Landmark,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
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

export function LandingPage() {
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div className="min-h-screen surface">
      <header className="sticky top-0 z-40 border-b border-ink/8 bg-paper/80 backdrop-blur-md dark:border-white/8 dark:bg-[#0c0f0d]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-forest font-display text-sm font-semibold text-ochre-light">
              J&amp;H
            </div>
            <span className="font-display text-base font-semibold tracking-tight text-ink dark:text-paper">
              J&amp;H Consultancy Services
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button variant="ochre" size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.06]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, var(--color-ink) 0, var(--color-ink) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, var(--color-ink) 0, var(--color-ink) 1px, transparent 1px, transparent 48px)",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-28 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ochre/40 bg-ochre/10 px-3 py-1 text-xs font-medium text-ochre-dark dark:text-ochre-light">
                <FileCheck2 className="h-3.5 w-3.5" />
                Now serving Harare, Bulawayo &amp; Mutare
              </span>
              <h1 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink dark:text-paper sm:text-5xl lg:text-[3.4rem]">
                Your business registry,
                <br />
                <span className="text-forest dark:text-ochre-light">off WhatsApp and onto record.</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft dark:text-paper/65">
                Company registration, ZIMRA tax services, NSSA and PRAZ compliance — submitted,
                tracked, and filed in one place. No more lost chat threads or guessing where your
                application stands.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/register">
                  <Button size="lg" variant="default" className="gap-2">
                    Start an application <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">View demo dashboard</Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft dark:text-paper/55">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-forest dark:text-ochre-light" /> Real-time status tracking</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-forest dark:text-ochre-light" /> Secure document vault</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-forest dark:text-ochre-light" /> WhatsApp &amp; email alerts</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-2xl border border-ink/8 bg-white p-1.5 shadow-elevated dark:border-white/10 dark:bg-[#141815]">
                <div className="rounded-xl border border-ink/8 bg-paper p-5 dark:border-white/8 dark:bg-[#0f1310]">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-display text-sm font-semibold text-ink dark:text-paper">JH-2026-0142</p>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                      Processing
                    </span>
                  </div>
                  <p className="text-xs text-ink-soft dark:text-paper/50">Private Limited Company Registration</p>
                  <div className="mt-5 space-y-3">
                    {["Submitted", "Documents Verified", "Processing"].map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-ochre-light">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm text-ink dark:text-paper/85">{step}</span>
                        <span className="ml-auto text-[11px] text-ink-soft/60 dark:text-paper/35">Day {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 -z-10 h-full w-full rounded-2xl bg-ochre/15 dark:bg-ochre/10 sm:-right-6 sm:-top-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-white py-20 dark:border-white/8 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-ink dark:text-paper">
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
                  className="rounded-xl border border-ink/8 p-6 transition-shadow hover:shadow-soft dark:border-white/8"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-medium text-ink dark:text-paper">
                    {categoryLabels[cat]}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">{count} services available</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Landmark className="mx-auto h-9 w-9 text-ochre-dark dark:text-ochre-light" />
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper">
            Ready to put your compliance on record?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-soft dark:text-paper/60">
            Create your client profile and submit your first application in minutes.
          </p>
          <Link to="/register" className="mt-8 inline-block">
            <Button size="lg" className="gap-2">
              Create your account <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-ink/8 py-8 dark:border-white/8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-ink-soft dark:text-paper/45 sm:px-6 lg:px-8">
          J&amp;H Consultancy Services &middot; Harare &middot; Bulawayo &middot; Mutare
        </div>
      </footer>
    </div>
  );
}
