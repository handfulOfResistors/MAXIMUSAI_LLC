import type { Metadata } from "next";
import Link from "next/link";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/server";

export function generateMetadata(): Metadata {
  return { title: getDictionary().meta.cancelTitle, robots: { index: false } };
}

export default function CheckoutCancelPage() {
  const t = getDictionary();

  return (
    <main className="pt-16">
      <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 md:py-28">
        <CircleX className="h-12 w-12 text-muted-foreground" strokeWidth={1.75} />
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t.checkout.cancelTitle}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.checkout.cancelLead}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/pricing">{t.checkout.back}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#contact">{t.checkout.contact}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
