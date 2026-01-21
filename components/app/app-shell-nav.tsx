"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href?: string;
  badge?: string;
};

type AppShellNavProps = {
  items: NavItem[];
};

export function AppShellNav({ items }: AppShellNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-brand-gradient shadow-card" />
          <div>
            <div className="text-sm font-bold text-ink-800">توکان</div>
            <div className="text-xs text-ink-500">ورژن مدرن</div>
          </div>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xlplus border border-ink-100 bg-white px-3 py-2 text-sm font-medium text-ink-800 shadow-soft"
        >
          منو
        </button>
      </div>

      <aside
        className={cn(
          "surface z-20 h-fit p-3 transition-all md:sticky md:top-20",
          open ? "block" : "hidden md:block"
        )}
      >
        <nav className="space-y-1 text-sm">
          {items.map((item) => {
            const active = item.href && pathname?.startsWith(item.href);
            const shared =
              "group flex items-center justify-between rounded-xlplus px-3 py-2 transition-colors";
            if (!item.href) {
              return (
                <div
                  key={item.label}
                  className={cn(shared, "cursor-default text-ink-500/80 hover:bg-ink-50")}
                  aria-disabled
                >
                  <span>{item.label}</span>
                  {item.badge ? <span className="accent-chip">{item.badge}</span> : null}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                className={cn(
                  shared,
                  active
                    ? "bg-brand-50 text-brand-800 ring-1 ring-brand-200"
                    : "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                )}
                href={item.href}
              >
                <span>{item.label}</span>
                {item.badge ? <span className="accent-chip">{item.badge}</span> : null}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
