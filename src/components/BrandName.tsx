/**
 * The brand wordmark: DIGITAL (off-white) + ACCESS (gold), in the bold brand font (Josefin Sans).
 * Letter-spacing is set inline so it stays the same on Bengali pages.
 */
export function BrandName({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  return (
    <span
      className={`brand-word inline-flex items-center gap-[0.4em] leading-none font-brand font-bold whitespace-nowrap ${
        size === "lg" ? "text-2xl sm:text-3xl" : "text-lg"
      } ${className}`}
      style={{ letterSpacing: "0.12em" }}
    >
      <span className="text-ink-50">DIGITAL</span>
      <span className="text-gold-gradient">ACCESS</span>
    </span>
  );
}
