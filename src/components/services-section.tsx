import { Bot, CalendarCheck, Globe, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/sr";

const icons = [Globe, CalendarCheck, Bot, ShieldCheck];

export function ServicesSection({ t }: { t: Dictionary["services"] }) {
  return (
    <section id="services" className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-4 text-balance">{t.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.lead}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, index) => {
            const Icon = icons[index] ?? Globe;
            return (
              <article
                key={item.title}
                className="group rounded-xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
