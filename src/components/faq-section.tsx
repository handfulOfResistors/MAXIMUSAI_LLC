import { FaqList } from "@/components/faq-list";
import type { Dictionary } from "@/lib/i18n/sr";

export function FaqSection({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" className="border-t border-border bg-secondary/50 py-24 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-4 text-balance">{t.title}</h2>
        </div>
        <FaqList items={t.items} />
      </div>
    </section>
  );
}
