import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    ArrowRight, CheckCircle, TrendingUp, Target, Users,

    BarChart2
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stratejik Danışmanlık & Büyüme Pazarlaması | AURYN Dijital",
    description: "Veri odaklı dijital strateji danışmanlığı ve büyüme pazarlaması hizmetleri. İşletmenizin dijital dönüşümünde stratejik partneriniz.",
};

export default function StrategicConsultingPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-auryn-magenta/20 via-black to-auryn-purple/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Stratejik Danışmanlık &
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                                Büyüme Pazarlaması
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Veri odaklı stratejiler ve growth hacking metodolojisiyle işletmenizin dijital büyüme potansiyelini açığa çıkarıyoruz
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/iletisim">
                                <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white">
                                    Ücretsiz Strateji Görüşmesi
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/seo-analizi">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                    Web Sitenizi Analiz Edin
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Veri Odaklı Strateji",
                                description: "Tahminlerle değil, gerçek verilerle karar alın"
                            },
                            {
                                icon: TrendingUp,
                                title: "Ölçülebilir Büyüme",
                                description: "Her adımı KPI'larla takip edin ve optimize edin"
                            },
                            {
                                icon: Users,
                                title: "Deneyimli Ekip",
                                description: "B2B, turizm ve e-ticaret uzmanlığı"
                            },
                            {
                                icon: BarChart2,
                                title: "Şeffaf Raporlama",
                                description: "Canlı dashboard'larla 7/24 performans takibi"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                <item.icon className="h-12 w-12 text-auryn-magenta mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Stratejik Danışmanlık Hizmetlerimiz
                        </h2>
                        <p className="text-xl text-gray-400">
                            İşletmenizin ihtiyaçlarına özel çözümler
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Dijital Dönüşüm Danışmanlığı",
                                features: [
                                    "Mevcut dijital varlıklarınızın analizi",
                                    "Rekabet ve pazar araştırması",
                                    "360° dijital strateji roadmap'i",
                                    "Teknoloji stack önerileri"
                                ]
                            },
                            {
                                title: "Growth Hacking & Performans Optimizasyonu",
                                features: [
                                    "Conversion funnel optimizasyonu",
                                    "A/B test stratejileri",
                                    "Viral loops ve referral sistemler",
                                    "Retention ve CLTV artırma"
                                ]
                            },
                            {
                                title: "SEO & İçerik Stratejisi",
                                features: [
                                    "Topikal otorite planlaması",
                                    "Anahtar kelime araştırması ve roadmap",
                                    "Teknik SEO audit ve iyileştirme",
                                    "E-E-A-T odaklı içerik stratejisi"
                                ]
                            },
                            {
                                title: "Paid Media Strategy",
                                features: [
                                    "Google Ads & Meta Ads yönetimi",
                                    "LinkedIn B2B reklam stratejileri",
                                    "Bütçe optimizasyonu ve ROAS artırma",
                                    "Remarketing ve lookalike stratejileri"
                                ]
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                                <h3 className="text-2xl font-bold text-white mb-6">{service.title}</h3>
                                <ul className="space-y-3">
                                    {service.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start text-gray-300">
                                            <CheckCircle className="h-5 w-5 text-auryn-magenta mr-3 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Dijital Büyüme Stratejinizi Birlikte Oluşturalım
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Ücretsiz strateji görüşmesi için hemen iletişime geçin
                    </p>
                    <Link href="/iletisim">
                        <Button size="lg" className="bg-white text-auryn-magenta hover:bg-gray-100">
                            Hemen Başlayın
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
