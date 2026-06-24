import { motion } from "framer-motion";
import { Target, Eye, HeartHandshake, Award } from "lucide-react";

const VALUES = [
  { title: "Integrity", description: "We handle your documents and statutory filings with the same care we'd want for our own business.", icon: HeartHandshake },
  { title: "Precision", description: "Every application is checked against current requirements before it ever reaches an authority.", icon: Target },
  { title: "Transparency", description: "No black boxes — you see exactly where your application stands, at every stage.", icon: Eye },
  { title: "Reliability", description: "Deadlines tracked automatically, so compliance never depends on memory.", icon: Award },
];

export function AboutPage() {
  return (
    <div>
      <section className="bg-forest-dark py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-ink/8 bg-white p-8 dark:border-white/8 dark:bg-[#141815]"
          >
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
          </motion.div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-white py-16 dark:border-white/8 dark:bg-[#0f1310]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark dark:text-ochre-light">What guides us</span>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink dark:text-paper">Our Values</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-ink/8 p-6 text-center dark:border-white/8"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-medium text-ink dark:text-paper">{v.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft dark:text-paper/55">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
