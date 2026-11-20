import type { Metadata } from "next";
import { Anek_Bangla, Hind_Siliguri, Josefin_Sans, Manrope, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import { Dock } from "@/components/Dock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const josefinSans = Josefin_Sans({ subsets: ["latin"], weight: "700", variable: "--font-josefin", display: "swap" });
const anekBangla = Anek_Bangla({ subsets: ["bengali"], variable: "--font-anek-bangla", display: "swap" });
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.title, template: `%s | ${siteConfig.name}` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === "bn" ? "bn_BD" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} style={{ colorScheme: "dark" }} className={`${manrope.variable} ${outfit.variable} ${josefinSans.variable} ${anekBangla.variable} ${hindSiliguri.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <Header lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
        <Dock labels={dict.nav} />
        <WhatsAppButton label={dict.whatsapp.label} greeting={dict.whatsapp.greeting} />
      </body>
    </html>
  );
}
