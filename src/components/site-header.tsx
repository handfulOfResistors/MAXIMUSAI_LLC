import Link from "next/link";
import { company } from "@/lib/company";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#games", label: "Games" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-[0.08em] text-foreground transition-colors hover:text-primary"
        >
          {company.brandName}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Get in touch
        </Link>
      </div>
    </header>
  );
}
