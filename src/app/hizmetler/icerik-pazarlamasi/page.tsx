import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PenTool, CheckCircle, ArrowRight } from "lucide-react";

export default function IcerikPazarlamasiPage() {
    return (
        <div className="bg-white">
            <Header />
            <main className="isolate">
                <div className="relative isolate pt-14">
                    <div className="py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
                                    İçerik Pazarlaması
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-300 font-body">
                                    Değerli ve ilgi çekici içeriklerle hedef kitlenizi etkileyin. Blog yazıları, e-kitaplar ve video içeriklerle markanızın otoritesini güçlendirin.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Button variant="gradient" size="lg" asChild>
                                        <Link href="/iletisim">Teklif Alın</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
                    <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-12">
                        İçerik Pazarlama Hizmetlerimiz
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            "İçerik Stratejisi Geliştirme",
                            "Blog Yazıları ve Makaleler",
                            "E-Kitap ve Whitepaper Hazırlama",
                            "Video İçerik Üretimi",
                            "İnfografik Tasarımı",
                            "İçerik Dağıtım ve Promosyon"
                        ].map((feature) => (
                            <div key={feature} className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-auryn-magenta flex-shrink-0 mt-1" />
                                <span className="text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-auryn-magenta to-auryn-purple py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                İçerikle Hedef Kitlenize Ulaşın
                            </h2>
                            <div className="mt-10">
                                <Button variant="secondary" size="lg" asChild className="bg-white text-auryn-magenta hover:bg-gray-100">
                                    <Link href="/iletisim">Başlayın <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
