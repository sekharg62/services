import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/dictionaries";

export function Process({ dict }: { dict: Dictionary["process"] }) {
  return (
    <section id="process" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.heading} />
      <ol className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {dict.steps.map((step, i) => (
          <li key={step.title} className="bg-ink-950">
            <Reveal delay={i * 120} className="h-full">
              <div className="group relative h-full overflow-hidden p-7 transition duration-500 hover:bg-ink-900">
                {/* top progress line that fills on hover */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold-gradient transition duration-500 group-hover:scale-x-100" />
                <span className="text-gold-gradient block font-display text-6xl leading-none font-semibold tabular-nums opacity-30 transition duration-500 group-hover:opacity-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-10 text-xl font-semibold text-ink-50">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{step.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
