"use client";

import { Calculator, FolderOpen, Home, LayoutGrid, Lightbulb, MessageCircleQuestion, Phone } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries";

const items = [
  { id: "top", icon: Home, key: "home" },
  { id: "services", icon: LayoutGrid, key: "services" },
  { id: "work", icon: FolderOpen, key: "work" },
  { id: "estimate", icon: Calculator, key: "estimate" },
  { id: "process", icon: Lightbulb, key: "process" },
  { id: "faq", icon: MessageCircleQuestion, key: "faq" },
  { id: "contact", icon: Phone, key: "contact" },
] as const;

const BASE = 44; // px
const MAX_GROW = 0.55; // +55% at the cursor
const RANGE = 130; // px of influence

/** macOS-style magnifying dock, fixed to the bottom of the screen. Highlights the section in view. */
export function Dock({ labels }: { labels: Dictionary["nav"] }) {
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [sizes, setSizes] = useState<number[] | null>(null);
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

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setSizes(
      refs.current.map((el) => {
        if (!el) return BASE;
        const r = el.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        return BASE * (1 + MAX_GROW * Math.max(0, 1 - d / RANGE));
      }),
    );
  };

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3 sm:bottom-5"
    >
      <ul
        onPointerMove={onMove}
        onPointerLeave={() => setSizes(null)}
        className="flex items-end gap-1.5 rounded-2xl border border-gold-400/20 bg-ink-900/70 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl sm:gap-2"
      >
        {items.map(({ id, icon: Icon, key }, i) => {
          const size = sizes?.[i] ?? BASE;
          const isActive = active === id;
          return (
            <li key={id} className="group relative flex flex-col items-center">
              <span className="pointer-events-none absolute -top-10 rounded-md border border-gold-400/20 bg-ink-950 px-2.5 py-1 text-xs whitespace-nowrap text-gold-200 opacity-0 transition group-hover:opacity-100 max-sm:hidden">
                {labels[key]}
              </span>
              <a
                ref={(el) => {
                  refs.current[i] = el;
                }}
                href={`#${id}`}
                aria-label={labels[key]}
                aria-current={isActive ? "true" : undefined}
                style={{ width: size, height: size }}
                className={`flex items-center justify-center rounded-xl border transition-[width,height,background-color,border-color] duration-150 ease-out max-sm:!size-10 ${
                  isActive
                    ? "border-gold-400/60 bg-gold-400/15 text-gold-300"
                    : "border-white/5 bg-ink-800 text-ink-100 hover:text-gold-300"
                }`}
              >
                <Icon className="size-[45%]" aria-hidden />
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
