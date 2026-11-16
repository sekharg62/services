export const siteConfig = {
  name: "DigitalAccess Services",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002").replace(/\/$/, ""),
  /** Where the contact form sends enquiries (opens the visitor's email app). */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
} as const;
