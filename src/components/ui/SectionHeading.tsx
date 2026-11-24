/**
 * Section title block. The eyebrow is numbered automatically (01, 02 …) in page order via a CSS counter
 * (see `.eyebrow-index` in globals.css), so sections can be reordered without renumbering.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p
        className={`flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.3em] text-gold-400 uppercase ${centered ? "justify-center" : ""}`}
      >
        <span className="eyebrow-index font-display tracking-normal text-gold-300 tabular-nums" />
        <span aria-hidden className="h-px w-8 bg-gold-400/50" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-3xl leading-[1.1] font-semibold text-balance text-ink-50 sm:text-5xl">{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed text-pretty text-ink-400 ${centered ? "mx-auto max-w-xl" : ""}`}>{intro}</p>}
    </div>
  );
}
