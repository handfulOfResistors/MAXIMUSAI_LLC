import Link from "next/link";

type Props = {
  title: string;
  updatedLabel: string;
  updated: string;
  homeLabel: string;
  children: React.ReactNode;
};

export function LegalPage({ title, updatedLabel, updated, homeLabel, children }: Props) {
  return (
    <main className="pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6">
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            {homeLabel}
          </Link>{" "}
          / {title}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {updatedLabel}: {updated}
        </p>
        <div className="legal mt-8">{children}</div>
      </div>
    </main>
  );
}
