import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xlplus px-4 py-2 text-sm font-semibold tracking-tight transition-all disabled:opacity-50 disabled:pointer-events-none shadow-soft";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600",
    secondary: "bg-ink-900 text-white hover:bg-ink-800",
    ghost: "bg-white/70 text-ink-800 ring-1 ring-ink-100 hover:ring-ink-200 hover:bg-white"
  };
  return <button className={cn(base, variants[variant], className)} {...props} />;
}
