import type { StaticImageData } from "next/image";
import type { Locale } from "@/lib/i18n";

/**
 * Team members — edit everything about the team here (the section heading lives in the dictionaries).
 *
 * - Text fields have an English and a Bangla version.
 * - Photo: put the image in src/assets/images/, import it at the top of this file
 *   (e.g. `import sekhar from "@/assets/images/team-sekhar.jpg";`) and set `photo: sekhar`.
 *   Without a photo, the role icon is shown instead.
 * - Social links: leave "" to hide an icon.
 */
type Localized = Record<Locale, string>;

export type TeamMember = {
  name: Localized;
  role: Localized;
  bio: Localized;
  skills: Localized[];
  icon: "architect" | "frontend" | "design" | "marketing";
  photo?: StaticImageData;
  links: { linkedin: string; github: string; facebook: string; email: string };
};

export const team: TeamMember[] = [
  {
    name: { en: "Sekhar Ghosh", bn: "শেখর ঘোষ" },
    role: { en: "Lead Architect & Engineer", bn: "লিড আর্কিটেক্ট ও ইঞ্জিনিয়ার" },
    bio: {
      en: "Designs the architecture and builds the engine behind every project — Android apps, backends, APIs, databases and cloud deployment.",
      bn: "প্রতিটি প্রজেক্টের আর্কিটেকচার ডিজাইন করেন এবং এর মূল কাঠামো তৈরি করেন — অ্যান্ড্রয়েড অ্যাপ, ব্যাকএন্ড, API, ডেটাবেস ও ক্লাউড ডিপ্লয়মেন্ট।",
    },
    skills: [
      { en: "System architecture", bn: "সিস্টেম আর্কিটেকচার" },
      { en: "Android apps", bn: "অ্যান্ড্রয়েড অ্যাপ" },
      { en: "Backend & APIs", bn: "ব্যাকএন্ড ও API" },
      { en: "Databases", bn: "ডেটাবেস" },
      { en: "Cloud & DevOps", bn: "ক্লাউড ও DevOps" },
    ],
    icon: "architect",
    links: { linkedin: "", github: "", facebook: "", email: "" },
  },
  {
    name: { en: "SM Rokunuzzaman", bn: "এস এম রোকনুজ্জামান" },
    role: { en: "Frontend Developer & Project Manager", bn: "ফ্রন্টএন্ড ডেভেলপার ও প্রজেক্ট ম্যানেজার" },
    bio: {
      en: "Builds fast, polished websites and interfaces, and manages every project so you always know what's done and what's next.",
      bn: "দ্রুত ও সুন্দর ওয়েবসাইট এবং ইন্টারফেস তৈরি করেন, আর প্রতিটি প্রজেক্ট পরিচালনা করেন — যাতে আপনি সবসময় জানেন কী শেষ হয়েছে আর এরপর কী।",
    },
    skills: [
      { en: "React & Next.js", bn: "React ও Next.js" },
      { en: "UI development", bn: "UI ডেভেলপমেন্ট" },
      { en: "Responsive design", bn: "রেসপন্সিভ ডিজাইন" },
      { en: "Project management", bn: "প্রজেক্ট ম্যানেজমেন্ট" },
      { en: "Client communication", bn: "ক্লায়েন্ট যোগাযোগ" },
    ],
    icon: "frontend",
    links: { linkedin: "", github: "", facebook: "", email: "" },
  },
];
