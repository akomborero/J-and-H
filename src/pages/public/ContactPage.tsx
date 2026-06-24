import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Label, Textarea, Select } from "../../components/ui/Input";

const BRANCHES = [
  { name: "Harare", address: "88 Samora Machel Ave, Harare CBD", phone: "+263 77 200 0000" },
  { name: "Bulawayo", address: "45 Josiah Tongogara St, Bulawayo", phone: "+263 77 200 0001" },
  { name: "Mutare", address: "12 Herbert Chitepo St, Mutare", phone: "+263 77 200 0002" },
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
      <section className="bg-forest-dark py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-ochre-light">Contact Us</span>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            We're here to help
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-paper/65">
            Reach out about a new application, an existing one, or just to ask a question.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-4">
              {BRANCHES.map((b, i) => (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="p-5">
                    <h3 className="flex items-center gap-2 font-display text-base font-medium text-ink dark:text-paper">
                      <MapPin className="h-4 w-4 text-ochre-dark dark:text-ochre-light" /> {b.name} Branch
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft dark:text-paper/55">{b.address}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft dark:text-paper/55">
                      <Phone className="h-3.5 w-3.5" /> {b.phone}
                    </p>
                  </Card>
                </motion.div>
              ))}
              <Card className="flex items-center gap-2.5 p-5">
                <Mail className="h-4 w-4 text-ochre-dark dark:text-ochre-light" />
                <a href="mailto:info@jhconsultancy.co.zw" className="text-sm text-ink hover:underline dark:text-paper">
                  info@jhconsultancy.co.zw
                </a>
              </Card>
            </div>

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
          </div>
        </div>
      </section>
    </div>
  );
}
