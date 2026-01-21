import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xlplus border border-ink-100 bg-white/80 px-3 text-sm text-ink-900 shadow-soft outline-none backdrop-blur ring-brand-200 focus:ring-4 focus:border-brand-300 placeholder:text-ink-400",
        className
      )}
      {...props}
    />
  );
});
