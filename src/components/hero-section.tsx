import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(168_45%_18%_/_0.45),transparent_55%),radial-gradient(ellipse_at_bottom_right,hsl(210_40%_20%_/_0.35),transparent_50%),linear-gradient(180deg,hsl(220_28%_5%),hsl(220_24%_7%)_45%,hsl(220_24%_6%))]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(hsl(210_20%_80%_/_0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(210_20%_80%_/_0.08)_1px,transparent_1px)] [background-size:64px_64px] animate-grid-drift" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute -right-16 bottom-20 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl animate-float [animation-delay:1.5s]" />
        <svg
          className="absolute inset-x-0 bottom-0 h-[42%] w-full opacity-40"
          viewBox="0 0 1440 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M0 280C180 220 260 180 420 200C580 220 640 300 820 290C1000 280 1120 180 1280 170C1360 165 1400 175 1440 190V420H0V280Z"
            fill="url(#terrain)"
          />
          <path
            d="M220 250L280 140L340 250H220Z"
            stroke="hsl(168 72% 42% / 0.55)"
            strokeWidth="2"
            fill="hsl(168 72% 42% / 0.08)"
          />
          <rect
            x="980"
            y="120"
            width="72"
            height="96"
            rx="4"
            stroke="hsl(200 70% 60% / 0.4)"
            strokeWidth="2"
            fill="hsl(200 70% 60% / 0.06)"
          />
          <circle
            cx="1180"
            cy="160"
            r="34"
            stroke="hsl(168 72% 42% / 0.45)"
            strokeWidth="2"
            fill="hsl(168 72% 42% / 0.05)"
          />
          <defs>
            <linearGradient id="terrain" x1="720" y1="160" x2="720" y2="420">
              <stop stopColor="hsl(168 40% 20%)" stopOpacity="0.45" />
              <stop offset="1" stopColor="hsl(220 24% 6%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-24 pt-28">
        <p className="animate-fade-up font-display text-sm font-semibold uppercase tracking-[0.28em] text-primary">
          {company.brandName}
        </p>
        <h1 className="animate-fade-up mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl [animation-delay:100ms]">
          {company.tagline}
        </h1>
        <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground [animation-delay:200ms]">
          Crafted worlds, thoughtful design, and publishing built for players who
          value quality over noise.
        </p>
        <div className="animate-fade-up mt-10 [animation-delay:300ms]">
          <Button asChild size="lg">
            <a href="#games">Browse Games</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
