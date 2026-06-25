import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Building2, Receipt, ShieldCheck, Briefcase, ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/Button";
import { TopContactBar } from "./TopContactBar";
import { useAuth } from "../../context/AuthContext";
import { roleHome } from "../../lib/roleHome";
import { cn } from "../../lib/utils";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services", hasDropdown: true },
  { label: "About", to: "/about" },
  { label: "Compliance", to: "/compliance" },
  { label: "Contact", to: "/contact" },
];

const SERVICE_GROUPS = [
  { label: "Company Registration", to: "/services", icon: Building2, description: "Pvt Ltd, PBC, re-registration" },
  { label: "Tax Services", to: "/services", icon: Receipt, description: "BP number, VAT, tax clearance" },
  { label: "Compliance Services", to: "/services", icon: ShieldCheck, description: "NSSA, NEC, PRAZ" },
  { label: "Business Support", to: "/services", icon: Briefcase, description: "Profiles, logos, vendor numbers" },
];

export function PublicNav() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
            ? "glass-nav border-ink/8 shadow-soft dark:border-white/8"
            : "border-transparent bg-paper dark:bg-[#070b14]"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest font-display text-base font-semibold text-ochre-light shadow-soft">
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
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-forest dark:text-ochre-light"
                          : "text-ink-soft hover:text-ink dark:text-paper/65 dark:hover:text-paper"
                      )
                    }
                  >
                    {link.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} />
                  </NavLink>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="glass absolute left-1/2 top-full mt-2 w-[360px] -translate-x-1/2 rounded-2xl border-ink/8 p-2 dark:border-white/10"
                      >
                        {SERVICE_GROUPS.map((g) => (
                          <Link
                            key={g.label}
                            to={g.to}
                            className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-forest/8 dark:hover:bg-white/5"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light">
                              <g.icon className="h-4.5 w-4.5" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-ink dark:text-paper">{g.label}</p>
                              <p className="text-xs text-ink-soft dark:text-paper/50">{g.description}</p>
                            </div>
                          </Link>
                        ))}
                        <Link
                          to="/services"
                          className="mt-1 flex items-center justify-between rounded-xl bg-forest/5 p-3 text-sm font-medium text-forest dark:bg-forest-light/10 dark:text-ochre-light"
                        >
                          View all services <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
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
              )
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <Link to={roleHome[user.role]}>
                <Button variant="ochre" size="sm" className="gap-1.5 shadow-glow">
                  <LayoutDashboard className="h-3.5 w-3.5" /> Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="ochre" size="sm" className="shadow-glow">Get Started</Button>
                </Link>
              </>
            )}
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
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="glass-nav overflow-hidden border-t border-ink/8 dark:border-white/8 lg:hidden"
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
                        "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive ? "bg-forest/10 text-forest dark:text-ochre-light" : "text-ink-soft dark:text-paper/70"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="mt-2 flex gap-2 border-t border-ink/8 pt-3 dark:border-white/8">
                  {user ? (
                    <Link to={roleHome[user.role]} className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="ochre" size="sm" className="w-full gap-1.5">
                        <LayoutDashboard className="h-3.5 w-3.5" /> Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full">Sign in</Button>
                      </Link>
                      <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <Button variant="ochre" size="sm" className="w-full">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
