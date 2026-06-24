import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-ink/8 text-ink dark:bg-white/10 dark:text-paper",
        forest: "bg-forest/10 text-forest dark:bg-forest-light/20 dark:text-ochre-light",
        ochre: "bg-ochre/15 text-ochre-dark dark:bg-ochre/20 dark:text-ochre-light",
        blue: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
        success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
        danger: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300",
        outline: "border border-ink/15 text-ink dark:border-white/20 dark:text-paper",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
