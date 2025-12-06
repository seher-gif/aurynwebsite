import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp, BarChart3, Target, Zap, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Performans Pazarlama ve Google Ads Yönetimi | ROI Odaklı Ajans | AURYN Dijital",
    description: "Google Ads, Meta ve LinkedIn reklamlarınızda maksimum ROAS hedefliyoruz. Turizm ve B2B sanayi reklamcılığında uzman, ölçülebilir performans yönetimi.",
};

export default function PerformansPazarlamaPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-auryn-magenta/20 via-black to-auryn-purple/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        ROI ve ROAS Odaklı
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                            Performans Pazarlama Hizmetleri
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Reklam platformları (Google, Meta, LinkedIn) doğru yönetilmezse birer para yakma makinesine dönüşebilir. Bizim farkımız; bütçenizi bir "gider" kalemi olarak değil, ölçülebilir bir yatırım (ROI) aracı olarak yönetmemizdir.
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

            {/* Reklam Yönetimi Uzmanlıkları */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Reklam Yönetimi Uzmanlıklarımız
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: TrendingUp,
                                title: "Google Ads (Arama ve Görüntülü Reklam Ağı)",
                                description: "Satın alma niyeti yüksek kullanıcıları, doğru anahtar kelimeler ve negatif eşleme stratejileriyle yakalıyoruz. Google Search, Display ve YouTube kampanyalarınızla dönüşüm oranlarını artırıyoruz."
                            },
                            {
                                icon: Target,
                                title: "Meta Ads (Facebook & Instagram Reklamları)",
                                description: "Özellikle turizm ve perakende sektörleri için görsel gücü yüksek, yeniden pazarlama (Remarketing) kurgularıyla satışları artıran sosyal medya reklam stratejileri geliştiriyoruz."
                            },
                            {
                                icon: BarChart3,
                                title: "LinkedIn Ads (B2B Pazarlama)",
                                description: "Sanayi, üretim ve ihracat odaklı firmalar için karar vericilere (Satın alma müdürleri, CEO'lar) nokta atışı ulaşan profesyonel B2B reklam kurguları hazırlıyoruz."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                <item.icon className="h-12 w-12 text-auryn-magenta mb-4" />
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sektörel Deneyim */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Sektörel Deneyim: Turizm ve Sanayi
                        </h2>
                        <p className="text-xl text-gray-400">
                            AURYN Dijital, özellikle Antalya'nın dinamiklerine hakimdir
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                            <h3 className="text-2xl font-bold text-white mb-4">Turizm</h3>
                            <p className="text-gray-300">
                                Oteller ve acenteler için sezonluk talep dalgalanmalarına göre dinamik bütçe yönetimi yapıyoruz. Rezervasyon maliyetlerini düşürürken dolulu oranlarını maksimize ediyoruz.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                            <h3 className="text-2xl font-bold text-white mb-4">Sanayi/Üretim</h3>
                            <p className="text-gray-300">
                                B2B firmalar için uzun satış döngülerine uygun, lead (teklif formu) odaklı stratejiler geliştiriyoruz. Kaliteli potansiyel müşteri maliyetlerini optimize ediyoruz.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Sıkça Sorulan Sorular
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: "Performans pazarlama nedir?",
                                answer: "Performans pazarlama, reklam bütçenizin her kuruşunun ölçülebilir sonuçlara (satış, lead, rezervasyon) dönüştüğü dijital pazarlama yaklaşımıdır. 'Ne kadar harcadık, ne kazandık?' sorusuna net cevap veren, data-driven bir modeldir."
                            },
                            {
                                question: "Google Ads bütçesi ne kadar olmalı?",
                                answer: "Minimum bütçe zorunluluğu yoktur, ancak rekabetçi olabilmek için sektörünüze ve CPC oranlarına göre ideal bir başlangıç seviyesi belirlenmelidir. Biz, hedeflerinize uygun en optimum bütçeyi planlar ve öneririz."
                            },
                            {
                                question: "ROAS nedir ve neden önemlidir?",
                                answer: "ROAS (Return on Ad Spend), reklam harcamasının getirisidir. Örneğin 4x ROAS, harcadığınız her 1 TL için 4 TL gelir elde ettiğiniz anlamına gelir. Performans pazarlamada en kritik KPI'dır."
                            },
                            {
                                question: "Hangi platformlarda reklam vermeliyim?",
                                answer: "Hedef kitlenize ve sektörünüze bağlıdır. E-ticaret ve turizm için Meta Ads, B2B için LinkedIn Ads, satın alma niyeti yüksek aramalar için Google Ads en etkilidir. Çoğu durumda multichannel (çok kanallı) strateji en iyi sonucu verir."
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
                        Reklam Per formansınızı Ücretsiz Analiz Edelim
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Mevcut Google Ads hesabınızın verimliliğini ölçmek veya sıfırdan profesyonel bir başlangıç yapmak için bizimle iletişime geçin
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
