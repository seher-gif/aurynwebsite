import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp, Target, Shield, BarChart, CheckCircle, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Google Ads Yönetimi ve Performans Pazarlama Danışmanlığı | AURYN Dijital",
    description: "Google Ads, Meta ve LinkedIn reklamlarınızda veri odaklı yönetim. Bütçe optimizasyonu, negatif anahtar kelime yönetimi ve dönüşüm odaklı stratejilerle ROI artışı sağlayın.",
};

export default function GoogleAdsPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-auryn-magenta/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Google Ads Yönetimi ve
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                            Veri Odaklı Performans Pazarlama
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Dijital reklamcılıkta başarı, harcanan bütçenin büyüklüğüyle değil, o bütçenin ne kadar verimli yönetildiğiyle ölçülür. AURYN Dijital olarak sunduğumuz Google Ads Danışmanlığı, reklam harcamalarınızı optimize ederek ROI'nizi maksimize eder.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/iletisim">
                            <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white">
                                Ücretsiz Hesap Analizi
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Profesyonel Google Ads Yönetimi Neleri Kapsar?
                        </h2>
                        <p className="text-xl text-gray-400">
                            Başarılı bir süreç, sürekli veri analizi ve optimizasyon gerektirir
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Hesap Yapılandırması ve Strateji",
                                features: [
                                    "Yüksek niyetli anahtar kelime analizi",
                                    "Kalite Puanı yüksek kampanya kurgusu",
                                    "Google Tag Manager ile eksiksiz ölçümleme"
                                ]
                            },
                            {
                                icon: TrendingUp,
                                title: "Arama Ağı Reklamları",
                                features: [
                                    "Negatif anahtar kelime yönetimi",
                                    "Reklam metni A/B testleri",
                                    "Yüksek CTR ile maliyet düşürme"
                                ]
                            },
                            {
                                icon: Shield,
                                title: "Görüntülü Reklam Ağı & Remarketing",
                                features: [
                                    "Davranış bazlı segmentasyon",
                                    "Sepet terk eden kullanıcı geri kazanma",
                                    "Kişiselleştirilmiş görsel stratejiler"
                                ]
                            },
                            {
                                icon: BarChart,
                                title: "Google Alışveriş (Shopping)",
                                features: [
                                    "Product feed optimizasyonu",
                                    "Merchant Center hata giderme",
                                    "Ürün bazlı performans takibi"
                                ]
                            },
                            {
                                icon: CheckCircle,
                                title: "B2B ve LinkedIn Entegrasyonu",
                                features: [
                                    "Karar verici hedeflemeleri",
                                    "LinkedIn Ads senkronizasyonu",
                                    "Lead quality odaklı stratejiler"
                                ]
                            },
                            {
                                icon: TrendingUp,
                                title: "Dönüşüm ve ROI Takibi",
                                features: [
                                    "CRM entegrasyonu",
                                    "Offline conversion tracking",
                                    "Attribution modeling"
                                ]
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                <service.icon className="h-10 w-10 text-auryn-magenta mb-4" />
                                <h3 className="text-lg font-bold text-white mb-4">{service.title}</h3>
                                <ul className="space-y-2">
                                    {service.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start text-sm text-gray-300">
                                            <span className="text-auryn-magenta mr-2">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Neden Bir Google Ads Uzmanı ile Çalışmalısınız?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Bütçe Verimliliği",
                                description: "Alakasız tıklamalar engellenerek bütçeniz sadece potansiyel müşterilere harcanır. Negatif kelime stratejileriyle israf önlenir."
                            },
                            {
                                title: "Düşük Tıklama Maliyeti",
                                description: "Kalite Puanı optimizasyonu ile rakiplerinizden daha düşük ücret ödeyerek daha üst sıralarda yer alabilirsiniz."
                            },
                            {
                                title: "Şeffaf Raporlama",
                                description: "Google Looker Studio üzerinden anlık ve şeffaf raporlarla performansınızı 7/24 takip edebilirsiniz."
                            }
                        ].map((benefit, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                                <p className="text-gray-300">{benefit.description}</p>
                            </div>
                        ))}
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
                        <p className="text-xl text-gray-400">
                            Google Ads Hakkında Merak Edilenler
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: "Google Ads (AdWords) bütçesi ne kadar olmalı?",
                                answer: "Google Ads'te minimum bir bütçe zorunluluğu yoktur; bütçenizi siz belirlersiniz. Ancak rekabetçi olabilmek ve anlamlı sonuçlar alabilmek için sektörünüze ve Tıklama Başına Maliyet (CPC) oranlarına göre ideal bir giriş seviyesi belirlenmelidir. Biz, hedeflerinize uygun en optimum bütçeyi planlar ve öneririz."
                            },
                            {
                                question: "Google Ads mi SEO mu? Hangisine yatırım yapmalıyım?",
                                answer: "Bu iki kanal birbirinin alternatifi değil, tamamlayıcısıdır. Google Ads, kampanyayı başlattığınız an trafiğin gelmesini sağlar; hızlı sonuç ve nakit akışı yaratır. SEO ise uzun vadeli, kalıcı bir yatırımdır ve zamanla reklam maliyetlerinizi düşürür. En sağlıklı büyüme stratejisi, kısa vadede Ads ile başlayıp paralelinde SEO ile otorite inşa etmektir."
                            },
                            {
                                question: "B2B ve Sanayi firmaları için Google Ads işe yarar mı?",
                                answer: "Kesinlikle. B2B satın almacıları, mühendisler ve genel müdürler de tedarikçi araştırmalarını Google üzerinden yapmaktadır. B2B stratejimiz, doğrudan e-ticaret satışı yerine 'teklif formu doldurma', 'katalog indirme' veya 'WhatsApp iletişimi' gibi nitelikli lead (potansiyel müşteri) toplama üzerine kuruludur."
                            },
                            {
                                question: "Reklamlarım ne zaman yayınlanmaya başlar?",
                                answer: "Kampanya kurgusu, anahtar kelime seçimi ve reklam metinleri hazırlandıktan sonra Google'ın onayına sunulur. Genellikle 24 saat içinde onaylanır ve reklamlarınız belirlediğimiz hedef kitleye gösterilmeye başlar."
                            },
                            {
                                question: "Rakiplerimin reklamlarıma tıklamasını engelleyebilir misiniz?",
                                answer: "Tamamen engellemek teknik olarak imkansız olsa da, Google'ın gelişmiş algoritmaları 'geçersiz tıklamaları' (invalid clicks) tespit edip bütçenizden düşer. Ayrıca biz de IP engelleme ve davranış analizi ile şüpheli trafiği filtreleyerek bütçenizi koruruz."
                            },
                            {
                                question: "Sadece Antalya için mi hizmet veriyorsunuz?",
                                answer: "Merkezimiz Antalya'da olsa da, AURYN Dijital olarak dijital dünyanın sınırları yoktur. İstanbul, İzmir, Ankara gibi büyük şehirlerdeki firmalara ve yurt dışına (Avrupa, ABD, Orta Doğu) ihracat yapan markalara global reklam yönetimi hizmeti veriyoruz."
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
                        Reklam Bütçenizi En Verimli Şekilde Yönetin
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Dijital pazarlama bir varsayım oyunu değildir. Doğru matematik, doğru strateji ve profesyonel yönetimle reklam yatırımınızın karşılığını fazlasıyla almanız mümkündür.
                    </p>
                    <Link href="/iletisim">
                        <Button size="lg" className="bg-white text-auryn-magenta hover:bg-gray-100">
                            Ücretsiz Hesap Analizi İsteyin
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
