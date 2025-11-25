import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://auryndijital.com'

    // Static pages
    const staticPages = [
        '',
        '/hizmetler',
        '/hakkimizda',
        '/iletisim',
        '/blog',
        '/kariyer',
        '/gizlilik-politikasi',
        '/kullanim-kosullari',
        '/kvkk-aydinlatma-metni',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic pages from database
    const pages = await prisma.page.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    })

    const dynamicPages = pages.map((page) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Blog posts (mock for now, but structure ready)
    // const posts = await prisma.post.findMany(...)

    return [...staticPages, ...dynamicPages]
}
