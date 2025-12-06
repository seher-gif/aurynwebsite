import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Statik Sayfalar
    // Not: Projeye ait mevcut rotalar ve istenen temel rotalar eklendi
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/hakkimizda',
        '/iletisim',
        '/hizmetler',
        '/blog',
        '/kariyer',
        '/referanslar',
        '/gizlilik-politikasi',
        '/kullanim-kosullari',
        '/kvkk-aydinlatma-metni',
    ]

    const staticPages = staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dinamik Sayfalar (Veritabanından)
    const pages = await prisma.page.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    })

    // TS tip tanımlaması için Page tipi çıkarımı veya any kullanımı (basitlik için)
    const dynamicPages = pages.map((page) => ({
        url: `${baseUrl}/${page.slug.startsWith('/') ? page.slug.slice(1) : page.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...dynamicPages]
}
