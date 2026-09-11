import type { Metadata } from "next";
import { buildLanguageAlternates, type Locale } from "@/lib/i18n/routes";

export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://auryndijital.com").replace(/\/$/, "");

export const SITE_NAME = "Auryn Dijital";

export const ORG = {
    name: "Auryn Dijital",
    legalName: "Auryn Dijital",
    url: SITE_URL,
    logo: `${SITE_URL}/auryn-logo.png`,
    email: "seher@auryndijital.com",
    phone: "+90-531-940-90-65",
    address: {
        streetAddress: "Üçgen, Abdi İpekçi Cd. no:13 kat:1",
        addressLocality: "Muratpaşa/Antalya",
        postalCode: "07040",
        addressCountry: "TR",
    },
    sameAs: [
        "https://www.instagram.com/auryndijital/",
        "https://www.linkedin.com/company/auryn-dijital/",
    ],
};

interface PageMetadataInput {
    locale: Locale;
    path: string; // path as rendered in this locale, e.g. "/hizmetler" or "/en/services"
    title: string;
    description: string;
    ogImage?: string;
    noindex?: boolean;
    /**
     * Explicit counterpart path in the other locale, for dynamic (database-driven)
     * content like blog posts or case studies that aren't in the static ROUTE_PAIRS
     * table. When omitted, falls back to looking `path` up in ROUTE_PAIRS.
     */
    alternatePath?: string | null;
}

/**
 * Builds a complete, self-referencing-canonical Metadata object for a page,
 * including hreflang alternates to its counterpart in the other locale
 * (either the explicit `alternatePath`, or one found in ROUTE_PAIRS).
 */
export function pageMetadata({ locale, path, title, description, ogImage, noindex, alternatePath }: PageMetadataInput): Metadata {
    const canonicalUrl = `${SITE_URL}${path}`;
    const languages = alternatePath !== undefined
        ? (() => {
            const trPath = locale === "tr" ? path : alternatePath;
            const enPath = locale === "en" ? path : alternatePath;
            const result: Record<string, string> = {};
            if (trPath) result["tr-TR"] = trPath;
            if (enPath) result["en-US"] = enPath;
            if (trPath) result["x-default"] = trPath;
            return result;
        })()
        : buildLanguageAlternates(path, locale);
    const image = ogImage || `${SITE_URL}/auryn-logo.png`;

    // The root layout's title.template ("%s | Auryn Dijital") only applies to
    // segments nested below it. "/en" lives one segment deeper (app/en/layout.tsx)
    // than "/" does, so its title would otherwise get the template applied twice
    // relative to the (un-templated) Turkish homepage. Locale homepages already
    // include the brand name in their tagline, so bypass the template for them.
    const isHomepage = path === "/" || path === "/en";

    return {
        title: isHomepage ? { absolute: title } : title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: SITE_NAME,
            locale: locale === "tr" ? "tr_TR" : "en_US",
            type: "website",
            images: [{ url: image }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        robots: noindex
            ? { index: false, follow: false }
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
    };
}
