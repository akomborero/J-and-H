import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageCircle, LifeBuoy } from "lucide-react";
import { ScrollReveal } from "../../components/marketing/ScrollReveal";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Label, Textarea, Select } from "../../components/ui/Input";

const BRANCHES = [
  { name: "Harare", address: "88 Samora Machel Ave, Harare CBD", phone: "+263 77 200 0000", hours: "Mon–Fri, 8am–5pm" },
  { name: "Bulawayo", address: "45 Josiah Tongogara St, Bulawayo", phone: "+263 77 200 0001", hours: "Mon–Fri, 8am–5pm" },
  { name: "Mutare", address: "12 Herbert Chitepo St, Mutare", phone: "+263 77 200 0002", hours: "Mon–Fri, 8am–5pm" },
];

const QUICK_ANSWERS = [
  { icon: Clock, label: "Existing application?", detail: "Sign in and check your dashboard for the fastest status update." },
  { icon: LifeBuoy, label: "Need urgent help?", detail: "Call your nearest branch directly — numbers are listed alongside each location." },
  { icon: MessageCircle, label: "General question?", detail: "Check our Knowledge Base first — many common questions are already answered there." },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", branch: "Harare", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-forest-dark py-16 text-center sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-forest-light/30 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-ochre/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-ochre-light">Contact Us</span>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            We're here to help
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-paper/65">
            Reach out about a new application, an existing one, or just to ask a question. We typically
            respond within one business day.
          </p>
        </div>
      </section>

      {/* Quick answers strip */}
      <section className="border-b border-ink/8 py-10 dark:border-white/8">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {QUICK_ANSWERS.map((q, i) => (
            <ScrollReveal key={q.label} delay={i * 0.06}>
              <div className="flex items-start gap-3 rounded-xl border border-ink/8 p-4 dark:border-white/8">
                <q.icon className="mt-0.5 h-4 w-4 shrink-0 text-forest dark:text-ochre-light" />
                <div>
                  <p className="text-sm font-medium text-ink dark:text-paper">{q.label}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">{q.detail}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-4">
              {BRANCHES.map((b, i) => (
                <ScrollReveal key={b.name} delay={i * 0.08}>
                  <Card interactive className="p-5">
                    <h3 className="flex items-center gap-2 font-display text-base font-medium text-ink dark:text-paper">
                      <MapPin className="h-4 w-4 text-ochre-dark dark:text-ochre-light" /> {b.name} Branch
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft dark:text-paper/55">{b.address}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft dark:text-paper/55">
                      <Phone className="h-3.5 w-3.5" /> {b.phone}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft/80 dark:text-paper/40">
                      <Clock className="h-3.5 w-3.5" /> {b.hours}
                    </p>
                  </Card>
                </ScrollReveal>
              ))}
              <ScrollReveal delay={0.24}>
                <Card className="flex items-center gap-2.5 p-5">
                  <Mail className="h-4 w-4 text-ochre-dark dark:text-ochre-light" />
                  <a href="mailto:info@jhconsultancy.co.zw" className="text-sm text-ink hover:underline dark:text-paper">
                    info@jhconsultancy.co.zw
                  </a>
                </Card>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.1}>
              <Card className="p-6 sm:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <CheckCircle2 className="h-10 w-10 text-forest dark:text-ochre-light" />
                    <h3 className="mt-4 font-display text-lg font-medium text-ink dark:text-paper">Message sent</h3>
                    <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">
                      Thanks for reaching out — our team will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="branch">Nearest branch</Label>
                      <Select id="branch" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
                        {BRANCHES.map((b) => <option key={b.name}>{b.name}</option>)}
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="min-h-[140px]" placeholder="Tell us what you need help with..." />
                    </div>
                    <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto">
                      Send message <Send className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
