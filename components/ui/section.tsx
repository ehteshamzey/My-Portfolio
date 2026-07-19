import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("w-full py-16 sm:py-24", className)} {...props} />;
}
