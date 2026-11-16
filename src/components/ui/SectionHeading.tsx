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
      <p className={`flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gold-gradient" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-gold-gradient" />}
      </p>
      <h2 className="mt-4 text-3xl leading-tight font-semibold text-ink-50 sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 leading-relaxed text-ink-300">{intro}</p>}
    </div>
  );
}
