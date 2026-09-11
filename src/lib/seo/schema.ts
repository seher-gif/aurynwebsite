import { ORG, SITE_NAME, SITE_URL } from "@/lib/seo/site";
import type { Locale } from "@/lib/i18n/routes";

const DESCRIPTIONS: Record<Locale, string> = {
    tr: "Arama performansı, reklam yönetimi, içerik ve analitiği birleştiren veri odaklı dijital pazarlama ve SEO danışmanlığı.",
    en: "Data-driven digital marketing and SEO consultancy combining search performance, paid media, content and analytics.",
};

export function organizationSchema(locale: Locale) {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: ORG.name,
        legalName: ORG.legalName,
        url: SITE_URL,
        logo: ORG.logo,
        image: ORG.logo,
        description: DESCRIPTIONS[locale],
        email: ORG.email,
        telephone: ORG.phone,
        address: {
            "@type": "PostalAddress",
            streetAddress: ORG.address.streetAddress,
            addressLocality: ORG.address.addressLocality,
            postalCode: ORG.address.postalCode,
            addressCountry: ORG.address.addressCountry,
        },
        sameAs: ORG.sameAs,
    };
}

export function websiteSchema(locale: Locale) {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DESCRIPTIONS[locale],
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    };
}

export interface BreadcrumbItem {
    name: string;
    path: string; // absolute site path, e.g. "/hizmetler"
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.path}`,
        })),
    };
}

export interface ServiceSchemaInput {
    locale: Locale;
    name: string;
    description: string;
    path: string;
    serviceType: string;
}

export function serviceSchema({ locale, name, description, path, serviceType }: ServiceSchemaInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType,
        url: `${SITE_URL}${path}`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: locale === "tr" ? "TR" : undefined,
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    };
}

export interface ArticleSchemaInput {
    locale: Locale;
    title: string;
    description: string;
    path: string;
    image?: string | null;
    datePublished: string | Date;
    dateModified: string | Date;
    authorName: string;
}

export function articleSchema({
    locale,
    title,
    description,
    path,
    image,
    datePublished,
    dateModified,
    authorName,
}: ArticleSchemaInput) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        image: image ? [image] : undefined,
        datePublished: new Date(datePublished).toISOString(),
        dateModified: new Date(dateModified).toISOString(),
        author: { "@type": "Organization", name: authorName },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    };
}

export interface FaqItem {
    question: string;
    answer: string;
}

export function faqSchema(items: FaqItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
}
