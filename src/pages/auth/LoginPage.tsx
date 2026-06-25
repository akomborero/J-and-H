import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input, Label } from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";
import { profiles } from "../../mock/data/seed";
import { roleHome } from "../../lib/roleHome";

export function LoginPage() {
  const [email, setEmail] = useState("tendai.moyo@example.com");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    const matched = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
    navigate(roleHome[matched?.role ?? "client"]);
  };

  const quickLogin = (profileId: string) => {
    const p = profiles.find((pr) => pr.id === profileId);
    if (!p) return;
    login(p.email);
    navigate(roleHome[p.role]);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest-dark px-4">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-forest-light/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-ochre/10 blur-3xl" />
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
          <h1 className="mt-4 font-display text-2xl font-medium text-paper">Welcome back</h1>
          <p className="mt-1 text-sm text-paper/60">Sign in to your J&amp;H Consultancy account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-paper/85">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-paper/15 bg-white/5 text-paper placeholder:text-paper/30"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-paper/85">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              defaultValue="demo-password"
              className="border-paper/15 bg-white/5 text-paper placeholder:text-paper/30"
            />
          </div>
          <Button type="submit" variant="ochre" className="w-full" size="lg">Sign in</Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-paper/15" />
          <span className="text-xs text-paper/45">Demo quick access</span>
          <div className="h-px flex-1 bg-paper/15" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button size="sm" className="glass-dark border-paper/15 text-paper hover:bg-white/10" onClick={() => quickLogin("client-1")}>Client</Button>
          <Button size="sm" className="glass-dark border-paper/15 text-paper hover:bg-white/10" onClick={() => quickLogin("admin-1")}>Admin</Button>
          <Button size="sm" className="glass-dark border-paper/15 text-paper hover:bg-white/10" onClick={() => quickLogin("super-1")}>Super Admin</Button>
        </div>

        <p className="mt-6 text-center text-sm text-paper/60">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-ochre-light hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
