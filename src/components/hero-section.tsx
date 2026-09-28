import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ChatMockup } from "@/components/chat-mockup";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/sr";

type Props = { t: Dictionary };

export function HeroSection({ t }: Props) {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_85%_20%,hsl(343_70%_92%/0.9),transparent_70%),radial-gradient(45%_45%_at_5%_90%,hsl(36_60%_90%/0.9),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(hsl(230_20%_50%/0.25)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 pb-24 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-32">
        <div>
          <p className="eyebrow animate-fade-up">{t.hero.eyebrow}</p>
          <h1 className="mt-5 animate-fade-up font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-foreground text-balance [animation-delay:80ms] sm:text-6xl lg:text-[4.1rem]">
            {t.hero.title} <em className="font-medium text-primary">{t.hero.titleAccent}</em>
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-muted-foreground text-pretty [animation-delay:160ms]">
            {t.hero.lead}
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <Button asChild size="lg">
              <Link href="/pricing">
                {t.hero.ctaPrimary}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#process">{t.hero.ctaSecondary}</Link>
            </Button>
          </div>
          <ul className="mt-9 flex animate-fade-up flex-col gap-2.5 text-sm text-foreground [animation-delay:320ms] sm:flex-row sm:flex-wrap sm:gap-x-6">
            {t.hero.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="pb-8 lg:pb-0">
          <ChatMockup t={t.chat} />
        </div>
      </div>
    </section>
  );
}
