"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/dictionaries";

export function Faq({ dict }: { dict: Dictionary["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink-900/60 py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} />
        <ul className="mt-12 divide-y divide-gold-400/15 border-y border-gold-400/15">
          {dict.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg text-ink-50 transition hover:text-gold-200"
                  >
                    {item.q}
                    <Plus
                      aria-hidden
                      className={`size-5 shrink-0 text-gold-400 transition duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="overflow-hidden pr-10 leading-relaxed text-ink-300">
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
