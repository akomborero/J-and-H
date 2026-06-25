import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const fieldBase =
  "flex w-full rounded-lg border border-ink/15 bg-white text-sm text-ink shadow-sm transition-all duration-200 placeholder:text-ink-soft/45 focus-visible:outline-none focus-visible:border-ochre/60 focus-visible:ring-2 focus-visible:ring-ochre/40 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-[#141b2e] dark:text-paper dark:placeholder:text-paper/30";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldBase, "h-10 px-3 py-2", className)} {...props} />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldBase, "min-h-[90px] px-3 py-2", className)} {...props} />
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
    <select ref={ref} className={cn(fieldBase, "h-10 px-3 py-2", className)} {...props}>
      {children}
    </select>
  )
);
Select.displayName = "Select";
