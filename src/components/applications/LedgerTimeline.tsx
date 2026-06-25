import { motion } from "framer-motion";
import { Check, FileCheck, Search, Cog, Stamp, PartyPopper, XCircle } from "lucide-react";
import type { ApplicationStatus } from "../../types";
import { cn, formatDateTime } from "../../lib/utils";

const STAGES: { key: ApplicationStatus; label: string; icon: typeof Check }[] = [
  { key: "submitted", label: "Submitted", icon: FileCheck },
  { key: "documents_verified", label: "Documents Verified", icon: Check },
  { key: "under_review", label: "Under Review", icon: Search },
  { key: "processing", label: "Processing", icon: Cog },
  { key: "awaiting_approval", label: "Awaiting Approval", icon: Stamp },
  { key: "completed", label: "Completed", icon: PartyPopper },
];

interface LedgerTimelineProps {
  currentStatus: ApplicationStatus;
  events: { id: string; description: string; actor: string; createdAt: string }[];
}

export function LedgerTimeline({ currentStatus, events }: LedgerTimelineProps) {
  const isRejected = currentStatus === "rejected";
  const currentIndex = STAGES.findIndex((s) => s.key === currentStatus);

  return (
    <div className="relative">
      {/* Stage rail */}
      <div className="relative mb-10 flex justify-between px-2">
        <div className="absolute left-2 right-2 top-5 h-[2px] bg-ink/10 dark:bg-white/10" />
        <motion.div
          className="absolute left-2 top-5 h-[2px] bg-ochre"
          initial={{ width: 0 }}
          animate={{
            width: isRejected
              ? "0%"
              : `calc(${(currentIndex / (STAGES.length - 1)) * 100}% - ${currentIndex === 0 ? 0 : 8}px)`,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {STAGES.map((stage, i) => {
          const reached = !isRejected && i <= currentIndex;
          const isCurrent = !isRejected && i === currentIndex;
          const Icon = stage.icon;
          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center" style={{ width: `${100 / STAGES.length}%` }}>
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-sm",
                  reached
                    ? "border-ochre bg-ochre text-ink"
                    : "border-ink/15 bg-white text-ink-soft/40 dark:border-white/15 dark:bg-[#141b2e]"
                )}
              >
                {isCurrent && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-ochre"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <Icon className="h-4 w-4" strokeWidth={2.25} />
              </motion.div>
              <span
                className={cn(
                  "mt-2 max-w-[80px] text-center text-[11px] font-medium leading-tight",
                  reached ? "text-ink dark:text-paper" : "text-ink-soft/50 dark:text-paper/30"
                )}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {isRejected && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          <XCircle className="h-4 w-4 shrink-0" />
          This application was rejected. Check the latest note below or contact support.
        </div>
      )}

      {/* Ledger entries */}
      <div className="relative space-y-0 border-l border-dashed border-ink/15 pl-6 dark:border-white/15">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.06 }}
            className="relative pb-7 last:pb-0"
          >
            {/* Wax seal stamp marker */}
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + i * 0.06, type: "spring", stiffness: 300, damping: 14 }}
              className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-forest shadow-[0_0_0_3px_var(--color-paper)] dark:shadow-[0_0_0_3px_#070b14]"
            >
              <div className="h-2 w-2 rounded-full bg-ochre-light" />
            </motion.div>
            <p className="text-sm font-medium text-ink dark:text-paper">{event.description}</p>
            <p className="mt-0.5 text-xs text-ink-soft dark:text-paper/50">
              {event.actor} &middot; {formatDateTime(event.createdAt)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
