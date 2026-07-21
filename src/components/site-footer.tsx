import Link from "next/link";
import { company } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-[hsl(220_28%_4%)]">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm leading-relaxed text-muted-foreground">
        <p>© 2026 {company.legalName}. All Rights Reserved.</p>
        <p className="mt-1">A Delaware Limited Liability Company.</p>
        <p className="mt-3">
          <Link href="/privacy" className="transition-colors hover:text-primary">
            Privacy Policy
          </Link>
          <span className="mx-2 text-border" aria-hidden>
            |
          </span>
          <Link href="/terms" className="transition-colors hover:text-primary">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
}
