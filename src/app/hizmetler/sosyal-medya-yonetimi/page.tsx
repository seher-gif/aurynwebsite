import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Instagram, Facebook, Linkedin, Video, Users, BarChart3, CheckCircle, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profesyonel Sosyal Medya Yönetimi ve İçerik Stratejisi | AURYN Dijital",
    description: "Markanızın dijital sesini yönetiyoruz. Antalya ve global pazarlar için Instagram, LinkedIn ve YouTube odaklı profesyonel sosyal medya yönetimi ve içerik üretim hizmetleri.",
};

export default function SocialMediaPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-auryn-magenta/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Profesyonel Sosyal Medya Yönetimi ve
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                            Yaratıcı İçerik Stratejisi
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Sosyal medya hesaplarınızı birer takipçi toplama aracı olarak değil, markanızın kurumsal kimliğini yansıtan ve ticari hedeflerinize hizmet eden stratejik iletişim kanalları olarak yönetiyoruz.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/iletisim">
                            <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white">
                                Ücretsiz Strateji Görüşmesi
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
                            Neden Profesyonel Sosyal Medya Ajansı?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Tutarlı Marka İmajı",
                                description: "Logonuzdan dilinize, renk paletinizden görsel dünyanıza kadar her platformda kurumsal bütünlük sağlarız."
                            },
                            {
                                title: "Algoritma Dostu İçerik",
                                description: "Instagram Reels, LinkedIn makaleleri veya YouTube Shorts... Hangi içeriğin ne zaman paylaşılması gerektiğini verilere dayanarak planlarız."
                            },
                            {
                                title: "Kriz Yönetimi",
                                description: "Olası negatif yorumlar veya kriz anlarında, markanızı koruyacak profesyonel iletişim reflekslerini devreye sokarız."
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

            {/* Services */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            360° Sosyal Medya ve İçerik Yönetimi Sürecimiz
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: BarChart3,
                                title: "Strateji ve Planlama",
                                description: "Hedef kitlenizi analiz eder, rakiplerinizi inceler ve aylık içerik takvimi hazırlarız."
                            },
                            {
                                icon: Video,
                                title: "Yaratıcı İçerik Üretimi",
                                description: "Grafik tasarım, video kurgu, Reels ve trendlere uygun içerikler üretiyoruz."
                            },
                            {
                                icon: Users,
                                title: "Topluluk Yönetimi",
                                description: "Mesajlara, yorumlara ve etiketlemelere markanızın diline uygun şekilde yanıt veriyoruz."
                            },
                            {
                                icon: BarChart3,
                                title: "Analiz ve Raporlama",
                                description: "Ay sonunda detaylı raporlarla sosyal medya performansınızı şeffaf şekilde ölçümlüyoruz."
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                <service.icon className="h-10 w-10 text-auryn-magenta mb-4" />
                                <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-sm text-gray-300">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Solutions */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Platform ve Sektör Odaklı Çözümler
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Linkedin,
                                title: "LinkedIn Yönetimi (B2B)",
                                features: [
                                    "Şirket sayfası ve thought leadership",
                                    "Fuar katılımları ve kurumsal başarılar",
                                    "Karar vericilere (CEO, Satın Alma Müdürü) ulaşma"
                                ]
                            },
                            {
                                icon: Instagram,
                                title: "Instagram & Facebook (Turizm)",
                                features: [
                                    "Deneyim odaklı görsel içerikler",
                                    "Reels videoları ve estetik görseller",
                                    "Müşteri memnuniyeti hikayeleştirme"
                                ]
                            },
                            {
                                icon: Video,
                                title: "YouTube ve Video İçerik",
                                features: [
                                    "Ürün tanıtım videoları",
                                    "'Nasıl Yapılır?' içerikleri",
                                    "Kurumsal tanıtım filmleri"
                                ]
                            }
                        ].map((platform, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                                <platform.icon className="h-12 w-12 text-auryn-magenta mb-4" />
                                <h3 className="text-xl font-bold text-white mb-4">{platform.title}</h3>
                                <ul className="space-y-3">
                                    {platform.features.map((feature, fidx) => (
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
                                question: "Haftada kaç paylaşım yapıyorsunuz?",
                                answer: "Paylaşım sıklığı markanızın sektörüne ve hedeflerine göre değişir. Standart paketlerimiz olduğu gibi, tamamen size özel planlar da oluşturuyoruz. Önemli olan sayı değil, etkileşim kalitesidir."
                            },
                            {
                                question: "Fotoğraf ve video çekimi yapıyor musunuz?",
                                answer: "Evet. Antalya içindeki müşterilerimiz için profesyonel çekim hizmeti (Drone, mekan çekimi, ürün çekimi) sunuyoruz. Şehir dışı veya yurt dışı müşterilerimiz içinse mevcut materyalleri kurgulayarak veya stok video/görsel lisanslayarak ilerliyoruz."
                            },
                            {
                                question: "B2B firmaların sosyal medyaya ihtiyacı var mı?",
                                answer: "Kesinlikle. B2B müşterileri de satın alma kararı vermeden önce firmanızın 'yaşayan, güvenilir ve kurumsal' olduğunu görmek için LinkedIn ve Instagram hesaplarınıza bakarlar. Güncel olmayan bir profil, 'Acaba bu firma kapandı mı?' algısı yaratabilir."
                            },
                            {
                                question: "Takipçi satın alıyor musunuz?",
                                answer: "Hayır, asla. Bot (sahte) takipçiler, hesabınızın etkileşim oranını düşürür ve algoritma tarafından cezalandırılmanıza neden olur. Biz, organik stratejiler ve hedefli reklamlarla 'gerçek ve ilgili' takipçi kazanmanızı sağlıyoruz."
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
                        Markanızın Dijital Vitrinini Profesyonellere Emanet Edin
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Hesaplarınızı inceleyelim, eksikleri belirleyelim ve size özel bir içerik stratejisi oluşturalım.
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
