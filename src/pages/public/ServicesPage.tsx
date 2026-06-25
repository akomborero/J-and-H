import { Link } from "react-router-dom";
import {
  Building2,
  Receipt,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  Clock,
  CheckCircle2,
  Shield,
  Zap,
  FileText,
} from "lucide-react";
import { ScrollReveal } from "../../components/marketing/ScrollReveal";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { services, servicePackages, findService } from "../../mock/data/services";
import { formatCurrency } from "../../lib/utils";

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

const categoryDescriptions = {
  company_registration: "Incorporate and structure your business correctly from day one.",
  tax_services: "Stay compliant with ZIMRA — registration, clearance, and returns.",
  compliance_services: "NSSA, NEC, and PRAZ — managed and renewed without the chase.",
  business_support: "Professional materials and registrations to help you win business.",
};

const categoryDetails = {
  company_registration:
    "Whether you're founding a small trading entity or a multi-director company, we handle name search, document preparation, and submission to the Registrar — so the structure you launch with is the structure that protects you later.",
  tax_services:
    "ZIMRA compliance is rarely a one-time event. We manage BP number applications, VAT registration once you cross the threshold, and the recurring filing cycle that keeps your tax position clean year-round.",
  compliance_services:
    "Labour and procurement compliance carries real penalties for lapses. We register and renew your NSSA, NEC, and PRAZ standing against tracked expiry dates, so good standing is maintained automatically.",
  business_support:
    "First impressions matter for tenders and partnerships. From a professionally written company profile to a logo and vendor number applications, we help you present a business that looks as established as it is.",
};

const TRUST_POINTS = [
  { icon: Zap, label: "Fast turnaround", detail: "Most services complete in under 10 business days" },
  { icon: Shield, label: "Verified by experts", detail: "Every submission checked before it reaches an authority" },
  { icon: FileText, label: "Transparent pricing", detail: "See the price and requirements before you apply" },
];

export function ServicesPage() {
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div>
      <section className="relative overflow-hidden bg-forest-dark py-16 text-center sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-forest-light/30 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-ochre/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-ochre-light">Our Services</span>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Every statutory service your business needs
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-paper/65">
            Apply online, track progress in real time, and receive your completed documents — without ever
            queueing at a government office.
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {TRUST_POINTS.map((t) => (
              <div key={t.label} className="glass-dark rounded-xl border-paper/10 p-4 text-left">
                <t.icon className="h-5 w-5 text-ochre-light" />
                <p className="mt-2 text-sm font-medium text-paper">{t.label}</p>
                <p className="mt-0.5 text-xs text-paper/55">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {categories.map((cat, catIndex) => {
        const Icon = categoryIcons[cat];
        const catServices = services.filter((s) => s.category === cat);
        return (
          <section key={cat} className={catIndex % 2 === 1 ? "border-b border-ink/8 bg-white py-16 dark:border-white/8 dark:bg-[#0f1310]" : "border-b border-ink/8 py-16 dark:border-white/8"}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">{categoryLabels[cat]}</h2>
                    <p className="text-sm text-ink-soft dark:text-paper/55">{categoryDescriptions[cat]}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-soft dark:text-paper/60">
                  {categoryDetails[cat]}
                </p>
              </ScrollReveal>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catServices.map((s, i) => (
                  <ScrollReveal key={s.id} delay={i * 0.05}>
                    <Card interactive className="flex h-full flex-col p-5">
                      <h3 className="font-display text-base font-medium text-ink dark:text-paper">{s.name}</h3>
                      <p className="mt-1.5 flex-1 text-sm text-ink-soft dark:text-paper/55">{s.description}</p>
                      {s.documents.length > 0 && (
                        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-soft/80 dark:text-paper/40">
                          <CheckCircle2 className="h-3.5 w-3.5 text-forest/70 dark:text-ochre-light/70" />
                          {s.documents.length} document{s.documents.length > 1 ? "s" : ""} required
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-3 dark:border-white/8">
                        <span className="font-display text-lg font-semibold text-forest dark:text-ochre-light">{formatCurrency(s.price)}</span>
                        <span className="flex items-center gap-1 text-xs text-ink-soft dark:text-paper/45">
                          <Clock className="h-3 w-3" /> ~{s.estimatedDays} days
                        </span>
                      </div>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">Bundled &amp; Discounted</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper">Service Packages</h2>
            <p className="mt-3 text-ink-soft dark:text-paper/60">
              Common combinations of services bundled together at a lower combined price than booking separately.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl">
            {servicePackages.map((pkg, i) => {
              const included = pkg.serviceIds.map((id) => findService(id)).filter(Boolean);
              return (
                <ScrollReveal key={pkg.id} delay={i * 0.08}>
                  <div className="relative overflow-hidden rounded-2xl border border-ochre/30 bg-ochre/5 p-6 shadow-soft dark:border-ochre/20 dark:bg-ochre/5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-medium text-ink dark:text-paper">{pkg.name}</h3>
                      <span className="rounded-full bg-ochre px-2.5 py-1 text-xs font-semibold text-ink shadow-soft">{pkg.discountPercent}% off</span>
                    </div>
                    <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/60">{pkg.description}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-ink dark:text-paper/85">
                      {included.map((s) => (
                        <li key={s!.id} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-forest dark:text-ochre-light" /> {s!.name}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-display text-2xl font-semibold text-forest dark:text-ochre-light">{formatCurrency(pkg.price)}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <ScrollReveal>
          <Link to="/register">
            <Button size="lg" className="gap-2">
              Start an application <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
