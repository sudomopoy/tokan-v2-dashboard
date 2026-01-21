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
      {/* Mobile top bar */}
      <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-brand-gradient shadow-card" />
          <div>
            <div className="text-sm font-bold text-ink-800">توکان</div>
            <div className="text-xs text-ink-500">داشبورد شما</div>
          </div>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xlplus border border-ink-100 bg-white px-3 py-2 text-sm font-medium text-ink-800 shadow-soft"
        >
          منو
        </button>
      </div>

      {/* Desktop dark sidebar */}
      <aside className="z-20 hidden h-fit rounded-xlplus bg-ink-900/98 p-3 text-ink-50 shadow-card ring-1 ring-ink-800 md:sticky md:top-20 md:block">
        <nav className="space-y-1 text-sm">
          {items.map((item) => {
            const active = item.href && pathname?.startsWith(item.href);
            const shared =
              "group flex items-center justify-between rounded-xlplus px-3 py-2 transition-colors";
            if (!item.href) {
              return (
                <div
                  key={item.label}
                  className={cn(shared, "cursor-default text-ink-200/80 hover:bg-ink-800/60")}
                  aria-disabled
                >
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="accent-chip bg-ink-800 text-ink-50 ring-ink-700">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                className={cn(
                  shared,
                  active
                    ? "bg-ink-800 text-white ring-1 ring-brand-400"
                    : "text-ink-200 hover:bg-ink-800 hover:text-white"
                )}
                href={item.href}
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="accent-chip bg-brand-500 text-white ring-brand-400">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile bottom navigation */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-800/70 bg-ink-900/98 text-ink-50 md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2 text-xs">
          {items
            .filter((item) => item.href)
            .slice(0, 4)
            .map((item) => {
              const active = item.href && pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 transition-colors",
                    active ? "bg-ink-800 text-white" : "text-ink-300 hover:bg-ink-800/70"
                  )}
                >
                  <span className="truncate text-[11px]">{item.label}</span>
                </Link>
              );
            })}

          <button
            onClick={() => setOpen(true)}
            className="ml-1 flex flex-col items-center gap-0.5 rounded-lg bg-brand-500 px-3 py-1.5 text-[11px] font-medium text-white"
          >
            بیشتر
          </button>
        </div>
      </div>

      {/* Mobile drawer menu (from right) */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="بستن منو"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-72 max-w-[80%] bg-ink-900 text-ink-50 shadow-card ring-1 ring-ink-800">
            <div className="flex items-center justify-between border-b border-ink-800 px-4 py-3">
              <span className="text-sm font-semibold">منوی توکان</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-ink-800 px-3 py-1 text-xs text-ink-100"
              >
                بستن
              </button>
            </div>
            <nav className="space-y-1 p-3 text-sm">
              {items.map((item) => {
                const active = item.href && pathname?.startsWith(item.href);
                const shared =
                  "group flex items-center justify-between rounded-xlplus px-3 py-2 transition-colors";
                if (!item.href) {
                  return (
                    <div
                      key={item.label}
                      className={cn(shared, "cursor-default text-ink-300/90 hover:bg-ink-800/70")}
                      aria-disabled
                    >
                      <span>{item.label}</span>
                      {item.badge ? (
                        <span className="accent-chip bg-ink-800 text-ink-50 ring-ink-700">
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      shared,
                      active
                        ? "bg-ink-800 text-white ring-1 ring-brand-400"
                        : "text-ink-200 hover:bg-ink-800 hover:text-white"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span className="accent-chip bg-brand-500 text-white ring-brand-400">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
