import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { getNavForRole } from "./navConfig";
import type { UserRole } from "../../types";
import { cn } from "../../lib/utils";

export function Sidebar({ role, mobileOpen, onClose }: { role: UserRole; mobileOpen: boolean; onClose: () => void }) {
  const items = getNavForRole(role);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-ink/8 bg-white transition-transform duration-300 dark:border-white/8 dark:bg-[#0f1310] lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-ink/8 px-5 dark:border-white/8">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-forest font-display text-sm font-semibold text-ochre-light">
            J&H
          </div>
          <div className="leading-none">
            <p className="font-display text-sm font-semibold text-ink dark:text-paper">J&H Consultancy</p>
            <p className="text-[11px] text-ink-soft dark:text-paper/50">
              {role === "super_admin" ? "Super Admin" : role === "admin" ? "Admin Console" : "Client Portal"}
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/client" || item.to === "/admin" || item.to === "/super-admin"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light"
                    : "text-ink-soft hover:bg-ink/5 hover:text-ink dark:text-paper/60 dark:hover:bg-white/5 dark:hover:text-paper"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute left-0 h-5 w-[3px] rounded-full bg-ochre"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-ink/8 p-4 dark:border-white/8">
          <p className="text-[11px] text-ink-soft/70 dark:text-paper/40">
            J&H Consultancy Services &copy; 2026
          </p>
        </div>
      </aside>
    </>
  );
}
