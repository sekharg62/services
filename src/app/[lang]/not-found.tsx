import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <h1 className="text-5xl font-semibold text-gold-gradient">404</h1>
      <p className="mt-4 text-ink-300">Page not found · পৃষ্ঠাটি পাওয়া যায়নি</p>
      <Link href="/" className="mt-8 text-gold-300 hover:underline">Home</Link>
    </div>
  );
}
