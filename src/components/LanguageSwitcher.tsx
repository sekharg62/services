"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex gap-1 rounded-full border border-gold-400/30 p-1 text-xs tracking-normal normal-case">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          hrefLang={l}
          aria-current={l === current ? "true" : undefined}
          className={`rounded-full px-3 py-1 transition ${
            l === current ? "bg-gold-gradient font-semibold text-ink-950" : "text-ink-300 hover:text-gold-300"
          }`}
        >
          {localeNames[l]}
        </Link>
      ))}
    </div>
  );
}
