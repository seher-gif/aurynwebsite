export type Locale = "tr" | "en";

export const DEFAULT_LOCALE: Locale = "tr";
export const LOCALES: Locale[] = ["tr", "en"];

/**
 * Static TR <-> EN path pairs for every page that has a bilingual
 * counterpart. Turkish paths are unprefixed (default locale); English
 * paths live under /en. Used to generate hreflang alternates and to
 * power the header language switcher.
 */
export const ROUTE_PAIRS: Array<{ tr: string; en: string }> = [
    { tr: "/", en: "/en" },
    { tr: "/hakkimizda", en: "/en/about" },
    { tr: "/iletisim", en: "/en/contact" },
    { tr: "/hizmetler", en: "/en/services" },
    { tr: "/hizmetler/seo-optimizasyonu", en: "/en/services/seo" },
    { tr: "/hizmetler/google-ads-yonetimi", en: "/en/services/google-ads" },
    { tr: "/hizmetler/meta-ads", en: "/en/services/meta-ads" },
    { tr: "/hizmetler/sosyal-medya-yonetimi", en: "/en/services/social-media" },
    { tr: "/hizmetler/icerik-pazarlamasi", en: "/en/services/content-marketing" },
    { tr: "/hizmetler/raporlama-analiz", en: "/en/services/analytics-reporting" },
    { tr: "/seo-analizi", en: "/en/seo-analysis" },
    { tr: "/blog", en: "/en/blog" },
    { tr: "/referanslar", en: "/en/case-studies" },
];

/**
 * Returns the counterpart path in the other locale for a known route pair,
 * or null if this path has no bilingual counterpart (yet).
 */
export function getAlternatePath(path: string, fromLocale: Locale): string | null {
    const pair = ROUTE_PAIRS.find((p) => p[fromLocale] === path);
    if (!pair) return null;
    return fromLocale === "tr" ? pair.en : pair.tr;
}

/**
 * Builds the `alternates.languages` map for Next.js Metadata, given the
 * current path in its own locale. Always includes an x-default pointing
 * at the Turkish (default) version.
 */
export function buildLanguageAlternates(currentPath: string, locale: Locale) {
    const trPath = locale === "tr" ? currentPath : getAlternatePath(currentPath, "en");
    const enPath = locale === "en" ? currentPath : getAlternatePath(currentPath, "tr");

    const languages: Record<string, string> = {};
    if (trPath) languages["tr-TR"] = trPath;
    if (enPath) languages["en-US"] = enPath;
    if (trPath) languages["x-default"] = trPath;

    return languages;
}
