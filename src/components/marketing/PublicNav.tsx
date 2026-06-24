import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { TopContactBar } from "./TopContactBar";
import { cn } from "../../lib/utils";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Compliance", to: "/compliance" },
  { label: "Contact", to: "/contact" },
];

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <TopContactBar />
      <header
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-ink/8 bg-paper/95 shadow-soft backdrop-blur-md dark:border-white/8 dark:bg-[#0c0f0d]/95"
            : "border-transparent bg-paper dark:bg-[#0c0f0d]"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest font-display text-base font-semibold text-ochre-light">
              J&amp;H
            </div>
            <div className="leading-none">
              <p className="font-display text-base font-semibold tracking-tight text-ink dark:text-paper">
                J&amp;H Consultancy
              </p>
              <p className="text-[10px] uppercase tracking-wider text-ink-soft/70 dark:text-paper/45">
                Services
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-forest dark:text-ochre-light"
                      : "text-ink-soft hover:text-ink dark:text-paper/65 dark:hover:text-paper"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button variant="ochre" size="sm">Get Started</Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-2 text-ink hover:bg-ink/5 dark:text-paper dark:hover:bg-white/5 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-ink/8 bg-paper dark:border-white/8 dark:bg-[#0c0f0d] lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-3">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3 py-2.5 text-sm font-medium",
                        isActive ? "bg-forest/10 text-forest dark:text-ochre-light" : "text-ink-soft dark:text-paper/70"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="mt-2 flex gap-2 border-t border-ink/8 pt-3 dark:border-white/8">
                  <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">Sign in</Button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="ochre" size="sm" className="w-full">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
