import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, MapPin, Award, Sparkles, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Antalya Dijital Pazarlama Ajansı | SEO, Google Ads & Sosyal Medya | AURYN",
    description: "Antalya'nın önde gelen dijital pazarlama ajansı. Turizm odaklı SEO, performans reklamcılığı ve sosyal medya yönetimi hizmetleriyle markanızı büyütüyoruz.",
};

export default function AntalyaPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-auryn-magenta/30"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <MapPin className="h-6 w-6 text-auryn-magenta" />
                                <span className="text-auryn-magenta font-semibold">Antalya Merkezli</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                                Antalya'nın
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                                    Önde Gelen Dijital Ajansı
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                Turizm, sağlık ve yerel işletmeler için özelleşmiş dijital pazarlama çözümleri. Antalya'nın dinamiklerini bilen, global standartlarda hizmet veren ekibiniz.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/iletisim">
                                    <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white">
                                        Ücretsiz Danışma
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="/seo-analizi">
                                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                        SEO Analizi Al
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-auryn-magenta to-auryn-purple opacity-20 blur-3xl"></div>
                            <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-800">
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: "Mutlu Müşteri", value: "50+" },
                                        { label: "Organik Trafik Artışı", value: "%250" },
                                        { label: "ROAS Ortalaması", value: "4.8x" },
                                        { label: "Yıllık Deneyim", value: "7+" }
                                    ].map((stat, idx) => (
                                        <div key={idx} className="text-center">
                                            <div className="text-3xl font-bold text-auryn-magenta mb-1">{stat.value}</div>
                                            <div className="text-sm text-gray-400">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Antalya Expertise */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Antalya'da Dijital Pazarlama Neden Farklı?
                        </h2>
                        <p className="text-xl text-gray-400">
                            Yerel dinamikleri bilmek, global başarı sağlar
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: "Turizm Odaklı Uzmanlık",
                                description: "Oteller, acenteler ve sağlık turizmi için sezonluk stratejiler ve çok dilli SEO konusunda derin deneyim"
                            },
                            {
                                icon: Award,
                                title: "Meta & Google Partner",
                                description: "Resmi sertifikalı ajans olarak, platformların en güncel özelliklerine erken erişim ve özel destek"
                            },
                            {
                                icon: TrendingUp,
                                title: "Yerel + Global Bakış",
                                description: "Antalya'nın nabzını tutarken, Avrupa ve Orta Doğu pazarlarına açılmanızı sağlıyoruz"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                <item.icon className="h-12 w-12 text-auryn-magenta mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services for Antalya */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Antalya İşletmeleri İçin Hizmetlerimiz
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Otel & Acente SEO",
                                features: [
                                    "Çok dilli SEO (TR, EN, DE, RU)",
                                    "Google Haritalar optimizasyonu",
                                    "Online rezervasyon artırma",
                                    "Sezonluk içerik stratejisi"
                                ],
                                link: "/hizmetler/seo-optimizasyonu"
                            },
                            {
                                title: "Turizm Reklamcılığı",
                                features: [
                                    "Meta & Google Ads yönetimi",
                                    "Avrupa pazarı hedeflemeleri",
                                    "Dinamik ürün reklamları",
                                    "Remarketing stratejileri"
                                ],
                                link: "/hizmetler/google-ads-yonetimi"
                            },
                            {
                                title: "Sosyal Medya Yönetimi",
                                features: [
                                    "Instagram & Facebook içerik üretimi",
                                    "Profesyonel fotoğraf/video çekimleri",
                                    "Influencer iş birlikleri",
                                    "Topluluk yönetimi"
                                ],
                                link: "/hizmetler/sosyal-medya-yonetimi"
                            },
                            {
                                title: "Sağlık Turizmi Pazarlaması",
                                features: [
                                    "Medikal SEO stratejileri",
                                    "Çok dilli landing page'ler",
                                    "Google Ads ve YouTube reklamları",
                                    "Lead generation optimizasyonu"
                                ],
                                link: "/iletisim"
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                                <h3 className="text-2xl font-bold text-white mb-6">{service.title}</h3>
                                <ul className="space-y-3 mb-6">
                                    {service.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start text-gray-300">
                                            <CheckCircle className="h-5 w-5 text-auryn-magenta mr-3 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={service.link}>
                                    <Button variant="outline" className="border-auryn-magenta text-auryn-magenta hover:bg-auryn-magenta/10">
                                        Detaylı Bilgi
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Antalya'da Dijital Varlığınızı Güçlendirin
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Yerel deneyim, global sonuçlar. Ucretsiz danışma için hemen iletişime geçin.
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
