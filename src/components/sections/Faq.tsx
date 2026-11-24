"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/dictionaries";

export function Faq({ dict }: { dict: Dictionary["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28">
      <div aria-hidden className="rule-gold absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} />
        <ul className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {dict.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="group flex w-full items-center gap-5 py-6 text-left font-display text-lg text-ink-50 transition hover:text-gold-200 sm:text-xl"
                  >
                    <span className={`font-display text-sm tabular-nums transition ${isOpen ? "text-gold-300" : "text-ink-600"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{item.q}</span>
                    <span
                      aria-hidden
                      className={`flex size-8 shrink-0 items-center justify-center rounded-md ring-1 transition duration-300 ring-inset ${isOpen ? "bg-gold-400 text-ink-950 ring-gold-400" : "bg-white/5 text-gold-400 ring-white/10"}`}
                    >
                      <Plus className={`size-4 transition duration-300 ${isOpen ? "rotate-45" : ""}`} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="overflow-hidden pr-12 pl-10 leading-relaxed text-ink-400">
                    <span className="block pb-6">{item.a}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
