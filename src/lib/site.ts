export const siteConfig = {
  name: "DigitalAccess Services",
  /** Public URL of the live site — used for canonical links, hreflang, sitemap and Open Graph. No trailing slash. */
  url: "https://services.digitalaccessda.com",
  /** Inbox the contact form sends enquiries to (opens the visitor's email app). Fill this in. */
  contactEmail: "",
  /** WhatsApp number in international format, digits only (country code + number, no "+" or spaces). */
  whatsappNumber:  "916296446556",
} as const;

/** Link that opens a WhatsApp chat with us, optionally with a pre-typed message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
