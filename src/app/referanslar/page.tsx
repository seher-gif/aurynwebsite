import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: "Referanslar & Vaka Çalışmaları | Auryn Dijital",
    description: "Başarılı projelerimiz ve müşterilerimizle elde ettiğimiz sonuçlar. SEO, Google Ads ve dijital pazarlama vaka çalışmalarımızı inceleyin.",
};

export default async function ReferanslarPage() {
    let clients: any[] = [];
    let caseStudies: any[] = [];

    try {
        clients = await prisma.client.findMany({
            where: { active: true },
            orderBy: { order: "asc" },
        });
    } catch (error) {
        console.log('Client table not found yet');
    }

    try {
        caseStudies = await prisma.caseStudy.findMany({
            where: { published: true },
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.log('CaseStudy table not found yet');
    }

    return (
        <div className="bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Referanslar & <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-light">Vaka Çalışmaları</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                        Müşterilerimizle birlikte elde ettiğimiz başarı hikayeleri ve somut sonuçlar
                    </p>
                </div>
            </section>

            {/* Client Logos */}
            {clients.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                Güvenilir İş Ortaklarımız
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Birlikte büyüdüğümüz markalar
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {clients.map((client: any) => (
                                <div
                                    key={client.id}
                                    className="flex items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {client.website ? (
                                        <a href={client.website} target="_blank" rel="noopener noreferrer">
                                            <Image
                                                src={client.logo}
                                                alt={client.name}
                                                width={150}
                                                height={75}
                                                className="object-contain grayscale hover:grayscale-0 transition-all"
                                            />
                                        </a>
                                    ) : (
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            width={150}
                                            height={75}
                                            className="object-contain grayscale hover:grayscale-0 transition-all"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Case Studies */}
            {caseStudies.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                Başarı Hikayeleri
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Müşterilerimizle birlikte elde ettiğimiz somut sonuçlar
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {caseStudies.map((caseStudy: any) => (
                                <div
                                    key={caseStudy.id}
                                    className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    {caseStudy.coverImage && (
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={caseStudy.coverImage}
                                                alt={caseStudy.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-3 py-1 bg-auryn-magenta/10 text-auryn-magenta rounded-full text-xs font-medium">
                                                {caseStudy.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {caseStudy.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-1">
                                            {caseStudy.client}
                                        </p>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {caseStudy.excerpt}
                                        </p>
                                        <Link href={`/referanslar/${caseStudy.slug}`}>
                                            <Button variant="ghost" className="group/btn p-0 h-auto text-auryn-magenta hover:text-auryn-dark">
                                                Detayları Gör
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-auryn-magenta to-auryn-light py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Siz de Başarı Hikayenizi Yazın
                    </h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Markanızı dijital dünyada büyütmek için hemen iletişime geçin
                    </p>
                    <Link href="/iletisim">
                        <Button size="lg" variant="outline" className="bg-white text-auryn-magenta hover:bg-gray-100 border-0">
                            Hemen Başlayın
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
