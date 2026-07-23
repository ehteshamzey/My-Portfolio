"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, SunMoon } from "lucide-react";

import { cn } from "@/lib/utils";

const THEMES = ["light", "dark", "system"] as const;

function subscribeNoop() {
  return () => {};
}

function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const current = mounted ? (theme ?? "system") : "system";

  function cycleTheme() {
    const index = THEMES.indexOf(current as (typeof THEMES)[number]);
    const next = THEMES[(index + 1) % THEMES.length];
    setTheme(next);
  }

  const Icon = current === "light" ? Sun : current === "dark" ? Moon : SunMoon;

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Toggle theme (current: ${current})`}
      className={cn(
        "border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 w-9 items-center justify-center border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
