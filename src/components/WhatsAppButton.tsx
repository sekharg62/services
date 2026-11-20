import { SiWhatsapp } from "react-icons/si";
import { whatsappLink } from "@/lib/site";

/** Floating WhatsApp chat button (bottom-right; sits above the dock on phones). */
export function WhatsAppButton({ label, greeting }: { label: string; greeting: string }) {
  return (
    <a
      href={whatsappLink(greeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group fixed right-4 bottom-24 z-50 flex items-center sm:right-6 sm:bottom-6"
    >
      <span className="pointer-events-none mr-3 translate-x-2 rounded-md border border-gold-400/20 bg-ink-950 px-3 py-1.5 text-xs whitespace-nowrap text-gold-200 opacity-0 transition duration-200 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 max-sm:hidden">
        {label}
      </span>
      <span className="relative flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/50 ring-2 ring-gold-400/40 transition group-hover:scale-105 group-hover:ring-gold-300">
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-25 motion-reduce:hidden" />
        <SiWhatsapp className="relative size-7" aria-hidden />
      </span>
    </a>
  );
}
