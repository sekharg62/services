import type { StaticImageData } from "next/image";
import type { Locale } from "@/lib/i18n";
import techflix from "@/assets/images/project-techflix.jpg";
import digitalAccess from "@/assets/images/project-digitalaccess.jpg";
import shreeni from "@/assets/images/project-shreeni.jpg";

/**
 * Portfolio projects. Edit everything about the projects here (the section heading lives in the dictionaries).
 *
 * - Add a project: copy one object below and change it. It shows up in the "Recent projects" section.
 * - Text fields have an English and a Bangla version.
 * - Image: put a 4:3 screenshot (e.g. 1200×900) in src/assets/images/, import it at the top and set `image`.
 * - `category` must be one of the filter keys in the dictionaries (`web`, `app`, `business`).
 *   Filter buttons with no matching project are hidden automatically.
 */
type Localized = Record<Locale, string>;

export type Project = {
  title: string;
  url: string;
  category: "web" | "app" | "business";
  summary: Localized;
  deliverables: Localized[];
  tech: string[];
  image: StaticImageData;
};

export const projects: Project[] = [
  {
    title: "TECH FLIX",
    url: "https://techflixbd.com/",
    category: "web",
    summary: {
      en: "An online store for premium digital subscriptions (AI tools, streaming, design software and licenses), with fast ordering, order tracking and instant bills.",
      bn: "প্রিমিয়াম ডিজিটাল সাবস্ক্রিপশনের (AI টুল, স্ট্রিমিং, ডিজাইন সফটওয়্যার ও লাইসেন্স) অনলাইন স্টোর — দ্রুত অর্ডার, অর্ডার ট্র্যাকিং ও তাৎক্ষণিক বিলসহ।",
    },
    deliverables: [
      { en: "Online storefront", bn: "অনলাইন স্টোরফ্রন্ট" },
      { en: "Admin dashboard", bn: "অ্যাডমিন ড্যাশবোর্ড" },
      { en: "Order tracking & PDF bills", bn: "অর্ডার ট্র্যাকিং ও PDF বিল" },
      { en: "Backend API", bn: "ব্যাকএন্ড API" },
    ],
    tech: ["Next.js", "React", "Node.js", "Express", "PostgreSQL", "Prisma"],
    image: techflix,
  },
  {
    title: "DigitalAccess BD",
    url: "https://digitalaccessda.com/",
    category: "web",
    summary: {
      en: "A bilingual (Bangla/English) store for premium subscriptions in Bangladesh, with bKash, Nagad and Rocket payments and SEO built in from day one.",
      bn: "বাংলাদেশে প্রিমিয়াম সাবস্ক্রিপশনের দ্বিভাষিক (বাংলা/ইংরেজি) স্টোর — বিকাশ, নগদ ও রকেট পেমেন্ট এবং শুরু থেকেই এসইও-সহ।",
    },
    deliverables: [
      { en: "Bilingual storefront", bn: "দ্বিভাষিক স্টোরফ্রন্ট" },
      { en: "bKash, Nagad & Rocket checkout", bn: "বিকাশ, নগদ ও রকেট চেকআউট" },
      { en: "Admin dashboard & blog", bn: "অ্যাডমিন ড্যাশবোর্ড ও ব্লগ" },
      { en: "SEO optimisation", bn: "এসইও অপ্টিমাইজেশন" },
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Express", "PostgreSQL", "Prisma"],
    image: digitalAccess,
  },
  {
    title: "Shreeni Sarees",
    url: "https://www.shreeni-collection.in/",
    category: "web",
    summary: {
      en: "An e-commerce store for handwoven Bengal sarees (Baluchori, Jamdani, Tant and more), delivering across India.",
      bn: "হাতে বোনা বাংলার শাড়ির (বালুচরী, জামদানি, তাঁত ও আরও অনেক) ই-কমার্স স্টোর, যা সারা ভারতে ডেলিভারি দেয়।",
    },
    deliverables: [
      { en: "E-commerce storefront", bn: "ই-কমার্স স্টোরফ্রন্ট" },
      { en: "Admin dashboard", bn: "অ্যাডমিন ড্যাশবোর্ড" },
      { en: "Journal / blog editor", bn: "জার্নাল / ব্লগ এডিটর" },
      { en: "Invoices & backend API", bn: "ইনভয়েস ও ব্যাকএন্ড API" },
    ],
    tech: ["Next.js", "React", "NestJS", "PostgreSQL", "Prisma", "AWS S3"],
    image: shreeni,
  },
];
