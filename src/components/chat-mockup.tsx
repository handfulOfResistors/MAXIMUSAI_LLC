import { CalendarCheck, Check, Send } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/sr";
import { cn } from "@/lib/utils";

type Props = { t: Dictionary["chat"] };

/** Statična ilustracija razgovora sa chatbotom za zakazivanje (hero sekcija). */
export function ChatMockup({ t }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-[360px]" aria-hidden>
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-lift">
        <div className="flex items-center gap-3 bg-ink px-5 py-4 text-ink-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <CalendarCheck className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{t.title}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {t.status}
            </p>
          </div>
        </div>

        <div className="space-y-3 bg-muted/70 px-4 pb-5 pt-5 text-sm">
          <Bubble delay={150}>{t.greet}</Bubble>
          <Chips items={t.options} active={t.picked} delay={300} />
          <Bubble from="user" delay={450}>
            {t.picked}
          </Bubble>
          <Bubble delay={600}>{t.askTime}</Bubble>
          <div
            className="grid animate-fade-up grid-cols-4 gap-1.5"
            style={{ animationDelay: "750ms" }}
          >
            {t.times.map((time) => (
              <span
                key={time}
                className={cn(
                  "rounded-lg border py-1.5 text-center text-xs font-semibold tabular-nums",
                  time === t.pickedTime
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground"
                )}
              >
                {time}
              </span>
            ))}
          </div>
          <Bubble delay={900} tone="success">
            <span className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>{t.done}</span>
            </span>
          </Bubble>
        </div>
        <div className="flex items-center gap-2 border-t border-border bg-card px-4 pb-4 pt-3">
          <span className="h-9 flex-1 rounded-full border border-border bg-muted/60" />
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Send className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div
        className="absolute -bottom-12 left-3 w-56 animate-fade-up rounded-xl border border-border bg-card p-3 shadow-lift sm:-left-12"
        style={{ animationDelay: "1100ms" }}
      >
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <GoogleCalendarGlyph />
          {t.eventSource}
        </p>
        <div className="mt-2 rounded-md border-l-[3px] border-primary bg-accent px-2.5 py-2">
          <p className="text-xs font-semibold text-accent-foreground">{t.eventTitle}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{t.eventTime}</p>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  children,
  from = "bot",
  tone,
  delay = 0,
}: {
  children: React.ReactNode;
  from?: "bot" | "user";
  tone?: "success";
  delay?: number;
}) {
  return (
    <div
      className={cn("flex animate-fade-up", from === "user" ? "justify-end" : "justify-start")}
      style={{ animationDelay: `${delay}ms` }}
    >
      <p
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-snug",
          from === "user"
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md border border-border bg-card text-foreground",
          tone === "success" && "border-success/30"
        )}
      >
        {children}
      </p>
    </div>
  );
}

function Chips({ items, active, delay }: { items: string[]; active: string; delay: number }) {
  return (
    <div className="flex animate-fade-up flex-wrap gap-1.5" style={{ animationDelay: `${delay}ms` }}>
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium",
            item === active
              ? "border-primary/40 bg-accent text-accent-foreground"
              : "border-border bg-card text-muted-foreground"
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function GoogleCalendarGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
      <rect x="1.5" y="2.5" width="13" height="12" rx="2" fill="#fff" stroke="#4285F4" strokeWidth="1.2" />
      <rect x="1.5" y="2.5" width="13" height="3.5" rx="1.5" fill="#4285F4" />
      <text x="8" y="13" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#4285F4" fontFamily="Arial, sans-serif">
        31
      </text>
    </svg>
  );
}
