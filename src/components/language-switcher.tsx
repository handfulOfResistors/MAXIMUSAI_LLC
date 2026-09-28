"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { langCookie, languages, type Lang } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type Props = {
  lang: Lang;
  label: string;
  className?: string;
};

export function LanguageSwitcher({ lang, label, className }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(next: Lang) {
    if (next === lang) return;
    document.cookie = `${langCookie}=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  }

  return (
    <div
      role="group"
      aria-label={label}
      aria-busy={pending}
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card p-0.5 text-xs font-semibold transition-opacity",
        pending && "opacity-60",
        className
      )}
    >
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => choose(code)}
          aria-pressed={code === lang}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            code === lang
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
