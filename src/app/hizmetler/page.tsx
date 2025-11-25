import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart2, Globe, Megaphone, PenTool, Search, TrendingUp, ArrowRight } from "lucide-react";

const services = [
    {
        name: 'SEO Optimizasyonu',
        description: 'Arama motorlarında üst sıralara çıkarak organik trafiğinizi artırın. Teknik SEO, içerik optimizasyonu ve backlink stratejileri ile görünürlüğünüzü kalıcı hale getiriyoruz.',
        icon: Search,
        href: '/hizmetler/seo-optimizasyonu',
    },
    {
        name: 'Google Ads Yönetimi',
        description: 'Hedef kitlenize en doğru zamanda ulaşarak dönüşümlerinizi maksimize edin. Arama, Görüntülü Reklam ve Alışveriş kampanyalarıyla ROI odaklı çalışıyoruz.',
        icon: TrendingUp,
        href: '/hizmetler/google-ads-yonetimi',
    },
    {
        name: 'Sosyal Medya Yönetimi',
        description: 'Marka bilinirliğinizi artırın ve topluluğunuzla etkileşim kurun. Instagram, LinkedIn, Twitter ve TikTok için yaratıcı stratejiler geliştiriyoruz.',
        icon: Globe,
        href: '/hizmetler/sosyal-medya-yonetimi',
    },
    {
        name: 'İçerik Pazarlaması',
        description: 'Değerli ve ilgi çekici içeriklerle hedef kitlenizi etkileyin. Blog yazıları, e-kitaplar ve video içeriklerle markanızın otoritesini güçlendirin.',
        icon: PenTool,
        href: '/hizmetler/icerik-pazarlamasi',
    },
    {
        name: 'Meta Ads (Facebook & Instagram)',
        description: 'Sosyal medya reklamlarıyla potansiyel müşterilerinize ulaşın. Hedefleme ve retargeting stratejileriyle satışlarınızı artırın.',
        icon: Megaphone,
        href: '/hizmetler/meta-ads',
    },
    {
        name: 'Raporlama & Analiz',
        description: 'Şeffaf ve detaylı raporlarla performansınızı anlık takip edin. Veri odaklı kararlar alarak stratejinizi sürekli iyileştirin.',
        icon: BarChart2,
        href: '/hizmetler/raporlama-analiz',
    },
];

export default function HizmetlerPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="isolate">
                {/* Hero */}
                <div className="relative isolate pt-14">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-auryn-magenta/20 rounded-full blur-[100px] opacity-40"></div>
                        <div className="absolute top-40 -left-20 w-[30rem] h-[30rem] bg-auryn-purple/20 rounded-full blur-[100px] opacity-40"></div>
                    </div>
                    <div className="py-24 sm:py-32 lg:pb-40 relative z-10">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading mb-6">
                                    Dijital <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">Çözümlerimiz</span>
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-400 font-body max-w-2xl mx-auto">
                                    Markanızın ihtiyacı olan tüm dijital pazarlama hizmetleri tek bir noktada. Veri odaklı, şeffaf ve sonuç odaklı yaklaşımımızla tanışın.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32 relative z-10">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {services.map((service) => (
                            <div key={service.name} className="flex flex-col bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-auryn-magenta/30 transition-all hover:shadow-lg hover:shadow-auryn-magenta/5 group hover:-translate-y-2">
                                <dt className="flex items-center gap-x-3 text-xl font-bold leading-7 text-white">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-auryn-magenta/10 group-hover:bg-auryn-magenta transition-colors">
                                        <service.icon className="h-6 w-6 text-auryn-magenta group-hover:text-white transition-colors" aria-hidden="true" />
                                    </div>
                                    {service.name}
                                </dt>
                                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-gray-400">
                                    <p className="flex-auto">{service.description}</p>
                                    <div className="mt-8">
                                        <Button variant="outline" className="w-full border-white/10 text-white hover:bg-auryn-magenta hover:text-white hover:border-auryn-magenta transition-all" asChild>
                                            <Link href={service.href}>
                                                Detaylı İncele <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </dd>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gray-900/30 border-y border-white/5 py-24 sm:py-32 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-auryn-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Hangi hizmetin size uygun olduğundan emin değil misiniz?
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-400">
                                Ücretsiz analizimizle web sitenizin ihtiyaçlarını belirleyelim ve size özel bir yol haritası çıkaralım.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white border-0 h-12 px-8 text-base rounded-xl transition-transform hover:scale-105" asChild>
                                    <Link href="/seo-analizi">Ücretsiz Analiz Yap</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 px-8 text-base rounded-xl" asChild>
                                    <Link href="/iletisim">Bize Ulaşın</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
