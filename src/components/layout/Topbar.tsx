import { useState } from "react";
import { Menu, Sun, Moon, Bell, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useDataStore } from "../../context/DataStoreContext";
import { initials, timeAgo } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, markNotificationRead } = useDataStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;
  const myNotifications = notifications.filter((n) => n.userId === user.id);
  const unreadCount = myNotifications.filter((n) => !n.read).length;

  return (
    <header className="glass-nav sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink/8 px-4 dark:border-white/8 lg:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-ink-soft hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-white/5 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-md p-2 text-ink-soft transition-colors hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-white/5"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        <div className="relative">
          <button
            onClick={() => { setNotifOpen((v) => !v); setUserOpen(false); }}
            className="relative rounded-md p-2 text-ink-soft transition-colors hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-white/5"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ochre text-[10px] font-semibold text-ink">
                {unreadCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="glass absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border-ink/8 shadow-elevated dark:border-white/10"
              >
                <div className="border-b border-ink/8 px-4 py-3 dark:border-white/8">
                  <p className="text-sm font-semibold text-ink dark:text-paper">Notifications</p>
                </div>
                <div className="max-h-80 overflow-y-auto scrollbar-thin">
                  {myNotifications.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm text-ink-soft dark:text-paper/50">
                      You're all caught up.
                    </p>
                  ) : (
                    myNotifications.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className="flex w-full flex-col items-start gap-0.5 border-b border-ink/5 px-4 py-3 text-left transition-colors last:border-0 hover:bg-ink/3 dark:border-white/5 dark:hover:bg-white/3"
                      >
                        <div className="flex w-full items-center gap-2">
                          {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ochre" />}
                          <p className="text-sm font-medium text-ink dark:text-paper">{n.title}</p>
                        </div>
                        <p className="text-xs text-ink-soft dark:text-paper/50">{n.body}</p>
                        <p className="text-[11px] text-ink-soft/60 dark:text-paper/30">{timeAgo(n.createdAt)}</p>
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button
            onClick={() => { setUserOpen((v) => !v); setNotifOpen(false); }}
            className="flex items-center gap-2 rounded-md py-1.5 pl-1.5 pr-2 transition-colors hover:bg-ink/5 dark:hover:bg-white/5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-semibold text-ochre-light">
              {initials(user.fullName)}
            </div>
            <span className="hidden text-sm font-medium text-ink dark:text-paper sm:block">{user.fullName.split(" ")[0]}</span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-ink-soft sm:block" />
          </button>
          <AnimatePresence>
            {userOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="glass absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border-ink/8 shadow-elevated dark:border-white/10"
              >
                <div className="border-b border-ink/8 px-4 py-3 dark:border-white/8">
                  <p className="text-sm font-medium text-ink dark:text-paper">{user.fullName}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">{user.email}</p>
                </div>
                <button
                  onClick={() => { logout(); navigate("/"); }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-status-danger transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
