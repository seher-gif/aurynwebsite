import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { Locale } from "@/lib/i18n/routes";

type CaseStudyRow = Prisma.CaseStudyGetPayload<Record<string, never>>;

export interface LocalizedCaseStudy {
    id: string;
    slug: string;
    title: string;
    client: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    results: unknown;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    /** This case study's slug in the other locale, when a translation exists. */
    otherLocaleSlug: string | null;
}

function localize(cs: CaseStudyRow, locale: Locale): LocalizedCaseStudy {
    const isEn = locale === "en";
    return {
        id: cs.id,
        slug: (isEn ? cs.slugEn : cs.slug) as string,
        title: (isEn ? cs.titleEn : cs.title) as string,
        client: cs.client,
        excerpt: (isEn ? cs.excerptEn : cs.excerpt) || "",
        content: (isEn ? cs.contentEn : cs.content) || "",
        coverImage: cs.coverImage,
        results: cs.results,
        category: cs.category,
        createdAt: cs.createdAt,
        updatedAt: cs.updatedAt,
        otherLocaleSlug: isEn ? cs.slug : cs.slugEn,
    };
}

/**
 * Published case studies for a given locale. For English, only case
 * studies that have actually been translated (slugEn set) are returned.
 */
export async function getPublishedCaseStudies(locale: Locale): Promise<LocalizedCaseStudy[]> {
    const items = await prisma.caseStudy.findMany({
        where: {
            published: true,
            ...(locale === "en" ? { slugEn: { not: null } } : {}),
        },
        orderBy: { createdAt: "desc" },
    });

    return items.map((c) => localize(c, locale));
}

export async function getCaseStudyBySlug(slug: string, locale: Locale): Promise<LocalizedCaseStudy | null> {
    const item = await prisma.caseStudy.findFirst({
        where: locale === "en" ? { slugEn: slug, published: true } : { slug, published: true },
    });

    if (!item) return null;
    return localize(item, locale);
}
