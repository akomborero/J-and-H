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
    <div className="flex min-h-screen items-center justify-center surface px-4 py-10">
      <Link to="/" className="absolute left-6 top-6 flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink dark:text-paper/60 dark:hover:text-paper">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-sm"
      >
        <div className="mb-7 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-forest font-display text-base font-semibold text-ochre-light">
            J&amp;H
          </div>
          <h1 className="mt-4 font-display text-2xl font-medium text-ink dark:text-paper">Create your account</h1>
          <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Start tracking your applications in one place</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Tendai Moyo" />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+263 77 123 4567" />
          </div>
          <div>
            <Label htmlFor="branch">Preferred branch</Label>
            <Select id="branch" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
              <option>Harare</option>
              <option>Bulawayo</option>
              <option>Mutare</option>
            </Select>
          </div>
          <Button type="submit" className="w-full" size="lg">Create account</Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft dark:text-paper/55">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-forest hover:underline dark:text-ochre-light">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
