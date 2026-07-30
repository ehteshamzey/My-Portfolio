"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/siteConfig";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { label: "~", href: "/" },
  { label: "about", href: "/#about", sectionId: "about" },
  { label: "skills", href: "/#skills", sectionId: "skills" },
  { label: "projects", href: "/#projects", sectionId: "projects" },
  { label: "blog", href: "/#blog", sectionId: "blog" },
  { label: "contact", href: "/#contact", sectionId: "contact" },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.sectionId).filter((id): id is string =>
  Boolean(id),
);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  function isActive(link: (typeof NAV_LINKS)[number]) {
    if (link.sectionId === "blog" && pathname.startsWith("/blog")) return true;
    if (link.sectionId) return pathname === "/" && activeSection === link.sectionId;
    return false;
  }

  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="border-border flex h-9 items-center gap-1.5 border-b px-4 sm:px-6 lg:px-8">
        <span className="bg-destructive/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
        <span className="bg-primary/50 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
        <span className="bg-primary/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
        <span className="text-muted-foreground ml-3 text-xs">
          {siteConfig.name.toLowerCase().replace(/\s+/g, "-")}@portfolio:~
        </span>
      </div>

      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="text-primary text-base font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="text-muted-foreground">$</span> {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-primary focus-visible:ring-ring relative text-sm transition-colors duration-100 ease-linear focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                "after:bg-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:transition-[width] after:duration-150 after:ease-linear hover:after:w-full",
                isActive(link) ? "text-primary after:w-full" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 w-9 items-center justify-center border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            )}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="border-border bg-background overflow-hidden border-b md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "hover:bg-accent hover:text-primary px-3 py-2 text-sm transition-colors",
                    isActive(link) ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
