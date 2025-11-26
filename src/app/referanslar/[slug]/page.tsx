import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    try {
        const caseStudies = await prisma.caseStudy.findMany({
            where: { published: true },
            select: { slug: true },
        });

        return caseStudies.map((cs: any) => ({
            slug: cs.slug,
        }));
    } catch (error) {
        // Return empty array if table doesn't exist yet
        console.log('CaseStudy table not found, skipping static generation');
        return [];
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const caseStudy = await prisma.caseStudy.findUnique({
        where: { slug: params.slug },
    });

    if (!caseStudy) {
        return {
            title: "Vaka Çalışması Bulunamadı | Auryn Dijital",
        };
    }

    return {
        title: `${caseStudy.title} | Auryn Dijital`,
        description: caseStudy.excerpt,
    };
}

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
    const caseStudy = await prisma.caseStudy.findUnique({
        where: { slug: params.slug },
    });

    if (!caseStudy || !caseStudy.published) {
        notFound();
    }

    const relatedCaseStudies = await prisma.caseStudy.findMany({
        where: {
            published: true,
            category: caseStudy.category,
            id: { not: caseStudy.id },
        },
        take: 3,
    });

    return (
        <div className="bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <Link href="/referanslar">
                        <Button variant="ghost" className="text-white hover:text-white/80 mb-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Tüm Vaka Çalışmaları
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-auryn-magenta/20 text-auryn-light rounded-full text-sm font-medium">
                            {caseStudy.category}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                        {caseStudy.title}
                    </h1>
                    <p className="text-xl text-gray-300 mb-6">{caseStudy.client}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(caseStudy.createdAt).toLocaleDateString("tr-TR", {
                                year: "numeric",
                                month: "long",
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Cover Image */}
            {caseStudy.coverImage && (
                <section className="relative h-96 bg-gray-900">
                    <Image
                        src={caseStudy.coverImage}
                        alt={caseStudy.title}
                        fill
                        className="object-cover opacity-90"
                    />
                </section>
            )}

            {/* Content */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Proje Özeti</h2>
                        <p className="text-gray-600 text-lg mb-8">{caseStudy.excerpt}</p>

                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {caseStudy.content}
                        </div>
                    </div>

                    {/* Results */}
                    {caseStudy.results && (
                        <div className="mt-12 p-8 bg-gradient-to-br from-auryn-magenta/5 to-auryn-light/5 rounded-2xl border border-auryn-magenta/20">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Elde Edilen Sonuçlar</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {Object.entries(caseStudy.results as any).map(([key, value]: [string, any]) => (
                                    <div key={key} className="text-center">
                                        <div className="text-3xl font-bold text-auryn-magenta mb-2">{value}</div>
                                        <div className="text-sm text-gray-600">{key}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Related Case Studies */}
            {relatedCaseStudies.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">İlgili Vaka Çalışmaları</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            {relatedCaseStudies.map((related: any) => (
                                <Link
                                    key={related.id}
                                    href={`/referanslar/${related.slug}`}
                                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                                >
                                    {related.coverImage && (
                                        <div className="relative h-40 overflow-hidden">
                                            <Image
                                                src={related.coverImage}
                                                alt={related.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-auryn-magenta transition-colors">
                                            {related.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">{related.client}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-gradient-to-r from-auryn-magenta to-auryn-light py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Sizin İçin de Benzer Sonuçlar Elde Edebiliriz
                    </h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Markanızı dijital dünyada büyütmek için hemen iletişime geçin
                    </p>
                    <Link href="/iletisim">
                        <Button size="lg" variant="outline" className="bg-white text-auryn-magenta hover:bg-gray-100 border-0">
                            İletişime Geçin
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
