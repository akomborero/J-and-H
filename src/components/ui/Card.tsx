import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Apply a frosted glassmorphism treatment instead of the solid surface. */
  glass?: boolean;
  /** Lift and deepen shadow on hover — for clickable/interactive cards. */
  interactive?: boolean;
}

export function Card({ className, glass, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border transition-all duration-300",
        glass
          ? "glass"
          : "border-ink/8 bg-white shadow-soft dark:border-white/8 dark:bg-[#0e1525]",
        interactive && "hover:-translate-y-1 hover:shadow-elevated cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 p-5 pb-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-display text-lg font-medium tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-ink-soft dark:text-paper/60", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-5 pt-0", className)} {...props} />;
}
