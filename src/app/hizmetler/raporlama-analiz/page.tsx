import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart3, TrendingUp, Database, Eye, CheckCircle, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dijital Veri Analizi, Ölçümleme ve Performans Raporlama | AURYN Dijital",
    description: "Veriye dayalı büyüme stratejileri. Google Analytics 4 (GA4), Looker Studio ve dönüşüm takibi hizmetleri ile pazarlama bütçenizin getirisini şeffaf bir şekilde ölçümlüyoruz.",
};

export default function ReportingAnalyticsPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-auryn-magenta/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Dijital Veri Analizi,
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                            Ölçümleme ve Performans Raporlama
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Pazarlama bütçenizin nereye harcandığını ve karşılığında ne kazandırdığını kuruşu kuruşuna takip edin. Veriyi anlamlı iş zekasına (Business Intelligence) dönüştürüyoruz.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/iletisim">
                            <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white">
                                Ücretsiz Veri Analizi Görüşmesi
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Professional Analytics */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Neden Profesyonel Veri Analizi Hizmeti?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: TrendingUp,
                                title: "Bütçe Optimizasyonu",
                                description: "Hangi kanalın satış getirdiğini netleştirerek paranızı kazanan kanallara yatırın."
                            },
                            {
                                icon: Eye,
                                title: "Kullanıcı Davranışını Anlama",
                                description: "Ziyaretçi neden satın almadan çıktı? Hangi sayfada takıldı? Isı haritaları ve kullanıcı yolculuğu analizleriyle darboğazları tespit edin."
                            },
                            {
                                icon: Database,
                                title: "Kişiselleştirilmiş Strateji",
                                description: "Demografik ve davranışsal verileri işleyerek müşterilere doğru zamanda doğru mesajı veren segmentasyonlar oluşturun."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                <item.icon className="h-12 w-12 text-auryn-magenta mb-4" />
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-300">{item.description}</p>
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
                            Uçtan Uca Veri Yönetimi ve Raporlama Sürecimiz
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Database,
                                title: "Teknik Kurulum ve Tag Yönetimi (GTM)",
                                features: [
                                    "Google Tag Manager ile Event tracking kurulumu",
                                    "Form gönderimi, telefon tıklaması, WhatsApp iletişimi takibi",
                                    "Tüm takip piksellerini (Google Ads, Meta, LinkedIn) tek çatı altında yönetme"
                                ]
                            },
                            {
                                icon: BarChart3,
                                title: "Google Analytics 4 (GA4) Optimizasyonu",
                                features: [
                                    "GA4 hesabı kurulumu ve özelleştirme",
                                    "E-ticaret veya lead hedeflerine göre yapılandırma",
                                    "Huni (funnel) analizleri ve kitle segmentasyonları"
                                ]
                            },
                            {
                                icon: TrendingUp,
                                title: "Dönüşüm Takibi ve Attribution",
                                features: [
                                    "Multi-channel attribution modelleri",
                                    "Hangi kanalın satışı başlattığını, hangisinin bitirdiğini analiz",
                                    "Doğru kanala kredi verme"
                                ]
                            },
                            {
                                icon: Eye,
                                title: "Looker Studio ile Şeffaf Raporlama",
                                features: [
                                    "Markanıza özel interaktif dashboard'lar",
                                    "7/24 erişim ile canlı performans takibi",
                                    "Harcanan bütçe, elde edilen ciro, maliyetler ve grafikler"
                                ]
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                                <service.icon className="h-12 w-12 text-auryn-magenta mb-4" />
                                <h3 className="text-xl font-bold text-white mb-6">{service.title}</h3>
                                <ul className="space-y-3">
                                    {service.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start text-sm text-gray-300">
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

            {/* Sector Solutions */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Sektörel Analiz Çözümleri
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                            <h3 className="text-2xl font-bold text-white mb-4">B2B ve Sanayi Firmaları</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Makro ve Mikro Dönüşüm takibi (Teklif Formu, Katalog İndirme)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Lead Kalitesi analizi ile satış ekibine temiz data</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>CRM entegrasyonu ve offline conversion tracking</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                            <h3 className="text-2xl font-bold text-white mb-4">Turizm ve Otelcilik</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Rezervasyon motoru tam entegrasyonu</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Oda başına maliyet, rezervasyon başına gelir analizi</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Sezonluk performans karşılaştırma ve iptal oranları</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-black">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Sıkça Sorulan Sorular
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: "Raporları ne sıklıkla alacağız?",
                                answer: "AURYN Dijital müşterileri, kendilerine özel hazırlanan Looker Studio panelleri sayesinde verilere 7/24 canlı olarak ulaşabilirler. Ayrıca her ayın sonunda, verilerin yorumlandığı ve gelecek ayın stratejisinin belirlendiği kapsamlı bir 'Yönetici Özeti' sunumu ve toplantısı yapıyoruz."
                            },
                            {
                                question: "Veri gizliliği ve KVKK uyumu nasıl sağlanıyor?",
                                answer: "Tüm takip ve analiz süreçlerimizde KVKK (Kişisel Verilerin Korunması Kanunu) ve GDPR standartlarına sadık kalıyoruz. Kullanıcıların izni olmadan kişisel verilerini işlemiyor, çerez politikalarınızı buna göre düzenliyoruz."
                            },
                            {
                                question: "Sunucu Taraflı Takip (Server-Side Tracking) yapıyor musunuz?",
                                answer: "Evet. Tarayıcı tabanlı engellemeleri (AdBlocker, iOS kısıtlamaları) aşmak ve veriyi %99 doğrulukla ölçmek için Server-Side GTM ve Conversion API (CAPI) kurulumlarını gerçekleştiriyoruz."
                            },
                            {
                                question: "CRM entegrasyonu yapıyor musunuz?",
                                answer: "Dijitalden gelen lead'lerin satışa dönüp dönmediğini ölçmek için; reklam hesaplarınızı kullandığınız CRM (Salesforce, HubSpot, Zoho vb.) yazılımlarıyla entegre ediyor, 'Offline Conversion' takibi yapıyoruz."
                            }
                        ].map((faq, idx) => (
                            <details key={idx} className="group bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-semibold hover:bg-gray-800/70 transition-colors">
                                    <span>{faq.question}</span>
                                    <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-6 pb-6 text-gray-300">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Kararlarınızı Tahminlere Değil, Verilere Dayandırın
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Mevcut analiz altyapınızı denetleyelim, veri kaçaklarını bulalım ve size özel bir raporlama ekosistemi kuralım.
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
