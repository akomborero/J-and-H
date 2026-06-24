import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-offset-2 ring-offset-paper dark:ring-offset-[#0c0f0d]",
  {
    variants: {
      variant: {
        default: "bg-forest text-paper hover:bg-forest-light shadow-sm",
        ochre: "bg-ochre text-ink hover:bg-ochre-dark shadow-sm",
        outline:
          "border border-ink/15 bg-transparent text-ink hover:bg-ink/5 dark:border-white/15 dark:text-paper dark:hover:bg-white/5",
        ghost: "hover:bg-ink/5 text-ink dark:text-paper dark:hover:bg-white/10",
        destructive: "bg-status-danger text-paper hover:opacity-90",
        link: "text-forest underline-offset-4 hover:underline dark:text-ochre-light p-0 h-auto",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";
