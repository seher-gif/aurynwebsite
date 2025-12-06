import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle, Building2, Cpu, Globe, BarChart3, Users2, Rocket } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "İstanbul Dijital Pazarlama Ajansı | B2B & Kurumsal Çözümler | AURYN",
    description: "İstanbul'da B2B, sanayi ve teknoloji firmaları için profesyonel dijital pazarlama hizmetleri. LinkedIn uzmanı, ihracat odaklı stratejiler.",
};

export default function IstanbulPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900/30"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="h-6 w-6 text-auryn-magenta" />
                            <span className="text-auryn-magenta font-semibold">İstanbul & Türkiye Geneli</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            B2B ve Kurumsal
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                                Dijital Pazarlama Çözümleri
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Sanayi, teknoloji ve B2B firmalar için veri odaklı dijital pazarlama stratejileri. İhracat hedeflerinizde global görünürlük sağlıyoruz.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/iletisim">
                                <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white">
                                    Ücrets strateji Görüşmesi
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/referanslar">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                    Referanslarımız
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* B2B Expertise */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            B2B Dijital Pazarlamada Farkımız
                        </h2>
                        <p className="text-xl text-gray-400">
                            Karar vericilere ulaşan, lead kalitesi yüksek stratejiler
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Cpu,
                                title: "Sanayi & Üretim Uzmanlığı",
                                description: "Teknik jargonu pazarlama diline çeviren, mühendis ve satın alma müdürlerine hitap eden içerik stratejileri"
                            },
                            {
                                icon: Globe,
                                title: "İhracat Odaklı Pazarlama",
                                description: "Avrupa, Orta Doğu ve global pazarlara yönelik çok dilli SEO ve reklam kampanyaları"
                            },
                            {
                                icon: BarChart3,
                                title: "Lead Quality > Lead Quantity",
                                description: "Teklif formu dolduran değil, gerçekten satın alma potansiyeli yüksek B2B müşteriler kazandırıyoruz"
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

            {/* Services */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            İstanbul ve Türkiye Geneli B2B Hizmetlerimiz
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Users2,
                                title: "LinkedIn B2B Pazarlama",
                                features: [
                                    "Şirket sayfası yönetimi ve thought leadership",
                                    "Karar verici hedeflemeli LinkedIn Ads",
                                    "Lead generation kampanyaları",
                                    "InMail ve sponsorlu içerik stratejileri"
                                ],
                                link: "/hizmetler/sosyal-medya-yonetimi"
                            },
                            {
                                icon: Rocket,
                                title: "B2B SEO & İçerik",
                                features: [
                                    "Teknik ürün sayfaları optimizasyonu",
                                    "Sanayi odaklı blog stratejisi",
                                    "Whitepaper ve e-kitap üretimi",
                                    "Vaka çalışması (case study) yazımı"
                                ],
                                link: "/hizmetler/seo-optimizasyonu"
                            },
                            {
                                icon: Globe,
                                title: "İhracat Dijital Stratejisi",
                                features: [
                                    "Hedef ülke bazlı SEO çalışmaları",
                                    "Google Ads uluslararası kampanyalar",
                                    "Çok dilli web sitesi danışmanlığı",
                                    "Yurtdışı fuar öncesi/sonrası lead toplama"
                                ],
                                link: "/dijital-strateji-buyume-danismanligi"
                            },
                            {
                                icon: BarChart3,
                                title: "Google Ads & SEM",
                                features: [
                                    "B2B anahtar kelime stratejileri",
                                    "Remarketing listesi oluşturma (RLSA)",
                                    "CRM entegrasyonu ve offline conversion tracking",
                                    "Bütçe optimizasyonu ve lead maliyet düşürme"
                                ],
                                link: "/hizmetler/google-ads-yonetimi"
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                                <service.icon className="h-12 w-12 text-auryn-magenta mb-4" />
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
                        B2B Dijital Büyümenizi Hızlandırın
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        İstanbul'dan dünyaya açılın. İhracat hedeflerinizde dijital partneriniz olalım.
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
