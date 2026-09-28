export const languages = ["sr", "en"] as const;
export type Lang = (typeof languages)[number];

export const defaultLang: Lang = "sr";
export const langCookie = "mx-lang";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (languages as readonly string[]).includes(value);
}

/** Zamenjuje {ključ} u tekstu vrednostima. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
