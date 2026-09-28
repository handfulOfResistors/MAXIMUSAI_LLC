import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/sr";
import { laVieElegance } from "@/lib/portfolio";

export function CaseStudySection({ t }: { t: Dictionary["work"] }) {
  const facts = [
    { label: t.clientLabel, value: t.clientValue },
    { label: t.locationLabel, value: t.locationValue },
    { label: t.planLabel, value: t.planValue },
  ];

  return (
    <section id="work" className="overflow-hidden bg-ink py-24 text-ink-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(343_80%_78%)]">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t.lead}</p>

          <dl className="mt-8 grid gap-4 border-y border-white/10 py-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {t.deliveredTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {t.delivered.map((item) => (
              <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[hsl(343_80%_78%)]" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>

          {laVieElegance.liveUrl ? (
            <a
              href={laVieElegance.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex h-11 items-center gap-2 rounded-full bg-ink-foreground px-6 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              {t.visit}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <div className="relative pb-10 sm:pb-16">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-0.5 text-[11px] text-white/60">
                lavieelegance.rs
              </span>
            </div>
            <Image
              src={laVieElegance.desktopImage}
              alt={t.imageAlt}
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -bottom-2 right-3 w-[34%] max-w-[190px] overflow-hidden rounded-[1.6rem] border-[5px] border-[#1c1c1c] bg-[#1c1c1c] shadow-2xl sm:right-6">
            <Image
              src={laVieElegance.mobileImage}
              alt={t.mobileAlt}
              width={390}
              height={844}
              sizes="190px"
              className="h-auto w-full rounded-[1.2rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
