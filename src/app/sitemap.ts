import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { ROUTE_PAIRS, getAlternatePath } from '@/lib/i18n/routes'
import { getPublishedPosts } from '@/lib/blog/data'
import { getPublishedCaseStudies } from '@/lib/case-studies/data'

const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')

function entry(path: string, opts: { lastModified?: Date; priority?: number; alternatePath?: string | null }) {
    const languages: Record<string, string> = {}
    if (path.startsWith('/en')) {
        if (opts.alternatePath) languages['tr-TR'] = `${baseUrl}${opts.alternatePath}`
        languages['en-US'] = `${baseUrl}${path}`
    } else {
        languages['tr-TR'] = `${baseUrl}${path}`
        if (opts.alternatePath) languages['en-US'] = `${baseUrl}${opts.alternatePath}`
    }

    return {
        url: `${baseUrl}${path}`,
        lastModified: opts.lastModified ?? new Date(),
        changeFrequency: 'weekly' as const,
        priority: opts.priority ?? 0.8,
        alternates: { languages },
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Statik TR/EN sayfa çiftleri (hreflang ile birlikte)
    const staticEntries: MetadataRoute.Sitemap = []
    for (const pair of ROUTE_PAIRS) {
        staticEntries.push(entry(pair.tr, { priority: pair.tr === '/' ? 1 : 0.8, alternatePath: pair.en }))
        staticEntries.push(entry(pair.en, { priority: pair.en === '/en' ? 1 : 0.8, alternatePath: pair.tr }))
    }

    // Diğer statik sayfalar (henüz İngilizce karşılığı olmayan)
    const otherStaticRoutes = [
        '/kariyer',
        '/gizlilik-politikasi',
        '/kullanim-kosullari',
        '/kvkk-aydinlatma-metni',
    ]
    for (const route of otherStaticRoutes) {
        staticEntries.push(entry(route, { priority: 0.5, alternatePath: null }))
    }

    // Blog yazıları (TR + EN)
    const blogEntries: MetadataRoute.Sitemap = []
    try {
        const [trPosts, enPosts] = await Promise.all([getPublishedPosts('tr'), getPublishedPosts('en')])
        for (const post of trPosts) {
            blogEntries.push(entry(`/blog/${post.slug}`, { lastModified: post.updatedAt, priority: 0.6, alternatePath: null }))
        }
        for (const post of enPosts) {
            blogEntries.push(entry(`/en/blog/${post.slug}`, { lastModified: post.updatedAt, priority: 0.6, alternatePath: null }))
        }
    } catch (error) {
        console.error('Failed to fetch posts for sitemap:', error)
    }

    // Vaka çalışmaları (TR + EN)
    const caseStudyEntries: MetadataRoute.Sitemap = []
    try {
        const [trCaseStudies, enCaseStudies] = await Promise.all([
            getPublishedCaseStudies('tr'),
            getPublishedCaseStudies('en'),
        ])
        for (const cs of trCaseStudies) {
            caseStudyEntries.push(entry(`/referanslar/${cs.slug}`, { lastModified: cs.updatedAt, priority: 0.6, alternatePath: null }))
        }
        for (const cs of enCaseStudies) {
            caseStudyEntries.push(entry(`/en/case-studies/${cs.slug}`, { lastModified: cs.updatedAt, priority: 0.6, alternatePath: null }))
        }
    } catch (error) {
        console.error('Failed to fetch case studies for sitemap:', error)
    }

    // Veritabanından yönetilen diğer sayfalar (Page modeli)
    let dynamicPages: MetadataRoute.Sitemap = []
    try {
        const pages = await prisma.page.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true },
        })

        dynamicPages = pages
            .map((page) => (page.slug.startsWith('/') ? page.slug.slice(1) : page.slug))
            // Zaten yukarıda eklenen rotaları tekrar eklemeyelim
            .filter((slug) => !ROUTE_PAIRS.some((p) => p.tr === `/${slug}`))
            .map((slug) => entry(`/${slug}`, { priority: 0.7, alternatePath: null }))
    } catch (error) {
        console.error('Failed to fetch dynamic pages for sitemap:', error)
    }

    return [...staticEntries, ...blogEntries, ...caseStudyEntries, ...dynamicPages]
}
