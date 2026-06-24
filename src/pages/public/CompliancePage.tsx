import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Receipt, ShieldCheck, FileClock, RefreshCcw, ArrowRight, BellRing } from "lucide-react";
import { Button } from "../../components/ui/Button";

const RENEWALS = [
  { title: "Tax Clearance Certificate", description: "Renews annually with ZIMRA. We track your expiry date and start your renewal 30 days before it lapses.", icon: Receipt },
  { title: "PRAZ Registration", description: "Supplier registration must be renewed every year to remain eligible for tenders.", icon: ShieldCheck },
  { title: "NSSA Compliance", description: "Monthly P4 returns and annual employer compliance, tracked against your filing history.", icon: FileClock },
  { title: "Annual Returns", description: "Company annual returns filed on schedule to keep your registration in good standing.", icon: RefreshCcw },
];

export function CompliancePage() {
  return (
    <div>
      <section className="bg-forest-dark py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-ochre-light">Compliance</span>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Never miss a statutory deadline again
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-paper/65">
            We track every renewal date tied to your business and notify you well before anything expires —
            so compliance stops depending on memory.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {RENEWALS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-xl border border-ink/8 p-6 dark:border-white/8"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light">
                  <r.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-medium text-ink dark:text-paper">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/55">{r.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-white py-16 dark:border-white/8 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <BellRing className="mx-auto h-9 w-9 text-ochre-dark dark:text-ochre-light" />
          <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">
            Automatic reminders, sent how you prefer
          </h2>
          <p className="mt-3 text-sm text-ink-soft dark:text-paper/60">
            Email and WhatsApp notifications go out automatically as a renewal date approaches —
            no need to track expiry dates yourself or wait for a phone call.
          </p>
          <Link to="/register" className="mt-8 inline-block">
            <Button size="lg" className="gap-2">
              Set up compliance tracking <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
