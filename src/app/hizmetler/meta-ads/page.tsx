import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Target, TrendingUp, Users, Zap, CheckCircle, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Veri Odaklı Meta Ads (Facebook & Instagram) Reklam Yönetimi | AURYN Dijital",
    description: "Facebook ve Instagram reklamlarınızda maksimum ROAS hedeflyin. İleri seviye hedefleme, yeniden pazarlama ve kreatif stratejilerle satışlarınızı artırın.",
};

export default function MetaAdsPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Veri Odaklı Meta Ads
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                            (Facebook & Instagram) Reklam Yönetimi
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Meta reklamlarınızı "beğeni" odaklı değil, "performans" ve "ROAS" (Reklam Harcamasının Getirisi) odaklı yönetiyoruz. Algoritmaların gücünü markanızın büyümesi için kullanıyoruz.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/iletisim">
                            <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white">
                                Ücretsiz Reklam Analizi
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Professional */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Neden Profesyonel Meta Ads Danışmanlığı?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Nokta Atışı Hedefleme",
                                description: "İlgi alanları, davranışlar, demografik veriler ve Benzer Kitle (Lookalike) teknolojileriyle sadece potansiyel alıcılarınıza ulaşırsınız."
                            },
                            {
                                icon: TrendingUp,
                                title: "Gelişmiş Takip (Tracking)",
                                description: "Meta Pixel ve Conversion API (CAPI) kurulumlarıyla, reklamdan gelen kişinin sitenizde ne yaptığını milim milim takip ederiz."
                            },
                            {
                                icon: Zap,
                                title: "Kreatif Stratejisi",
                                description: "İnsanların parmaklarını kaydırmayı durdurmasını (Scroll-Stopping) sağlayan görsel ve metin stratejileri geliştiririz."
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

            {/* Campaign Types */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Meta Ads Stratejilerimiz ve Kampanya Kurguları
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Soğuk Kitle (Prospecting) Kampanyaları",
                                features: [
                                    "İlgi Alanı Hedefleme: Sektörle ilgili sayfaları takip edenleri hedefleme",
                                    "Lookalike (Benzer) Kitleler: Mevcut müşterilere benzer yeni insanları bulma",
                                    "Geniş hedefleme ile algoritmanın öğrenmesini sağlama"
                                ]
                            },
                            {
                                title: "Yeniden Pazarlama (Retargeting)",
                                features: [
                                    "Dinamik Ürün Reklamları (DPA): Bakılan ürünü tekrar gösterme",
                                    "Terk Edilmiş Sepet Kurguları: Kararsız müşteriyi satışa dönd\u00fcrme",
                                    "Segmentasyonlu remarketing: Davranışlara göre özel mesajlar"
                                ]
                            },
                            {
                                title: "Lead Generation (Potansiyel Müşteri)",
                                features: [
                                    "Facebook/Instagram içi hızlı formlar",
                                    "Web sitesine gitmeye gerek kalmadan müşteri datası toplama",
                                    "Hizmet, Gayrimenkul, Eğitim ve B2B sektörleri için ideal"
                                ]
                            },
                            {
                                title: "Katalog Satışları (E-Ticaret)",
                                features: [
                                    "Instagram Mağaza ve Facebook Shop entegrasyonları",
                                    "Ürünleri doğrudan platform üzerinde vitrine çıkarma",
                                    "Alışverişi kolaylaştıran optimize edilmiş deneyim"
                                ]
                            }
                        ].map((campaign, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                                <h3 className="text-xl font-bold text-white mb-6">{campaign.title}</h3>
                                <ul className="space-y-3">
                                    {campaign.features.map((feature, fidx) => (
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

            {/* Sector Expertise */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Sektörel Uzmanlık: Turizm ve E-Ticaret
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                            <h3 className="text-2xl font-bold text-white mb-4">Turizm ve Otelcilik Reklamları</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Görsel Hikaye Anlatıcılığı: Otelin atmosferini en çekici şekilde sunma</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Sezonluk Strateji: Erken rezervasyon vs Last Minute kampanyaları</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Global Hedefleme: Almanya, Rusya, İngiltere gibi pazarlara kendi dillerinde</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                            <h3 className="text-2xl font-bold text-white mb-4">E-Ticaret ve Perakende</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Dönüşüm Odaklılık: ROAS (Return on Ad Spend) maksimizasyonu</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Kreatif Testleri: A/B test ile en çok satan görselleri bulma</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-auryn-magenta mr-2">•</span>
                                    <span>Katalog optimizasyonu: Product feed hatalarını giderme</span>
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
                                question: "Instagram reklamları için ne kadar bütçe ayırmalıyım?",
                                answer: "Bütçe, hedeflerinize ve sektör rekabetine göre değişir. Günlük 100 TL ile de başlanabilir. Önemli olan bütçenin büyüklüğü değil, o bütçeden ne kadar getiri (ROAS) elde ettiğinizdir."
                            },
                            {
                                question: "Görselleri ve videoları siz mi hazırlıyorsunuz?",
                                answer: "Reklam performansının %50'si kreatiftir. Ajansımız bünyesindeki tasarım ekibimizle, reklamlarınızda kullanılacak dikkat çekici görselleri ve videoları kurguluyor veya sizi yönlendiriyoruz."
                            },
                            {
                                question: "iOS 14 güncellemesi reklamları bitirdi mi?",
                                answer: "Hayır, sadece değiştirdi. Apple'ın gizlilik güncellemeleri veri takibini zorlaştırsa da, Conversion API (CAPI) entegrasyonlarımız ve sunucu taraflı takip çözümlerimizle veri kaybını minimize ediyor ve reklamları verimli yönetmeye devam ediyoruz."
                            },
                            {
                                question: "Facebook öldü mü? Sadece Instagram reklamı versek olmaz mı?",
                                answer: "Bu yaygın bir yanılgıdır. Facebook, özellikle 35 yaş üstü ve belirli alım gücüne sahip kitleler için hala en güçlü satın alma platformlarından biridir. 'Otomatik Reklam Alanları' kullanarak Meta'nın yapay zekasının en ucuz dönüşümü nerede buluyorsa orada göstermesini sağlıyoruz."
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
                        Sosyal Medyayı Bir Satış Kanalına Dönüştürün
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Doğru strateji ve teknik yönetimle sosyal medya bütçenizi yatırıma dönüştürüyoruz. Reklam hesabinızı inceleyelim.
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
