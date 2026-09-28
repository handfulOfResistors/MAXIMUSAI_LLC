import { BadgeCheck, CalendarDays, LifeBuoy, Lock } from "lucide-react";
import { company } from "@/lib/company";
import type { Dictionary } from "@/lib/i18n/sr";

const icons = [BadgeCheck, Lock, CalendarDays, LifeBuoy];

export function AboutSection({ t }: { t: Dictionary["why"] }) {
  const facts = [
    { label: t.companyLabel, value: t.companyValue },
    { label: t.teamLabel, value: t.teamValue },
    { label: t.emailLabel, value: company.email, href: `mailto:${company.email}` },
  ];

  return (
    <section id="about" className="border-t border-border py-24 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-4 text-balance">{t.title}</h2>
          <dl className="mt-10 space-y-5 border-l-2 border-primary/30 pl-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-foreground">
                  {fact.href ? (
                    <a href={fact.href} className="break-all hover:text-primary">
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {t.items.map((item, index) => {
            const Icon = icons[index] ?? BadgeCheck;
            return (
              <div key={item.title}>
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
