import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, CheckCircle, ArrowRight } from "lucide-react";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/schema";

export default function SEOOptimizasyonuPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <ServiceSchema service={{
                name: "SEO Optimizasyonu",
                description: "Arama motorlarında üst sıralara çıkarak organik trafiğinizi artırın. Teknik SEO, içerik optimizasyonu ve backlink stratejileri ile görünürlüğünüzü kalıcı hale getiriyoruz.",
                url: "https://auryndijital.com/hizmetler/seo-optimizasyonu"
            }} />
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", url: "https://auryndijital.com" },
                { name: "Hizmetler", url: "https://auryndijital.com/hizmetler" },
                { name: "SEO Optimizasyonu", url: "https://auryndijital.com/hizmetler/seo-optimizasyonu" }
            ]} />
            <Header />
            <main className="isolate">
                {/* Hero */}
                <div className="relative isolate pt-14">
                    <div className="py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
                                    SEO Optimizasyonu
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-300 font-body">
                                    Arama motorlarında üst sıralara çıkarak organik trafiğinizi artırın. Teknik SEO, içerik optimizasyonu ve backlink stratejileri ile görünürlüğünüzü kalıcı hale getiriyoruz.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Button variant="gradient" size="lg" asChild>
                                        <Link href="/iletisim">Teklif Alın</Link>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild>
                                        <Link href="/seo-analizi">Ücretsiz SEO Analizi</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
                    <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-12">
                        SEO Hizmetlerimiz
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            "Teknik SEO Analizi ve Optimizasyonu",
                            "Anahtar Kelime Araştırması ve Stratejisi",
                            "İçerik Optimizasyonu",
                            "Backlink Profil Geliştirme",
                            "Yerel SEO Optimizasyonu",
                            "SEO Raporlama ve Takip"
                        ].map((feature) => (
                            <div key={feature} className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-auryn-magenta flex-shrink-0 mt-1" />
                                <span className="text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-auryn-magenta to-auryn-purple py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                SEO Stratejinizi Oluşturmaya Hazır mısınız?
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-white/90">
                                Ücretsiz SEO analizimizle başlayın ve web sitenizin potansiyelini keşfedin.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Button variant="secondary" size="lg" asChild className="bg-white text-auryn-magenta hover:bg-gray-100">
                                    <Link href="/seo-analizi">Ücretsiz Analiz <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
