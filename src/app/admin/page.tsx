import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Search, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Always read live numbers; the dashboard must never be statically cached.
export const dynamic = "force-dynamic";

async function safe<T>(query: Promise<T>, fallback: T): Promise<T> {
    try {
        return await query;
    } catch (error) {
        console.error("Dashboard query failed:", error);
        return fallback;
    }
}

export default async function AdminDashboard() {
    const session = await auth();
    const displayName = session?.user?.name || "Admin";
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [publishedPosts, draftPosts, newMessages, seoLast30, admins, caseStudies, recentMessages, recentAnalyses] =
        await Promise.all([
            safe(prisma.post.count({ where: { published: true } }), 0),
            safe(prisma.post.count({ where: { published: false } }), 0),
            safe(prisma.contactMessage.count({ where: { status: "NEW" } }), 0),
            safe(prisma.seoAnalysis.count({ where: { createdAt: { gte: since } } }), 0),
            safe(prisma.user.count({ where: { role: "ADMIN" } }), 0),
            safe(prisma.caseStudy.count({ where: { published: true } }), 0),
            safe(
                prisma.contactMessage.findMany({
                    orderBy: { createdAt: "desc" },
                    take: 5,
                    select: { id: true, name: true, subject: true, status: true, createdAt: true },
                }),
                []
            ),
            safe(
                prisma.seoAnalysis.findMany({
                    orderBy: { createdAt: "desc" },
                    take: 5,
                    select: { id: true, domain: true, score: true, createdAt: true },
                }),
                []
            ),
        ]);

    const stats = [
        {
            title: "Toplam Blog Yazısı",
            value: String(publishedPosts + draftPosts),
            icon: FileText,
            description:
                draftPosts > 0
                    ? `${publishedPosts} yayında, ${draftPosts} taslak`
                    : `${publishedPosts} yazının tamamı yayında`,
            href: "/admin/blog",
        },
        {
            title: "Vaka Çalışmaları",
            value: String(caseStudies),
            icon: Briefcase,
            description: "Yayında olan vaka çalışmaları",
            href: "/admin/case-studies",
        },
        {
            title: "Yeni Mesajlar",
            value: String(newMessages),
            icon: MessageSquare,
            description: "Okunmamış iletişim mesajları",
            href: "/admin/messages",
        },
        {
            title: "SEO Analizleri",
            value: String(seoLast30),
            icon: Search,
            description: "Son 30 günde yapılan analizler",
            href: "/admin/seo-results",
        },
        {
            title: "Yöneticiler",
            value: String(admins),
            icon: Users,
            description: "Aktif admin kullanıcıları",
            href: "/admin/users",
        },
    ];

    const fmt = (d: Date) => new Date(d).toLocaleDateString("tr-TR");

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                Merhaba {displayName}, Auryn Dijital Yönetim Paneline Hoş Geldiniz!
            </h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {stats.map((stat) => (
                    <Link key={stat.title} href={stat.href} className="block">
                        <Card className="h-full border-t-4 border-t-auryn-magenta shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-[#e51e51]">{stat.title}</CardTitle>
                                <stat.icon className="h-4 w-4 text-auryn-magenta" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <p className="text-xs text-gray-700">{stat.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Son SEO Analizleri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentAnalyses.length === 0 ? (
                            <div className="text-sm text-gray-700">Henüz veri yok.</div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {recentAnalyses.map((a) => (
                                    <li key={a.id} className="flex items-center justify-between py-2 text-sm">
                                        <span className="font-medium text-gray-900">{a.domain}</span>
                                        <span className="text-gray-600">
                                            Skor {a.score} · {fmt(a.createdAt)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Son Mesajlar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentMessages.length === 0 ? (
                            <div className="text-sm text-gray-700">Henüz veri yok.</div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {recentMessages.map((m) => (
                                    <li key={m.id} className="py-2 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900">{m.name}</span>
                                            <span className="text-xs text-gray-500">{fmt(m.createdAt)}</span>
                                        </div>
                                        <div className="text-gray-600 truncate">
                                            {m.status === "NEW" && (
                                                <span className="mr-2 rounded bg-auryn-magenta/10 px-1.5 py-0.5 text-xs text-auryn-magenta">
                                                    Yeni
                                                </span>
                                            )}
                                            {m.subject || "Konu belirtilmemiş"}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
