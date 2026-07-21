const games = [
  {
    title: "Signal Drift",
    status: "In development",
    blurb: "A precision exploration game set across fractured digital landscapes.",
  },
  {
    title: "Northline",
    status: "Coming soon",
    blurb: "Narrative-driven adventure with quiet worldbuilding and tactile play.",
  },
  {
    title: "Archive Zero",
    status: "Concept",
    blurb: "A systems-focused title exploring memory, risk, and discovery.",
  },
];

export function GamesSection() {
  return (
    <section id="games" className="relative border-t border-border/70 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Games
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          A focused catalog of premium indie experiences.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          We publish and develop original titles with deliberate scope, strong
          craft, and long-term support for players.
        </p>

        <ul className="mt-12 divide-y divide-border/70 border-y border-border/70">
          {games.map((game) => (
            <li
              key={game.title}
              className="grid gap-3 py-8 transition-colors hover:bg-secondary/20 sm:grid-cols-[1fr_auto] sm:items-end"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  {game.title}
                </h3>
                <p className="mt-2 max-w-xl text-muted-foreground">{game.blurb}</p>
              </div>
              <span className="text-sm uppercase tracking-[0.16em] text-primary">
                {game.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
