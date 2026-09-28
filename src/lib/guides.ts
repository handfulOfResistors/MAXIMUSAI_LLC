/**
 * Fajlovi sa uputstvima za klijente — nalaze se u public/downloads/.
 * Izvor su Word dokumenti iz foldera „La Vie Elegance/uputstva".
 * Kad izmeniš .docx, napravi i novi .pdf (Word → Save as PDF) sa istim imenom.
 */
export const guideFiles = {
  intake: {
    sr: "01-upitnik-za-klijenta-sr",
    en: "01-client-intake-form-en",
  },
  calendar: {
    sr: "02-uputstvo-google-nalog-i-kalendar-sr",
    en: "02-guide-google-account-and-calendar-en",
  },
  appsScript: {
    sr: "03-uputstvo-apps-script-sr",
    en: "03-guide-apps-script-setup-en",
  },
} as const;

export type GuideKey = keyof typeof guideFiles;

export function isGuideKey(value: string): value is GuideKey {
  return value in guideFiles;
}

export function downloadHref(base: string, ext: "docx" | "pdf") {
  return `/downloads/${base}.${ext}`;
}
