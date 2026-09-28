import { NextResponse, type NextRequest } from "next/server";
import { isLang, langCookie } from "@/lib/i18n/config";

/**
 * Link sa ?lang=en ili ?lang=sr (npr. /guides?lang=en) postavlja jezik i
 * preusmerava na isti URL bez parametra. Zgodno za slanje linka klijentu.
 */
export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  if (!isLang(lang)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.searchParams.delete("lang");

  const response = NextResponse.redirect(url);
  response.cookies.set(langCookie, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|downloads|work|.*\\..*).*)"],
};
