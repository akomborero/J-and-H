import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Receipt, ShieldCheck, Briefcase, ArrowRight, Clock } from "lucide-react";
import { Button } from "../../components/ui/Button";
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

export function ServicesPage() {
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div>
      <section className="bg-forest-dark py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-ochre-light">Our Services</span>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Every statutory service your business needs
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-paper/65">
            Apply online, track progress in real time, and receive your completed documents — without ever
            queueing at a government office.
          </p>
        </div>
      </section>

      {categories.map((cat) => {
        const Icon = categoryIcons[cat];
        const catServices = services.filter((s) => s.category === cat);
        return (
          <section key={cat} className="border-b border-ink/8 py-16 dark:border-white/8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">{categoryLabels[cat]}</h2>
                  <p className="text-sm text-ink-soft dark:text-paper/55">{categoryDescriptions[cat]}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catServices.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col rounded-xl border border-ink/8 p-5 transition-shadow hover:shadow-elevated dark:border-white/8"
                  >
                    <h3 className="font-display text-base font-medium text-ink dark:text-paper">{s.name}</h3>
                    <p className="mt-1.5 flex-1 text-sm text-ink-soft dark:text-paper/55">{s.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-3 dark:border-white/8">
                      <span className="font-display text-lg font-semibold text-forest dark:text-ochre-light">{formatCurrency(s.price)}</span>
                      <span className="flex items-center gap-1 text-xs text-ink-soft dark:text-paper/45">
                        <Clock className="h-3 w-3" /> ~{s.estimatedDays} days
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-white py-16 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">Bundled &amp; Discounted</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper">Service Packages</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl">
            {servicePackages.map((pkg) => {
              const included = pkg.serviceIds.map((id) => findService(id)).filter(Boolean);
              return (
                <div key={pkg.id} className="rounded-2xl border border-ochre/30 bg-ochre/5 p-6 dark:border-ochre/20 dark:bg-ochre/5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-medium text-ink dark:text-paper">{pkg.name}</h3>
                    <span className="rounded-full bg-ochre px-2.5 py-1 text-xs font-semibold text-ink">{pkg.discountPercent}% off</span>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/60">{pkg.description}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-ink dark:text-paper/85">
                    {included.map((s) => <li key={s!.id}>&bull; {s!.name}</li>)}
                  </ul>
                  <p className="mt-4 font-display text-2xl font-semibold text-forest dark:text-ochre-light">{formatCurrency(pkg.price)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <Link to="/register">
          <Button size="lg" className="gap-2">
            Start an application <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
