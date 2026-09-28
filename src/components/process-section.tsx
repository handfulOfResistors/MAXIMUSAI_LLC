import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/sr";

export function ProcessSection({ t }: { t: Dictionary["process"] }) {
  return (
    <section id="process" className="border-t border-border bg-secondary/50 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="section-title mt-4 text-balance">{t.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.lead}</p>
          </div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, index) => (
            <li key={step.title} className="relative rounded-xl border border-border bg-card p-6">
              <span className="font-display text-4xl font-semibold text-primary/25">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
