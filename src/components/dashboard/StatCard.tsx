import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  accent?: "forest" | "ochre" | "blue" | "danger";
  delay?: number;
}

const accentMap = {
  forest: "bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light",
  ochre: "bg-ochre/15 text-ochre-dark dark:bg-ochre/20 dark:text-ochre-light",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
  danger: "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300",
};

export function StatCard({ label, value, icon: Icon, trend, accent = "forest", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
    >
      <Card className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-ink-soft dark:text-paper/55">{label}</p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper">
              {value}
            </p>
            {trend && (
              <p className={cn("mt-1.5 text-xs font-medium", trend.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}>
                {trend.positive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", accentMap[accent])}>
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
