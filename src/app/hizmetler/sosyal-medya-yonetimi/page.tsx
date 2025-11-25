import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe, CheckCircle, ArrowRight } from "lucide-react";

export default function SosyalMedyaYonetimiPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="isolate">
                <div className="relative isolate pt-14">
                    <div className="py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-heading">
                                    Sosyal Medya Yönetimi
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600 font-body">
                                    Marka bilinirliğinizi artırın ve topluluğunuzla etkileşim kurun. Instagram, LinkedIn, Twitter ve TikTok için yaratıcı stratejiler geliştiriyoruz.
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
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
                        Sosyal Medya Hizmetlerimiz
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            "Sosyal Medya Stratejisi",
                            "İçerik Planlama ve Üretimi",
                            "Topluluk Yönetimi",
                            "Influencer İşbirlikleri",
                            "Sosyal Medya Reklamları",
                            "Performans Analizi ve Raporlama"
                        ].map((feature) => (
                            <div key={feature} className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-auryn-magenta flex-shrink-0 mt-1" />
                                <span className="text-gray-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-auryn-magenta to-auryn-purple py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Sosyal Medyada Fark Yaratın
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
