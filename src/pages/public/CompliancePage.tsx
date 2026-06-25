import { Link } from "react-router-dom";
import { Receipt, ShieldCheck, FileClock, RefreshCcw, ArrowRight, BellRing, Mail, MessageCircle, CalendarClock, AlertTriangle } from "lucide-react";
import { ScrollReveal } from "../../components/marketing/ScrollReveal";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

const RENEWALS = [
  { title: "Tax Clearance Certificate", description: "Renews annually with ZIMRA. We track your expiry date and start your renewal 30 days before it lapses.", icon: Receipt, risk: "Without a valid certificate, you may be denied tenders or have higher withholding tax applied." },
  { title: "PRAZ Registration", description: "Supplier registration must be renewed every year to remain eligible for tenders.", icon: ShieldCheck, risk: "An expired registration removes you from the supplier database, ending tender eligibility immediately." },
  { title: "NSSA Compliance", description: "Monthly P4 returns and annual employer compliance, tracked against your filing history.", icon: FileClock, risk: "Missed P4 returns accumulate penalties and interest the longer they go unfiled." },
  { title: "Annual Returns", description: "Company annual returns filed on schedule to keep your registration in good standing.", icon: RefreshCcw, risk: "Persistent non-filing can lead to a company being struck off the companies register." },
];

const REMINDER_STEPS = [
  { title: "We log every expiry date", description: "The moment a certificate or registration is issued, its renewal date is recorded against your account.", icon: CalendarClock },
  { title: "Reminders start 30 days out", description: "You receive an early notice with enough time to gather documents and avoid rush fees.", icon: BellRing },
  { title: "Delivered where you'll see them", description: "Email for your records, WhatsApp for the message you'll actually notice.", icon: MessageCircle },
];

export function CompliancePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-forest-dark py-16 text-center sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-forest-light/30 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-ochre/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper sm:text-3xl">
              What we track on your behalf
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {RENEWALS.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 0.08}>
                <Card className="h-full p-6">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light">
                      <r.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-medium text-ink dark:text-paper">{r.title}</h3>
                      <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/55">{r.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-status-danger/8 p-3 text-xs text-status-danger dark:bg-status-danger/10">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{r.risk}</span>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How reminders work */}
      <section className="border-y border-ink/8 bg-white py-16 dark:border-white/8 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">How it works</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper">
              From expiry date to peace of mind
            </h2>
          </ScrollReveal>
          <div className="relative mt-14 grid gap-8 sm:grid-cols-3">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink/10 dark:bg-white/10 sm:block" />
            {REMINDER_STEPS.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-ochre-light shadow-glow">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-medium text-ink dark:text-paper">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/55">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-forest/8 px-5 py-2.5 dark:bg-forest-light/10">
              <Mail className="h-4 w-4 text-forest dark:text-ochre-light" />
              <span className="text-sm text-ink-soft dark:text-paper/65">Email</span>
              <span className="text-ink-soft/40">+</span>
              <MessageCircle className="h-4 w-4 text-forest dark:text-ochre-light" />
              <span className="text-sm text-ink-soft dark:text-paper/65">WhatsApp</span>
            </div>
            <h2 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">
              Automatic reminders, sent how you prefer
            </h2>
            <p className="mt-3 text-sm text-ink-soft dark:text-paper/60">
              Notifications go out automatically as a renewal date approaches —
              no need to track expiry dates yourself or wait for a phone call.
            </p>
            <Link to="/register" className="mt-8 inline-block">
              <Button size="lg" className="gap-2">
                Set up compliance tracking <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
