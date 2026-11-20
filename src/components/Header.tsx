import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { BrandName } from "./BrandName";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ lang }: { lang: Locale }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gold-400/15 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <Image src="/logo.png" alt={siteConfig.name} width={40} height={40} priority />
          <BrandName className="hidden sm:inline-flex" />
        </Link>
        <LanguageSwitcher current={lang} />
      </div>
    </header>
  );
}
