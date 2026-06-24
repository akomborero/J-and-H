import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-[#1a1f1b] dark:text-paper dark:placeholder:text-paper/30",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[90px] w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-[#1a1f1b] dark:text-paper dark:placeholder:text-paper/30",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("mb-1.5 block text-sm font-medium text-ink dark:text-paper/90", className)} {...props} />
  )
);
Label.displayName = "Label";

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre dark:border-white/15 dark:bg-[#1a1f1b] dark:text-paper",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";
