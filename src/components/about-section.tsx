import { company } from "@/lib/company";

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-border/70 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            About Us
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            An indie studio with a clear corporate foundation.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              {company.legalName} is an indie game development studio and digital
              games publisher. Our creative team is based in Serbia, and the
              company is registered as a Delaware limited liability company in the
              United States.
            </p>
            <p>
              We focus on premium indie experiences — carefully designed gameplay,
              polished presentation, and responsible publishing practices that
              partners, platforms, and players can trust.
            </p>
          </div>
        </div>

        <dl className="grid gap-5 self-start border-l border-border/80 pl-6 sm:pl-8">
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Legal entity
            </dt>
            <dd className="mt-1 text-foreground">{company.legalName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Jurisdiction
            </dt>
            <dd className="mt-1 text-foreground">
              Domestic LLC · {company.state}, USA
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Formation date
            </dt>
            <dd className="mt-1 text-foreground">{company.formationDate}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
