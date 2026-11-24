import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/dictionaries";

export function Process({ dict }: { dict: Dictionary["process"] }) {
  const last = dict.steps.length - 1;
  return (
    <section id="process" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} />
      <ol className="mt-16 grid gap-6 md:grid-cols-4">
        {dict.steps.map((step, i) => (
          <li key={step.title} className="relative">
            {/* connector: from this circle's right edge to the next circle's left edge (circle = 3.5rem, card padding = 1.5rem, grid gap = 1.5rem) */}
            {i < last && (
              <span
                aria-hidden
                className="absolute top-[calc(1.5rem+1.75rem)] left-[calc(50%+1.75rem+0.5rem)] hidden h-px w-[calc(100%-3.5rem+1.5rem-1rem)] bg-gradient-to-r from-gold-400/60 via-gold-400/30 to-gold-400/60 md:block"
              />
            )}
            <Reveal delay={i * 120} className="h-full">
              <div className="group h-full rounded-lg border border-transparent p-6 text-center transition hover:border-gold-400/30 hover:bg-ink-900">
                <span className="relative mx-auto flex size-14 items-center justify-center rounded-full border border-gold-400/50 bg-ink-950 font-display text-lg font-medium text-gold-300 tabular-nums transition group-hover:bg-gold-400 group-hover:text-ink-950">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-ink-50">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{step.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
