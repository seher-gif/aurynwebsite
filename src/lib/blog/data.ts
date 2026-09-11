import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { Locale } from "@/lib/i18n/routes";

type PostWithAuthor = Prisma.PostGetPayload<{ include: { author: { select: { name: true } } } }>;

export interface LocalizedPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    category: string | null;
    metaTitle: string | null;
    metaDesc: string | null;
    createdAt: Date;
    updatedAt: Date;
    authorName: string;
    /** This post's slug in the other locale, when a translation exists. */
    otherLocaleSlug: string | null;
}

function localize(post: PostWithAuthor, locale: Locale): LocalizedPost {
    const isEn = locale === "en";
    return {
        id: post.id,
        slug: (isEn ? post.slugEn : post.slug) as string,
        title: (isEn ? post.titleEn : post.title) as string,
        excerpt: (isEn ? post.excerptEn : post.excerpt) || "",
        content: (isEn ? post.contentEn : post.content) || "",
        coverImage: post.coverImage,
        category: post.category,
        metaTitle: isEn ? post.metaTitleEn : post.metaTitle,
        metaDesc: isEn ? post.metaDescEn : post.metaDesc,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        authorName: post.author.name || "Auryn Dijital",
        otherLocaleSlug: isEn ? post.slug : post.slugEn,
    };
}

/**
 * Published posts for a given locale. For English, only posts that have
 * actually been translated (slugEn set) are returned - we never show
 * Turkish content on an English URL.
 */
export async function getPublishedPosts(locale: Locale): Promise<LocalizedPost[]> {
    const posts = await prisma.post.findMany({
        where: {
            published: true,
            ...(locale === "en" ? { slugEn: { not: null } } : {}),
        },
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } },
    });

    return posts.map((p) => localize(p, locale));
}

export async function getPostBySlug(slug: string, locale: Locale): Promise<LocalizedPost | null> {
    const post = await prisma.post.findFirst({
        where:
            locale === "en"
                ? { slugEn: slug, published: true }
                : { slug, published: true },
        include: { author: { select: { name: true } } },
    });

    if (!post) return null;
    return localize(post, locale);
}
