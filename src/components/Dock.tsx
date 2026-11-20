"use client";

import { FolderOpen, Home, LayoutGrid, Lightbulb, MessageCircleQuestion, Phone, Tags } from "lucide-react";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

const items = [
  { id: "top", icon: Home, key: "home" },
  { id: "services", icon: LayoutGrid, key: "services" },
  { id: "work", icon: FolderOpen, key: "work" },
  { id: "pricing", icon: Tags, key: "pricing" },
  { id: "process", icon: Lightbulb, key: "process" },
  { id: "faq", icon: MessageCircleQuestion, key: "faq" },
  { id: "contact", icon: Phone, key: "contact" },
] as const;

/** Floating dock fixed to the bottom of the screen. Shows a tooltip on hover/focus and highlights the section in view. */
export function Dock({ labels }: { labels: Dictionary["nav"] }) {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3 sm:bottom-5">
      <ul className="flex items-end gap-1.5 rounded-2xl border border-gold-400/20 bg-ink-900/70 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl sm:gap-2">
        {items.map(({ id, icon: Icon, key }) => {
          const isActive = active === id;
          return (
            <li key={id} className="group relative flex flex-col items-center">
              <span className="pointer-events-none absolute -top-10 translate-y-1 rounded-md border border-gold-400/20 bg-ink-950 px-2.5 py-1 text-xs whitespace-nowrap text-gold-200 opacity-0 transition duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-sm:hidden">
                {labels[key]}
              </span>
              <a
                href={`#${id}`}
                aria-label={labels[key]}
                aria-current={isActive ? "true" : undefined}
                className={`flex size-10 items-center justify-center rounded-xl border transition-colors duration-200 sm:size-11 ${
                  isActive
                    ? "border-gold-400/60 bg-gold-400/15 text-gold-300"
                    : "border-white/5 bg-ink-800 text-ink-100 hover:border-gold-400/30 hover:text-gold-300"
                }`}
              >
                <Icon className="size-5" aria-hidden />
              </a>
              <span
                aria-hidden
                className={`mt-1 size-1 rounded-full transition ${isActive ? "bg-gold-400" : "bg-transparent"}`}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
