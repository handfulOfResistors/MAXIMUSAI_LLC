import { cookies } from "next/headers";
import { defaultLang, isLang, langCookie, type Lang } from "./config";
import { en } from "./en";
import { sr } from "./sr";

const dictionaries = { sr, en };

export function getLang(): Lang {
  const value = cookies().get(langCookie)?.value;
  return isLang(value) ? value : defaultLang;
}

export function getDictionary(lang: Lang = getLang()) {
  return dictionaries[lang];
}
