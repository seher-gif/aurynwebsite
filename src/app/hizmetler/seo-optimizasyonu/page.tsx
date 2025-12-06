import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp, Search, FileText, BarChart, Globe, CheckCircle, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kurumsal SEO Danışmanlığı ve Veri Odaklı Arama Motoru Optimizasyonu | AURYN Dijital",
    description: "Antalya ve İstanbul odaklı profesyonel SEO danışmanı hizmetleri. Growth Hacking teknikleriyle arama motoru optimizasyonu, teknik SEO ve içerik stratejileriyle organik trafiğinizi ve cironuzu artırın.",
};

export default function SEOPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-auryn-magenta/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Kurumsal SEO Danışmanlığı ve
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                            Veri Odaklı Arama Motoru Optimizasyonu
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Milyonlarca web sitesinin rekabet ettiği arama motoru sonuçlarında (SERP), markanızın görünürlüğünü sağlamak teknik bir disiplin gerektirir. Growth Hacking prensipleriyle birleşen, sürdürülebilir büyüme stratejisi sunuyoruz.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/seo-analizi">
                            <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white">
                                Ücretsiz SEO Analizi
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Professional SEO */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Neden Profesyonel Bir SEO Danışmanı ile Çalışmalısınız?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Zaman ve Kaynak Verimliliği",
                                description: "Deneme-yanılma yöntemleriyle vakit ve bütçe kaybetmek yerine, kanıtlanmış ve veri odaklı stratejilerle doğrudan sonuca odaklanırsınız."
                            },
                            {
                                title: "Sürdürülebilir Büyüme",
                                description: "Reklam bütçenizi kestiğinizde trafiğinizin tamamen durmasını istemezsiniz. Organik büyüme, markanızın dijital değerini artırır."
                            },
                            {
                                title: "Veri Odaklı Karar Alma",
                                description: "Google Search Console, Ahrefs, SEMrush ve GA4 verilerine göre süreçler yönetilir, tahminlere göre değil."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Services */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            360° Arama Motoru Optimizasyonu Süreçlerimiz
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Search,
                                title: "Teknik SEO",
                                features: [
                                    "Core Web Vitals ve hız optimizasyonu",
                                    "Mobil uyumluluk (Mobile-First Indexing)",
                                    "Tarama bütçesi yönetimi",
                                    "Site mimarisi ve SSL yapılandırması"
                                ]
                            },
                            {
                                icon: FileText,
                                title: "İçerik Stratejisi ve Semantik SEO",
                                features: [
                                    "Anahtar kelime araştırması ve intent analizi",
                                    "Teknik ve eğitici içerik üretimi",
                                    "On-Page SEO (H1, H2, meta, iç linkler)",
                                    "E-E-A-T odaklı otorite inşası"
                                ]
                            },
                            {
                                icon: BarChart,
                                title: "Otorite İnşası (Off-Page SEO)",
                                features: [
                                    "Kaliteli backlink profili oluşturma",
                                    "Zararlı link temizliği (Disavow)",
                                    "PR ve dijital halkla ilişkiler",
                                    "Domain Authority artırma"
                                ]
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                <service.icon className="h-12 w-12 text-auryn-magenta mb-4" />
                                <h3 className="text-xl font-bold text-white mb4">{service.title}</h3>
                                <ul className="space-y-3">
                                    {service.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start text-gray-300">
                                            <CheckCircle className="h-5 w-5 text-auryn-magenta mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location-based Strategies */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Lokasyon ve Sektör Bazlı Stratejiler
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                            <Globe className="h-12 w-12 text-auryn-magenta mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-4">Antalya SEO ve Turizm Odaklı Çalışmalar</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Yerel SEO ve Google Maps optimizasyonu</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Çok dilli (TR, EN, DE, RU) SEO stratejileri</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Otel ve sağlık turizmi için özel içerikler</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                            <TrendingUp className="h-12 w-12 text-auryn-magenta mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-4">İstanbul SEO ve B2B Sanayi Çözümleri</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>B2B SEO: Satın alma profesyonellerini hedefleme</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Teknik terimler ve ürün kodları optimizasyonu</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>İhracat pazarlarında (AB, ABD, Orta Doğu) görünürlük</span>
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
                                question: "SEO çalışmaları ne kadar sürede sonuç verir?",
                                answer: "SEO, bir sprint değil maratondur. Rekabet durumuna ve sitenizin geçmişine bağlı olarak, teknik iyileştirmelerin etkisi 1-3 ay içinde görülmeye başlar. Hedeflenen kelimelerde kalıcı yükseliş ve anlamlı trafik artışı genellikle 6-12 aylık bir periyodu kapsar."
                            },
                            {
                                question: "SEO Danışmanlığı fiyatları neye göre belirlenir?",
                                answer: "Her projenin ihtiyacı farklıdır. Sitenizin sayfa sayısı, hedeflediğiniz anahtar kelimelerin rekabet oranı, içerik ihtiyaçlarınız ve teknik altyapınızın durumu fiyatı belirler. Markanıza özel bir yol haritası ve teklif sunuyoruz."
                            },
                            {
                                question: "Neden bir SEO Uzmanı ile çalışmalıyım, kendim yapamaz mıyım?",
                                answer: "Temel SEO ayarlarını yapabilirsiniz. Ancak algoritmaların, teknik detayların ve rekabetin bu kadar yoğun olduğu bir dünyada, profesyonel bir SEO Uzmanı size zaman kazandırır ve bütçenizi yanlış stratejilerle (Black Hat SEO gibi riskler) heba etmenizi engeller."
                            },
                            {
                                question: "Hem Google Ads hem SEO gerekli mi?",
                                answer: "Evet. Google Ads size 'hemen' trafik getirir (parayı verdiğiniz sürece). SEO ise size 'kalıcı' ve 'ücretsiz' trafik getirir (yatırım yaptığınız sürece). En sağlıklı dijital pazarlama stratejisi, bu ikisinin hibrit kullanıldığı modeldir."
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
                        Dijital Geleceğinizi Şansa Bırakmayın
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Google'da ilk sayfada değilseniz, dijital dünyada görünmezsiniz demektir. Web sitenizin ücretsiz ön analizini yapalım ve büyüme potansiyelinizi birlikte keşfedelim.
                    </p>
                    <Link href="/seo-analizi">
                        <Button size="lg" className="bg-white text-auryn-magenta hover:bg-gray-100">
                            Ücretsiz SEO Analizi
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
