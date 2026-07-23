import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const VARIANT_CLASSES = {
  default: "bg-primary text-primary-foreground",
  secondary: "border border-primary/40 bg-transparent text-primary",
  outline: "border border-border text-foreground",
} as const;

export type BadgeVariant = keyof typeof VARIANT_CLASSES;

interface BadgeProps extends ComponentProps<"span"> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium before:mr-1 before:content-['#']",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
