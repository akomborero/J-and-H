import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input, Label, Select } from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";

export function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    branch: "Harare",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login("tendai.moyo@example.com", "client");
    navigate("/client");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest-dark px-4 py-10">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-forest-light/30 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-ochre/10 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" preserveAspectRatio="none">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1="0" x2="100%" y1={`${(i + 1) * 6}%`} y2={`${(i + 1) * 6}%`} stroke="#E3B876" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <Link to="/" className="absolute left-6 top-6 z-10 flex items-center gap-1.5 text-sm text-paper/70 transition-colors hover:text-paper">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="glass relative z-10 w-full max-w-sm rounded-2xl border-paper/15 p-8"
      >
        <div className="mb-7 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-ochre font-display text-base font-semibold text-ink shadow-glow">
            J&amp;H
          </div>
          <h1 className="mt-4 font-display text-2xl font-medium text-paper">Create your account</h1>
          <p className="mt-1 text-sm text-paper/60">Start tracking your applications in one place</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-paper/85">Full name</Label>
            <Input
              id="fullName"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Tendai Moyo"
              className="border-paper/15 bg-white/5 text-paper placeholder:text-paper/30"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-paper/85">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="border-paper/15 bg-white/5 text-paper placeholder:text-paper/30"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-paper/85">Phone number</Label>
            <Input
              id="phone"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+263 77 123 4567"
              className="border-paper/15 bg-white/5 text-paper placeholder:text-paper/30"
            />
          </div>
          <div>
            <Label htmlFor="branch" className="text-paper/85">Preferred branch</Label>
            <Select
              id="branch"
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              className="border-paper/15 bg-white/5 text-paper [&>option]:text-ink"
            >
              <option>Harare</option>
              <option>Bulawayo</option>
              <option>Mutare</option>
            </Select>
          </div>
          <Button type="submit" variant="ochre" className="w-full" size="lg">Create account</Button>
        </form>

        <p className="mt-6 text-center text-sm text-paper/60">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-ochre-light hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
