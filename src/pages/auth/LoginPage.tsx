import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input, Label } from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";
import { profiles } from "../../mock/data/seed";

const roleHomeMap = {
  client: "/client",
  admin: "/admin",
  super_admin: "/super-admin",
};

export function LoginPage() {
  const [email, setEmail] = useState("tendai.moyo@example.com");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    const matched = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
    navigate(roleHomeMap[matched?.role ?? "client"]);
  };

  const quickLogin = (profileId: string) => {
    const p = profiles.find((pr) => pr.id === profileId);
    if (!p) return;
    login(p.email);
    navigate(roleHomeMap[p.role]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center surface px-4">
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
          <h1 className="mt-4 font-display text-2xl font-medium text-ink dark:text-paper">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Sign in to your J&amp;H Consultancy account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" defaultValue="demo-password" />
          </div>
          <Button type="submit" className="w-full" size="lg">Sign in</Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink/10 dark:bg-white/10" />
          <span className="text-xs text-ink-soft dark:text-paper/40">Demo quick access</span>
          <div className="h-px flex-1 bg-ink/10 dark:bg-white/10" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" onClick={() => quickLogin("client-1")}>Client</Button>
          <Button variant="outline" size="sm" onClick={() => quickLogin("admin-1")}>Admin</Button>
          <Button variant="outline" size="sm" onClick={() => quickLogin("super-1")}>Super Admin</Button>
        </div>

        <p className="mt-6 text-center text-sm text-ink-soft dark:text-paper/55">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-forest hover:underline dark:text-ochre-light">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
