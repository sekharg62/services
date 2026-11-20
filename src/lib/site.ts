export const siteConfig = {
  name: "DigitalAccess Services",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002").replace(/\/$/, ""),
  /** Where the contact form sends enquiries (opens the visitor's email app). */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** WhatsApp number in international format, digits only (country code + number, no "+" or spaces). */
  whatsappNumber: "916296446556",
} as const;

/** Link that opens a WhatsApp chat with us, optionally with a pre-typed message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
