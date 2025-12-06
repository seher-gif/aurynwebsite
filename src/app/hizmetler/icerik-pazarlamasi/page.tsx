import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileText, TrendingUp, Users, Sparkles, CheckCircle, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kurumsal İçerik Pazarlaması ve Stratejik İçerik Yönetimi | AURYN Dijital",
    description: "Markanızın sesini otoriteye dönüştürün. B2B, Sanayi ve Turizm odaklı profesyonel içerik pazarlama ajansı. SEO uyumlu blog, web metinleri ve hikaye anlatıcılığı hizmetleri.",
};

export default function ContentMarketingPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-auryn-magenta/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Kurumsal İçerik Pazarlaması ve
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                            Stratejik İçerik Yönetimi
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        İçerik; markanızın sektördeki uzmanlığını kanıtlayan, Google'da görünürlüğünü artıran ve ziyaretçileri sadık müşterilere dönüştüren stratejik bir "Güven İnşa Etme" aracıdır.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/iletisim">
                            <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white">
                                İçerik Stratejisi Görüşmesi
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Professional Content */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Neden Profesyonel Bir İçerik Ajansı?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: "Topikal Otorite",
                                description: "Sektörünüzle ilgili sorulara en doğru cevapları vererek, Google'ın ve müşterilerinizin gözünde 'uzman' konumuna gelirsiniz."
                            },
                            {
                                icon: TrendingUp,
                                title: "Organik Trafik ve SEO Gücü",
                                description: "SEO uyumlu içerikler, reklam maliyeti ödemeden sitenize sürekli taze müşteri çeker."
                            },
                            {
                                icon: Users,
                                title: "Satış Hunisi Desteği",
                                description: "İçerikler müşteriyi 'Farkındalık' aşamasından 'Satın Alma' aşamasına kadar ikna ederek ilerletir."
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

            {/* B2B Content */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            B2B ve Sanayi İçin Teknik İçerik Pazarlaması
                        </h2>
                        <p className="text-xl text-gray-400">
                            Mühendislik ve üretim süreçlerini anlayan yaklaşım
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Teknik Bloglar ve Makaleler",
                                description: "Satın alma müdürlerini ve mühendisleri hedefleyen, bilgi yoğunluklu içerikler"
                            },
                            {
                                title: "Whitepaper ve E-Kitaplar",
                                description: "B2B müşterilerinizin iletişim bilgilerini almak karşılığında sektörel raporlar"
                            },
                            {
                                title: "Vaka Analizleri (Case Studies)",
                                description: "Başarı hikayeleriyle potansiyel müşterilere somut kanıtlar sunma"
                            }
                        ].map((content, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                                <h3 className="text-xl font-bold text-white mb-4">{content.title}</h3>
                                <p className="text-gray-300">{content.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Services */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Kapsamlı İçerik Üretim Hizmetlerimiz
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: FileText,
                                title: "SEO Uyumlu Blog Yönetimi",
                                features: [
                                    "Anahtar kelime araştırması (Keyword Research)",
                                    "Aranma hacmi yüksek konuları belirleme",
                                    "Google'ın sevdiği, kullanıcıların okumaktan keyif aldığı içerikler"
                                ]
                            },
                            {
                                icon: Sparkles,
                                title: "Web Sitesi Metinleri (Copywriting)",
                                features: [
                                    "Ana sayfa, hakkımızda ve hizmet sayfaları metinleri",
                                    "Ziyaretçiyi yakalayan, markanızı en iyi şekilde anlatan kurgular",
                                    "Eyleme geçiren (Satın Al / Teklif İste) metinler"
                                ]
                            },
                            {
                                icon: Users,
                                title: "E-Posta Pazarlaması (Newsletter)",
                                features: [
                                    "Sektörel haberler ve şirket güncellemeleri",
                                    "Özel teklifler içeren bültenler",
                                    "Yüksek açılma oranı (Open Rate) odaklı stratejiler"
                                ]
                            },
                            {
                                icon: TrendingUp,
                                title: "LinkedIn Pulse ve B2B Makaleler",
                                features: [
                                    "CEO ve üst düzey yöneticiler adına makaleler",
                                    "Thought Leadership (Düşünce Liderliği) içerikleri",
                                    "Sektörel otorite inşası"
                                ]
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
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
                                question: "Yapay zeka (AI) ile mi yazıyorsunuz?",
                                answer: "Yapay zeka araçlarını araştırma ve iskelet oluşturma aşamasında bir 'asistan' olarak kullanıyoruz. Ancak metnin ruhunu, stratejisini ve marka sesini %100 insan editörlerimiz ve yazarlarımız veriyor. Google, tamamen AI ile yazılmış değersiz içerikleri ayırt edebilir; biz 'insan odaklı' içerik üretiyoruz."
                            },
                            {
                                question: "Blog yazıları ne kadar uzun olmalı?",
                                answer: "Uzunluk, konunun derinliğine ve rekabete göre değişir. Standart bir blog 800-1000 kelime olabilirken, kapsamlı bir 'Cornerstone' içerik 2000 kelimeyi bulabilir. Önemli olan kelime sayısı değil, okuyucuya verdiği faydadır."
                            },
                            {
                                question: "İçeriklerimiz hangi dilde olabilir?",
                                answer: "Global pazarları hedefleyen müşterilerimiz için Türkçe'nin yanı sıra; İngilizce, Almanca ve Rusça dillerinde, o dilin kültürel kodlarına hakim 'Native' seviyesinde içerik stratejileri kurguluyoruz."
                            },
                            {
                                question: "İçerik pazarlaması satışları artırır mı?",
                                answer: "Evet, ama dolaylı ve güçlü bir yoldan. İçerik, müşterinin güvenini kazanır. Güven, B2B'de ve hizmet sektöründe satışın temelidir. İçerikle eğitilmiş bir müşteri, fiyat odaklı değil, değer odaklı satın alma yapar."
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
                        Markanızın Hikayesini Birlikte Yazalım
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Doğru kelimeler, markanızı bir tercih sebebine dönüştürebilir. İçerik stratejinizi planlayalım.
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
